import './App.css';
import ListingsPage from './pages/Listing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailsPage from './pages/Details';


function App() {
  return (
    <div>
       <Routes>
         <Route path='/' element={<ListingsPage/>} />
         <Route exact path='/details/:name' element={<DetailsPage/>} />
       </Routes>
    </div>
  )
}

export default App
