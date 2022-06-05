import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './components/view/Auth'
import AuthContextProvider from './contexts/AuthContext'
import PostContextProvider from './contexts/PostContext'
import Dashboard from './components/view/Dashboard'
import ProtectedRoute from './components/routing/ProtectedRoute'
import About from './components/view/About'

function App() {

  return (
    <AuthContextProvider>
      <PostContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />      
            <Route path='/login' element={<Auth authRoute='login' />} />
            <Route path='/register' element={<Auth authRoute='register' />} />
            <Route path='/dashboard' element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route path='/about' element={<ProtectedRoute />}>
              <Route path='/about' element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PostContextProvider>    
    </AuthContextProvider>
  )
}

export default App;
