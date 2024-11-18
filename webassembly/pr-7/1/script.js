let wasmModule;
const historySection = document.getElementById("history");
let operations = [];

async function load() {
  wasmModule = (await WebAssembly.instantiateStreaming(fetch("calc.wasm")))
    .instance.exports;
}

function performOperation() {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const operation = document.getElementById("operation").value;

  let result;
  switch (operation) {
    case "add":
      result = wasmModule.add(num1, num2);
      operations.push(`${num1} + ${num2} = ${result}`);
      break;
    case "sub":
      result = wasmModule.sub(num1, num2);
      operations.push(`${num1} - ${num2} = ${result}`);
      break;
    case "mult":
      result = wasmModule.mult(num1, num2);
      operations.push(`${num1} * ${num2} = ${result}`);
      break;
    case "div":
      if (num2 === 0) {
        alert("Cannot divide by zero");
      } else {
        result = wasmModule.div(num1, num2);
        operations.push(`${num1} / ${num2} = ${result}`);
      }
      break;
  }

  document.getElementById("result").textContent = result;
  drawHistory();
}

function drawHistory() {
  operations = operations.slice(0, 10);
  historySection.innerHTML = `${operations.join("<br>")}`;
}

window.onload = load;
