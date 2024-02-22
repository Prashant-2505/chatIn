import './App.css'

import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './page/Home';
import ChatPage from './page/ChatPage';


function App() {


  return (
    <div className=' App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<ChatPage />} />

        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
