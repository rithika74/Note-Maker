import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Components/style.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import Notes from './Components/Notes';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from './Components/Edit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Notes /> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Notes/>}>
          <Route path='edit' element={<Edit/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
