import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-8">
          <div className="text-sm text-gray-500">
            © 2023 helo. All rights reserved.
          </div>
          <nav className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

