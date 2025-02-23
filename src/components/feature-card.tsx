interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    command?: string;
}
  
export default function FeatureCard({ icon, title, description, command }: FeatureCardProps) {
    return (
      <div className="relative aspect-square p-8 rounded-3xl bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 transition-all hover:border-zinc-700/50">
        <div className="h-full flex flex-col">
          <div className="space-y-4">
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 flex items-center justify-center">
              {icon}
            </div>
            
            <h3 className="text-xl font-medium text-zinc-100">{title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
          </div>
          
          {command && (
            <div className="mt-auto">
              <code className="text-xs bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                /{command}
              </code>
            </div>
          )}
        </div>
      </div>
    );
  }