import fs from "fs/promises";

class Calculator {
  constructor(wasm) {
    this.wasm = wasm;
  }

  add(a, b) {
    return this.wasm.exports.add(a, b);
  }

  sub(a, b) {
    return this.wasm.exports.sub(a, b);
  }

  mult(a, b) {
    return this.wasm.exports.mult(a, b);
  }

  div(a, b) {
    if (b == 0) {
      throw new Error("Cannot divide by zero");
    }
    return this.wasm.exports.div(a, b);
  }
}

async function main() {
  try {
    const wasmFile = await fs.readFile("calc.wasm");
    const { instance } = await WebAssembly.instantiate(wasmFile);
    const calc = new Calculator(instance);

    console.log("Calc App");
    console.log("--------");

    while (true) {
      console.log("Options:");
      console.log("1. Add");
      console.log("2. Subtract");
      console.log("3. Multiply");
      console.log("4. Divide");
      console.log("5. Quit");

      const option = await prompt("Choose an option: ");

      switch (option) {
        case "1":
          const num1 = await prompt("Enter first number: ");
          const num2 = await prompt("Enter second number: ");
          const result = await calc.add(parseInt(num1), parseInt(num2));
          console.log(`Result: ${result}`);
          break;
        case "2":
          const num3 = await prompt("Enter first number: ");
          const num4 = await prompt("Enter second number: ");
          const result2 = await calc.sub(parseInt(num3), parseInt(num4));
          console.log(`Result: ${result2}`);
          break;
        case "3":
          const num5 = await prompt("Enter first number: ");
          const num6 = await prompt("Enter second number: ");
          const result3 = await calc.mult(parseInt(num5), parseInt(num6));
          console.log(`Result: ${result3}`);
          break;
        case "4":
          try {
            const num7 = await prompt("Enter first number: ");
            const num8 = await prompt("Enter second number: ");
            const result4 = await calc.div(parseInt(num7), parseInt(num8));
            console.log(`Result: ${result4}`);
          } catch (e) {
            console.error(e);
          }
          break;
        case "5":
          console.log("Goodbye!");
          process.exit(0);
        default:
          console.log("Invalid option. Please try again.");
      }
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

function prompt(message) {
  return new Promise((resolve) => {
    process.stdout.write(message);
    process.stdin.once("data", (data) => {
      resolve(data.toString().trim());
    });
  });
}

main();
