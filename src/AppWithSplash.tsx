import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./Pages/HomePage/Home"
import About from "./Pages/AboutPage/About"
import Privacy from "./Pages/PrivacyPage/Privacy"
import SplashScreen from "./components/SplashScreen"
import ScrollToTop from "./components/ScrollToTop"

export default function AppWithSplash() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <SplashScreen />

  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
