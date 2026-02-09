
export const AI_MESSAGES = {
  home: [
    "You're safe for now. Stay alert.",
    "Evening hours detected. Prefer well-lit routes.",
    "All systems active. Your safety is our priority.",
    "Walking alone? Use 'Walk With Me'."
  ],
  sos_pre: [
    "Help is one tap away.",
    "Stay calm. We are here.",
    "Emergency services are ready."
  ],
  sos_post: [
    "Alert sent. Stay where you are.",
    "Help is on the way. Keep your phone visible.",
    "Authorities notified. Dispatching now."
  ],
  walk: [
    "I'm walking with you.",
    "You're not alone.",
    "Monitoring your route closely.",
    "Stay focused on your surroundings."
  ],
  history: [
    "This area has higher reports at night.",
    "Knowledge is safety. Avoid these spots after dark."
  ]
};

export const getRandomMessage = (category: keyof typeof AI_MESSAGES) => {
  const messages = AI_MESSAGES[category];
  return messages[Math.floor(Math.random() * messages.length)];
};
