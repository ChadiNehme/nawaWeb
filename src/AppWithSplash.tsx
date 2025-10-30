import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./Pages/HomePage/Home"
import GetStarted from "./Pages/GetStartedPage/GetStarted"
import About from "./Pages/AboutPage/About"
import Privacy from "./Pages/PrivacyPage/Privacy"
import SplashScreen from "./components/SplashScreen"
import ScrollToTop from "./components/ScrollToTop"
import SpaceShooter from "./components/SpaceShooter"

export default function AppWithSplash() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <SplashScreen />

  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="get-started" element={<GetStarted />} />
          <Route path="space" element={<SpaceShooter />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
