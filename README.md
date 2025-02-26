![Screenshot of zeroGrav calc](https://i.ibb.co/tpXGtrpj/Screenshot-2025-02-26-at-15-13-51-Web-Based-Calculator.png)
# zeroGrav calc
This is a simple website to do calculator operations. Built by HTML, CSS and JavaScript, for an assignment at a web development course at uni.

## How?
Uses eval() by JavaScript

## Supported Operations
- Addition
- Subtraction
- Multiplication
- Division
- Power (**)

## Features
- Detects if user clicks on the button of the operators (+ - /) twice and ignores it, because such operations are not possible (++,--)
- 0 is automatically placed if the display is empty
- Line break is automatically placed if the number of characters in the display is greater than the limit, and two lines is the limit. An alert would pop up if the user tries to enter more.
- Colors for successful equal operation (light yellow), clearing display (gray), an error from the eval operation (red, and logs the error in the console)
- Font family is console-like, that is the vibe I was going for
- Deleting one character from the display with D button
