import './App.css';
import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
import Main from './router/Main';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />
    }
  ])

  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;

  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
