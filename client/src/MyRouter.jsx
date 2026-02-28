import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import AccidentPage from "./components/section-expenses/AccidentPage";
import Paper from "./components/Paper";
import RedAlertMap from "./pages/RedAlertMap";
import PclAssessment from "./pages/PclAssessment";

export default function MyRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/accidents",
          element: <AccidentPage />,
        },
        {
          path: "/red-alert",
          element: <RedAlertMap />,
        },
        {
          path: "/evaluate",
          element: <PclAssessment />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
