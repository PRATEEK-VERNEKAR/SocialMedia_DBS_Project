import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<HomePage/>}></Route>
          <Route exact path='/register' element={<RegisterPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
