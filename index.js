const venom = require('venom-bot');
const axios = require('axios');

async function sendToOpenAI(message) {
  const apiUrl = `https://api.lolhuman.xyz/api/openai?apikey=ayakaviki&text=${encodeURIComponent(message)}`;

  try {
    const response = await axios.get(apiUrl);
    const autoResponse = response.data.result;

    return autoResponse;
  } catch (error) {
    console.log('Error in OpenAI API request:', error.message);
    return 'Ak ga ngerti.';
  }
}

function containsBadWords(message) {
  const badWords = ['ajg', 'goblok', 'asu', 'ktnl', 'titit', 'ppk', 'pepek', 'anjc', 'babi', 'puki', 'pukimak', 'asw', 'kntl', 'mmk', 'memek', 'tai', 'bangsat', 'bgst', 'ktl']; // Tambahkan kata-kata kasar yang ingin Anda deteksi di sini
  const words = message.toLowerCase().split(' ');
  for (const word of words) {
    if (badWords.includes(word)) {
      return true;
    }
  }
  return false;
}

venom.create().then((client) => {
  console.log('MakeMeow telah diinisialisasi!');

  client.onMessage(async (message) => {
    try {
      if (message.type === 'chat' && message.body) {
        const incomingMessage = message.body.toLowerCase();
        const sender = message.sender.pushname;
        
        if (incomingMessage === 'siapa') {
          const autoResponse = 'Saya asisten Ayaka Ai, saya MakeMeow hehe ><';
          await client.sendTextWithMentions(message.from, autoResponse, [message.sender.id]);
        } else if (incomingMessage === 'owner') {
          const ownerContact = {
            displayName: 'Sazumi Viki',
            vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Pemilik;;;\nTEL;type=CELL:6285236226786\nEND:VCARD'
          };
          await client.sendContactVcard(message.from, ownerContact);
        } else if (incomingMessage.includes('viki') || incomingMessage.includes('piki') || incomingMessage.includes('vicky')) {
          const autoResponse = `Kenapa sih *${sender}* sebut sebut pacar aku`;
          await client.reply(message.from, autoResponse, message.id.toString());
        } else if (containsBadWords(incomingMessage)) {
          const autoResponse = 'Ihh kok kasar banget sih kak';
          await client.reply(message.from, autoResponse, message.id.toString());
        } else {
          const autoResponse = await sendToOpenAI(incomingMessage);
          await client.reply(message.from, autoResponse, message.id.toString());
        }
      }
    } catch (error) {
      console.log('Error in processing message:', error.message);
    }
  });
}).catch((error) => {
  console.log('Error in creating client:', error);
});
