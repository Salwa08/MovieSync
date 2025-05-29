# MovieSync

MovieSync is a modern web application for discovering, watching, and managing your favorite movies, series, documentaries, kids content, and sports videos. It features a unified, responsive UI/UX, robust navigation, and user profile management.

## Features

- Browse and filter by content type: Films, Series, Documentaries, Kids, Sports
- Unified details page for all content types
- Cast, reviews, and episodes for all types
- Add/remove favorites
- Responsive, modern UI with horizontal scrolls and hero sections
- Robust error handling and instant navigation
- User authentication and profile management
- Accessible and fully responsive design

## Tech Stack

- **Frontend:** React, React Router, Axios, Tailwind CSS, Lucide React Icons
- **Backend:** Django, Django REST Framework
- **Database:** SQLite (default, can be changed)

## Getting Started

### Backend

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run migrations:
   ```bash
   python manage.py migrate
   ```
3. Start the backend server:
   ```bash
   python manage.py runserver
   ```

### Frontend

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the frontend dev server:
   ```bash
   npm start
   ```

## Project Structure

- `frontend/` - React frontend
- `videos/`, `users/`, `watch_party/` - Django backend apps
- `media/` - Uploaded files (avatars, etc.)
- `templates/` - Django HTML templates

## Deployment

- Set up environment variables for production
- Use a production-ready database (e.g., PostgreSQL)
- Configure static/media file serving

## API Keys

- This project requires a TMDB API key. Register for a free account at [TMDB](https://www.themoviedb.org/settings/api) and set your API key in `backend/settings.py` as `TMDB_API_KEY = "<YOUR_TMDB_API_KEY>"`.

## License

MIT

---

_For a full demo script in French, see the project documentation._
