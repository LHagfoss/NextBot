import ngrok from 'ngrok';

async function startTunnel() {
  try {
    const url = await ngrok.connect({
      addr: 'http://localhost:3000',
      authtoken: process.env.NGROK_AUTH_TOKEN,
      addResHeader: ['ngrok-skip-browser-warning: true'],
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    console.log('Ngrok tunnel started at:', url);
    console.log('Update your NEXTAUTH_URL in .env to:', url);
  } catch (error) {
    console.error('Error starting ngrok:', error);
  }
}

startTunnel(); 