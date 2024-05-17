import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Login from './routes/Login.tsx'
import ErrorPage from './routes/Error.tsx'
import SignUp from './routes/SignUp.tsx'
import Profile from './routes/Profile.tsx'
/* import { api } from './services/api' */
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute  = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (!token) {    
    return <Login />;
  }
  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/errorpage",
    element: <ErrorPage />,
  },
  {
    path: "/profile",
    element: (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
