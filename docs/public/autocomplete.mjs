export default function apiCall() {
  const apiCallBtn = document.getElementById('api-autocomplete-btn');
  const inputField = document.getElementById('inputField');
  const form = $('form');
  const input = $('input[name=q]');

  function handleAPICall() {
    const query = input.val().toLowerCase();
    const apiUrl = 'https://discit-api.fly.dev/disc?name=' + query;

    $.get(apiUrl, function (response) {
      if (response.length > 0) {
        // Find the exact match based on the query
        const matchingDisc = response.find(disc => disc.name.toLowerCase() === query);

        if (matchingDisc) {
          const mold = matchingDisc.name || 'Unknown';
          const brand = matchingDisc.brand || 'Unknown';
          const speed = matchingDisc.speed || 'Unknown';
          const glide = matchingDisc.glide || 'Unknown';
          const turn = matchingDisc.turn || 'Unknown';
          const fade = matchingDisc.fade || 'Unknown';

          // Update input form based on the matching disc
          $('#submit-to-db input[name="mold"]').val(mold);
          $('#submit-to-db input[name="brand"]').val(brand);
          $('#submit-to-db input[name="speed"]').val(speed);
          $('#submit-to-db input[name="glide"]').val(glide);
          $('#submit-to-db input[name="turn"]').val(turn);
          $('#submit-to-db input[name="fade"]').val(fade);
        } else {
          // Handle the case where no exact match was found
          alert('No matching disc found. Please try again or enter it manually.');
        }
      } else {
        // Handle the case where no results were found
        alert('No matching disc found. Please try again or enter it manually.');
      }
    }).fail(function () {
      // Display an error message to the user
      alert('Failed to lookup the mold. Please try again or enter it manually.');
    });
  }

  inputField.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      apiCallBtn.click();
    }
  });

  apiCallBtn.addEventListener('click', handleAPICall);
}
