import { useState } from 'react'
import  {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import NotFound from './pages/NotFound';


function App(){
  return (
  <div>
  <BrowserRouter>
  <nav>
    <Link to='/login'>Login</Link> | <Link to='/signup'>Signup</Link>
  </nav>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/*' element={<NotFound/>}/>
  </Routes>
  </BrowserRouter>
  </div>
  )
}

export default App;