document.addEventListener('DOMContentLoaded', function () {
    const sentenceElement = document.getElementById('sentence');
    const descriptionsElement = document.getElementById('descriptions');
    const submitButton = document.getElementById('submitBtn');
  
    // Split the sentence into words
    const sentence = sentenceElement.textContent.trim();
    const words = sentence.split(' ');
  
    // Create description input fields for each word
    words.forEach((word) => {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = `Description for "${word}"`;
      input.setAttribute('data-word', word);
      descriptionsElement.appendChild(input);
    });
  
    // Function to gather descriptions and submit
    function submitDescriptions() {
      const wordDescriptions = {};
      const inputs = descriptionsElement.getElementsByTagName('input');
  
      for (let i = 0; i < inputs.length; i++) {
        const word = inputs[i].getAttribute('data-word');
        const description = inputs[i].value;
        wordDescriptions[word] = description;
      }
  
      // Here, you can send the wordDescriptions object to the server using AJAX or Fetch API
  
      // Example of sending data to the server (Replace 'YOUR_SERVER_ENDPOINT' with the actual endpoint)
      
      fetch('http://localhost:3000/send-descriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wordDescriptions),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showPopupMessage('Email sent successfully!', true);
        } else {
          showPopupMessage('Error sending email. Please try again.', false);
        }
      })
      .catch(error => {
        console.error('Error sending data:', error);
        showPopupMessage('Error sending email. Please try again.', false);
      });
      
    }
  
    // Function to display the pop-up message
    function showPopupMessage(message, isSuccess) {
      const popup = document.createElement('div');
      popup.className = `popup ${isSuccess ? 'success' : 'error'}`;
      popup.textContent = message;

      document.body.appendChild(popup);

      setTimeout(() => {
        document.body.removeChild(popup);
      }, 3000); // Adjust the timeout (in milliseconds) to control how long the message is displayed
    }

    // Attach event listener to the submit button
    submitButton.addEventListener('click', submitDescriptions);
  });
  