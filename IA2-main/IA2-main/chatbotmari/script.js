document.addEventListener('DOMContentLoaded', function() {
    const messages = document.getElementById('messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = sender;
        messageElement.textContent = text;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    }

    function handleUserInput() {
        const text = userInput.value.trim();
        if (text === '') return;

        addMessage(text, 'user-message');
        userInput.value = '';

        // Simulação de resposta do chatbot
        setTimeout(() => {
            addMessage('Olá! Como posso ajudar?', 'bot-message');
        }, 500);
    }

    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleUserInput();
        }
    });
});