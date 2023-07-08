// Select the form and input elements
const form = document.querySelector("#myForm");
const nameInput = form.querySelector("#name");
const emailInput = form.querySelector("#email");
const phoneInput = form.querySelector("#phone");
const occupationInput = form.querySelector("#occupation");
const genderInputs = form.querySelectorAll('input[name="gender"]');
const genderContainer = form.querySelector(".gender-container");

// Listen for form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm();
});

// Function to validate the form
function validateForm() {
    // Reset error messages before validating
    resetErrorMessages();

    // Get the values of input fields
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    const occupationValue = occupationInput.value.trim();
    let genderValue = null;

    // Validate name field
    if (nameValue === "") {
        showError(nameInput, "Please enter your name here...");
    }

    // Validate gender field
    let isGenderSelected = false;
    genderInputs.forEach(function (input) {
        if (input.checked) {
            isGenderSelected = true;
            genderValue = input.value;
        }
    });

    if (!isGenderSelected) {
        showError(genderContainer, "Please select your gender.");
    }

    // Validate email field
    if (emailValue === "") {
        showError(emailInput, "Please enter your email here...");
    } else if (!isValidEmail(emailValue)) {
        showError(emailInput, "The email format is invalid.");
    }

    // Validate phone field
    if (phoneValue === "") {
        showError(phoneInput, "Please enter your phone here...");
    } else if (!isValidPhone(phoneValue)) {
        showError(phoneInput, "The phone format is invalid.");
    }

    // Validate occupation field word limit
    if (occupationValue !== "") {
        const wordCount = occupationValue.split(" ").length;
        if (wordCount > 5) {
            showError(occupationInput, "Max. 5 words only.");
        }
    }

    // If all fields are valid, record the data
    if (
        nameValue !== "" &&
        emailValue !== "" &&
        phoneValue !== "" &&
        isValidEmail(emailValue) &&
        isValidPhone(phoneValue) &&
        (occupationValue === "" || occupationValue.split(" ").length <= 5) &&
        isGenderSelected) {
        const formData = {
            name: nameValue,
            email: emailValue,
            phone: phoneValue,
            occupation: occupationValue || "",
            gender: genderValue,
        };

        // Store the form data in localStorage
        storeFormData(formData);
        form.reset();
    }
}

// Function to reset error messages
function resetErrorMessages() {
    // Get all error messages and input fields
    const errorMessages = form.querySelectorAll(".error-message");
    const inputFields = form.querySelectorAll("input");

    // Reset error messages and remove error class from input fields
    errorMessages.forEach(function (errorMessage) {
        errorMessage.textContent = "";
        errorMessage.style.display = "none";
    });

    inputFields.forEach(function (input) {
        input.classList.remove("error-input");
    });
}

// Function to show an error message for a specific input field
function showError(input, message) {
    const errorMessage = input.parentElement.querySelector(".error-message");
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    input.classList.add("error-input");
}

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

// Function to validate phone number format
function isValidPhone(phone) {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
}

// Function to store form data in localStorage
function storeFormData(formData) {
    // Retrieve existing form data from localStorage
    const existingData = localStorage.getItem("formData");

    // Parse the existing data or initialize an empty array
    const dataArray = existingData ? JSON.parse(existingData) : [];

    // Add the new form data to the array
    dataArray.push(formData);

    // Convert the array back to a string and store it in localStorage
    localStorage.setItem("formData", JSON.stringify(dataArray));
}
