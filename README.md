# tripvault
# 🗺️ TripVault

A full-stack MERN travel memory journal — users register, log in, and manage their own
list of trips (create, view, edit, delete). Built for the TripVault Virtual Internship
(Weeks 1 & 2): project setup + JWT authentication, and trip CRUD.

## Tech Stack
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- **Frontend:** React (Vite), React Router, Axios

## Folder Structure
```
tripvault/
├── client/   # React (Vite) frontend
└── server/   # Node + Express backend
```

## Prerequisites
- Node.js v18+
- A MongoDB connection string (free tier on [MongoDB Atlas](https://www.mongodb.com/atlas) works great)

## 1. Backend Setup
```bash
cd server
npm install
cp .env.example .env
```
Open `.env` and fill in:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_long_random_string
```
Run the server:
```bash
npm run dev     # with nodemon, auto-restarts
# or
npm start
```
The API will run at `http://localhost:5000`.

## 2. Frontend Setup
Open a second terminal:
```bash
cd client
npm install
cp .env.example .env
```
The default `.env` already points to `http://localhost:5000/api`, which matches the
backend above — change it only if you run the server on a different port.

Run the frontend:
```bash
npm run dev
```
The app will run at `http://localhost:5173`.

## 3. Try It Out
1. Go to `http://localhost:5173`
2. Register a new account
3. Log in
4. You'll land on the Dashboard — click **+ Create Trip** to add your first trip
5. Edit or delete any trip; the list refreshes automatically

## API Reference

### Auth
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Log in, returns a JWT |
| GET | `/api/auth/me` | Yes | Get the logged-in user's info |

### Trips
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/trips` | Yes | Create a trip |
| GET | `/api/trips` | Yes | Get all of the logged-in user's trips |
| GET | `/api/trips/:id` | Yes | Get a single trip (must be the owner) |
| PUT | `/api/trips/:id` | Yes | Update a trip (must be the owner) |
| DELETE | `/api/trips/:id` | Yes | Delete a trip (must be the owner) |

Protected routes require an `Authorization: Bearer <token>` header. The frontend
handles this automatically via an Axios interceptor once you're logged in.

## Security Notes
- Passwords are hashed with bcrypt before being stored — never stored in plain text
- JWT tokens expire after 7 days
- Every trip route checks that `trip.user` matches the requesting user before
  allowing an update or delete, so users can never touch each other's trips
- `.env` files are git-ignored in both `client/` and `server/` — never commit real secrets

## Notes / Possible Next Steps
- Photo uploads and public profiles are planned for later weeks
- Consider moving the JWT out of `localStorage` into an httpOnly cookie for production use
# tripvault
