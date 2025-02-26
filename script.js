// Wait for the DOM to fully load before running scripts​
document.addEventListener('DOMContentLoaded', () => {
    //grabs and stores the display and button container element
    const display = document.getElementById('display');
    const buttonsContainer = document.querySelector('.calculator-buttons');

    //currOp stores the current operation the user clicked on
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

        
        // If the user clicked on C, = or D then those are considered special operations and their
        // respective functions are called. Any other button is passed to the updateDisplay(buttonValue) function
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
            let lastContent = currContent.at(-1); //stores the last value of the display to prevent illegal displays afterwards


            //if the length of the current display is 16, add a line break
            // if it exceeds 32, throw an alert to notify that the user reached the limit
            if (currContent.length == "16") {
                display.innerHTML = display.innerHTML + "<br>";
            } else if (currContent.length == "35") {
                alert("Reached the maximum limit - 35 character count");
            }

            // if the current content in display is 0, then just
            // replace the item of the display by the new value. 
            // this way if a number is put like 1 2 then 0 would be removed
            // intOrNo is added to the condition so this would apply only when
            // the user clicks on another number button. Ex. 09 would be 9 but
            // 0+ would stay as such. I have also added ( and ) since 0( or 0) are not possible rather are illegal
            if ((currContent.trim() == "0" && (checkInt(buttonValue) == true || buttonValue == "(" || buttonValue == ")"))) {
                display.innerHTML = value;
            } else {
                // the following condition is to prevent the user in putting multiple icons like 
                // + * / and - next to each other. 
                // ex, the user can't insert ++ becuase an operation like that is not possible
                // exceptions are done with () since it is possible to have * (x+y)
                // ** is an exception too since that is a power operation - if the user finds out about it ;)
                if ((lastContent == "+" || lastContent == "-" || lastContent == "/") && 
                     checkInt(buttonValue) == false && buttonValue != "(" && buttonValue != ")" 
                    && buttonValue != ".") {
                    // resets the value to empty so the program does not add anything on the display
                    value = ""; 
                }

                // adds the value to the current display content
                display.innerHTML = display.innerHTML + value;
                
            }
        }


        /**​
        * Computes the result of the arithmetic expression using the pre-build eval function
        * The input is controlled, so no malicious act can be done with the function
        */
        function computeResult() {
            //some animation to do when the user clicks on the equal button - changes color to a lighter shade of yellow then back to original
            changeBackColor("rgb(255, 255, 104)")

            // wrapping in a try-catch blocks so in case an error is thrown from eval, the program catches
            // visualizes the error by red background and logs it in the console.
            try {
                /** 
                    storing the result in a variable to track division by zero error
                    the result is passed through some operations:
                        1. all <br> are replaced by empty string to prevent errors
                        2. the result is passed as parameter to the function splitByLimit() to add br if the result
                            is too long.
                **/
                const result = splitByLimit(eval(display.innerHTML.replaceAll("<br>", "")));

                // if the result is not Infinity, hence the user didn't divide by 0, then display the result
                if (result != Infinity) {
                    display.innerHTML = result;
                // if it is Infinity, then throw an alert to inform the user of the illegal operation
                } else {
                    alert("You cannot divide by 0!");
                }
            }
            catch (err) {
                //changes backgroundColor of calc to red then back to original
                changeBackColor("red");

                //logs the error in console
                console.log(err);              
            }

        }

        /**​
        * Clears the display and resets stored values by clearing the text of the display element
        */
        function clearDisplay() {
            display.innerHTML = "0";
            currOp = null;

            //changes the calc's background color to gray
            changeBackColor("gray");
        }

        // returns true if the entered number is an integer, and false if it is not. Used in some conditional testing above
        function checkInt(num) {
            return !Number.isNaN(Number(num));
        }

        // this function returns an answer with a break line if it's too long.
        function splitByLimit(num) {
            num = String(num);
            if (num.length > "16" && num.length <= "35") {
                //adds a line break between the limit and the rest of the content sliced
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

        //this function changes the background color of the calculator to another given color (paramether toColor), then back to original
        function changeBackColor(toColor) {
            //grabs the calculator element
            const calc = document.getElementById("calculator-container");

            // first changes the backgroundcolor to the user passed color as paramether, 10ms
            setTimeout(function() {
                calc.style.backgroundColor = toColor;
            }, 10);

            // then changes it back after 500ms to the default color
            setTimeout(function() {
                calc.style.backgroundColor = "#b0bec599";
            },500); 
        }
    };
});

