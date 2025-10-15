import { Button } from "@/components/ui/button"
import { Menu, Home, User } from "lucide-react"


function App() {
  return (
    <>
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      <div className="flex gap-4">
      <Menu className="h-6 w-6" />
      <Home className="h-6 w-6 text-blue-500" />
      <User className="h-6 w-6 text-gray-600" />
    </div>
    </div>
     </>
  )
}

export default App