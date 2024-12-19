import PropTypes from "prop-types";

const Profile = ({ user }) => {
  return (
    <div className="profile-container">
      {user ? (
        <>
          <h3>Profile</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Display other user details */}
        </>
      ) : (
        <p>לא מחובר</p>
      )}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
};

export default Profile;
