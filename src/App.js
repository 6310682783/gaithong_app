import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./container/Reminder/Home";
import Layout from "./components/Layout/Layout";
import Reminder from "./container/Reminder/Reminder";
import AddReminder from "./container/Reminder/AddReminder";
import UpdateReminder from "./container/Reminder/UpdateReminder";

function App() {
  useEffect(() => {}, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Home" element={<Home />} />
            <Route path="/Reminder" element={<Reminder />} />
            <Route path="/Reminder/AddReminder" element={<AddReminder />} />
            <Route path="/Reminder/UpdateReminder/:id" element={<UpdateReminder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
