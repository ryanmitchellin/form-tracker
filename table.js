// Select the table body element
const tableBody = document.querySelector("#recordTable tbody");

// Retrieve the stored data from localStorage
const storedData = localStorage.getItem("formData");

// Check if there is stored data
if (storedData) {
    // Parse the stored data to an array of objects
    const formData = JSON.parse(storedData);

    // Loop through the form data and create table rows
    formData.forEach((data, index) => {
        const newRow = createTableRow(data, index);
        tableBody.appendChild(newRow);
    });
}

// Function to create a table row for the given data and index
function createTableRow(data, index) {
    const newRow = document.createElement("tr");

    const nameCell = createTableCell(data.name);
    const genderCell = createTableCell(data.gender);
    const emailCell = createTableCell(data.email);
    const phoneCell = createTableCell(data.phone);
    const occupationCell = createTableCell(data.occupation || "-");
    const editCell = createEditCell(index);
    const saveCell = createSaveCell(index);
    const deleteCell = createDeleteCell(index);

    newRow.appendChild(nameCell);
    newRow.appendChild(genderCell);
    newRow.appendChild(emailCell);
    newRow.appendChild(phoneCell);
    newRow.appendChild(occupationCell);
    newRow.appendChild(editCell);
    newRow.appendChild(saveCell);
    newRow.appendChild(deleteCell);

    return newRow;
}

// Function to create a table cell with the given text content
function createTableCell(content) {
    const cell = document.createElement("td");
    cell.textContent = content;
    return cell;
}

// Function to create the edit cell for a row
function createEditCell(index) {
    const editCell = document.createElement("td");
    editCell.classList.add("edit-cell");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
        editRow(index);
    });
    editCell.appendChild(editButton);
    return editCell;
}

// Function to create the save cell for a row
function createSaveCell(index) {
    const saveCell = document.createElement("td");
    saveCell.classList.add("save-cell");
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => {
        saveRow(index);
    });
    saveCell.appendChild(saveButton);
    return saveCell;
}

// Function to create the delete cell for a row
function createDeleteCell(index) {
    const deleteCell = document.createElement("td");
    deleteCell.classList.add("delete-cell");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        deleteRow(index);
    });
    deleteCell.appendChild(deleteButton);
    return deleteCell;
}

// Function to delete a row
function deleteRow(index) {
    // Remove the data from the form data array
    const storedData = localStorage.getItem("formData");
    const formData = JSON.parse(storedData);
    formData.splice(index, 1);

    // Update the stored data in localStorage
    localStorage.setItem("formData", JSON.stringify(formData));

    // Remove the row from the table
    const tableRows = document.querySelectorAll("#recordTable tbody tr");
    tableRows[index].remove();
}

// Function to edit a row
function editRow(index) {
    const tableRow = tableBody.children[index];

    // Disable the edit button and enable the save button
    const editButton = tableRow.querySelector("td:nth-child(6) button");
    const saveButton = tableRow.querySelector("td:nth-child(7) button");
    editButton.disabled = true;
    saveButton.disabled = false;

    // Enable editing for each cell in the row
    for (let i = 0; i < tableRow.cells.length - 3; i++) {
        const cell = tableRow.cells[i];
        const content = cell.textContent;
        cell.innerHTML = `<input type="text" value="${content}" class="edit-input" style="width: ${cell.offsetWidth}px;">`;
    }
}

// Function to save a row
function saveRow(index) {
    const tableRow = tableBody.children[index];

    // Enable the edit button and disable the save button
    const editButton = tableRow.querySelector("td:nth-child(6) button");
    const saveButton = tableRow.querySelector("td:nth-child(7) button");
    editButton.disabled = false;
    saveButton.disabled = true;

    // Get the edited values from each cell and update the table
    for (let i = 0; i < tableRow.cells.length - 3; i++) {
    const cell = tableRow.cells[i];
    const input = cell.querySelector("input");
    const content = input.value;
    cell.textContent = content;
    }

    // Update the stored data in localStorage
    const storedData = localStorage.getItem("formData");
    const formData = JSON.parse(storedData);
    const updatedData = {
        name: tableRow.cells[0].textContent,
        gender: tableRow.cells[1].textContent,
        email: tableRow.cells[2].textContent,
        phone: tableRow.cells[3].textContent,
        occupation: tableRow.cells[4].textContent,
    };

    formData[index] = updatedData;
    localStorage.setItem("formData", JSON.stringify(formData));
}

// Function to sort the table by the selected column
function sortTable(columnIndex) {
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    // Sort the rows based on the specified column
    rows.sort((a, b) => {
        const aValue = a.getElementsByTagName("td")[columnIndex].textContent;
        const bValue = b.getElementsByTagName("td")[columnIndex].textContent;
        return aValue.localeCompare(bValue);
    });

    // Clear the table body
    tableBody.innerHTML = "";

    // Re-append the sorted rows to the table
    rows.forEach((row) => {
        tableBody.appendChild(row);
    });
}
