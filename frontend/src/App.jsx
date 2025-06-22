import { createBrowserRouter ,RouterProvider} from "react-router-dom"
import Navbar from "./components/shared/Navbar.jsx"
import Login from "./components/auth/Login.jsx"
import Signup from "./components/auth/Signup.jsx"
import Home from "./components/Home.jsx"
import Jobs from "./components/Jobs.jsx"

const appRouter  = createBrowserRouter([
  {
   path: '/',
   element:<Home/>
  },
  {
   path: '/login',
   element: < Login/>
  },
  {
   path: '/signup',
   element:<Signup/>
  },
  {
   path: '/jobs',
   element:<Jobs/>
  },
])

function App() {
  return (
    <RouterProvider router = {appRouter}/>
    
  )
}

export default App