const otherTitleInput = document.getElementById('other-title');
const jobTitleList = document.getElementById('title');
const otherJobTitleSelected = jobTitleList.options[5];
const jobRoleOptions = document.querySelectorAll('#title option');
const jobTitleOther = jobRoleOptions[5];
const colorList = document.getElementById('color');
const colorOptions = document.querySelectorAll('#color option');
const themeList = document.querySelector('#design');
const themeOptions = document.querySelectorAll('#design option');

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
