import Link from 'next/link';

export default function TermsOfService() {
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
        
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="space-y-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using NextBot, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
              If you do not agree with any of these terms, you are prohibited from using the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Use License</h2>
            <p className="leading-relaxed">
              NextBot grants you a limited, non-exclusive, non-transferable, revocable license to use the service for your Discord servers
              in accordance with these terms.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>You must not use the service for any illegal purposes</li>
              <li>You must not attempt to gain unauthorized access to any part of the service</li>
              <li>You must not interfere with or disrupt the service</li>
              <li>You must comply with Discord&apos;s Terms of Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Service Modifications</h2>
            <p className="leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any part of the service at any time. 
              We will make reasonable efforts to provide notice of significant changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Limitation of Liability</h2>
            <p className="leading-relaxed">
              NextBot and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages
              resulting from your use or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Contact</h2>
            <p className="leading-relaxed">
              For any questions regarding these Terms of Service, please contact us through our{' '}
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