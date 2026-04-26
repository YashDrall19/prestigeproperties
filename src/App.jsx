import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Overview from './pages/Overview'
import Services from './pages/Services'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import Vastu from './pages/Vastu'
import About from './pages/About'
import Contact from './pages/Contact'
import { FaWhatsapp } from 'react-icons/fa'
import LoanCalculator from './pages/LoanCalculator'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const scrollPositions = new Map()
  const whatsappUrl = `https://wa.me/${"919911331082"}?text=${encodeURIComponent("Hi, I’m interested in one of the properties listed on your website. Can you please assist?")}`;


  useEffect(() => {
    // Save current scroll position before navigating
    const handleScroll = () => {
      const contentDiv = document.querySelector('.content')
      if (contentDiv) {
        scrollPositions.set(location.pathname, contentDiv.scrollTop)
      }
    }

    const contentDiv = document.querySelector('.content')
    if (contentDiv) {
      contentDiv.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (contentDiv) {
        contentDiv.removeEventListener('scroll', handleScroll)
      }
    }
  }, [location.pathname])

  useEffect(() => {
    // Scroll to top when route changes, or restore saved position if going back
    const contentDiv = document.querySelector('.content')
    if (contentDiv) {
      const savedPosition = scrollPositions.get(location.pathname)
      if (savedPosition !== undefined) {
        contentDiv.scrollTop = savedPosition
      } else {
        contentDiv.scrollTop = 0
      }
    }
  }, [location.pathname])

  // useEffect(() => {
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //     // alert("Right-click disabled!");
  //   };

  //   document.addEventListener("contextmenu", handleContextMenu);

  //   // Clean up event listener
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);

  return (
    <div className="app-root">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header onMenu={() => setSidebarOpen((s) => !s)} />
      
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/services" element={<Services />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/vastu" element={<Vastu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
        </Routes>
      </main>

      <div style={{marginTop: "60px"}}>
        <Footer />
      </div>
      <div 
        className="whatsapp-button"
        onClick={() => window.open(whatsappUrl, "_blank")}
      >
        <FaWhatsapp color='green' className='whatsapp-icon' />
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login OUTSIDE layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* All other routes inside layout */}
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
