/**
 *  Global Variables
 *  Most are elements from the form that are selected for DOM manipulation.
 */

const otherTitleInput = document.getElementById("other-title");
const jobTitleList = document.getElementById("title");
const otherJobTitleSelected = jobTitleList.options[5];
const jobRoleOptions = document.querySelectorAll("#title option");
const jobTitleOther = jobRoleOptions[5];
const colorDiv = document.getElementById("colors-js-puns");
const colorList = document.getElementById("color");
const colorOptions = document.querySelectorAll("#color option");
const themeList = document.querySelector("#design");
const themeOptions = document.querySelectorAll("#design option");
const checkboxes = document.querySelectorAll(".activities input");
const checkboxFieldset = document.querySelector(".activities");
const checkboxLegend = document.querySelector(".activities legend");
const labels = document.querySelectorAll(".activities label");
const selectPaymentList = document.getElementById("payment");
const paymentFieldset = document.querySelector(".payment");
const paymentOptions = document.querySelectorAll("#payment option");
const creditCardDiv = document.getElementById("credit-card");
const paypalDiv = document.getElementById("paypal");
const bitcoinDiv = document.getElementById("bitcoin");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("mail");
const form = document.querySelector("form");
const ccNum = document.querySelector("#cc-num");
const zip = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");
const ccLabel = document.querySelector('label[for="cc-num"]');
const zipLabel = document.querySelector('label[for="zip"]');
const cvvLabel = document.querySelector('label[for="cvv"]');
const creditCard = document.getElementById("credit-card");
const zipCol = document.querySelector("#zip-col");
const cardCol = document.querySelector("#card-col");
const cvvCol = document.querySelector("#cvv-col");
const basicInfoFieldset = document.querySelector(".basic-info");
// Start the total cost at zero and use this to add the total cost of activities
let totalCost = 0;

/**
 *  Utility Functions
 */

// Set the element's display to block so it is visible.
const showElement = (element) => {
    element.style.display = "block";
};
// Hide the html element that is passes into the function 
const hideElement = (element) => {
    element.style.display = "none";
};
// Change the font color of an HTML element
const changeFontColor = (element, color) => {
    element.style.color = color;
}

/**
 * Begin Element Creation Functions
 */

/**
 * Creates the total price label.
 *
 * @param {html node} label - Label node.
 * @param {html node} att - attribute for the label.
 * @param {text node} node - the text that is default for the node
 */

const createTotalElement = () => {
    const label = document.createElement("label");
    const att = document.createAttribute("id");
    att.value = "total";
    label.setAttributeNode(att);
    const node = document.createTextNode(`Total: $${totalCost}`);
    label.appendChild(node);
    checkboxFieldset.appendChild(label);
    return label;
};

/**  Creates an error msg label html node.
 *
 * @param {html node} parentElement - the parent element that the error msg with append to.
 * @param {string} msg - error message that will be display, can be left blank
 */
const createErrorLabel = (parentElement, referenceNode, msg, id, className) => {
    const label = document.createElement("label");
    const att = document.createAttribute("class");
    const idAtt = document.createAttribute("id");
    idAtt.value = id;
    att.value = className;
    label.setAttributeNode(idAtt);
    label.setAttributeNode(att);
    const node = document.createTextNode(msg);
    label.appendChild(node);
    parentElement.insertBefore(label, referenceNode);
    return label;
};
/**
 * Use JS to create error msg labels
 * Reference to constructor for createErrorLabel(parentElement, referenceNode, errorMsg, elementId, className)
 */
const ccError = createErrorLabel(creditCard, cardCol, "", "cc-error", "error");
const nameError = createErrorLabel(
    basicInfoFieldset,
    nameInput,
    "",
    "name-error",
    "error"
);

const emailError = createErrorLabel(
    basicInfoFieldset,
    emailInput,
    "",
    "email-error",
    "error"
);

const paymentError = createErrorLabel(
    paymentFieldset,
    selectPaymentList,
    "",
    "pay-error",
    "error"
);

/**
 * Begin Total Price Functions
 */

/**
 * Updates the total price label.
 * @constructor
 * @param {html node} totalElement - The html element that shows the total price.
 */

const updateTotalElement = () => {
    const totalElement = document.querySelector("#total");
    totalElement.innerHTML = `Total: $${totalCost}`;
    return totalElement;
};

/**
 * Adds the price of all the selected activities and returns the total
 * @constructor
 * @param {integer} total - total that is added to and returned by function
 */

const calculateTotal = (checkboxes) => {
    let total = 0;
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            total += parseInt(checkbox.getAttribute("data-cost"));
        }
    });
    return total;
};

/**
 * Begin Theme and Tshirt Selection Functions
 */

/**
 * Hide all the color options. Usually caled upon right before making the colors for selected theme visible in dropdown box
 * @constructor {node list} optionsList - node list of options that are set to hidden.
 */

const hideAllColorOptions = (optionsList) => {
    for (i = 0; i < optionsList.length; i++) {
        hideElement(optionsList[i]);
    }
};

/**
 *  Make all the tshirt colors that match the selected theme
 *  Go through the optionsList and  check the current option's class to see if it is in the theme's options.
 *  if it is then set the display to block so it will appear in the dropdown box
 * @constructor {node list} optionsList - node list of options that are set to hidden.
 * @constructor {string} theme - class that represents what theme the color matches. "puns" or "love"
 */

const showThemeColors = (optionsList, theme) => {
    hideAllColorOptions(optionsList);
    for (i = 0; i < optionsList.length; i++) {
        if (optionsList[i].classList.value === theme) {
            showElement(optionsList[i]);
        }
    }
};

/**
 * Begin Functions to hide and show payment options based on payment selection
 */

/**
 *  Hide all the payment options divs
 *  Used mostly to clear area before showing the div that is selected.
 */

const hidePayments = () => {
    hideElement(creditCardDiv);
    hideElement(paypalDiv);
    hideElement(bitcoinDiv);
    return true;
};

/**
 *  Show the payment option that is selected
 *  @constructor {string} payment - string passed into function to set which payment method
 *  depending on the case it clears the screen of previous payment option then uses showElement to make the
 *  current slected form of payment visibile.
 */

const showPayment = (payment) => {
    switch (payment) {
        case "creditcard":
            hidePayments();
            showElement(creditCardDiv);
            break;
        case "paypal":
            hidePayments();
            showElement(paypalDiv);
            break;
        case "bitcoin":
            hidePayments();
            showElement(bitcoinDiv);
            break;
        default:
            hidePayments();
    }
};

/**
 *  Begin Form validation functions
 * 
 *  Input Regex Test Function
 * @param regex = regular expression to be checked
 * @param inputValue = the value from the input to be compared to regex
 * @param input = input to be styled red if regex doesn't match
 * if regex test is true then change the input border color to the initial color
 * else (regex failed) then change input border color to red to indicate erro
 */

const inputRegexTest = (regex, inputValue, input) => {
    if (regex.test(inputValue)) {
        input.style.borderColor = "initial";
        return true;
    } else {
        input.style.borderColor = "red";
        return false;
    }
};

/**
 * Email Validator
 * @var {string} emailValue = email input value
 * @var {string} symbolIndex = store result of indexOf() on emailValue string to locate the index of @ symbol
 * @var {string} periodIndex = store result of lastIndexOf() on emailValue string to locate the index of .
 * If @ symbol is at least the second character and the . index is greater than the @ symbol index plus 1. 
 * This basically means the format must be at least like this a@b.c
 * when true change textbox border to initial color and return true
 * else turn the textbox border to red and return false
 */

const emailValidator = () => {
    const emailValue = emailInput.value;
    const symbolIndex = emailValue.indexOf("@");
    const periodIndex = emailValue.lastIndexOf(".");
    if (symbolIndex > 1 && periodIndex > symbolIndex + 1) {
        emailInput.style.borderColor = "initial";
        return true;
    } else {
        emailInput.style.borderColor = "red";
        return false;
    }
};

/**
 * Card Info Validator
 * @function cardNumberValidator = check cardNumber input and return true if valid and false if not
 * @function zipValidator = check zip code input and return true if valid and false if not
 * @function cvvValidator = check cvv # input and return true if valid and false if not
 * @return true when done
 */

const cardInfoValidator = () => {
    cardNumberValidator();
    zipValidator();
    cvvValidator();
    return true;
};

/**
 * Card Number Validator
 * @var regex = regular expression only accepting 13-16 digit numbers
 * if regex test is true then clear error msg. return true
 * else if input was empty ask for a number, else ask for a 13-16 digit number and return false
 */
const cardNumberValidator = () => {
    let regex = /^[1-9][0-9]{12,15}$/;
    if (inputRegexTest(regex, ccNum.value, ccNum)) {
        ccError.innerHTML = "";
        return true;
    } else {
        if (ccNum.value.length <= 0) {
            ccError.innerHTML = "Please enter a credit card number.";
        } else {
            ccError.innerHTML = "Please enter 13-16 digit card number.";
        }
        return false;
    }
};


/**
 * CVV Validator
 * @var regex = regular expression only accepting 3 digits
 * if regex is true then clear error msg. return true
 * else if the error msg doesn't already have a msg then display the cvv error msg
 */

const cvvValidator = () => {
    let regex = /^\d{3}$/;
    if (inputRegexTest(regex, cvv.value, cvv)) {
        ccError.innerHTML = "";
        return true;
    } else {
        if (ccError.innerHTML === "") {
            ccError.innerHTML = "Please enter a 3 digit cvv number";
        }
        return false;
    }
};

/**
 * Zip Validator
 * @var regex = regular expression only accepting 5 digits
 * if regex is true then clear error msg. return true
 * else if the error msg doesn't already have a msg then display the zip code error msg
 */

const zipValidator = () => {
    const zipValue = zip.value;
    let regex = /^\d{5}$/;
    if (inputRegexTest(regex, zipValue, zip)) {
        return true
    } else {
        if (ccError.innerHTML === "") {
            ccError.innerHTML = "Please enter a 5 digit zip code";
        }
        return false;
    }
};

/**
 * Name Validator
 * @var regex = regular expression only accepting Aa-Zz and must be 2-30 characters
 * if regex is true then clear error msg. return true
 * else if the error msg doesn't already have a msg then display the name error msg
 */

const nameValidator = () => {
    var regex = /^[a-zA-Z ]{2,30}$/;
    if (inputRegexTest(regex, nameInput.value, nameInput)) {
        nameError.innerHTML = "";
    } else {
        nameError.innerHTML = "Please enter a name. Letters A-Z only.";
    }
};
/**
 * Activity Validator
 * loop through the checkboxes and if a checkbox is checked the return true
 * if  a checkbox was not found to be checked in loop then no activities were picked so change 
 * the legend font color to red and return false
 *  
 */

const activityValidator = () => {
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            changeFontColor(checkboxLegend, "inherit");
            // checkboxLegend.style.color = "inherit";
            return true;
        }
    }
    changeFontColor(checkboxLegend, "red");
    return false;
};

/**
 *  Payment Validator
 *  If the select payment list is on the default selection then return error msg
 */
const paymentValidator = () => {
    if (selectPaymentList.value === "select method") {
        paymentError.innerHTML = "You must select a payment";
        return false
    } else {
        paymentError.innerHTML = "";
        return true
    }
};

/**
 *  Form Validator Event Listeners
 */

/** When the option in the payment option list changes run the payment validator */
selectPaymentList.addEventListener("change", (e) => {
    paymentValidator();
})
/** When a checkbox fieldset changes run the activities validator */
checkboxFieldset.addEventListener("change", (e) => {
    activityValidator();
});
/** When a key goes up while typing in the email input run the email validator */
emailInput.addEventListener("keyup", (e) => {
    emailValidator();
});
/** When a key goes up while typing in the name input run the name validator */
nameInput.addEventListener("keyup", (e) => {
    nameValidator();
});
/** When a key goes up while typing in a credit card infomation input run the payment and card info validator */
paymentFieldset.addEventListener("keyup", (e) => {
    paymentValidator()
    cardInfoValidator();
});

/**
 *  Form Submit Event Listener
 *  DOM Element => form
 *  Event => Submit
 *  If the any of the validator functions returns false the preventDefault to stop the event
 */

form.addEventListener("submit", (e) => {
    if (!emailValidator()) {
        e.preventDefault();
    }
    if (!nameValidator()) {
        e.preventDefault();
    }
    if (!activityValidator()) {
        e.preventDefault();
    }
    if (!cardInfoValidator()) {
        e.preventDefault();
    }
    if (!paymentValidator()) {
        e.preventDefault();
    }
});

/**
 *  Begin Form Functionality Listeners
 *  Event Listeners for hiding/showing inputs in the form
 */

/**
 * Event Listener for activities checkboxs
 * When a checkbox for an activity is checked the other activities at that date
 * and time are disabled and the descritiption text is given a line-through it.
 * the
 * @var {html node} clicked - event target which should be checkbox
 * @var {string} clickedType - the data attribute that stores day and time of activity
 * @var {int} i - iterator for the labels that need to be selected and changed to grey when not available
 */
checkboxFieldset.addEventListener("change", (e) => {
    const clicked = e.target;
    const clickedType = clicked.getAttribute("data-day-and-time");
    let i = 0;
    checkboxes.forEach(function (checkbox) {
        let checkboxType = checkbox.getAttribute("data-day-and-time");
        if (checkboxType === clickedType && clicked !== checkbox) {
            if (clicked.checked) {
                checkbox.disabled = true;
                changeFontColor(labels[i], "grey");
            } else {
                checkbox.disabled = false;
                changeFontColor(labels[i], "initial");
            }
        }
        i++;
    });
    totalCost = calculateTotal(checkboxes);
    updateTotalElement();
});

/**
 *  Event Listener on the Design theme dropdown list
 *  @param {node list} target - the element that triggered the event.
 *  if the clicked design is 'js puns' then  run showThemeColors for puns theme
 *  else showThemeColors for the love theme.
 */
themeList.addEventListener("change", (event) => {
    const target = event.target;
    if (target.value === "js puns") {
        hideAllColorOptions(colorOptions);
        showThemeColors(colorOptions, "puns");
        showElement(colorDiv);
    } else if (target.value === "heart js") {
        hideAllColorOptions(colorOptions);
        showThemeColors(colorOptions, "love");
        showElement(colorDiv);
    } else {
        hideAllColorOptions(colorOptions);
        hideElement(colorDiv);
    }
});

/**
 *  Event Listener on the Job Title dropdown list
 *  IF the option selected in the dropdown list is other
 *  then toggle the other job title input box to visible
 *  else hide the job title input box.
 * @constructor {node list} input - the input to be toggled on or off
 */
jobTitleList.addEventListener("change", (event) => {
    const target = event.target;
    if (target.value === "other") {
        showElement(otherTitleInput);
    } else {
        hideElement(otherTitleInput);
    }
});

/**
 *  Event Listener on the payment dropdown list
 *  @param {node list} target - the element that triggered the event.
 *  if the clicked design is 'js puns' then  run showThemeColors for puns theme
 *  else showThemeColors for the love theme.
 */
selectPaymentList.addEventListener("change", (event) => {
    const target = event.target;
    console.log(target.value);
    if (target.value === "credit card") {
        showPayment("creditcard");
    } else if (target.value === "paypal") {
        showPayment("paypal");
    } else if (target.value === "bitcoin") {
        showPayment("bitcoin");
    }
});

createTotalElement(); // Create the total element when javascript is on so it can display total price after activities are checked
paymentOptions[0].style.display = "none"; // Hide the 'Select Payment Method' Option from being able to be selected
hideAllColorOptions(colorOptions); // Hide all the color options until a theme is selected
colorOptions[0].index = 2;
hideElement(themeOptions[0]); // Hide 'Select Theme' in the design theme select list.
hideElement(colorDiv); // hide the color list drop down box until a theme is selected
hideElement(otherTitleInput); // hide otherTitleInput
hidePayments(); // Hide all the payment option sections until one other than credit card is selected
showPayment('creditcard'); // by default show the credit card input section