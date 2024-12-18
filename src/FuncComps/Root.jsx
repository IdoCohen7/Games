import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div>
        <Link style={{ margin: 10 }} to="/">
          Home
        </Link>{" "}
        |
        <Link style={{ margin: 10 }} to="/">
          About
        </Link>{" "}
        |
        <Link style={{ margin: 10 }} to="/">
          Menu
        </Link>{" "}
        | <br />
        START OUTLET
        <Outlet />
        END OUTLET
      </div>
    </>
  );
}
