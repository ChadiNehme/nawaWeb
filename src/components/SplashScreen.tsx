import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export default function SplashScreen() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2000) // 2 seconds
    return () => clearTimeout(timer)
  }, [])

  if (!showContent) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <img src="/nawa-logo.png" alt="Nawa Logo" className="w-32 mb-6 animate-pulse" />
        <p className="text-5xl font-semibold  mb-6 tracking-wide">nawa</p>
        <Loader2 className="animate-spin w-8 h-8 text-white" />
      </div>
    )
  }

  return null // When splash ends, return nothing → your main app will show
}
