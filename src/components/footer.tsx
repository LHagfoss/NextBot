export default function Footer() {
    return (
      <footer className="border-t border-zinc-800/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <h3 className="font-semibold mb-4">NextBot v1</h3>
              <div className="flex flex-col justify-between h-full text-zinc-400">
                <p>Made with 💜 by <a href="https://lhagfoss.com" target="_blank">LHagfoss</a></p>
                <p className="text-zinc-700 mb-4">Version 1.2</p>
              </div>
            </div>
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
                <a href="/legal/privacy" className="hover:text-white transition-colors">Privacy</a>
                <a href="/legal/terms" className="hover:text-white transition-colors">Terms</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex flex-col gap-2 text-zinc-400">
                <a href="https://discord.gg/" className="hover:text-white transition-colors">Discord</a>
                <a href="#twitter" className="hover:text-white transition-colors">Twitter</a>
                <a href="https://github.com/LHagfoss/NextBot" target="_blank" className="hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
            <div className="flex gap-5">
              <div>
                <h3 className="font-semibold mb-4">Made With</h3>
                <div className="flex flex-col gap-2 text-zinc-400">
                  <p>Next.js 15</p>
                  <p>TypeScript</p>
                  <p>Docker</p>
                  <p>Tailwind CSS</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4 select-none opacity-0">Made With</h3>
                <div className="flex flex-col gap-2 text-zinc-400">
                  <p>Railway</p>
                  <p>Prisma</p>
                  <p>PostgreSQL</p>
                  <p>Discord.js</p>
                </div>
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