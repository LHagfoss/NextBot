export default function Footer() {
    return (
      <footer className="border-t border-zinc-800/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="flex flex-col gap-2 text-zinc-400">
                <a href="#features" className="hover:text-white transition-colors">Features</a>
                <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                <a href="#docs" className="hover:text-white transition-colors">Documentation</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="flex flex-col gap-2 text-zinc-400">
                <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
                <a href="#terms" className="hover:text-white transition-colors">Terms</a>
                <a href="#cookies" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex flex-col gap-2 text-zinc-400">
                <a href="#discord" className="hover:text-white transition-colors">Discord</a>
                <a href="#twitter" className="hover:text-white transition-colors">Twitter</a>
                <a href="#github" className="hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Made With</h3>
              <div className="flex flex-col gap-2 text-zinc-400">
                <p>Next.js 15</p>
                <p>TypeScript</p>
                <p>Docker</p>
                <p>Tailwind CSS</p>
                <p>Prisma</p>
                <p>PostgreSQL</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-800/50 text-center text-zinc-400">
            <p>© {new Date().getFullYear()} BackupBot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }