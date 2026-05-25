import './App.css'
// Extensions (.jsx) exact-ah path-oda sethu potachu:
import FooterComponent from './component/FooterComponent.jsx'
import HeaderComponent from './component/HeaderComponent.jsx'
import ListEmployeeComponent from './component/ListEmployeeComponent.jsx'
import EmployeeComponent from './component/EmployeeComponent.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          
          <Route path='/' element={<ListEmployeeComponent />} />

        
          <Route path='/employees' element={<ListEmployeeComponent />} />

      
          <Route path='/add-employee' element={<EmployeeComponent />} />

          
          <Route path='/update-employee/:id' element={<EmployeeComponent />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App