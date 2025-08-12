const copyBtn = document.getElementById('copyBtn');
const historyList = document.getElementById('historyList');
const resultDiv = document.getElementById('result');
const inputText = document.getElementById('inputText');

copyBtn.addEventListener('click', () => {
  if (resultDiv.textContent.trim() !== '') {
    navigator.clipboard.writeText(resultDiv.textContent)
      .then(() => alert('Result copied to clipboard!'))
      .catch(() => alert('Failed to copy!'));
  } else {
    alert('No result to copy!');
  }
});

function addToHistory(message, result) {
  const li = document.createElement('li');
  li.textContent = `Message: "${message.substring(0, 30)}..." → Result: ${result}`;
  historyList.prepend(li);
  // Keep max 10 items
  if(historyList.childElementCount > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}

// Replace your current checkScam() function with this:
function checkScam() {
  const text = inputText.value.toLowerCase();
  const scamWords = [
    'password', 'send money', 'urgent', 'free gift', 'click link',
    'winner', 'account locked', 'verify', 'claim prize', 'login',
    'bank', 'transfer', 'giveaway'
  ];

  let foundWords = scamWords.filter(word => text.includes(word));

  if (text.trim() === '') {
    resultDiv.innerHTML = `<span style="color: #888;">Please paste a message to check.</span>`;
    return;
  }

  if (foundWords.length === 0) {
    const safeMessage = `✅ This message looks safe.`;
    resultDiv.innerHTML = `<span style="color: var(--success);">${safeMessage}</span>`;
    addToHistory(text, 'Safe');
    return;
  }

  let risk = 'Low';
  if (foundWords.length >= 3) risk = 'High';
  else if (foundWords.length === 2) risk = 'Medium';

  const warningMessage = `⚠️ Warning: This message might be a scam. Suspicious words found: ${foundWords.join(', ')}. Risk Level: ${risk}`;
  resultDiv.innerHTML = `<span style="color: var(--danger);">${warningMessage}</span>`;
  addToHistory(text, `Scam (${risk})`);
}
