# Task Manager — Frontend

React (Vite) SPA for the Task Manager portfolio project. Talks to the
[task-manager-backend](../task-manager-backend) FastAPI API over JWT auth.

## Stack

- **React 18** + **Vite** — no CRA, fast dev server and builds
- **React Router** — client-side routing, with a `PrivateRoute` guard
- **Axios** — API calls, with a request interceptor that attaches the JWT
- **Context API** (`AuthContext`) — auth state, no extra state library needed
  at this scale

## Project layout

```
src/
  api/          axios client + auth/task API calls
  context/      AuthContext (login/register/logout, current user)
  components/   Navbar, TaskForm, TaskItem, PrivateRoute
  pages/        Login, Register, Dashboard
  App.jsx       route definitions
  main.jsx      React entry point
```

## Option A — Run locally with npm

Requires Node 20+.

```bash
npm install
cp .env.example .env      # points at the backend's API URL

npm run dev
```

Open http://localhost:5173. Make sure the backend is running first (see its
README) — by default the frontend expects it at `http://localhost:8000`.

## Option B — Run locally with Docker

The frontend Dockerfile builds the static app with Node, then serves it with
Nginx. Because Vite bakes `VITE_API_BASE_URL` into the build at compile time,
pass it as a build arg if your backend isn't at the default URL:

```bash
docker build -t task-manager-frontend \
  --build-arg VITE_API_BASE_URL=http://localhost:8000/api/v1 .

docker run -p 5173:80 task-manager-frontend
```

Open http://localhost:5173.

## Running both frontend and backend together

1. Start the backend (`docker compose up --build` in `task-manager-backend`,
   then run its Alembic migration).
2. Start the frontend with either option above.
3. Register an account, log in, and create a few tasks.

Later phases of this project combine both into a single production
docker-compose stack, fronted by Nginx and deployed to an AWS EC2 Ubuntu
host via a Jenkins pipeline.
