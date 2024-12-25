import { Instagram, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t py-12 md:py-16">
      <div className="container grid gap-8 px-4 md:grid-cols-4 md:gap-12">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider">Profile</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                FAQ's
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Pricing plans
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Order tracking
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Returns
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider">Recent Posts</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Touch of uniqueness
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Offices you won't forget
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Cicilan
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider">Customer</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Help & contact us
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Return
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Online stores
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Terms & condition
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
          </div>
        </div>
      </div>
      <div className="container mt-8 text-center text-sm text-muted-foreground">
        <p>© 2024 Nozomi cinema. All Right Reserved</p>
      </div>
    </footer>
  )
}

