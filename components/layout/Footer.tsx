import { navLinks } from "@/data/nav";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-px mx-auto max-w-content py-14 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <a href="#" aria-label="Kravex AI home" className="font-display text-xl tracking-tight">
              <span className="text-text-primary">Kravex</span>{" "}
              <span className="text-accent">AI</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              AI automation and lead systems for teams who&apos;d rather their
              pipeline ran itself.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label="Footer navigation">
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
                Site
              </p>
              <ul className="mt-4 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
                Connect
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="mailto:hello@kravex.ai"
                    className="text-sm text-text-muted transition-colors hover:text-text-primary"
                  >
                    hello@kravex.ai
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-text-muted transition-colors hover:text-text-primary"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-text-muted transition-colors hover:text-text-primary"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start gap-4 border-t border-border pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kravex AI. All rights reserved.</p>
          <p className="font-mono">Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
