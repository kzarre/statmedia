import { useState } from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Post from './pages/Post';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import {UserData} from './context/User';
import { FeedData } from './context/Feed';
import Profile from './pages/Profile';
import Logout from './components/logout';

function App(){
  return (
  <div>
  <BrowserRouter>
  <UserData>
  <FeedData>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/profile' element={<Profile/>} />
    <Route path='/logout' element={<Logout/>} />
    <Route path="/home" element={<Navigate to="/"/>} />
    <Route path='/*' element={<NotFound/>}/>
    <Route path='/post' element={<ProtectedRoute><Post/></ProtectedRoute>}/>
  </Routes>
  </FeedData>
  </UserData>
  </BrowserRouter>
  </div>
  )
}

export default App;