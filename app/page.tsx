import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Your Digital Identity, <span className="text-primary">Simplified</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Create stunning profile pages and digital business cards. Share your important links, contact info, and more with just one tap.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/features">Learn More</Link>
          </Button>
        </div>
      </div>
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Customizable Profiles"
            description="Create unique profile pages with customizable themes and layouts."
          />
          <FeatureCard
            title="Digital Business Cards"
            description="Generate QR codes and NFC-enabled digital business cards for easy sharing."
          />
          <FeatureCard
            title="Advanced Analytics"
            description="Track engagement and analyze the performance of your links and profile."
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

