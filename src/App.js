import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './views/pages/AuthContext';
 import './App.css'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const PublicPage = React.lazy(() => import('./views/PublicPage/App'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))


class App extends Component {
  render() {
    return (
      <AuthProvider>  
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
          <Route  path="/" name="PublicPage" element={<PublicPage />} />
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route  path="/register" name="Register Page" element={<Register />} />
        
            <Route  path="/404" name="Page 404" element={<Page404 />} />
            <Route  path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      </AuthProvider>
    )
  }
}

export default App

 
