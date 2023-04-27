import {connection} from './db.mjs';

const tableNames = await connection.query('SHOW TABLES');

const tableSelect = document.createElement('select');

for (let i = 0; i < tableNames.length; i++) {
  const option = document.createElement('option');
  option.text = tableNames[i].Tables_in_my_database;
  tableSelect.add(option);
}

tableSelect.addEventListener('change', async (event) => {
  const tableName = event.target.value;
  const [rows, fields] = await connection.execute(`SELECT * FROM ${tableName}`);
  const uniqueRow = rows[0]; // Replace with code to identify the unique row

  const uniqueSelect = document.createElement('select');

  for (const columnName in uniqueRow) {
    const option = document.createElement('option');
    option.text = uniqueRow[columnName];
    uniqueSelect.add(option);
  }

  // Replace the existing table select with the unique select
  event.target.parentNode.replaceChild(uniqueSelect, event.target);
});

// Add the table select to the page
document.body.appendChild(tableSelect);