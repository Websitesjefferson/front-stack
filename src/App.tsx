
import { BrowserRouter } from "react-router-dom"
import { Router } from '../src/routes'
import Header from "./components/header"
import './App.css'


function App() {
  

  return (
    <>
    <BrowserRouter>
      <Header />
      <Router />
      </BrowserRouter>
    </>
  )
}

export default App
