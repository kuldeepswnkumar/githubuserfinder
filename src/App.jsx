import { Routes, Route } from "react-router";
import "./App.css";
import Logo from "./component/Logo";
import User from "./Routes/User";
import Userinfo from "./Routes/Userinfo";

function App() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container text-gray-200 py-3">
        <Logo />
        <Routes>
          <Route path="/" element={<User />}></Route>
          <Route path="/:login" element={<Userinfo />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
