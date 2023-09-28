let operand = [];
let nums = [];
let result = 0;

function display(id) {
  let val = document.getElementById(id).value;
  operand.push(val);
  // console.log(operand);
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
  // console.log(nums);
}

function getResult() {
  getOperand();

  for (let i = 1; i < nums.length; i = i + 2) {
    if (nums[i] == "×" || nums[i] == "/") {
      if (nums[i] == "×") {
        result += multiply(i);
      } else if (nums[i] == "/") {
        result += divide(i);
      }
    } else if (nums[i] == "+") {
      result += add(i);
      // console.log(result);
    } else if (nums[i] == "−") {
      result += subtract(i);
    }
  }
  // console.log(result);
  document.getElementById("content").innerHTML = result;
  clearOperand();
  clearNums();
  operand.push(result);
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
