import PropTypes from "prop-types";

export default function Profile({ user }) {
  if (!user) {
    return <h2>No user logged in</h2>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};
