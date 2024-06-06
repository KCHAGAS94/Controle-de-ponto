document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('#video');
    const captureButton = document.querySelector('#capture');
    const messages = document.querySelector('#messages');
    const cadastroForm = document.querySelector('#cadastroForm');
    const downloadRelatorio = document.querySelector('#downloadRelatorio');

    if (video) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
            })
            .catch(err => {
                console.error('Error accessing webcam: ' + err);
            });

        captureButton.addEventListener('click', () => {
            captureImage();
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
                  messages.innerText = data.message;
              });
        });
    }

    if (downloadRelatorio) {
        downloadRelatorio.addEventListener('click', () => {
            window.location.href = '/api/relatorio';
        });
    }

    function captureImage() {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');

        fetch('/api/registrar-ponto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageData })
        }).then(response => response.json())
          .then(data => {
              messages.innerText = data.message;
          });
    }
});
