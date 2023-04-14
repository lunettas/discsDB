//  TODO: probably delete this? or extract the script code from the input form and put it here?

// The code looks good. It uses the user input from the query parameter to construct an API URL, and then makes a GET request to the API using the https module. When the response is received, it extracts the necessary data from the response and renders a form with some pre-filled input fields using the extracted data.
const express = require('express');
const https = require('https');
const router = express.Router();

app.use('./autocomplete', autocompleteRouter); // Add the autocomplete router as a middleware
router.get('/', async (req, res) => {
  const query = req.query.q; // get user input from query parameter
  const apiUrl = `https://discit-api.fly.dev/disc?q=${query}`; // construct API URL with query parameter

  let discData;

  const request = https.get(apiUrl, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      discData = JSON.parse(data); // extract necessary data from response
      res.render('form',{
        title: 'Submit Disc',
        action: '/discs',
        method: 'POST',
        fields: [
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Brand', name: 'brand', type: 'text' },
          { label: 'Speed', name: 'speed', type: 'number', value: discData.speed },
          { label: 'Glide', name: 'glide', type: 'number', value: discData.glide },
          { label: 'Turn', name: 'turn', type: 'number' },
          { label: 'Fade', name: 'fade', type: 'number' },
          { label: 'Stability', name: 'stability', type: 'text' }
        ]
      }); 
    });
  });

  request.on('error', (error) => {
    console.error(error);
    res.status(500).send('Error fetching autocomplete values');
  });
});

module.exports = router;

//autocomplete
// 1 Add an event listener to the input field that triggers a function to make an API call.
// 2 Inside the function, use the input value to make the API call and retrieve the necessary data.
// 3 Store the data from the API call in variables.
// 4 Add an event listener to the form submit button that triggers a function to collect all the form data.
// 5 Inside the function, retrieve the values from the input fields and store them in variables.
// 6 Combine the values from the API call with the user input values.
// 7 Submit the combined values to the server.
// In this example, input-field is the input field where the user enters their input, submit-button is the button that submits the form, and apiEndpoint is the endpoint of the API that is called.
// When the user enters input into input-field, the API call is made and the values from the response are stored in variables. When the user clicks the submit button, the values from the input fields are retrieved and combined with the API values to create a combined values object. The combined values object is then sent to the server via a POST request.
const inputField = document.getElementById('input-field');
const submitButton = document.getElementById('submit-button');
const apiEndpoint = 'https://example.com/api';

app.use('./autocomplete', autocompleteRouter); // Add the autocomplete router as a middleware

inputField.addEventListener('input', () => {
  const inputValue = inputField.value;
  fetch(`${apiEndpoint}?input=${inputValue}`)
    .then(response => response.json())
    .then(data => {
      const apiValue1 = data.value1;
      const apiValue2 = data.value2;
      // store api values in variables
    })
    .catch(error => {
      console.error(error);
    });
});

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  const weight = document.getElementById('input-weight').value;
  const discColor = document.getElementById('color').value;
  const discStamp = document.getElementById('stamp').value;
  // retrieve user input values
  const combinedValues = {
    weight,
    discColor,
    discStamp,
    apiValue1,
    apiValue2
  };
  // combine api values with user input values
  fetch('/submit-form', {
    method: 'POST',
    body: JSON.stringify(combinedValues),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Form submitted successfully!');
    })
    .catch(error => {
      console.error(error);
    });
});






























// old from appendFile.js
//  TODO: set up autocomplete
//route for autocomplete

// app.get('/autocomplete-values', (req, res) => {
//   const query = 'SELECT DISTINCT mold FROM silasdiscs';
//   connection.query(query, (error, results, fields) => {
//     if (error) throw error;
//     const values = results.map(result => result.name);
//     res.json(values);
//   });
// });

// app.get('/autocomplete.js', function(req, res) {
//   res.set('Content-Type', 'text/javascript');
//   res.sendFile(path.join(__dirname, 'autocomplete.js'));
// });




//Old code
// $('.basicAutoComplete').autoComplete({
//     resolverSettings: {
//       url: function() {
//         var fieldName = $(this).attr('name');
//         return '/autocomplete-values/' + fieldName;
//       },
//       dataType: 'json',
//       data: function(term, response) {
//         return { q: term };
//       },
//       transformResult: function(response) {
//         return {
//           suggestions: $.map(response, function(value) {
//             return { value: value };
//           })
//         };
//       }
//     }
//   });