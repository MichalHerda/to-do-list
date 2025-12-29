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
- SQLAlchemy ORM (sync)
- Alembic migrations
- JWT authentication
- Versioned database schema
- PostgreSQL used for development

## Architecture Notes

The project currently uses synchronous SQLAlchemy sessions.
This decision was made intentionally to avoid mixing sync and async layers,
which can lead to subtle runtime errors.

The architecture allows future refactoring to full async
(FastAPI async routes + AsyncSession) as a separate step.


## Database

The backend supports multiple databases via environment configuration.

Currently supported:
- SQLite (default, local dev)
- PostgreSQL (recommended for production & learning)

Database connection is configured via `.env` file.

## PostgreSQL Setup (Optional, recommended for production)

If you want to use PostgreSQL (recommended), make sure it is installed and running:

### Install PostgreSQL

#### Ubuntu/Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

Create the database and user

# Switch to postgres user

```
sudo -i -u postgres
```

# Open psql shell

```
psql
```

# Create database

```
CREATE DATABASE todo_db;
```

# Create user (replace 'username' and 'password')

```
CREATE USER username WITH PASSWORD 'password';
```

# Grant privileges

```
GRANT ALL PRIVILEGES ON DATABASE todo_db TO username;
```

# Exit psql

```
\q
exit
```

Then update your .env file:

```
DATABASE_URL=postgresql://username:password@localhost:5432/todo_db
SECRET_KEY=your-secret-key
```

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