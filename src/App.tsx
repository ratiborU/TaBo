import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layouts/Layout"
import DeskLayout from "./components/Layouts/DeskLayout"
import LoginLayout from "./components/Layouts/LoginLayout"

import HomePage from "./pages/HomePage"
import DeskPage from "./pages/DeskPage"
import AboutPage from "./pages/AboutPage"
import LoginPage from "./pages/LoginPage"
import SignInPage from "./pages/SignInPage"

import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="about" element={<AboutPage/>}/>
        </Route>
        <Route path="/desk/" element={<DeskLayout/>}>
          <Route path="desk/:id" element={<DeskPage/>}/>
        </Route>
        <Route path="/login/" element={<LoginLayout/>}>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="signin" element={<SignInPage/>}/>
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
