import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

const sidebarLinks = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start', href: '/docs/quick-start' },
    ]
  },
  {
    title: 'Features',
    items: [
      { title: 'Commands', href: '/docs/commands' },
      { title: 'Configuration', href: '/docs/configuration' },
      { title: 'Permissions', href: '/docs/permissions' },
    ]
  },
  {
    title: 'Advanced',
    items: [
      { title: 'Custom Commands', href: '/docs/custom-commands' },
      { title: 'API Integration', href: '/docs/api' },
      { title: 'Webhooks', href: '/docs/webhooks' },
    ]
  }
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 h-screen fixed border-r border-zinc-800 bg-black">
          <div className="p-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">NextBot</span>
            </Link>
          </div>
          <nav className="px-4 py-2">
            {sidebarLinks.map((section) => (
              <div key={section.title} className="mb-6">
                <h3 className="px-2 mb-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-2 py-1.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-md transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="ml-64 flex-1">
          <main className="max-w-4xl mx-auto px-8 py-12">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 