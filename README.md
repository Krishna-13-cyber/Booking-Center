# Booking-Center

Backend API for managing users, admins, areas, and bookings.

## Project structure

- `backend/app.js`: Express app setup, middleware, route mounting, MongoDB connection.
- `backend/routes`: Route modules grouped by domain (`user`, `admin`, `areas`, `booking`).
- `backend/controllers`: Business logic for each route.
- `backend/models`: Mongoose schemas and model definitions.
- `backend/middleware`: Shared middleware (auth verification).
- `backend/utils`: Shared utility helpers (validation).

## Run locally

```bash
cd backend
npm install
npm start
```

App runs on `http://localhost:8800`.

## ROI fix list (implemented)

1. **High ROI:** Centralized admin token verification into reusable middleware.
2. **High ROI:** Fixed unsafe/incorrect input validation patterns across user, admin, and area controllers.
3. **Medium ROI:** Standardized booking model references (`Booking`) for populate consistency.
4. **Medium ROI:** Removed unused imports and tightened several controller error return paths.
