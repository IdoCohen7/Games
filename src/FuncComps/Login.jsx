import { useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";

const Login = ({ users }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Define validation schema with Yup library
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const loginUser = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate({ username, password });

      // Check if the user exists in the users list
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        // Successful login
        setError("");
        alert("ברוך הבא לאתר שלנו");
        // Perform any additional actions after successful login
      } else {
        // Invalid credentials
        setError("שם משתמש או סיסמה לא נכונים");
      }

      // Reset form fields after successful validation and submission
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-10 col-sm-10">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">כניסה לאתר</h3>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <form onSubmit={loginUser}>
                <div className="form-group mb-3">
                  <label htmlFor="usernameL">שם משתמש</label>
                  <input
                    type="text"
                    className="form-control"
                    id="usernameL"
                    placeholder="הכנס שם משתמש באנגלית"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="passwordL">סיסמה</label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordL"
                    placeholder="הכנס את הסיסמה שלך"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  התחברות
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  users: PropTypes.array.isRequired,
};

export default Login;
