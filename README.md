# Animal Studio

Animal Studio is a React and Express application for registering users, managing animal profiles, and uploading images. MongoDB stores users and animals; JWT tokens protect authenticated actions.

## Run locally

Requirements: Node.js 18+ and MongoDB.

1. Install dependencies:

   ```powershell
   npm run install:all
   ```

2. Copy `server/.env.example` to `server/.env` and fill in the MongoDB and JWT values. Copy `client/.env.example` to `client/.env` if the API is not on the default URL.

3. Start the API in one terminal:

   ```powershell
   npm run start:server
   ```

4. Start React in a second terminal:

   ```powershell
   npm run start:client
   ```

Open `http://localhost:3000` for the development client. The API serves the latest production build at `http://localhost:8000` after `npm run build`.

## Useful commands

- `npm test` runs the client tests once.
- `npm run build` creates the client production build.
- `npm run start:server` starts the Express API and connects to MongoDB.

Never commit `.env` files, passwords, JWT secrets, or uploaded user files.
## Security notes

- `POST /api/animals` and `POST /api/upload` need the JWT in the `x-auth-token` header. `GET /api/animals` is public.
- Uploads accept only JPEG, PNG, GIF, WebP, AVIF and APNG, and the file header is checked as well as the MIME type. SVG is not accepted.
- Login, register and password-reset routes are rate limited. Set `CLIENT_URL` to restrict CORS to your client origin.
- Register confirmation and password-reset links are sent by email through Gmail OAuth. Fill `EMAIL_EMAIL`, `CLIENT_ID`, `CLIENT_SECRET` and `REFRESH_TOKEN` in `server/.env`; without them the email step fails and logs an error.

## Tests

```powershell
npm run test:server   # API security tests, no database needed
npm test              # React tests
```
