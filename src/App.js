import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Profile from './screens/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
