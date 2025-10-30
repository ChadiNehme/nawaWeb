import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconDownload, IconMessageCircle, IconBrandWindows, IconLoader2 } from "@tabler/icons-react";

const GetStarted = () => {
  const [version, setVersion] = useState<string>("Loading...");
  const [isDownloadingApp, setIsDownloadingApp] = useState(false);
  const [isDownloadingMessenger, setIsDownloadingMessenger] = useState(false);

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        // Fetch the downloads page content
        const res = await axios.get("https://nawa.website/downloads/");
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

  const handleDownloadApp = () => {
    setIsDownloadingApp(true);
    
    setTimeout(() => {
      const url = `https://nawa.website/downloads/${version}.msi`;
      const link = document.createElement("a");
      link.href = url;
      link.download = `${version}.msi`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloadingApp(false);
    }, 1000);
  };

  const handleDownloadMessenger = () => {
    setIsDownloadingMessenger(true);
    
    setTimeout(() => {
      // Placeholder for messenger download - details to be provided later
      console.log("Messenger download - details to be implemented");
      setIsDownloadingMessenger(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-4 py-12 relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gray-800/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl mb-4 font-medodica tracking-widest">
          Choose Your Experience
        </h1>
        <p className="text-gray-400 text-xl">
          Select the nawa product that fits your needs
        </p>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Nawa App Card */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 p-8 rounded-2xl shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Icon */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-full shadow-lg">
              <IconBrandWindows size={64} className="text-white" />
            </div>

            {/* Title */}
            <h2 className="text-4xl font-bold text-white">
              nawa app
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed">
              The complete nawa desktop application for Windows. Experience the full power of nawa with all features included.
            </p>

            {/* Features */}
            <ul className="text-gray-400 space-y-2 text-left w-full">
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span> Full desktop experience
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span> Latest features and updates
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span> Optimized performance
              </li>
            </ul>

            {/* Version Badge */}
            <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
              <span className="text-sm text-gray-400">Version: </span>
              <span className="text-sm text-blue-400 font-semibold">{version}</span>
            </div>

            {/* Download Button */}
            <Button
              onClick={handleDownloadApp}
              disabled={isDownloadingApp}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 rounded-xl text-xl font-semibold transition transform hover:scale-105 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isDownloadingApp ? (
                <>
                  <IconLoader2 size={24} className="animate-spin" /> Downloading...
                </>
              ) : (
                <>
                  <IconDownload size={24} /> Download nawa app
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Nawa Messenger Card */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700 hover:border-purple-500 transition-all duration-300 p-8 rounded-2xl shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-2">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Icon */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-full shadow-lg">
              <IconMessageCircle size={64} className="text-white" />
            </div>

            {/* Title */}
            <h2 className="text-4xl font-bold text-white">
              nawa messenger
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed">
              Stay connected with nawa messenger. A lightweight messaging experience designed for seamless communication.
            </p>

            {/* Features */}
            <ul className="text-gray-400 space-y-2 text-left w-full">
              <li className="flex items-center gap-2">
                <span className="text-purple-500">•</span> Fast and lightweight
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-500">•</span> Instant messaging
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-500">•</span> Secure communication
              </li>
            </ul>

            {/* Coming Soon Badge */}
            <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
              <span className="text-sm text-purple-400 font-semibold">Coming Soon</span>
            </div>

            {/* Download Button */}
            <Button
              onClick={handleDownloadMessenger}
              disabled={isDownloadingMessenger}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-6 rounded-xl text-xl font-semibold transition transform hover:scale-105 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isDownloadingMessenger ? (
                <>
                  <IconLoader2 size={24} className="animate-spin" /> Downloading...
                </>
              ) : (
                <>
                  <IconDownload size={24} /> Download nawa messenger
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>

      {/* Back Link */}
      <div className="mt-12">
        <a
          href="/"
          className="text-gray-400 hover:text-white transition-colors text-lg"
        >
          ← Back to Home
        </a>
      </div>
      </div>
    </div>
  );
};

export default GetStarted;

