// Requirements:
// 1. Perform 4 basic arithmetic operations (Add, Subtract, Multiply, Divide)
// 2. Evaluate expressions with Power, Trigonometric, Log and Exponential functions
// 3. Utilize Prompt Engineering and OpenAI's API for ChatGPT to evaluate user expressions

// const API_URL = "https://calculator-ai.onrender.com";
const API_URL = "http://localhost:5000";

let content = document.getElementById("content");

// Display values on the screen
function display(id) {
  // Get value from the selected button
  let val = document.getElementById(id).value;
  // Display value on the screen
  content.innerHTML += val;

  // Force scroll to the end:
  content.scrollLeft = content.scrollWidth;
}

function backspace() {
  content.innerHTML = content.innerHTML.slice(0, -1);
}
// Perform 4 basic arithmetic operations using stack data structure with possible parentheses cases (Parentheses has precedence over other operators)
// TODO: Add parenthees support in calculations
function compute() {
  let expression = content.innerHTML;
  if (!expression) {
    console.log("Invalid expression");
    content.innerHTML = "Invalid";
    return;
  }

  stack = [];
  currNum = 0;
  operator = "+";
  for (let i = 0; i < expression.length; i++) {
    let currChar = expression[i];

    if (currChar >= "0" && currChar <= "9") {
      currNum = currNum * 10 + (currChar - "0");
    }

    if (isNaN(parseInt(currChar)) || i == expression.length - 1) {
      if (operator == "+") {
        stack.push(currNum);
      } else if (operator == "-") {
        stack.push(-currNum);
      } else if (operator == "*") {
        stack.push(stack.pop() * currNum);
      } else if (operator == "/") {
        stack.push(stack.pop() / currNum);
      }
      operator = currChar;
      currNum = 0;
    }
  }

  // console.log("Stack: ", stack);
  let result = 0;
  while (stack.length > 0) {
    result += stack.pop();
  }
  content.innerHTML = result;
  // console.log(result);
}

// Evaluate expressions with Power (^), Trigonometric (sin, cos, tan), Log and Exponential functions (exp, ln, log10)
async function evaluate() {
  const expression = content.innerHTML;

  // Skip if no expression
  if (!expression) {
    content.innerHTML = "Invalid";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/advanced-computing`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expression: expression }),
    });

    const data = await response.json();
    console.log("FRONTEND: ", data);

    // Show the result on the calculator screen
    content.innerHTML = data.result;
  } catch (error) {
    console.log(error);
    content.innerHTML = "Error";
  }
}

function handleCompute() {
  const expression = content.innerHTML.trim();

  // List any advanced operators or function names you want to detect
  const advancedTokens = [
    "!",
    "√",
    "(",
    ")",
    ".",
    "^",
    "sin",
    "cos",
    "tan",
    "sec",
    "csc",
    "log",
    "ln",
    "exp",
    "e",
    "pi",
    "deg",
    "rad",
  ];

  // Check if the expression contains any of the advanced tokens
  const isAdvanced = advancedTokens.some((token) => expression.includes(token));

  // Switch to the appropriate method
  if (isAdvanced) {
    evaluate(); // Uses OpenAI for advanced computations
  } else {
    compute(); // Uses the local stack-based arithmetic
  }
}

// Clear the screen
function clearAll() {
  document.getElementById("content").innerHTML = "";
}

// Bug #1: Performing calculations with minus sign and multiply sign failed to produce correct result because the values of those operators don't match the ones in the HTML file
// Bug #2: Two operators exisiting in a row failed to produce the same result (i.e., 9-+5=14 rather than 4 while 9+-5=4)
// Bug #3: Frontend: Button layout not expected as in the design
// Bug #4: Failure to get response form OpenAPI's API due to invalid model name
// Bug #5: Failure to get correct results for trigonometric functions in radians

// Date worked: 02/09/2024, 02/10/2024, 02/11/2024
