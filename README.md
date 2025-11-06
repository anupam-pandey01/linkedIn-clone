# LinkedIn Clone 

Simple LinkedIn-like social feed built for AppDost internship assignment.

## Features
- Signup & login (JWT)
- Create post (text + optional image)
- View all posts (feed; newest first)
- Like / unlike posts
- Edit & delete your own posts
- Simple profile page (user posts)
- Responsive, minimal UI

(Requirements from assignment PDF implemented). :contentReference[oaicite:2]{index=2}

## Tech
- Frontend: React (Vite) + Axios + React Router
- Backend: Node.js + Express
- Database: MongoDB (use local or MongoDB Atlas)
- Image upload: multer (local / demo). Use Cloudinary/S3 for production.

## Run locally

### Backend
1. `cd backend`
2. `cp .env.example .env` and fill values.
3. `npm install`
4. `npm run dev` (requires nodemon) or `npm start`
- Backend will run on `PORT` (default 5000)

### Frontend
1. `cd frontend`
2. create `.env` with `VITE_API_URL=http://localhost:5000/api`
3. `npm install`
4. `npm run dev`
- Frontend default is `http://localhost:5173` (Vite). You can set `CLIENT_URL` in backend `.env`.
