import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

export default function Authentication() {
  const [list, setList] = useState([]);

  const updateList = (newUser) => {
    const updatedList = [...list, newUser];
    setList(updatedList);
  };

  return (
    <>
      <h1>כניסה והרשמה למערכת</h1>
      <div className="flex-container">
        <div className="flex-item">
          <Register updateList={updateList} />
        </div>
        <div className="flex-item">
          <Login users={list} />
        </div>
      </div>
    </>
  );
}
