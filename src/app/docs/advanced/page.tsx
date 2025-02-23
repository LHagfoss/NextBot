export default function AdvancedPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-6">Advanced Features</h1>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Custom Commands</h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <p className="text-zinc-300 mb-4">
              Create powerful custom commands using our advanced command system:
            </p>
            <div className="mb-6">
              <h4 className="font-semibold text-white mb-2">Example Custom Command:</h4>
              <pre className="bg-zinc-900 p-4 rounded-lg">
                <code>
                  {`/custom create welcome-vip
                  Content: Welcome {user} to the VIP section!
                  Role: @VIP
                  Channel: #vip-lounge`}
                </code>
              </pre>
            </div>
            <p className="text-zinc-300">Available Variables:</p>
            <ul className="list-disc pl-4 text-zinc-300">
              <li>{"{{user}}"} - Mentions the user</li>
              <li>{"{{server}}"} - Server name</li>
              <li>{"{{count}}"} - Member count</li>
              <li>{"{{role}}"} - Specified role</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">API Integration</h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <p className="text-zinc-300 mb-4">
              Connect NextBot with external services using our API:
            </p>
            <div className="mb-4">
              <h4 className="font-semibold text-white mb-2">Generate API Key:</h4>
              <pre className="bg-zinc-900 p-4 rounded-lg">
                <code>{`/api generate-key`}</code>
              </pre>
            </div>
            <p className="text-zinc-300">Available Endpoints:</p>
            <ul className="list-disc pl-4 text-zinc-300">
              <li>Server Statistics</li>
              <li>Member Management</li>
              <li>Custom Commands</li>
              <li>Backup Management</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Automation System</h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <p className="text-zinc-300 mb-4">
              Create complex automation workflows:
            </p>
            <div className="mb-4">
              <h4 className="font-semibold text-white mb-2">Example Workflow:</h4>
              <pre className="bg-zinc-900 p-4 rounded-lg">
                <code>
                  {`/automation create
                  Trigger: Member joins
                  Conditions:
                  - Account age {'>'} 30 days
                  - Has specific role
                  Actions:
                  - Assign role
                  - Send welcome message
                  - Add to database`}
                </code>
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}