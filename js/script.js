const otherTitleInput = document.getElementById('other-title');
const jobTitleList = document.getElementById('title');
const otherJobTitleSelected = jobTitleList.options[5];
const jobRoleOptions = document.querySelectorAll('#title option');
const jobTitleOther = jobRoleOptions[5];
const colorList = document.getElementById('color');
const colorOptions = document.querySelectorAll('#color option');
const themeList = document.querySelector('#design');
const themeOptions = document.querySelectorAll('#design option');
//Get Checkboxes
const checkboxes = document.querySelectorAll('.activities input');
const checkboxFieldset = document.querySelector('.activities');
const labels = document.querySelectorAll('.activities label');

let totalCost = 0;

const createTotalElement = () => {
    const label = document.createElement("label");
    const att = document.createAttribute("id");
    att.value = "total";
    label.setAttributeNode(att);
    const node = document.createTextNode(`Total: $${totalCost}`);
    label.appendChild(node);
    checkboxFieldset.appendChild(label);
}
createTotalElement();

const updateTotalElement = () => {
    const totalElement = document.querySelector('#total')
    totalElement.innerHTML = `Total: $${totalCost}`;
    return totalElement
}

document.querySelector('.activities').addEventListener('change', (e) => {
    const clicked = e.target;
    const clickedType = clicked.getAttribute('data-day-and-time');
    let i = 0;
    checkboxes.forEach(function (checkbox) {
        let checkboxType = checkbox.getAttribute('data-day-and-time');
        if(checkboxType === clickedType && clicked !== checkbox){
            if(clicked.checked){
                checkbox.disabled = true;
                labels[i].style.textDecoration = "line-through";
                
            } else {
                checkbox.disabled = false;
                labels[i].style.textDecoration = "none";
            }
        }
        i++;
    })
    totalCost = calculateTotal(checkboxes);
    updateTotalElement();
});

const calculateTotal = (checkboxes) => {
    let total = 0;
    checkboxes.forEach(function (checkbox) {
        if(checkbox.checked){
            total += parseInt(checkbox.getAttribute('data-cost'));
        }
    })
    
    return total;
}


const getOtherJobOption = (optionsList) =>{
    for(i = 0; i < optionsList.length; i ++){
        if(optionsList[i].vaule === 'other'){
            return optionsList[i]
        }
    }
}

const hideAllColorOptions = (optionsList) =>{
    for(i = 0; i < optionsList.length; i ++){
        optionsList[i].style.display = 'none';
    }
}

const showPunsThemeColors = (optionsList) => {
    hideAllColorOptions(optionsList);

    for(i = 0; i < optionsList.length; i ++){
        currentOption = colorOptions[i]
        if(currentOption.classList.value === 'puns'){
            currentOption.style.display = 'block';
        }
    }
}

const showLoveThemeColors = (optionsList) => {
    hideAllColorOptions(optionsList);

    for(i = 0; i < optionsList.length; i ++){
        currentOption = colorOptions[i]
        if(currentOption.classList.value === 'love'){
            currentOption.style.display = 'block';
        }
    }
}

hideAllColorOptions(colorOptions);


toggleOtherTitleInput = (input) => {
    if (input.style.display === "none") {
        input.style.display = "block";
    } else {
        input.style.display = "none";
    }
}

toggleOtherTitleInput(otherTitleInput);

themeList.addEventListener('change', (event) => {
    const target = event.target
    if (target.value === 'js puns'){
        showPunsThemeColors(colorOptions);        
    }else{
        showLoveThemeColors(colorOptions); 
    }
});

jobTitleList.addEventListener('change', (event) => {
    const target = event.target
    if (target.value === 'other'){
        toggleOtherTitleInput(otherTitleInput)
        
    } else{
            otherTitleInput.style.display = "none";
     }
});
