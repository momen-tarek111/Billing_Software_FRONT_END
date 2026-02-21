
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Menubar from './components/Menubar/Menubar'
import Dashboard from './pages/Dashboard/Dashboard'
import ManageCategory from './pages/ManageCategory/ManageCategory'
import ManageUsers from './pages/ManageUsers/ManageUsers'
import ManageItems from './pages/ManageItems/ManageItems'
import Explore from './pages/Explore/Explore'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login/Login'
import OrderHistory from './pages/OrderHistory/OrderHistory'
import { useContext, useEffect } from 'react'
import { AppContext } from './context/AppContext'
import NotFound from './pages/NotFound/NotFound'
const LoginRoute=({element,auth})=>{
    if(auth.token){
      return <Navigate to="/dashboard" replace/>
    }
    return element;
  }

  const ProtectedRoute=({element,allowedRoles,auth})=>{
    console.log("gdfgdfg")
    if(!auth.token){
      return < Navigate to="/login" replace/>
    }
    if(allowedRoles&&!allowedRoles.includes(auth.role)){
      return <Navigate to="/dashboard" replace />
    }
    return element;
  }
  const SafeRoute=({element,auth})=>{

    if(!auth||!auth.token){
      return < Navigate to="/login" replace/>
    }
    return element
  }
const App = () => {
  const location=useLocation();
  const {auth}=useContext(AppContext);
  useEffect(()=>{
    console.log()
  },)
  return (
    <div>
      {location.pathname!=="/login"&&<Menubar/>}
      <Toaster/>
      <Routes>
        <Route path='/dashboard' element={<SafeRoute element={<Dashboard/>} auth={auth}/>}/>
        <Route path='/explore' element={<SafeRoute element={<Explore/>} auth={auth}/>}/>

        {/* Admin only routes */}
        
        <Route path='/category' element={<ProtectedRoute element={<ManageCategory/>} allowedRoles={['ROLE_ADMIN']} auth={auth}/>}/>
        <Route path='/items' element={<ProtectedRoute element={<ManageItems/>} allowedRoles={['ROLE_ADMIN']} auth={auth}/>}/>
        <Route path='/users' element={<ProtectedRoute element={<ManageUsers/>} allowedRoles={['ROLE_ADMIN']} auth={auth}/>}/>
        <Route path='/login' element={<LoginRoute element={<Login/>} auth={auth}/>}/>

        <Route path='/orders' element={<SafeRoute element={<OrderHistory/>} auth={auth}/>}/>
        <Route path='/' element={<SafeRoute element={<Dashboard/>} auth={auth}/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App