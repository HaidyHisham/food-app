import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './modules/Shared/components/AuthLayout/AuthLayout'
import NotFound from './modules/Shared/components/NotFound/NotFound'
import Login from './modules/Authentication/components/Login/Login'
import Register from './modules/Authentication/components/Register/Register'
import ForgetPass from './modules/Authentication/components/ForgetPass/ForgetPass'
import ChangePass from './modules/Authentication/components/ChangePass/ChangePass'
import ResetPass from './modules/Authentication/components/ResetPass/ResetPass'
import MasterLayout from './modules/Shared/components/MasterLayout/MasterLayout'
import ProtectedRoute from './modules/Shared/components/ProtectedRoute/ProtectedRoute'
import Dashboard from './modules/Dashboard/components/Dashboard/Dashboard'
import CategoriesList from './modules/Categories/components/CategoriesList/CategoriesList'
import CategoryData from './modules/Categories/components/CategoryData/CategoryData'
import AdminProtectedRoute from './modules/Shared/components/AdminProtectedRoute/AdminProtectedRoute'
import UserProtectedRoute from './modules/Shared/components/UserProtectedRoute/UserProtectedRoute'
import RecipeData from './modules/Recipes/components/RecipeData/RecipeData'
import RecipesList from './modules/Recipes/components/RecipesList/RecipesList'
import UsersList from './modules/Users/components/UsersList/UsersList'
import FavList from './modules/Favourites/components/FavList/FavList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import VerifyAccount from './modules/Authentication/components/VerifyAccount/VerifyAccount'
import AuthContextProvider from './context/AuthContext/AuthContext'


const router = createBrowserRouter([
  {
    path: "",
    element: <AuthLayout />, errorElement: <NotFound />,
    children: [
      { path: 'login', element: <Login /> },
      { index: true, element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgetPass /> },
      { path: 'reset-password', element: <ResetPass /> },
      { path: 'verify-account', element: <VerifyAccount /> },
    ]
  },

  {
    path: '', element: <MasterLayout />,
    errorElement: <NotFound />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'categories-list', element: <CategoriesList /> },
      { path: 'recipes-list', element: <RecipesList /> },
      { path: 'recipe/:recipeId', element:  <RecipeData /> },
      { path: 'recipe/new-recipe', element: <RecipeData /> },
      { path: 'recipes-data', element: <RecipeData /> },
      { path: 'users-list', element: <UsersList /> },
      { path: 'change-password', element: <ChangePass/> },
      { path: 'user-favorites', element: <UserProtectedRoute><FavList /></UserProtectedRoute> },

    ]
  }

])

function App() {
  return (
    <>
      <ToastContainer />
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  )
}

export default App
