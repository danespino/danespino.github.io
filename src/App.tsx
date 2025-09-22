import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/public/Home'
import { UIProvider } from './context/UIProvider';

function App() {

  return (
    <BrowserRouter>
      <UIProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </UIProvider>
    </BrowserRouter>
  )
}

export default App
