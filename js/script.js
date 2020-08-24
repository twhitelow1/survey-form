/**
 *  Global Variables
 *  Most are elements from the form that are selected for DOM manipulation.
 */

const otherTitleInput = document.getElementById('other-title');
const jobTitleList = document.getElementById('title');
const otherJobTitleSelected = jobTitleList.options[5];
const jobRoleOptions = document.querySelectorAll('#title option');
const jobTitleOther = jobRoleOptions[5];
const colorDiv = document.getElementById('colors-js-puns');
const colorList = document.getElementById('color');
const colorOptions = document.querySelectorAll('#color option');
const themeList = document.querySelector('#design');
const themeOptions = document.querySelectorAll('#design option');
const checkboxes = document.querySelectorAll('.activities input');
const checkboxFieldset = document.querySelector('.activities');
const checkboxLegend = document.querySelector('.activities legend')
const labels = document.querySelectorAll('.activities label');
const selectPaymentList = document.getElementById('payment');
const paymentOptions = document.querySelectorAll('#payment option');
const creditCardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');
const form = document.querySelector("form");
const ccNum = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const ccLabel = document.querySelector('label[for="cc-num"]');
const zipLabel = document.querySelector('label[for="zip"]');
const cvvLabel = document.querySelector('label[for="cvv"]');
const creditCard = document.getElementById('credit-card');
const zipCol = document.querySelector('#zip-col');
const cardCol = document.querySelector('#card-col');
const cvvCol = document.querySelector('#cvv-col');

let totalCost = 0;



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
    return label
}

/**  Creates an error msg label html node.
 *
 * @param {html node} parentElement - the parent element that the error msg with append to.
 * @param {string} msg - error message that will be display, can be left blank 
 */
const createErrorLabel = (parentElement, referenceNode, msg) => {
    const label = document.createElement("label");
    const att = document.createAttribute("class");
    const id = document.createAttribute("id");
    id.value = "cc-error";
    att.value = "error";
    label.setAttributeNode(id);
    label.setAttributeNode(att);
    const node = document.createTextNode(msg);
    label.appendChild(node);
    parentElement.insertBefore(label, referenceNode);
    return label
}

/**
 * Updates the total price label.
 * @constructor
 * @param {html node} totalElement - The html element that shows the total price.
 */
const updateTotalElement = () => {
    const totalElement = document.querySelector('#total')
    totalElement.innerHTML = `Total: $${totalCost}`;
    return totalElement
}

/**
 * Adds the price of all the selected activities and returns the total
 * @constructor 
 * @param {integer} total - total that is added to and returned by function
 */

const calculateTotal = (checkboxes) => {
    let total = 0;
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            total += parseInt(checkbox.getAttribute('data-cost'));
        }
    })
    return total;
}

/**
 * Hide all the color options. Usually caled upon right before making the colors for selected theme visible in dropdown box
 * @constructor {node list} optionsList - node list of options that are set to hidden.
 * 
 */

const hideAllColorOptions = (optionsList) => {
    for (i = 0; i < optionsList.length; i++) {
        optionsList[i].style.display = 'none';
    }
}

/**
 *  Make all the tshirt colors that match the selected theme
 *  Go through the optionsList and  check the current option's class to see if it is in the theme's options.
 *  if it is then set the display to block so it will appear in the dropdown box
 * @constructor {node list} optionsList - node list of options that are set to hidden.
 * @constructor {string} theme - class that represents what theme the color matches. "puns" or "love"
 * @param {node} currentOption - the current colorOptions[i] in the iteration
 */


const showThemeColors = (optionsList, theme) => {
    hideAllColorOptions(optionsList);

    for (i = 0; i < optionsList.length; i++) {
        currentOption = colorOptions[i]
        if (currentOption.classList.value === theme) {
            currentOption.style.display = 'block';
        }
    }
}

/**
 * Toggle the otherTitle textbox visibility on and off
 * @constructor {node list} input - the input to be toggled on or off
 */
const toggleOtherTitleInput = (input) => {
    if (input.style.display === "none") {
        input.style.display = "block";
    } else {
        input.style.display = "none";
    }
}
// Set the element's display to block so it is visible.
const showElement = (element) => {
    element.style.display = 'block';
}
/** Hide the html element that is passes into the function */

const hideElement = (element) => {
    element.style.display = 'none';
}

/**
 *  Hide all the payment options divs 
 *  Used mostly to clear area before showing the div that is selected.
 */

const hidePayments = () => {
    creditCardDiv.style.display = 'none';
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
    return true;
}

/**
 *  Show the payment option that is selected
 *  @constructor {string} payment - string passed into function to set which payment method
 *  depending on the case it clears the screen of previous payment option then uses showElement to make the
 *  current slected form of payment visibile.
 */

const showPayment = (payment) => {
    switch (payment) {
        case 'creditcard':
            hidePayments();
            showElement(creditCardDiv);
            break;
        case 'paypal':
            hidePayments();
            showElement(paypalDiv);
            break;
        case 'bitcoin':
            hidePayments();
            showElement(bitcoinDiv);
            break;
        default:
            hidePayments();
    }
}


/**
 * Activities checkbox list Event Listener
 * When a checkbox for an activity is check the other activities at that date
 * and time are disabled and the descritiption text is given a line-through it.
 * the 
 * @constructor
 * @param {html node} totalElement - The html element that shows the total price.
 */
document.querySelector('.activities').addEventListener('change', (e) => {
    const clicked = e.target;
    const clickedType = clicked.getAttribute('data-day-and-time');
    let i = 0;
    checkboxes.forEach(function (checkbox) {
        let checkboxType = checkbox.getAttribute('data-day-and-time');
        if (checkboxType === clickedType && clicked !== checkbox) {
            if (clicked.checked) {
                checkbox.disabled = true;
                labels[i].style.color = "grey";

            } else {
                checkbox.disabled = false;
                labels[i].style.color = 'inherit';
            }
        }
        i++;
    })
    totalCost = calculateTotal(checkboxes);
    updateTotalElement();
});


/**
 *  Event Listener on the Design theme dropdown list
 *  @param {node list} target - the element that triggered the event.
 *  if the clicked design is 'js puns' then  run showThemeColors for puns theme
 *  else showThemeColors for the love theme.
 */
themeList.addEventListener('change', (event) => {
    const target = event.target
    if (target.value === 'js puns') {
        hideAllColorOptions(colorOptions);
        showThemeColors(colorOptions, "puns");
        showElement(colorDiv);
    } else if (target.value === 'heart js') {
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
jobTitleList.addEventListener('change', (event) => {
    const target = event.target
    if (target.value === 'other') {
        toggleOtherTitleInput(otherTitleInput)

    } else {
        otherTitleInput.style.display = "none";
    }
});

/**
 *  Event Listener on the payment dropdown list
 *  @param {node list} target - the element that triggered the event.
 *  if the clicked design is 'js puns' then  run showThemeColors for puns theme
 *  else showThemeColors for the love theme.
 */
selectPaymentList.addEventListener('change', (event) => {
    const target = event.target
    console.log(target.value)
    if (target.value === 'credit card') {
        showPayment('creditcard');
    } else if (target.value === 'paypal') {
        showPayment('paypal');
    } else if (target.value === 'bitcoin') {
        showPayment('bitcoin');
    }
});


const emailValidator = () => {
    const emailValue = emailInput.value;
    const symbolIndex = emailValue.indexOf("@");
    const periodIndex = emailValue.lastIndexOf(".");
    if (symbolIndex > 1 && periodIndex > (symbolIndex + 1)) {
        emailInput.style.borderColor = "inherit";
        return true
    } else {
        emailInput.style.borderColor = "red";
        return false
    }
}
const cardInfoValidator = () => {
    cardNumberValidator();
    cvvValidator();
    zipValidator();
    return true
}

const cardNumberValidator = () => {
    const ccNumValue = ccNum.value;
    let regex = /^[1-9][0-9]{12,15}$/
    if (regex.test(ccNumValue)) {
        ccLabel.style.color = "initial";
        ccNum.style.borderColor = "initial"
        ccError.innerHTML = ""
        return true
    } else {
        ccNum.style.borderColor = "red"
        if (ccNumValue.length <= 0) {
            ccError.innerHTML = "Please enter a credit card number."
        } else {
            ccError.innerHTML = "Please enter 13-16 digit card number."
        }
        return false
    }

}

const cvvValidator = () => {
    const cvvValue = cvv.value;
    let regex = /^\d{3}$/
    if (regex.test(cvvValue)) {
        cvv.style.borderColor = "initial"
        return true
    } else {
        cvv.style.borderColor = "red"
        return false
    }
}

const zipValidator = () => {
    const zipValue = zip.value;
    let regex = /^\d{5}$/
    if (regex.test(zipValue)) {
        zip.style.borderColor = "initial"
        return true
    } else {
        zip.style.borderColor = "red"
        return false
    }

}

const inputRegexTest = (regex, inputValue, input) => {
    if (regex.test(inputValue)) {
        input.style.borderColor = 'initial';
    } else {
        input.style.borderColor = 'red';
    }
}
const nameValidator = () => {
    const name = nameInput.value
    var regex = /^[a-zA-Z ]{2,30}$/;
    inputRegexTest(regex, name, nameInput);
    console.log('Event handler working');
}

const activityValidator = () => {
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            console.log("A box is checked");
            checkboxLegend.style.color = "inherit";
            return true;
        }
    }
    console.log("No box checked");
    checkboxLegend.style.color = "red";
    return false
}

checkboxFieldset.addEventListener('change', (e) => {
    if (!emailValidator()) {
        e.preventDefault();
    }
    if (!nameValidator()) {
        e.preventDefault();
    }
    if (!activityValidator()) {
        e.preventDefault();
    }
})

form.addEventListener('keyup', (e) => {
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

})

form.addEventListener('submit', (e) => {
    if (!emailValidator()) {
        e.preventDefault();
    }
})


const ccError = createErrorLabel(creditCard, cardCol, '');

createTotalElement(); // Create the total element when javascript is on so it can display total price after activities are checked
paymentOptions[0].style.display = 'none'; // Hide the 'Select Payment Method' Option from being able to be selected
hideAllColorOptions(colorOptions); // Hide all the color options until a theme is selected
hideElement(themeOptions[0]); // Hide 'Select Theme' in the design theme select list.
hideElement(colorDiv); // hide the color list drop down box until a theme is selected
hideElement(otherTitleInput); // hide otherTitleInput 
showPayment(); // hide the payment since no payment selection was passed into function