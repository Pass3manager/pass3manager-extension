chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fill_form') {
      const { username, password } = message.payload;
     
     const usernameElements = document.querySelectorAll(`input[type="email"]`);
     const passwordElements = document.querySelectorAll(`input[type="password"]`);
     
     usernameElements.forEach(user => user.value = username);
     passwordElements.forEach(pass => pass.value = password);
    }

    
  });