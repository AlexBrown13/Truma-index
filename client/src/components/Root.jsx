import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <Link to={"/"}>Home | </Link>
      <Link to={"accidents"}>page2 | </Link>
      <Link to={"page3/"}>page3 | </Link>
      <Outlet />
    </div>
  );
}
