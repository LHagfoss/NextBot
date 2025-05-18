import NavBar from '@/components/navbar';
import Footer from '@/components/footer';
import FeatureCard from '@/components/feature-card';
import Link from 'next/link';
import { InviteButton } from '@/components/invite-button';
import { CommandIcon, ShieldIcon, BackupIcon, MusicIcon, WelcomeIcon, StatsIcon, ChatIcon, GamesIcon, LevelsIcon, ModIcon, RolesIcon, EventsIcon } from '@/components/icons';

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="relative w-full min-h-screen text-white overflow-hidden inset-0">
      <div className="absolute -top-24 -left-28 -z-10 w-96 h-96 bg-indigo-600/30 rounded-full blur-[128px]" />
      <div className="absolute top-[200px] -right-52 -z-10 w-[40rem] h-[40rem] bg-purple-600/30 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 right-[50%] translate-x-[-50%] -z-10 w-96 h-96 bg-indigo-600/30 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 -right-48 -z-10 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]" />
        <div className="absolute top-2/3 left-[25%] -z-10 w-96 h-96 bg-indigo-600/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-24 right-0 -z-10 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]" />
        <div className="absolute -bottom-52 left-0 -z-10 w-96 h-96 bg-indigo-600/30 rounded-full blur-[128px]" />
        
        <section className="f-full h-screen flex justify-center flex-col items-center text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            NextBot v1
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mb-8">
            <strong>Meet NextBot:</strong> Your all-in-one Discord sidekick, here to streamline chats, manage tasks, and elevate your server experience effortlessly.
          </p>
          <div className="flex gap-4">
            <InviteButton text="Add to Discord"/>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors"
            >
              Open Dashboard
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CommandIcon />}
              title="Advanced Commands"
              description="Powerful slash commands for moderation, fun, and utility"
              command="help"
            />
            <FeatureCard
              icon={<ShieldIcon />}
              title="Server Security"
              description="Auto-moderation, raid protection, and customizable security settings"
              command="automod"
            />
            <FeatureCard
              icon={<BackupIcon />}
              title="Backup System"
              description="Complete server backup including roles, channels, and settings"
              command="backup create"
            />
            <FeatureCard
              icon={<MusicIcon />}
              title="Music Player"
              description="High-quality music playback from multiple sources"
              command="play"
            />
            <FeatureCard
              icon={<WelcomeIcon />}
              title="Welcome System"
              description="Customizable welcome messages and auto-role assignment"
              command="welcome setup"
            />
            <FeatureCard
              icon={<StatsIcon />}
              title="Server Analytics"
              description="Detailed server statistics and member activity tracking"
              command="stats"
            />
            <FeatureCard
              icon={<ChatIcon />}
              title="Auto Responses"
              description="Create custom triggers and responses for your server"
              command="autoresponse add"
            />
            <FeatureCard
              icon={<GamesIcon />}
              title="Mini Games"
              description="Fun games and activities to engage your community"
              command="games list"
            />
            <FeatureCard
              icon={<LevelsIcon />}
              title="Leveling System"
              description="Reward active members with XP and custom roles"
              command="rank"
            />
            <FeatureCard
              icon={<ModIcon />}
              title="Advanced Moderation"
              description="Powerful tools to keep your server safe and organized"
              command="mod help"
            />
            <FeatureCard
              icon={<RolesIcon />}
              title="Role Management"
              description="Advanced role controls and reaction roles"
              command="roles setup"
            />
            <FeatureCard
              icon={<EventsIcon />}
              title="Server Events"
              description="Create and manage server events with ease"
              command="event create"
            />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};