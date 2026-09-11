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