import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import ProfilePage from './Profile/ProfilePage';
import PostsPage from './Profile/PostsPage';
import FollowingPage from './Profile/FollowingPage';
import AllUsers from './Footer_Components/AllUsers';
import AllPosts from './Footer_Components/AllPosts';

function App() {
  return (
    <div className="App bg-red-100 h-full lg:w-[600px] flex flex-col justify-evenly items-center bg-gradient-to-r from-blue-500 via-yellow-200 via-purple-500 to-pink-500">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/followings' element={<FollowingPage />} />
          <Route path='/photos' element={<PostsPage />} />
          <Route path='/allUsers' element={<AllUsers/>}/>
          <Route path='/allPosts' element={<AllPosts/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
