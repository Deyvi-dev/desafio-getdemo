let frames = [];
let isRecording = false;
let orderCounter = 0;
function captureFrame(event) {
  if (!isRecording) return;

  const clickedElement = event.target;
  const pageHTML = document.documentElement.outerHTML;

  const frame = {
    html: pageHTML,
    clickedElement: clickedElement.outerHTML,
    order: orderCounter++,
  };

  frames.push(frame);

  chrome.storage.local.set({ frames }, () => {
    console.log('Frame capturado e armazenado:', frame);
  });
}

document.addEventListener('pointerdown', captureFrame);

// Recuperando os dados ao carregar a página
chrome.storage.local.get(['isRecording', 'frames'], (result) => {
  isRecording = result.isRecording || false;
  frames = result.frames || [];

  if (isRecording) {
    console.log('Gravação continua após recarregar a página. Frames capturados:', frames);
  }
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'startRecording') {
    isRecording = true;
    chrome.storage.local.set({ isRecording: true, frames });
    console.log('Gravação iniciada...');
    sendResponse({ status: 'Gravação iniciada' });
  }

  if (request.action === 'stopRecording') {
    isRecording = false;
    chrome.storage.local.set({ isRecording: false });
      try {
        const response = await fetch('https://40a0-45-171-131-254.ngrok-free.app/api/frames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            frames: frames
          }),
        });

        if (!response.ok) {
          throw new Error('Erro na resposta da API: ' + response.status);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
        } else {
          throw new Error('Resposta da API não é JSON. Content-Type: ' + contentType);
        }
      } catch (error) {
        console.error('Erro ao enviar dados para a API:', error.message);
      } finally {
        frames = []; 
        sendResponse({ status: 'Gravação parada e dados enviados' });
      }
   

    return true;
  }
});
