import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Link } from "react-router-dom"
const About = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 py-12 flex flex-col gap-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl mb-6 font-medodica tracking-tight">
          About nawa
        </h1>
        <p className="text-xl text-gray-300">
          nawa is a communication-first management platform that turns conversations into action.
        </p>
      </div>

      {/* Feature / Info Card */}
      <Card className="bg-gray-900/70 border border-gray-700 shadow-lg backdrop-blur-sm max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl text-gray-100">Seamless Productivity</CardTitle>
          <CardDescription className="text-gray-300 mt-2 text-lg">
            With the Time-Specific Task (TST) at its core, any message can become a task, event, project, or financial item — instantly and naturally.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 text-gray-300 space-y-4 text-xl md:text-xl">
          <p>
            Built for seamless productivity, nawa scales from solo users to enterprises, unifying chat, tasks, workflows, roles, and billing in one modular, intuitive system.
          </p>
          <p>
            Whether you’re managing personal projects or large teams, nawa turns communication into actionable tasks, ensuring nothing gets lost and everything is tracked efficiently.
          </p>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <p className="text-gray-400 text-xl mb-6">
          Ready to take your productivity to the next level?
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-gray-700 to-gray-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          Get Started with nawa
        </Link>
      </div>
    </div>
  )
}

export default About
