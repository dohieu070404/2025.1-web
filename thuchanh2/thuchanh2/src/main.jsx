import React from "react"
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App.jsx"
import HomePage from './pages/homepage.jsx';
import ErrorPage from './component/designs/errorpage.jsx';
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import Intropage from "./pages/Intropage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import SpacePage from "./pages/SpacePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AdminPage from "./pages/Admin/AdminPage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "Intropage", element: <Intropage /> },
      { path: "menu", element: <MenuPage /> },
      { path: "space", element: <SpacePage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/Admin",
    element: <AdminPage/>,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
