import Link from 'next/link';

export default function QuickStartPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-6">Quick Start Guide</h1>
      
      <div className="mb-8">
        <p className="text-xl text-zinc-300">
          Get started with NextBot in your Discord server in just a few simple steps.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">1</span>
            Invite NextBot
          </h2>
          <div className="pl-11">
            <p className="text-zinc-300 mb-4">Click the invite button below to add NextBot to your server:</p>
            <a 
              href="https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Invite NextBot
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">2</span>
            Initial Setup
          </h2>
          <div className="pl-11">
            <p className="text-zinc-300 mb-4">Use the following command to start the setup process:</p>
            <pre className="bg-zinc-900 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">/setup</code>
            </pre>
            <p className="text-zinc-300 mt-4">This will guide you through:</p>
            <ul className="list-disc pl-4 text-zinc-300">
              <li>Setting up admin roles</li>
              <li>Configuring welcome messages</li>
              <li>Setting up logging channels</li>
              <li>Basic moderation settings</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">3</span>
            Verify Permissions
          </h2>
          <div className="pl-11">
            <p className="text-zinc-300">Ensure NextBot has the following permissions:</p>
            <ul className="list-disc pl-4 text-zinc-300">
              <li>Manage Server</li>
              <li>Manage Roles</li>
              <li>Manage Channels</li>
              <li>View Audit Log</li>
              <li>Send Messages</li>
              <li>Manage Messages</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="mt-12 p-6 rounded-lg border border-zinc-800 bg-zinc-900/50">
        <h3 className="text-xl font-bold mb-4">Next Steps</h3>
        <p className="text-zinc-300 mb-6">
          Now that your bot is running, check out these resources to learn more:
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/docs/commands"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            → Available Commands
          </Link>
          <Link
            href="/docs/configuration"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            → Configuration Guide
          </Link>
          <Link
            href="/docs/features"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            → Feature Overview
          </Link>
        </div>
      </div>
    </div>
  );
} 