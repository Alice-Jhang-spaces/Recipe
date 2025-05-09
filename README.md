# Recipe

A full-stack recipe web application where users can create, view, and manage recipes with features like image upload, comments, favorites, and authentication.

## Features

- **User Authentication**: Sign up, login, and logout using JWT tokens.
- **Recipe Management**: Create, edit, delete, and view recipes with ingredients and steps.
- **Image Upload**: Upload an image for each recipe.
- **Search and Sort**: Filter recipes by name or ingredients; sort by name or ingredient count.
- **Favorites**: Users can heart/unheart recipes to add/remove them from favorites.
- **Comments**: Leave comments with optional images on each recipe.
- **Responsive Design**: Works across desktop and mobile screens.

## Tech Stack

### Frontend
- React (with Vite)
- React Router
- Axios
- CSS (with optional Tailwind)
- Local Storage for auth tokens

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT for authentication
- Multer for image handling
- CORS & dotenv for security/configuration

---

## Project Structure

### Backend (Node/Express)
backend/
│
├── models/ # Mongoose models (User, Recipe, Comment)
├── routes/ # API endpoints for recipes, users, comments
├── uploads/ # Uploaded images (served statically)
├── middleware/ # JWT auth middleware
├── app.js # Express app configuration
├── .env # Secrets and Mongo URI
└── package.json # Dependencies and scripts


### Frontend (React)

frontend/
│
├── components/ # Reusable UI elements (Navbar, HeartButton, etc.)
├── pages/ # Page-level components (Home, Dashboard, RecipeDetail, etc.)
├── css/ # Modular or global CSS
├── api.js # Axios instance for API calls
├── App.jsx # Route definitions
├── main.jsx # ReactDOM rendering
└── package.json # Dependencies and scripts

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/recipe-camp.git
cd recipe-camp
 
 ### 1 Backend Setup

cd backend
npm install

Create a .env file in the backend directory:
MONGO_URI=mongodb://localhost:27017/recipeApp
JWT_SECRET=your_jwt_secret
npm run dev
This will launch the backend API at http://localhost:3001.

### 2 Frontend Setup

cd ../frontend
npm install
npm run dev

This will launch the frontend at http://localhost:5173
