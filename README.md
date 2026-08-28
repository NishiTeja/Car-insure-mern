# Car Insurance MERN App

This project is split into:

- `client` - React + Vite + Tailwind UI
- `server` - Express + MongoDB API

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create `server/.env` from `server/.env.example` and set your MongoDB URI:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/car-insurance
JWT_SECRET=replace-this-secret
CLIENT_URL=http://localhost:5173
```

3. Start MongoDB, then run both apps:

```bash
npm run server
npm run client
```

The client runs on `http://localhost:5173` and the API runs on `http://localhost:5000`.

## Features

- Swinton-style home/login page based on the provided reference.
- Registration page with document upload saved against the MongoDB user record.
- JWT login/logout flow.
- Post-login policies dashboard with the crossed-out sections omitted.
- Manage Policy page with a document centre.
- Downloads for `Cover Insurance.pdf`, `Insurance Agreement.pdf`, and the logged-in user's uploaded document.
- Document status is always displayed as `Not Viewed`.
