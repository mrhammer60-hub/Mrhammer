/**
 * chat.js — Chat overlay logic
 */

const Chat = (() => {
  let messages = [...CHAT_HISTORY];

  // ── Render all messages ───────────────────────────────────────────────────
  function render() {
    const container = document.getElementById('chatMessages');
    container.innerHTML = '';

    messages.forEach(m => {
      const wrap = document.createElement('div');
      wrap.className = 'msg-wrap ' + m.from;
      wrap.innerHTML = `
        <div>
          <div class="msg-bubble">${m.text}</div>
          <div class="msg-time">${m.time}</div>
        </div>`;
      container.appendChild(wrap);
    });

    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
  }

  // ── Open chat ─────────────────────────────────────────────────────────────
  function open() {
    document.getElementById('chatOverlay').classList.add('open');
    render();
  }

  // ── Close chat ────────────────────────────────────────────────────────────
  function close() {
    document.getElementById('chatOverlay').classList.remove('open');
  }

  // ── Send message ──────────────────────────────────────────────────────────
  function send() {
    const input = document.getElementById('chatInput');
    const text  = input.value.trim();
    if (!text) return;

    const now  = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    messages.push({ from: 'me', text, time });
    input.value = '';
    render();
  }

  return { open, close, send };
})();

// Global helpers
function openChat()  { Chat.open(); }
function closeChat() { Chat.close(); }
function sendMsg()   { Chat.send(); }
