const responses = {
  greeting: { triggers: ['hello','hi','hey','sup','greetings','good morning','good evening'], replies: ['Hello there! Great to see you! 👋','Hey! How can I help you today? 😊','Hi! I\'m Alex, your AI assistant. What\'s on your mind?'] },
  how_are_you: { triggers: ['how are you','how r you','how\'s it going','how do you do','what\'s up'], replies: ['I\'m doing great, thanks for asking! 🤖','Running at 100% capacity! How about you? 😄','Fantastic! Ready to help you with anything!'] },
  joke: { triggers: ['joke','funny','make me laugh','tell me a joke','humor'], replies: ['Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂','I told my computer I needed a break... now it won\'t stop sending me Kit-Kat ads! 😄','What\'s a computer\'s favorite snack? Microchips! 💻🍟'] },
  javascript: { triggers: ['javascript','js','web dev','frontend'], replies: ['JavaScript is the language of the web! It makes websites interactive. 💻\n\nKey facts:\n• Runs in browsers natively\n• Used for frontend AND backend (Node.js)\n• Most popular language on GitHub!'] },
  python: { triggers: ['python','py'], replies: ['Python is amazing for beginners and experts alike! 🐍\n\n• Simple, readable syntax\n• Great for AI/ML, data science, web backends\n• Huge community & libraries like NumPy, Django'] },
  weather: { triggers: ['weather','temperature','rain','sunny'], replies: ['I\'m a chatbot so I can\'t check live weather, but check out the Weather App in this portfolio! ⛅','Try the Weather App project — it uses real OpenWeatherMap API data! 🌤️'] },
  help: { triggers: ['help','what can you do','features','capabilities'], replies: ['I can help with:\n\n💬 Casual conversation\n😄 Jokes\n💻 Tech questions (JS, Python, HTML)\n🌐 Web development tips\n🤔 General knowledge\n\nJust ask me anything!'] },
  thanks: { triggers: ['thanks','thank you','ty','cheers','appreciate'], replies: ['You\'re welcome! 😊','Happy to help! Anything else?','Anytime! That\'s what I\'m here for! 🤖'] },
  bye: { triggers: ['bye','goodbye','see you','later','cya'], replies: ['Goodbye! Come back anytime! 👋','See you later! Keep coding! 💻','Bye! Have a wonderful day! 😊'] },
  html: { triggers: ['html','markup'], replies: ['HTML (HyperText Markup Language) is the backbone of every webpage! 🌐\n\nIt defines the structure using tags like <div>, <p>, <h1>. Combined with CSS for styling and JavaScript for interactivity, it forms the "holy trinity" of web development!'] },
  css: { triggers: ['css','styling','design'], replies: ['CSS (Cascading Style Sheets) makes the web beautiful! 🎨\n\nWith CSS you can:\n• Set colors, fonts, spacing\n• Create animations\n• Make responsive layouts with Flexbox & Grid'] },
  name: { triggers: ['your name','who are you','what are you'], replies: ['I\'m Alex AI, a rule-based chatbot built with vanilla JavaScript! 🤖\n\nI\'m part of a portfolio project demonstrating conversational UI without any paid AI APIs.'] },
};

const fallbacks = [
  'Interesting question! I\'m still learning, but I\'d love to discuss that. Can you be more specific? 🤔',
  'I\'m not sure about that, but I can help with tech questions, jokes, and web dev topics! 💻',
  'Hmm, that\'s outside my current knowledge. Try asking about JavaScript, Python, or just say \'help\'!',
  'Great question! I\'m a rule-based bot, so my knowledge is limited. Ask me about coding! 😄'
];

function getResponse(input) {
  const lower = input.toLowerCase();
  for (const key in responses) {
    const r = responses[key];
    if (r.triggers.some(t => lower.includes(t))) {
      return r.replies[Math.floor(Math.random() * r.replies.length)];
    }
  }
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function sendMessage(text) {
  const input = document.getElementById('userInput');
  const msg = text || input.value.trim();
  if (!msg) return;
  input.value = '';
  addMessage(msg, 'user');
  document.getElementById('quickReplies').style.display = 'none';
  showTyping();
  setTimeout(() => {
    removeTyping();
    addMessage(getResponse(msg), 'bot');
  }, 600 + Math.random() * 800);
}

function addMessage(text, sender) {
  const messages = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'message ' + sender;
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  div.innerHTML = `<div class="bubble">${text.replace(/\n/g,'<br>')}</div><div class="time">${time}</div>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const messages = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'message bot typing'; div.id = 'typing';
  div.innerHTML = '<div class="bubble">Alex is typing...</div>';
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('typing');
  if (el) el.remove();
}

document.getElementById('userInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});