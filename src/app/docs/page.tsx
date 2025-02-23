import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-6">Introduction to NextBot</h1>
      
      <div className="mb-8">
        <p className="text-xl text-zinc-300 leading-relaxed">
          NextBot is a powerful, feature-rich Discord bot built with modern technologies.
          It provides seamless integration with your Discord server, offering advanced moderation,
          utility commands, and customizable features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/50">
          <h3 className="text-xl font-semibold mb-3">🚀 Quick Setup</h3>
          <p className="text-zinc-300 mb-4">
            Get started with NextBot in minutes. Simple installation and configuration process.
          </p>
          <Link 
            href="/docs/quick-start"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Quick Start Guide →
          </Link>
        </div>

        <div className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/50">
          <h3 className="text-xl font-semibold mb-3">⚡ Features</h3>
          <p className="text-zinc-300 mb-4">
            Explore the wide range of features and commands available with NextBot.
          </p>
          <Link 
            href="/docs/features"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            View Features →
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Why NextBot?</h2>
      
      <div className="space-y-6 text-zinc-300">
        <div className="flex items-start gap-4">
          <div className="mt-1">✨</div>
          <div>
            <h3 className="font-semibold text-white">Modern Architecture</h3>
            <p>Built with Next.js 15, TypeScript, and Discord.js, ensuring type safety and modern development practices.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1">🛡️</div>
          <div>
            <h3 className="font-semibold text-white">Advanced Security</h3>
            <p>Implements best practices for security, including role-based permissions and audit logging.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1">🔧</div>
          <div>
            <h3 className="font-semibold text-white">Customizable</h3>
            <p>Extensive configuration options allow you to tailor the bot to your server&apos;s needs.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1">📈</div>
          <div>
            <h3 className="font-semibold text-white">Scalable</h3>
            <p>Designed to handle multiple servers efficiently with PostgreSQL database support.</p>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 rounded-lg border border-zinc-800 bg-zinc-900/50">
        <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
        <p className="text-zinc-300 mb-6">
          Ready to add NextBot to your Discord server? Follow our step-by-step guide to get started.
        </p>
        <div className="flex gap-4">
          <Link
            href="/docs/installation"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Installation Guide
          </Link>
          <Link
            href="/docs/commands"
            className="px-4 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition-colors"
          >
            View Commands
          </Link>
        </div>
      </div>
    </div>
  );
} 