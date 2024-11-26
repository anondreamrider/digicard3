import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
        <Link href="/" className="text-2xl font-bold italic" style={{ fontFamily: "'Pacifico', cursive" }}>
          helo
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/features" className="text-sm font-medium">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button asChild variant="ghost">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

