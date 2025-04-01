import { Children, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import HomePage from './pages/Home';
import Header  from './components/Header';
import EvaluatingPage from './pages/EvaluatingPage';
import TopicsPage from './pages/TopicsPage';
import WordsPage from './pages/WordsPage';
import SyAndAnoPage from './pages/SyAndAnoPage';
import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  const Layout = ({children})=>{
    return(
      <>
        <div className='content w-screen xl:px-25 lg:px-10 md:px-5 sm:px-1 lg:py-4 sm:py-1'>
            <Header/>
            <div className='w-full'>
              {children}
            </div>
        </div>
      </>    
    )
  }
  return (
    <>
    <Router>
        <Routes>
            <Route path='/' element={
              <Layout>
                  <EvaluatingPage/>
              </Layout>
            }>
            </Route>
            <Route path='/topics' element={
              <Layout>
                  <TopicsPage/>
              </Layout>
            }>
            </Route>
            <Route path='/words' element={
              <Layout>
                  <WordsPage/>
              </Layout>
            }>
            </Route>
            <Route path='/syno-and-ano' element={
              <Layout>
                  <SyAndAnoPage/>
              </Layout>
            }>
            </Route>
            
        </Routes>
    </Router>
    </>
  )
}

export default App
