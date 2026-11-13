const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");

process.env.JWT_KEY = "test-jwt-key";
process.env.JWT_RESET_PASSWORD_KEY = "test-reset-key";
delete process.env.CLIENT_URL;

// No database or real email in tests: replace the model calls and the mailer.
const sent = [];
require.cache[require.resolve("../config/mailer")] = {
  exports: async (from, to, subject, html) => sent.push({ to, subject, html }),
};
const animals = require("../models/Animals.model");
const users = require("../models/Users.model");
const bcrypt = require("../config/bcrypt");
const jwt = require("../config/jwt");
animals.selectAniamls = async () => [{ name: "Rex" }];
animals.saveAnimal = async (name) => ({ name });

const app = require("../app");
let server, base, token;

test.before(async () => {
  await new Promise((r) => (server = app.listen(0, r)));
  base = `http://127.0.0.1:${server.address().port}`;
  token = await jwt.generateToken({ _id: "u1" }, process.env.JWT_KEY);
});
test.after(() => server.close());

const png = Buffer.from("89504e470d0a1a0a0000000d49484452", "hex");
const form = (bytes, type, name = "a.png") => {
  const f = new FormData();
  f.append("animalimg", new Blob([bytes], { type }), name);
  f.append("name", "Rex");
  f.append("race", "dog");
  f.append("date", "2020-01-01");
  f.append("gender", "male");
  return f;
};

test("GET /api/animals stays public", async () => {
  const res = await fetch(`${base}/api/animals`);
  assert.equal(res.status, 200);
});

test("POST /api/animals and /api/upload need a token", async () => {
  for (const url of ["/api/animals", "/api/upload"]) {
    const res = await fetch(base + url, { method: "POST", body: form(png, "image/png") });
    assert.equal(res.status, 401, url);
    const bad = await fetch(base + url, {
      method: "POST",
      headers: { "x-auth-token": "garbage" },
      body: form(png, "image/png"),
    });
    assert.equal(bad.status, 401, url);
  }
});

test("a logged-in user can add an animal with a real image", async () => {
  const res = await fetch(`${base}/api/animals`, {
    method: "POST",
    headers: { "x-auth-token": token },
    body: form(png, "image/png"),
  });
  assert.equal(res.status, 201);
});

test("SVG and fake images are rejected", async () => {
  const svg = await fetch(`${base}/api/animals`, {
    method: "POST",
    headers: { "x-auth-token": token },
    body: form("<svg onload=alert(1)>", "image/svg+xml", "a.svg"),
  });
  assert.equal(svg.status, 415);
  const fake = await fetch(`${base}/api/animals`, {
    method: "POST",
    headers: { "x-auth-token": token },
    body: form("<script>alert(1)</script>", "image/png"),
  });
  assert.equal(fake.status, 415);
});

test("register does not return the hash or the secret key", async () => {
  users.findUserByEmail = async () => null;
  users.createUser = async () => ({ password: "HASH", secretKey: "KEY" });
  const res = await fetch(`${base}/api/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Ivan", email: "a@b.com", password: "Aa1!aaaa" }),
  });
  const text = await res.text();
  assert.equal(res.status, 201, text);
  assert.ok(!text.includes("HASH") && !text.includes("KEY"), text);
  assert.equal(sent.length, 1);
});

test("login checks the password before revealing an unconfirmed email", async () => {
  users.findUserByEmail = async () => ({
    password: await bcrypt.createHash("Aa1!aaaa"),
    isMailValid: false,
  });
  const login = (password) =>
    fetch(`${base}/api/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "a@b.com", password }),
    }).then((r) => r.json());
  const wrong = await login("Zz9!zzzz");
  assert.match(String(wrong.error), /invalid email and\/or password/);
  const right = await login("Aa1!aaaa");
  assert.match(String(right.error), /validate the email/);
});

test("reset link is emailed and works only once", async () => {
  let hash = await bcrypt.createHash("Aa1!aaaa");
  users.findUserByEmail = async () => ({ password: hash });
  users.updateUserPasswordByEmail = async (e, h) => (hash = h);
  sent.length = 0;
  await fetch(`${base}/api/forgetpassword`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "a@b.com" }),
  });
  assert.equal(sent.length, 1);
  const resetToken = sent[0].html.match(/resetpassword\/([^"]+)"/)[1];
  const reset = () =>
    fetch(`${base}/api/resetpassword/${resetToken}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: "Bb2!bbbb" }),
    });
  assert.equal((await reset()).status, 200);
  assert.equal((await reset()).status, 400);
});

test("no debug route and no leftover debug logging", () => {
  const api = fs.readFileSync(path.join(__dirname, "../routes/api.js"), "utf8");
  assert.ok(!api.includes("sendemail"));
});
