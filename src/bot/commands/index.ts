import { Command } from './command';
import { backup } from './backup';
import { ping } from './ping';
import { backups } from './backups';
import { time } from './time';
import { help } from './help';
import { website } from './website';
import { commandManager } from './command-manager';
import { interact } from './interact';

export const commands: Command[] = [
  backup,
  ping,
  backups,
  time,
  help,
  commandManager,
  interact,
  website
]; 