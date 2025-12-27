# to-do-list

React + FastAPI — Classic CRUD (Fullstack ToDo App)  A modular full-stack project built with React (frontend) and FastAPI (backend). This application is a ToDo List with classic CRUD operations, user authentication, and the ability to connect to any database via environment configuration.

## Authentication

- JWT-based authentication
- Access & refresh token flow
- Password hashing (argon)
- Protected API routes
- Persistent login support

## Frontend

- React + Tailwind CSS
- Modular components
- Responsive layout
- Date picker powered by react-datepicker

## Backend

- FastAPI
- Pydantic models & validation
- SQLite/PostgreSQL support via environment variables
- Async CRUD operations
- SQLAlchemy ORM (async)

## Database

The backend supports multiple databases via environment configuration.

Currently supported:
- SQLite (default, local dev)
- PostgreSQL (recommended for production & learning)

Database connection is configured via `.env` file.

## Environment variables

Create a `.env` file in `/back`:

DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/todo_db
SECRET_KEY=your-secret-key

## Setup & Run

### Backend

```bash
cd back
python -m venv venv
source venv/bin/activate   # Linux 
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd front
npm install
npm run dev
```

Open http://localhost:5173 in your browser.