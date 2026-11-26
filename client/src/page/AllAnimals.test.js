import { render, screen } from "@testing-library/react";
import axios from "axios";
import AllAnimalsPage from "./AllAnimals.page";

jest.mock("axios");

test("shows the animals from the API", async () => {
  axios.get.mockResolvedValue({ data: [{ _id: "1", name: "Rex", race: "Dog", gender: "male", img: "uploads/rex.png" }] });
  render(<AllAnimalsPage />);
  expect(await screen.findByText("Rex")).toBeInTheDocument();
  expect(screen.getByText(/Dog · male/)).toBeInTheDocument();
});

test("says so when the API cannot be reached", async () => {
  axios.get.mockRejectedValue(new Error("down"));
  render(<AllAnimalsPage />);
  expect(await screen.findByText(/Could not load the animals/)).toBeInTheDocument();
});
