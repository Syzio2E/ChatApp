import Signup from "./components/Layouts/Signup";
import { Route,Routes } from "react-router-dom";
import Login from './components/Layouts/Login'
import Home from "./components/Layouts/Home";

function App() {
  return (
    <div className="App">
      Expense Tracker App
      <Routes>
        <Route path='/' Component={Signup}/>
        <Route path='/login' Component={Login}/>
        <Route path="/home" Component={Home}/>
      </Routes>
    </div>
  );
}

export default App;
