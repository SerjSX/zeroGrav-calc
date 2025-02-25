// Wait for the DOM to fully load before running scripts​
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttonsContainer = document.querySelector('.calculator-buttons');
    let currOp;

    // Attach event listener for button clicks​
    buttonsContainer.addEventListener('click', handleButtonClick);

    /**​
    * Handles click events for the calculator buttons.​
    * @param {Event} event - The click event on a button.​
    */
    function handleButtonClick(event) {
        const target = event.target;
        if (target.tagName.toLowerCase() !== 'button') return;

        // Retrieve the button's value from data attribute​
        const buttonValue = target.getAttribute('data-value');
        console.log(buttonValue);
        
        if (buttonValue === "C") {
            clearDisplay();
        } else if (buttonValue === "=") {
            computeResult();
        } else if (buttonValue === "D") {
            delOne();
        } else {
            updateDisplay(buttonValue);
        }

        /**​
        * Updates the display area with new input.​
        * @param {string} value - The value to add to the display.​
        */
        function updateDisplay(value) {
            // storing the current values in the display to identify if
            // it starts with 0 or no
            let currContent = display.innerHTML;
            let lastContent = currContent.at(-1);


            //if the length of the current display is 16, add a line break
            // if it exceeds 32, throw an alert to notify that the user reached the limit
            if (currContent.length == "16") {
                display.innerHTML = display.innerHTML + "<br>";
            } else if (currContent.length == "35") {
                alert("Reached the maximum limit");
            }

            // if the current content in display is 0, then just
            // replace the item of the display by the new value. 
            // this way if a number is put like 1 2 then 0 would be removed
            // intOrNo is added to the condition so this would apply only when
            // the user clicks on another number button. Ex. 09 would be 9 but
            // 0+ would stay as such 
            if (currContent.trim() == "0" && checkInt(buttonValue) == true) {
                display.innerHTML = value;
            } else {
                // the following condition is to prevent the user in putting multiple icons like 
                // + * / and - next to each other. 
                // ex, the user can't insert ** becuase an operation like that is not possible
                // exceptions are done with () since it is possible to have * (x+y)
                if ((lastContent == "*" || lastContent == "+" || lastContent == "-" 
                    || lastContent == "/") && checkInt(buttonValue) == false && buttonValue != "(" && buttonValue != ")" 
                    && buttonValue != ".") {
                    // resets the value to empty so the program does not add anything on the display
                    value = ""; 
                }

                // if the user chose division and then typed 0, throw an error alert because division by 0 is not possible
                if (lastContent == "/" && buttonValue == "0") {
                    alert("You cannot divide by 0! Please enter another number.");
                } else { //else update the display
                    display.innerHTML = display.innerHTML + value;
                }
            }
        }


        /**​
        * Computes the result of the arithmetic expression using the pre-build eval function
        * The input is controlled, so no malicious act can be done with the function
        */
        function computeResult() {

            //some animation to do when the user clicks on the equal button - changes color to yellow then back to original
            const calc = document.getElementById("calculator-container");
            setTimeout(function() {
                calc.style.backgroundColor = "rgb(255, 255, 104)";
            }, 10);

            setTimeout(function() {
                calc.style.backgroundColor = "#b0bec599";
            },500);
            display.innerHTML = splitByLimit(eval(display.innerHTML.replaceAll("<br>", "")));
        }

        /**​
        * Clears the display and resets stored values by clearing the text of the display element
        */
        function clearDisplay() {
            display.innerHTML = "0";
            currOp = null;
        }

        // returns true if the entered number is an integer, and false if it is not
        function checkInt(num) {
            return !Number.isNaN(Number(num));

        }

        // this function returns an answer with a break line if it's too long.
        function splitByLimit(num) {
            num = String(num);
            if (num.length > "16" && num.length <= "35") {
                console.log("returned")
                return num.slice(0,16) + "<br>" + num.slice(16);
            } else {
                return num;
            }
        }


        // this function removes one item from the display
        function delOne() {
            // if there are no numbers then put 0 from the else condition
            if (display.innerHTML.length != 1) {
                // splits the display string to exclude the last character/number
                 display.innerHTML = display.innerHTML.slice(0,display.innerHTML.length-1);
            } else {
                display.innerHTML = "0";
            }
        }
    };
});