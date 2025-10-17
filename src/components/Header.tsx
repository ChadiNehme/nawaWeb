import { Link } from "react-router-dom"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VisuallyHidden } from "./ui/visually-hidden"
import { useNavigate } from "react-router-dom"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"

const Header = () => {
    const navigate = useNavigate()
    return (
        <nav className="flex items-center justify-between p-4 border-b border-gray-800 bg-black text-white">
            {/* Left side: logo */}
            <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
                <img src="/nawa-website-home-page-logo.png" alt="Nawa Logo" className="h-10 w-auto" />
                {/* <span className="text-xl font-bold tracking-wide">nawa</span> */}
            </div>

            {/* Desktop links */}
            <div className="hidden md:flex gap-8">
                <Link to="/" className="hover:text-gray-400 transition-colors text-xl">
                    Home
                </Link>
                <Link to="/about" className="hover:text-gray-400 transition-colors text-xl">
                    About
                </Link>
                <Link to="/privacy" className="hover:text-gray-400 transition-colors text-xl">
                    Privacy
                </Link>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent
                        side="right"
                        className="p-6 bg-black text-white border-l border-gray-800"
                    >
                        <SheetHeader>
                            <SheetTitle>
                                <div className="flex items-center gap-2">
                                    <img src="/nawa-website-home-page-logo.png" alt="Nawa Logo" className="h-8 w-auto" />
                                    {/* <span className="text-xl font-bold text-white">nawa</span> */}
                                </div>
                            </SheetTitle>
                            <VisuallyHidden>
                                <SheetDescription className="text-gray-400">
                                    Select a page to navigate
                                </SheetDescription>
                            </VisuallyHidden>
                        </SheetHeader>

                        <nav className="flex flex-col space-y-6 text-lg mt-6">
                            <SheetClose asChild>
                                <Link to="/" className="hover:text-gray-400 transition-colors text-xl ">
                                    Home
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link to="/about" className="hover:text-gray-400 transition-colors text-xl">
                                    About
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link to="/privacy" className="hover:text-gray-400 transition-colors text-xl">
                                    Privacy
                                </Link>
                            </SheetClose>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}

export default Header
