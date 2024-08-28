document.getElementById('startRecording').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'startRecording' }, (response) => {
        document.getElementById('startRecording').disabled = true;
        document.getElementById('stopRecording').disabled = false;
        document.getElementById('status').textContent = 'Gravação em andamento...';
      });
    });
  });
  
  document.getElementById('stopRecording').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'stopRecording' }, (response) => {
        document.getElementById('startRecording').disabled = false;
        document.getElementById('stopRecording').disabled = true;
        document.getElementById('status').textContent = 'Gravação parada. Verifique o console para os dados.';
      });
    });
  });
  
  // Checar o estado da gravação ao abrir o popup
  chrome.storage.local.get('isRecording', (result) => {
    const isRecording = result.isRecording || false;
    document.getElementById('startRecording').disabled = isRecording;
    document.getElementById('stopRecording').disabled = !isRecording;
    document.getElementById('status').textContent = isRecording
      ? 'Gravação em andamento...'
      : 'Pronto para gravar.';
  });
  