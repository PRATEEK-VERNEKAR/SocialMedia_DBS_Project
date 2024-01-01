import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';

function App() {
  return (
    <div className="App bg-red-100 h-full flex flex-col justify-evenly items-center bg-gradient-to-r from-blue-500 via-yellow-200 via-purple-500 to-pink-500">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<HomePage/>}></Route>
          <Route exact path='/register' element={<RegisterPage/>}></Route>
          <Route exact path='/login' element={<LoginPage/>}></Route>
          <Route exact path='/profile' element={<ProfilePage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
