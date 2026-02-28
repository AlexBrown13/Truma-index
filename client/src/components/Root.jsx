import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <Link to={"/"}>Home | </Link>
      <Link to={"accidents"}>page2 | </Link>
      <Link to={"red-alert/"}>red alert | </Link>
      <Link to={"evaluate/"}>PCL-5 | </Link>
      <Outlet />
    </div>
  );
}
