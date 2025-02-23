import { 
  FaRobot, 
  FaShieldAlt, 
  FaDatabase, 
  FaMusic, 
  FaUserPlus, 
  FaChartBar,
  FaCog,
  FaDiscord,
  FaGithub,
  FaTwitter,
  FaSlack,
  FaComments,
  FaGamepad,
  FaImage,
  FaLock,
  FaMedal,
  FaSearch,
  FaUsers
} from 'react-icons/fa';

import {
  MdDashboard,
  MdSettings,
  MdNotifications,
  MdHelp,
  MdLeaderboard
} from 'react-icons/md';

export const CommandIcon = () => <FaRobot className="w-8 h-8 text-indigo-500" />;
export const ShieldIcon = () => <FaShieldAlt className="w-8 h-8 text-indigo-500" />;
export const BackupIcon = () => <FaDatabase className="w-8 h-8 text-indigo-500" />;
export const MusicIcon = () => <FaMusic className="w-8 h-8 text-indigo-500" />;
export const WelcomeIcon = () => <FaUserPlus className="w-8 h-8 text-indigo-500" />;
export const StatsIcon = () => <FaChartBar className="w-8 h-8 text-indigo-500" />;
export const SettingsIcon = () => <FaCog className="w-8 h-8 text-indigo-500" />;
export const ChatIcon = () => <FaComments className="w-8 h-8 text-indigo-500" />;
export const GamesIcon = () => <FaGamepad className="w-8 h-8 text-indigo-500" />;
export const LevelsIcon = () => <MdLeaderboard className="w-8 h-8 text-indigo-500" />;
export const ModIcon = () => <FaLock className="w-8 h-8 text-indigo-500" />;
export const RolesIcon = () => <FaUsers className="w-8 h-8 text-indigo-500" />;
export const EventsIcon = () => <FaMedal className="w-8 h-8 text-indigo-500" />;

// Social Icons
export const DiscordIcon = () => <FaDiscord className="w-6 h-6" />;
export const GithubIcon = () => <FaGithub className="w-6 h-6" />;
export const TwitterIcon = () => <FaTwitter className="w-6 h-6" />;
export const SlackIcon = () => <FaSlack className="w-6 h-6" />; 