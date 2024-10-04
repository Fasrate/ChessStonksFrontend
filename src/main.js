import  React , { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './header/header';
import Home from './home/home';
import Signup from './authenticate/register';
import Login from './authenticate/login';
import Profile from './profile/profile';
import Explore from './explore/explore';
import Leaderboard from './leaderboard/leaderboard';
import StocksInfo from './stocksinfo/stocksinfo'; 
import PrivateRoute from './privateRoute';

function Main() { 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is already logged in (using localStorage or session)
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // You can customize how you handle tokens
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    // Save token to localStorage (or use a context)
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear token from localStorage and update state
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <>
        <Header isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
        <Routes>
            <Route path="/" element={<Home />} />  
            <Route path="/signup" element={<Signup />} />   
            <Route path="/Login" element={<Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
            {/* <Route path="/profile/:username" element={<Profile />} />  */}

            <Route path="/profile/:username"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Profile />
              </PrivateRoute>
            } />

            <Route path="/explore/:username" 
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Explore />
              </PrivateRoute>
            } />
            
            <Route path="/leaderboard/:username" element={<Leaderboard />} />
            <Route path="/stocksinfo/:username/:stockname" element={<StocksInfo />} />
            
        </Routes>
      </>
    </Router>
  );
}

export default Main;
