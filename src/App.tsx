import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { UIProvider } from './context/UIProvider';
import { Layout } from './layouts/Layout';
import { LoginPage } from './pages/public/LoginPage';

import Home from './pages/public/Home';

function App() {

  return (
    <BrowserRouter>
      <UIProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<h1 className='font-bold text-2xl'>Not Found</h1>} />
          </Route>
          <Route path='/signin' element={<LoginPage />}></Route>
        </Routes>
      </UIProvider>
    </BrowserRouter>
  )
}

export default App
