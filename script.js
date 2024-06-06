document.addEventListener('DOMContentLoaded', function() {
    const scannerInput = document.querySelector('#scannerInput');
    const message = document.querySelector('#message');
    const cadastroForm = document.querySelector('#cadastroForm');
    const downloadRelatorio = document.querySelector('#downloadRelatorio');

    if (scannerInput) {
        scannerInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const codigo = scannerInput.value;
                fetch('/api/registrar-ponto', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ codigo })
                }).then(response => response.json())
                  .then(data => {
                      message.innerText = `${data.nome}, ${data.mensagem} em ${data.dataHora}`;
                      scannerInput.value = '';
                  });
            }
        });
    }

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(cadastroForm);
            fetch('/api/cadastrar', {
                method: 'POST',
                body: formData
            }).then(response => response.json())
              .then(data => {
                  message.innerText = data.message;
              });
        });
    }

    if (downloadRelatorio) {
        downloadRelatorio.addEventListener('click', () => {
            window.location.href = '/api/relatorio';
        });
    }
});
