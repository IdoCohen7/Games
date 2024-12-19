import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";

export default function Authentication() {
  const [list, setList] = useState(() => {
    const savedList = localStorage.getItem("users");
    return savedList ? JSON.parse(savedList) : [];
  });

  const [loggedInUser, setLoggedInUser] = useState(null);

  const updateList = (newUser) => {
    const updatedList = [...list, newUser];
    setList(updatedList);
    localStorage.setItem("users", JSON.stringify(updatedList));
  };

  return (
    <>
      <h2>My Favorite Game</h2>
      <div className="flex-container">
        <div className="flex-item">
          <Register updateList={updateList} />
        </div>
        <div className="flex-item">
          <Login users={list} onLogin={setLoggedInUser} />
        </div>

        <div className="flex-item">
          <Profile user={loggedInUser} />
        </div>
      </div>
    </>
  );
}
