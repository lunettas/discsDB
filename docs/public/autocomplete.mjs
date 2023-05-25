// script.js

export default function apiCall() {
  const apiCallBtn = document.getElementById('api-autocomplete-btn');
  const inputField = document.getElementById('inputField');
  const form = $('form');
  const input = $('input[name=q]');

  function handleAPICall() {
  
        const query = input.val().toLowerCase();
        const apiUrl = 'https://discit-api.fly.dev/disc/' + query + '?fields=name,brand,speed,glide,turn,fade';

        $.get(apiUrl, function(response) {
          const mold = response.name || 'Unknown';
          const brand = response.brand || 'Unknown';
          const speed = response.speed || 'Unknown';
          const glide = response.glide || 'Unknown';
          const turn = response.turn || 'Unknown';
          const fade = response.fade || 'Unknown';

          // Set default values of input fields in the second form
          $('#submit-to-db input[name="mold"]').val(mold);
          $('#submit-to-db input[name="brand"]').val(brand);
          $('#submit-to-db input[name="speed"]').val(speed);
          $('#submit-to-db input[name="glide"]').val(glide);
          $('#submit-to-db input[name="turn"]').val(turn);
          $('#submit-to-db input[name="fade"]').val(fade);

          console.log(response);
        })
        .fail(function() {
          // Display an error message to the user
          alert('Failed to lookup the mold. Please try again or enter it manually.');
        });
  }

  inputField.addEventListener('keypress', function(event) {
    if (event.key === 13) {
          event.preventDefault();
          apiCallBtn.click();
        }
      });

  apiCallBtn.addEventListener('click', handleAPICall);
}
