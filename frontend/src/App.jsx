import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import Home from './components/Home'
import EditProfile from './components/EditProfile'
import ChatPage from './components/ChatPage'

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/account/edit",
        element: <EditProfile />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
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
