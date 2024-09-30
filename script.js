document.addEventListener('DOMContentLoaded', function() {
    const promptTextarea = document.getElementById('prompt');  // Onde o usuário digita a mensagem
    const respostaTextarea = document.getElementById('resposta'); // Onde a resposta será exibida
    const sendButton = document.getElementById('send-button'); // Botão de envio

    // Função para lidar com o clique do botão "Enviar"
    sendButton.addEventListener('click', function() {
        const userMessage = promptTextarea.value.trim(); // Captura o valor da área de texto

        if (userMessage === '') {
            return; // Se o campo estiver vazio, não faça nada
        }

        // Enviar a mensagem para o backend
        axios('/api/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: '12345', // Substitua com um ID real ou dinâmico
                message: userMessage,
                sender: 'user'
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Mensagem enviada:', data);

            // Simular resposta do bot ou usar resposta do backend
            axios('/api/bot-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: '12345', // Mesmo ID do usuário
                    message: userMessage
                })
            })
            .then(res => res.json())
            .then(botResponse => {
                // Exibe a resposta do bot na área de texto "resposta"
                respostaTextarea.value = botResponse.response || 'Erro ao obter resposta do bot.';
            })
            .catch(error => {
                console.error('Erro ao obter resposta do bot:', error);
            });

        })
        .catch(error => {
            console.error('Erro ao enviar mensagem:', error);
        });
    });
});
