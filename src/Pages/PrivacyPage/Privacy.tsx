import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Link } from "react-router-dom"

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 py-12 flex flex-col gap-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl  mb-6 font-medodica tracking-tight">
          Privacy at Our Core
        </h1>
        <p className="text-xl  text-gray-300">
          At <span className="font-bold lowercase">nawa</span>, privacy isn’t an add-on — it’s a foundation.
        </p>
      </div>

      {/* Privacy Card */}
      <Card className="bg-gray-900/70 border border-gray-700 shadow-lg backdrop-blur-sm max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl text-gray-100">Your Conversations Are Safe</CardTitle>
          <CardDescription className="text-gray-300 text-xl mt-2">
            We protect every message with end-to-end encryption.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 text-gray-300 space-y-4 text-xl md:text-xl">
          <p>
            At <span className="font-bold lowercase">nawa</span>, we never store your communication data on our servers, not even temporarily.
          </p>
          <p>
            Your conversations remain completely private and fully under your control. Trust is built not just on security, but on respecting your right to own your data — always.
          </p>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <p className="text-gray-400 text-xl md:text-xl mb-6">
          Learn more about how <span className="font-bold lowercase">nawa</span> keeps you safe.
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-gray-700 to-gray-500 text-white px-8 py-4 rounded-2xl text-2xl shadow-lg hover:scale-105 transition-transform"
        >
          Get Started with nawa
        </Link>
      </div>
    </div>
  )
}

export default Privacy
