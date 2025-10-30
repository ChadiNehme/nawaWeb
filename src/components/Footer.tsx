import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
export default function Footer() {
    const navigate = useNavigate()
    return (
        <footer className="bg-black text-white py-6 border-t border-gray-800">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
                {/* Left side: Logo and name */}
                <div  onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
                    <img src="/nawa-website-home-page-logo.png" alt="nawa Logo" className="h-8 w-auto" />
                    <span className="font-[Medodica] text-lg  text-xl">nawa</span>
                </div>

                {/* Center: Links */}
                <nav className="flex gap-6">
                    <Link to="." className="hover:underline text-xl">Home</Link>
                    <Link to="about" className="hover:underline text-xl">About</Link>
                    <Link to="privacy" className="hover:underline text-xl">Privacy</Link>
                </nav>

                {/* Right side: Copyright */}
                <div className="text-lg text-gray-400 ">
                    &copy; {new Date().getFullYear()} nawa. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
