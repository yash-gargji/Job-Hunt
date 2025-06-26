import { createBrowserRouter ,RouterProvider} from "react-router-dom"
import Navbar from "./components/shared/Navbar.jsx"
import Login from "./components/auth/Login.jsx"
import Signup from "./components/auth/Signup.jsx"
import Home from "./components/Home.jsx"
import Jobs from "./components/Jobs.jsx"
import Browse from "./components/Browse.jsx"
import Profile from "./components/Profile.jsx"
import JobDescription from "./components/JobDescription.jsx"
import Companies from "./components/admin/Companies.jsx"
import CompanyCreate from "./components/admin/CompanyCreate.jsx"
import CompanySetup from "./components/admin/CompanySetup.jsx"
import AdminJobs from "./components/admin/AdminJobs.jsx"
import PostJob from "./components/admin/PostJob.jsx"
import Applicants from "./components/admin/Applicants.jsx"
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx"

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
  {
   path: '/browse',
   element:<Browse/>
  },
  {
   path: '/profile',
   element:<Profile/>
  },
  {
   path: '/description/:id',
   element:<JobDescription/>
  },
  // admin routes start from here 
   {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },

])

function App() {
  return (
    <RouterProvider router = {appRouter}/>
    
  )
}

export default App