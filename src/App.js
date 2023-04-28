import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
