import { useEffect, useState } from "react";
import axios from "axios";
import { AlertCircle } from "lucide-react"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { IconDownload, IconLogin, IconUserPlus } from "@tabler/icons-react"
// import { useNavigate } from "react-router-dom"

const Home = () => {
  // const navigate = useNavigate()
  const [version, setVersion] = useState<string>("Loading...");

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        // Fetch the downloads page content
        const res = await axios.get("https://nawa.website/downloads/");

        //'nawa 1.0.5.msi'
        const html = res.data;

        // Use regex to find nawa 1.0.5.msi
        const match = html.match(/nawa\s[\d.]+\.msi/);

        if (match) {
          // Remove ".msi" from the name
          const versionName = match[0].replace(".msi", "");
          setVersion(versionName);
        } else {
          setVersion("Version not found");
        }
      } catch (err) {
        console.error(err);
        setVersion("Error fetching version");
      }
    };

    fetchVersion();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      {/* Logo / Title */}
      <h1 className="text-8xl mb-16 text-center font-medodica tracking-widest">
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

        <Button
          onClick={() => {
            const url = `https://nawa.website/downloads/${version}.msi`;
            const link = document.createElement("a");
            link.href = url;
            link.download = `${version}.msi`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-lg text-xl border border-gray-700 transition cursor-pointer"
        >
          <IconDownload size={22} /> Download {version}
        </Button>
      </div>

      {/* New Play Button */}

      {/* <Button
          onClick={() => navigate("/space")}
          className="absolute top-25 right-10 flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-400 hover:from-gray-500 hover:to-gray-300 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition z-50"
        >
          i need ti import IconRocket
          <IconRocket size={20} /> Play 🚀
        </Button> */}


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
