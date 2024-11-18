const textRegex = /^[a-zA-Z0-9\s]+$/;

function filterTextInput(input) {
  return input.replace(/[^a-zA-Z0-9\s]/g, "");
}

function validateTextInput(input) {
  return textRegex.test(input);
}

const input1 = "Hello World 123";
const input2 = "Invalid input!@#";

console.log(filterTextInput(input1)); // 'Hello World 123'
console.log(validateTextInput(input1)); // true

console.log(filterTextInput(input2)); // 'Invalid input'
console.log(validateTextInput(input2)); // false
