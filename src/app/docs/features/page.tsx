export default function FeaturesPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-6">Features</h1>

      <div className="mb-8">
        <p className="text-xl text-zinc-300">
          Explore NextBot's powerful features designed to enhance your Discord server management.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Server Backup System</h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <p className="text-zinc-300 mb-4">
              Our advanced backup system ensures your server's safety by storing:
            </p>
            <ul className="list-disc pl-4 text-zinc-300 mb-4">
              <li>Channel structures and permissions</li>
              <li>Role configurations</li>
              <li>Server settings and emojis</li>
              <li>Message history (optional)</li>
            </ul>
            <div className="mt-4">
              <h4 className="font-semibold text-white mb-2">Key Commands:</h4>
              <pre className="bg-zinc-900 p-4 rounded-lg">
                <code>
                  /backup create - Create a new backup{'\n'}
                  /backup list - View all backups{'\n'}
                  /backup restore - Restore from backup
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Moderation Tools</h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <p className="text-zinc-300 mb-4">
              Comprehensive moderation features to maintain server order:
            </p>
            <ul className="list-disc pl-4 text-zinc-300 mb-4">
              <li>Advanced auto-mod system</li>
              <li>Customizable warning system</li>
              <li>Temporary and permanent bans</li>
              <li>Raid protection</li>
              <li>Message filtering</li>
            </ul>
            <div className="mt-4">
              <h4 className="font-semibold text-white mb-2">Common Commands:</h4>
              <pre className="bg-zinc-900 p-4 rounded-lg">
                <code>
                  /warn @user [reason]{'\n'}
                  /mute @user [duration] [reason]{'\n'}
                  /ban @user [reason]{'\n'}
                  /automod config
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Welcome System</h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <p className="text-zinc-300 mb-4">
              Customize your server's welcome experience:
            </p>
            <ul className="list-disc pl-4 text-zinc-300 mb-4">
              <li>Custom welcome messages</li>
              <li>Auto-role assignment</li>
              <li>Verification systems</li>
              <li>Welcome image generation</li>
            </ul>
            <div className="mt-4">
              <h4 className="font-semibold text-white mb-2">Setup Commands:</h4>
              <pre className="bg-zinc-900 p-4 rounded-lg">
                <code>
                  /welcome channel #channel{'\n'}
                  /welcome message set{'\n'}
                  /welcome autorole add @role
                </code>
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 