export function generateBotInviteLink(clientId: string): string {
  const permissions = [
    'ADMINISTRATOR', 
  ];

  const scope = [
    'bot',
    'applications.commands'
  ];

  const baseUrl = 'https://discord.com/api/oauth2/authorize';
  const params = new URLSearchParams({
    client_id: clientId,
    permissions: '8',
    scope: scope.join(' '),
  });

  return `${baseUrl}?${params.toString()}`;
} 