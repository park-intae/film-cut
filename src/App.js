import './App.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom"
import Main from './router/Main';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
