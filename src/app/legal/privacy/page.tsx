import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <nav className="mb-8">
          <Link 
            href="/"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </nav>
        
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Information We Collect</h2>
            <p className="leading-relaxed">
              When you use NextBot, we collect certain information to provide and improve our services. This includes:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Discord server information</li>
              <li>User IDs and usernames</li>
              <li>Command usage statistics</li>
              <li>Server configuration preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">How We Use Your Information</h2>
            <p className="leading-relaxed">
              We use the collected information to:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Improve and optimize our bot functionality</li>
              <li>Respond to your requests and support inquiries</li>
              <li>Send important updates about our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Data Security</h2>
            <p className="leading-relaxed">
              We take the security of your data seriously. All data is encrypted in transit and at rest. 
              We implement appropriate technical and organizational measures to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about our Privacy Policy, please contact us through our{' '}
              <a 
                href="https://discord.gg/" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Discord server
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 text-sm text-zinc-400">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
} 