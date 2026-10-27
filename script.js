
const chatArea = document.getElementById("chatArea");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = sender === "bot" ? "⚖" : "👤";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  const time = document.createElement("span");
  time.className = "time";
  time.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  bubble.appendChild(time);
  message.append(avatar, bubble);
  chatArea.appendChild(message);

  chatArea.scrollTop = chatArea.scrollHeight;
}

function getReply(message) {
  const text = message.toLowerCase().trim();

  // Greetings
  if (/\b(hi|hii|hello|hey|good morning|good evening)\b/.test(text)) {
    return "Hello! 👋 Welcome to LegalEase.\n\nI can help with FIR filing, consumer complaints, cybercrime reporting and free legal aid.\n\nWhat would you like to know?";
  }

  // Goodbye
  if (/\b(bye|goodbye|see you)\b/.test(text)) {
    return "Thank you for using LegalEase! 😊 Stay safe. Remember, this chatbot provides general legal information, not professional legal advice.";
  }

  // FIR
  if (/\b(fir|police complaint|file a complaint|file complaint|theft|stolen|robbery|assault)\b/.test(text)) {
    return "🚔 HOW TO FILE AN FIR IN INDIA\n\n1. Visit a police station and explain the incident.\n2. Give the facts, including the date, time, place and available evidence.\n3. For a cognizable offence, request that the information be recorded as an FIR.\n4. Read the recorded statement carefully before signing and ask for a free copy of the FIR.\n5. If the police station has no territorial jurisdiction, you can ask about a Zero FIR.\n\nIf the police refuse to record information about a cognizable offence, you may approach the Superintendent of Police under Section 173(4) of the BNSS or seek help from a lawyer or legal aid service.\n\n🚨 Immediate danger? Call 112 in India.";
  }

  // Consumer complaint
  if (/\b(consumer|refund|product|defective|damaged|online shopping|seller|ecommerce|replacement|warranty|customer complaint)\b/.test(text)) {
    return "🛍️ HOW TO FILE A CONSUMER COMPLAINT\n\n1. Keep the bill, order ID, warranty and payment proof.\n2. Contact the seller or company in writing and request a solution.\n3. If unresolved, contact India's National Consumer Helpline at 1915 or visit consumerhelpline.gov.in.\n4. For a formal consumer dispute, check the appropriate Consumer Commission filing process through the official e-Jagriti portal: e-jagriti.gov.in.\n5. Keep copies of all messages and documents.\n\nYour complaint should clearly explain the problem, purchase details and the remedy you want, such as a refund or replacement.";
  }

  // Cybercrime
  if (/\b(cybercrime|cyber crime|online fraud|scam|hacked|hacking|phishing|upi fraud|bank fraud|digital fraud|otp fraud)\b/.test(text)) {
    return "💻 HOW TO REPORT CYBERCRIME\n\n1. If money was stolen, contact your bank immediately and ask them to report/block the transaction where possible.\n2. Call India's cyber financial fraud helpline 1930 as soon as possible.\n3. Submit a complaint at cybercrime.gov.in.\n4. Preserve transaction IDs, screenshots, phone numbers and messages.\n5. Never share your OTP, PIN or password.\n\nIf you are in immediate physical danger, call 112.";
  }

  // Women's safety
  if (/\b(women safety|woman safety|harassment|stalking|domestic violence|sexual harassment|threat|threatened)\b/.test(text)) {
    return "🛡️ SAFETY AND REPORTING\n\nIf you are in immediate danger in India, call 112 or go to a safe place.\n\nYou can report a crime to the police. Preserve messages, photos or other evidence if safe to do so. For domestic violence or harassment, a lawyer, One Stop Centre or legal aid service can explain the options available to you.\n\nDo not put yourself at risk to collect evidence.";
  }

  // Free legal aid
  if (/\b(legal aid|free lawyer|free legal help|lawyer|advocate|legal services)\b/.test(text)) {
    return "⚖️ FREE LEGAL AID IN INDIA\n\n1. Contact your District Legal Services Authority (DLSA) or Taluk Legal Services Committee.\n2. Visit nalsa.gov.in for official legal aid information.\n3. You can also call the National Legal Aid Helpline at 15100.\n4. Explain your issue and ask whether you qualify for free legal services.\n\nEligibility depends on the applicable legal aid rules and your circumstances.";
  }

  // RTI
  if (/\b(rti|right to information|government information)\b/.test(text)) {
    return "📄 RIGHT TO INFORMATION (RTI)\n\n1. Identify the public authority holding the information.\n2. Submit an RTI application to its Public Information Officer (PIO).\n3. Clearly describe the records or information you are seeking.\n4. Pay the applicable fee, if required, or claim an exemption if eligible.\n5. Keep the application receipt. If you do not receive a satisfactory response, you may be able to file a first appeal.\n\nUse the relevant official government portal or authority website.";
  }

  // General legal queries
  if (/\b(legal|law|rights|court|case|constitution|lawyer advice)\b/.test(text)) {
    return "⚖️ I can provide general information about legal procedures in India.\n\nTry asking:\n• How to file an FIR?\n• How to file a consumer complaint?\n• How to report cybercrime?\n• How can I get free legal aid?\n• How do I file an RTI application?\n\nFor advice about your specific case, consult a qualified lawyer.";
  }

  // Thanks
  if (/\b(thanks|thank you|thankyou|great|helpful)\b/.test(text)) {
    return "You're welcome! 😊 I'm happy to help.\n\nAsk me another question about FIRs, consumer rights, cybercrime or legal aid.";
  }

  // Help
  if (/\b(help|what can you do|options|topics)\b/.test(text)) {
    return "I can help you with these topics:\n\n🚔 Filing an FIR\n🛍️ Consumer complaints and refunds\n💻 Cybercrime and online fraud\n🛡️ Safety and harassment reporting\n⚖️ Free legal aid\n📄 RTI applications\n\nType your question in your own words!";
  }

  // Default response
  return "I'm sorry, I don't have a reliable answer for that question yet. 🤔\n\nPlease try asking about:\n• Filing an FIR\n• Consumer complaints or refunds\n• Cybercrime or online fraud\n• Free legal aid\n• RTI applications\n\nFor urgent or case-specific legal issues, contact the relevant authority or a qualified lawyer.";
}

function sendMessage(message) {
  const text = message.trim();

  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  const reply = getReply(text);

  setTimeout(() => {
    addMessage(reply, "bot");
  }, 350);
}

chatForm.addEventListener("submit", function(event) {
  event.preventDefault();
  sendMessage(userInput.value);
});

function quickAsk(question) {
  sendMessage(question);
}

function clearChat() {
  chatArea.replaceChildren();

  addMessage(
    "Chat cleared! 👋 Welcome back to LegalEase. Ask me about FIRs, consumer complaints, cybercrime or legal aid.",
    "bot"
  );
}

userInput.focus();
