import Link from 'next/link';

const features = [
  {
    title: "Server Backup",
    icon: "🔒",
    description: "Complete server backup solution including channels, roles, and settings",
    benefits: [
      "Automated daily backups",
      "One-click restore",
      "Multiple backup slots",
      "Selective restoration"
    ]
  },
  {
    title: "Advanced Moderation",
    icon: "🛡️",
    description: "Comprehensive tools to keep your server safe and organized",
    benefits: [
      "Auto-moderation system",
      "Customizable filters",
      "Raid protection",
      "Warning system"
    ]
  },
  {
    title: "Welcome System",
    icon: "👋",
    description: "Create engaging welcome experiences for new members",
    benefits: [
      "Custom welcome messages",
      "Auto-role assignment",
      "Welcome images",
      "Verification system"
    ]
  },
  {
    title: "Custom Commands",
    icon: "⚡",
    description: "Create your own commands with advanced functionality",
    benefits: [
      "Variable support",
      "Role-based access",
      "Temporary commands",
      "Command aliases"
    ]
  },
  {
    title: "Automation",
    icon: "🤖",
    description: "Automate server tasks and create complex workflows",
    benefits: [
      "Event-based triggers",
      "Conditional actions",
      "Scheduled tasks",
      "Custom workflows"
    ]
  },
  {
    title: "Statistics & Analytics",
    icon: "📊",
    description: "Track your server's growth and activity",
    benefits: [
      "Member analytics",
      "Activity tracking",
      "Growth statistics",
      "Custom reports"
    ]
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Powerful Features for Your Discord Server
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Transform your Discord server with NextBot&apos;s comprehensive suite of features
              designed to enhance moderation, engagement, and automation.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/50 backdrop-blur-sm hover:border-zinc-700 transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-zinc-400 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-zinc-300">
                    <span className="text-blue-500 mr-2">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to enhance your Discord server?</h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Get started with NextBot today and unlock all these powerful features for your community.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/docs"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Documentation
            </Link>
            <a
              href="https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands"
              className="px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Add to Discord
            </a>
          </div>
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-zinc-800">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">And Much More...</h2>
          <p className="text-zinc-400">
            Discover all the ways NextBot can help you manage and grow your Discord community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-zinc-800 rounded-xl p-8 bg-zinc-900/50">
            <h3 className="text-xl font-semibold mb-4">For Server Owners</h3>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                Complete server backup and restore
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                Advanced analytics and reporting
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                Custom command creation
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                Automated moderation
              </li>
            </ul>
          </div>

          <div className="border border-zinc-800 rounded-xl p-8 bg-zinc-900/50">
            <h3 className="text-xl font-semibold mb-4">For Moderators</h3>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                Powerful moderation commands
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                User infraction history
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                Customizable auto-mod rules
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✓</span>
                Detailed audit logs
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 