import { useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";

export default function Register({ updateList }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validationSchema = Yup.object({
    username: Yup.string()
      .max(60, "Username must be at most 60 characters")
      .matches(
        /^[a-zA-Z0-9_!@#$%^&*()+=\-[\]{}|;:',.<>?]*$/,
        "Username should only contain English letters, special characters (!@#$%^&*()), and numbers."
      )
      .required("Username is required"),
    password: Yup.string()
      .min(7, "Password must be at least 7 characters")
      .max(12, "Password cannot be more than 12 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    profilePicture: Yup.mixed()
      .required("Profile picture is required")
      .test(
        "fileFormat",
        "Unsupported file format. Only jpeg and jpg allowed.",
        (value) => value && /\.(jpe?g)$/i.test(value.name)
      ),
    firstName: Yup.string()
      .matches(
        /^[a-zA-Z\u0590-\u05EA]+$/,
        "Name should not contain special characters or numbers."
      )
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(
        /^[a-zA-Z\u0590-\u05EA]+$/,
        "Name should not contain special characters or numbers."
      )
      .required("Last Name is required"),
    email: Yup.string()
      .email("Must be a valid email address")
      .required("Email is required"),
    dateOfBirth: Yup.date()
      .required("Date of Birth is required")
      .test(
        "age-limit",
        "You must be at least 18 years old and not older than 120",
        function (value) {
          if (!value) return false;
          const today = new Date();
          const age = today.getFullYear() - value.getFullYear();
          const isBeforeMinAge = age < 18;
          const isAfterMaxAge = age > 120;
          return !(isBeforeMinAge || isAfterMaxAge);
        }
      ),
    city: Yup.string()
      .required("City is required")
      .matches(
        /^[\u05D0-\u05EA\s]+$/,
        "City must contain only Hebrew characters"
      ),
    street: Yup.string().required("Street is required"),
    houseNumber: Yup.number()
      .required("House Number is required")
      .min(0, "House Number must be a non-negative number"),
  });

  const signUp = async (event) => {
    event.preventDefault();

    const user = {
      username,
      password,
      passwordConfirm,
      profilePicture,
      firstName,
      lastName,
      email,
      dateOfBirth,
      city,
      street,
      houseNumber,
    };

    try {
      await validationSchema.validate(user, { abortEarly: false });

      updateList(user);

      setUsername("");
      setPassword("");
      setPasswordConfirm("");
      setProfilePicture("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setDateOfBirth("");
      setCity("");
      setStreet("");
      setHouseNumber("");
      setError("");
      setSuccess("ההרשמה בוצעה בהצלחה, שלום " + user.firstName + "!");
    } catch (err) {
      setSuccess("");

      setError(err.errors.join(", "));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-10 col-sm-10">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">חדש? הירשם</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={signUp}>
                <div className="form-group mb-3">
                  <label htmlFor="username">שם משתמש</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="הכנס שם משתמש באנגלית"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">סיסמה</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="הכנס סיסמה חזקה בת 7-12 תווים"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="passwordConfirm">אישור סיסמה</label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordConfirm"
                    placeholder="הכנס שוב את הסיסמה"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="profilePicture">תמונת פרופיל</label>
                  <input
                    type="file"
                    className="form-control"
                    id="profilePicture"
                    accept=".jpg,.jpeg"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="firstName">שם פרטי</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="הכנס שם פרטי"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="lastName">שם משפחה</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="הכנס שם משפחה"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">דואר אלקטרוני</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="הכנס אימייל בצורה תקינה"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="dateOfBirth">תאריך לידה</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="city">עיר</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="הכנס את עיר מגוריך"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    list="cityOptions"
                  />
                  <datalist id="cityOptions">
                    <option value="באר שבע" />
                    <option value="בת ים" />
                    <option value="חדרה" />
                    <option value="חולון" />
                    <option value="חיפה" />
                    <option value="טבריה" />
                    <option value="ירושלים" />
                    <option value="כפר סבא" />
                    <option value="נתניה" />
                    <option value="עפולה" />
                    <option value="פתח תקווה" />
                    <option value="צפת" />
                    <option value="ראשון לציון" />
                    <option value="רחובות" />
                    <option value="רמת גן" />
                    <option value="תל אביב" />
                  </datalist>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="street">רחוב</label>
                  <input
                    type="text"
                    className="form-control"
                    id="street"
                    placeholder="הכנס את הרחוב שלך"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="houseNumber">מספר</label>
                  <input
                    type="number"
                    className="form-control"
                    id="houseNumber"
                    placeholder="הכנס את מספר הבית שלך"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  הרשמה
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  updateList: PropTypes.func.isRequired,
};
