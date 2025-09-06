import axios from 'axios';

export async function POST(req) {
  try {
    const { text } = await req.json();

    const response = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/ogSj7jM4rppgY9TgZMqW',
      {
        text: text.slice(0, 3000), // max 3000 chars
        voice_settings: { stability: 0.5, similarity_boost: 0.5 },
      },
      {
        headers: {
          'xi-api-key': 'sk_d4b7d16087eb8a0af0edcd445b372087e5fb93934b36a3e0',
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer', // important for audio
      }
    );

    return new Response(response.data, {
      status: 200,
      headers: { 'Content-Type': 'audio/mpeg' },
    });
  } catch (error) {
    console.error(error.response?.data || error);
    return new Response(JSON.stringify({ error: 'TTS failed' }), { status: 500 });
  }
}
