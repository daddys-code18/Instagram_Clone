import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import { Home } from 'lucide-react'

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      }
    ]

  }, {
    path: '/login',
    element: <Login />
  }, {
    path: "/signup",
    element: <Signup />
  }
])
function App() {

  return (
    <>
      <RouterProvider router={BrowserRouter} />
    </>
  )
}

export default App
