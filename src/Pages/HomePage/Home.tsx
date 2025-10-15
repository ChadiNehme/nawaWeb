import { AlertCircle } from "lucide-react"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { IconDownload, IconLogin, IconUserPlus } from "@tabler/icons-react"

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      {/* Logo / Title */}
      <h1 className="text-8xl  mb-16 text-center font-medodica tracking-widest">
        nawa
      </h1>

      {/* Buttons Container */}
      <div className="bg-gray-900/70 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-center gap-6 shadow-lg backdrop-blur-sm">
        <div className="flex flex-row items-center justify-center gap-6">
          <Button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg text-xl transition">
            <IconUserPlus size={22} /> Sign Up
          </Button>

          <Button className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-8 py-4 rounded-lg text-xl transition">
            <IconLogin size={22} /> Login
          </Button>
        </div>


        <Button className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-lg text-xl border border-gray-700 transition">
          <IconDownload size={22} /> Download nawa 1.0.5
        </Button>
      </div>

      {/* Alert */}
      <div className="mt-10">
        <Alert className="w-auto flex items-center gap-2 bg-gray-800 border border-gray-700 px-4 text-lg py-3 rounded-lg text-white">
          <AlertCircle className="w-5 h-5 text-yellow-400" />
          <AlertTitle>Latest version available</AlertTitle>
        </Alert>
      </div>
    </div>
  )
}

export default Home
