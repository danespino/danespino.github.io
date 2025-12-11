import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { UIProvider } from './context/UIProvider';
import { AuthProvider } from './context/AuthProvider';
import { Layout } from './layouts/Layout';
import { LoginPage } from './pages/public/LoginPage';

import Home from './pages/public/Home';
import Profile from './pages/public/Profile';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <UIProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='*' element={<h1 className='font-bold text-2xl'>Not Found</h1>} />
            </Route>
            <Route path='/signin' element={<LoginPage />}></Route>
          </Routes>
        </UIProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
