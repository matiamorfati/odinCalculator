let operator = '';
let decimalBool = 0;
let equalityMath = 0;
let previousValue = '';
let currentValue = '';
let deletedValue = '';
let currentValuNumOfDigits = 0;

addEventListener("DOMContentLoaded", ()=> {
    

    let equals = document.querySelector("#equals");
    let decimal = document.querySelector("#decimal");
    let clearBtn = document.querySelector("#clear");
    let deleteBtn = document.querySelector("#delete");

    let numbers = document.querySelectorAll(".num");
    let operators = document.querySelectorAll(".operator");

    let currentScreen = document.querySelector("#calculatorScreenContentCurrent")
    let previousScreen = document.querySelector("#calculatorScreenContentHistory")

    numbers.forEach((number) => number.addEventListener("click", function(e){
        handleNumbers(e.target.textContent);
        currentScreen.textContent = currentValue;
    }));

    operators.forEach((op) => op.addEventListener("click", function(e){
        if (currentValuNumOfDigits != 0)
        {
            handleOperators(e.target.textContent);

            if(decimalBool == true)
            {
                currentScreen.textContent = currentValue;
            }
            else if(equalityMath == true)
            {
                previousScreen.textContent = '=' + previousValue;
                currentScreen.textContent = '';
                equalityMath = false;
            }
            else 
            {
                previousScreen.textContent = previousValue + " " + operator;
                currentScreen.textContent = '';
            }
            
        }
    }));

    clearBtn.addEventListener("click", function(){
        currentScreen.textContent = '';
        previousScreen.textContent = '';
        previousValue = '';
        currentValue = '';
        operator = '';
    })

    deleteBtn.addEventListener("click", function(){
        if(currentValue >= 10)
        {
            currentValue = Math.floor(currentValue / 10);
        }
        else 
        {
            currentValue = '';
        }
        currentScreen.textContent = currentValue;
        if( currentValuNumOfDigits > 0)
        {
            currentValuNumOfDigits -= 1;
        } 
    })


});


function handleNumbers(num) {
 
    if(currentValuNumOfDigits <= 5)
    {
        currentValuNumOfDigits += 1;
        currentValue += num;
    }
}

function handleOperators(op){
    switch(op)
    {
        case '.':
            if(decimalBool != true)
            {
                decimalBool = true;
                currentValue = currentValue + '.';
                currentValuNumOfDigits += 1; 
                console.log(currentValue);
            }
            break;
        case '=':
            equalityMath = true;
            currentValue *= 1;
            previousValue *= 1;
            switch(operator)
            {
                case '-':
                    previousValue = previousValue - currentValue;
                    currentValue = '';
                    previousValue = Math.round(previousValue * 1000) / 1000;
                    break;
                case '+':
                    previousValue = previousValue + currentValue;
                    currentValue = '';
                    previousValue = Math.round(previousValue * 1000) / 1000;
                    break;
                case 'x':
                    previousValue = previousValue * currentValue;
                    currentValue = '';
                    previousValue = Math.round(previousValue * 1000) / 1000;
                    break;
                case '÷':
                    previousValue = previousValue / currentValue;
                    currentValue = '';
                    previousValue = Math.round(previousValue * 1000) / 1000;    
                    break;
            }
            decimalBool = false;
            currentValue = '';
            currentValuNumOfDigits = 0;
            operator = '';
            break;
        default:
            operator = op;
            decimalBool = false;
            currentValuNumOfDigits = 0;
            previousValue = currentValue;
            currentValue = '';
            
    }
}








