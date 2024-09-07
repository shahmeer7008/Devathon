document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const backButton = document.getElementById('back-button');

    function fetchMessages() {
        fetch('/messages')
            .then(response => response.json())
            .then(data => {
                chatBox.innerHTML = '';
                data.forEach(msg => {
                    const messageElement = document.createElement('div');
                    messageElement.className = 'chat-message';
                    messageElement.innerHTML = `
                        <div class="name">${msg.customer_name}</div>
                        <div class="timestamp">${new Date(msg.timestamp).toLocaleString()}</div>
                        <div class="message">${msg.message}</div>
                    `;
                    chatBox.appendChild(messageElement);
                });
                chatBox.scrollTop = chatBox.scrollHeight;
            });
    }

    fetchMessages();
    setInterval(fetchMessages, 5000); 

    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        const customerName = 'Customer'; 
        if (message) {
            fetch('/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer_name: customerName, message })
            })
            .then(() => {
                messageInput.value = '';
                fetchMessages();
            });
        }
    });

    backButton.addEventListener('click', () => {
        window.location.href = '/';
    });
});
