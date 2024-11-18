const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email) {
  return emailRegex.test(email);
}
const email1 = "example@gmail.com";
const email2 = "invalid_email";

console.log(validateEmail(email1)); // true
console.log(validateEmail(email2)); // false
