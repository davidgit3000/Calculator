let operand = [];
let nums = [];
let numOperators = 0;
let result = 0;

function display(id) {
  let val = document.getElementById(id).value;
  operand.push(val);
  console.log(operand);
  document.getElementById("content").innerHTML += val;
}

function getOperand() {
  let numString = "";
  for (let i = 0; i < operand.length; i++) {
    let op = operand[i];
    if (op != "+" && op != "−" && op != "×" && op != "/") {
      numString += operand[i];
    } else {
      nums.push(parseInt(numString, 10));
      numString = "";
      nums.push(op);
    }
  }
  nums.push(parseInt(numString, 10));
  console.log(nums);
}

function countOperators() {
  for (let num of nums) {
    if (typeof num == "string") {
      numOperators++;
    }
  }
  console.log(numOperators);
}

function calcSingleOperation() {
  for (let i = 1; i < nums.length; i = i + 2) {
    if (nums[i] == "+") {
      result += add(i);
    } else if (nums[i] == "−") {
      result += subtract(i);
    } else if (nums[i] == "×") {
      result += multiply(i);
    } else if (nums[i] == "/") {
      result += divide(i);
    }
  }
}

function processPrioritizedOperator(op) {
  let location = nums.indexOf(op);
  let intermidateResult = 0;

  while (location != -1) {
    if (op == "/") {
      intermidateResult = divide(location);
    } else if (op == "×") {
      intermidateResult = multiply(location);
    }

    nums.splice(location - 1, 3);
    nums.splice(location - 1, 0, intermidateResult);
    console.log(nums);
    location = nums.indexOf(op);
  }
}

function calcMultiOperations() {
  processPrioritizedOperator("/");
  processPrioritizedOperator("×");

  // console.log(nums);
  if (nums.includes("+") || nums.includes("−")) {
    let i = 1;
    while (nums.length > 1) {
      result = 0;
      if (nums[i] == "+") {
        result += add(i);
        console.log(result);
      } else if (nums[i] == "−") {
        result += subtract(i);
      }
      nums.splice(i - 1, 3);
      nums.splice(i - 1, 0, result);
      console.log(nums);
    }
  } else {
    result = nums[0];
  }
}

function getResult() {
  getOperand();
  countOperators();

  if (numOperators == 1) {
    calcSingleOperation();
  } else {
    calcMultiOperations();
  }

  console.log(result);
  document.getElementById("content").innerHTML = result;
  clearOperand();
  clearNums();
  operand.push(result);
  numOperators = 0;
  result = 0;
}

function add(opIndex) {
  return nums[opIndex - 1] + nums[opIndex + 1];
}

function subtract(opIndex) {
  return nums[opIndex - 1] - nums[opIndex + 1];
}

function multiply(opIndex) {
  return nums[opIndex - 1] * nums[opIndex + 1];
}

function divide(opIndex) {
  return nums[opIndex - 1] / nums[opIndex + 1];
}

function isEmpty(arr) {
  if (arr.length == 0) {
    return true;
  } else {
    return false;
  }
}

function clearOperand() {
  while (!isEmpty(operand)) {
    operand.pop();
  }
}

function clearNums() {
  while (!isEmpty(nums)) {
    nums.pop();
  }
}

function clearAll() {
  result = 0;
  clearOperand();
  clearNums();
  return (document.getElementById("content").innerHTML = "");
}

function toString(op) {
  let num = "";
  for (let i = 0; i < op.length; i++) {
    num += op[i];
  }
  return num;
}
