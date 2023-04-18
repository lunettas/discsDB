//implementing table specific collections// Get references to the select elements
const tableSelect = document.getElementById('table-select');
const optionSelect = document.getElementById('option-select');
const updateChartBtn = document.getElementById('update-chart-btn');
let selectedOption = optionSelect.value;
let selectedTable = tableSelect.value;


export function updateChart() {
    selectedOption = optionSelect.value;
    console.log(selectedTable, selectedOption);
    // code to update chart based on selected option
    
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

    // Populate the options of the option select element based on the selected table
    if (selectedTable === 'silasdiscs') {
    const options = [
        //'Main Bag', 'Side Bag', 'Collection', 'Backup', 'Emily', 'Sale / Trade'
        { value: 'Main Bag', label: 'Main Bag' },
        { value: 'Side Bag', label:'Side Bag' },
        { value: 'Collection', label: 'Collection' },
        { value: 'Backup', label: 'Backup' },
        { value: 'Emily', label: 'Emily' },
        { value: 'Sale / Trade', label: 'Sale / Trade' }
    ];

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        optionSelect.appendChild(optionElement);
    });
    } else if (selectedTable === 'jcdiscs') {
    const options = [
        { value: 'Main Bag', label: 'Main Bag' },
        { value: 'Side Bag', label:'Side Bag' },
        { value: 'Collection', label: 'Collection' },
        { value: 'Backup', label: 'Backup' },
        { value: 'Emily', label: 'Emily' },
        { value: 'Sale / Trade', label: 'Sale / Trade' },
        { value: 'Loan', label: 'Loan' },
        { value: 'Dalton', label: 'Dalton' },
        { value:'Max', label: 'Max' },
        { value: 'Silas', label: 'Silas' }
    ];

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        optionSelect.appendChild(optionElement);
    });
    } else if (selectedTable === 'testdiscs') {
    const options = [
        { value: 'Main Bag', label: 'Main Bag' },
        { value: 'Side Bag', label:'Side Bag' },
        { value: 'Collection', label: 'Collection' },
        { value: 'Backup', label: 'Backup' },
        { value: 'Emily', label: 'Emily' },
        { value: 'Sale / Trade', label: 'Sale / Trade' },
        { value: 'Loan', label: 'Loan' },
        { value: 'Dalton', label: 'Dalton' },
        { value:'Max', label: 'Max' },
        { value: 'Silas', label: 'Silas' },
        { value: 'Simon', label: 'Simon' }
    ];

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        optionSelect.appendChild(optionElement);
    });
    }
    });
