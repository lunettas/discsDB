$(document).ready(function() {
  // Populate the table-select dropdown
  $.get('/input-table-names', function(tableNames) {
    const tableSelect = document.getElementById('table-select');
    tableNames.forEach(tableName => {
      const optionElement = document.createElement('option');
      optionElement.value = tableName;
      optionElement.textContent = tableName;
      tableSelect.appendChild(optionElement);
    });

    // Check if there are no table names
    if (tableNames.length === 0) {
      const optionElement = document.createElement('option');
      optionElement.textContent = 'No tables available';
      tableSelect.appendChild(optionElement);
    }
  });

  // Add an event listener to the table-select dropdown
  $('#table-select').change(function() {
    const selectedTable = $(this).val();
    const optionSelect = document.getElementById('option-select');

    // Clear the existing options
    optionSelect.innerHTML = '';

    // Populate the option-select dropdown based on the selected table
    $.get('/table-options?table=' + selectedTable, function(options) {
      const additionalOptions = ["Main Bag", "Side Bag", "Collection", "Backup", "Sale / Trade"];
    
      // Clear the existing options
      optionSelect.innerHTML = '';
    
      additionalOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.textContent = option;
        optionSelect.appendChild(optionElement);
      });
    
      if (options.length > 0) {
        options.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option;
          optionElement.textContent = option;
          optionSelect.appendChild(optionElement);
        });
      }
    });    
  });
});

