// import { connection } from '/db.mjs';
import mysqlPromise from '../node_modules/mysql2/promise.js';
import {connection} from './db.mjs';

//implementing table specific collections// Get references to the select elements
const tableSelect = document.getElementById('table-select');
const optionSelect = document.getElementById('option-select');
const updateChartBtn = document.getElementById('update-chart-btn');
let selectedOption = "no selection made";
let selectedTable = "no selection made";




export function updateChart() {
     selectedOption = optionSelect.value;
     selectedTable = tableSelect.value;
    console.log(selectedTable, selectedOption);
    // Make an AJAX request to get the data for the selected table and option
    fetch(`/api/${selectedTable}?${selectedOption}=1`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Update the chart using the data
      })
      .catch(error => console.error(error));
  }
updateChartBtn.addEventListener('click', function() {
    updateChart();
    });
// Add an event listener to the option select element
optionSelect.addEventListener('change', function() {
    console.log(selectedOption);
    updateChart();
});
// Add an event listener to the table select element
tableSelect.addEventListener('change', function() {
    // Clear the options of the option select element
    optionSelect.innerHTML = '';

    // Get the selected value of the table select element
    selectedTable = tableSelect.value;

    // Retrieve the options from the MySQL database based on the selected table
  connection.query(`SELECT option_value, option_label FROM ${selectedTable}_options`, (error, results, fields) => {
    if (error) {
      console.error('Error retrieving options from MySQL database: ' + error.stack);
      return;
    }

    // Populate the options of the option select element with the retrieved options
    results.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.option_value;
      optionElement.textContent = option.option_label;
      optionSelect.appendChild(optionElement);
    });
  });
});

    updateChartBtn.addEventListener('click', updateChart);
