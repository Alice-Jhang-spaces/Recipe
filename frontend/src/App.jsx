// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRecipe from './pages/CreateRecipe';
import Dashboard from './pages/Dashboard';
import EditRecipe from './pages/EditRecipe';
import Favorite from './pages/Favorite';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes/create" element={<CreateRecipe />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
              path="/dashboard"
              element={
              localStorage.getItem('token') ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route path="/recipes/edit/:id" element={<EditRecipe />} />
        <Route path="/favorites" element={<Favorite />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
