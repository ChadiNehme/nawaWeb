import { Button } from "@/components/ui/button"
import { IconRocket } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-4 relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gray-800/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      
      {/* Logo / Title */}
      <h1 className="text-8xl mb-12 text-center font-medodica tracking-widest relative z-10 animate-fade-in">
        nawa
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-xl text-center max-w-2xl mb-12 relative z-10 leading-relaxed">
        Communication-first management platform that turns conversations into action
      </p>

      {/* Get Started Button Container */}
      <div className="relative z-10 mb-8">
        <Button
          onClick={() => navigate("/get-started")}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 hover:from-gray-600 hover:via-gray-500 hover:to-gray-400 text-white px-14 py-7 rounded-2xl text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gray-500/30"
        >
          <IconRocket size={30} className="transition-transform group-hover:rotate-12" /> 
          Get Started with nawa
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Button>
      </div>

      {/* Feature hints */}
      <div className="flex flex-wrap gap-6 justify-center mt-8 relative z-10 text-gray-500 text-sm">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
          Task Management
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
          Team Communication
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
          Workflow Automation
        </span>
      </div>
    </div>
  )
}

export default Home
