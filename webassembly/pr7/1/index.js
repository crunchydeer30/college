import fs from "fs/promises";

class Calculator {
  constructor(wasmInstance) {
    this.wasmInstance = wasmInstance;
    this.history = [];
  }

  add(a, b) {
    const res = this.wasmInstance.exports.add(a, b);
    this.history.push(`${a} + ${b} = ${res}`);
    return res;
  }

  sub(a, b) {
    const res = this.wasmInstance.exports.sub(a, b);
    this.history.push(`${a} - ${b} = ${res}`);
    return res;
  }

  mult(a, b) {
    const res = this.wasmInstance.exports.mult(a, b);
    this.history.push(`${a} * ${b} = ${res}`);
    return res;
  }

  div(a, b) {
    if (b === 0) {
      throw new Error("Division by zero");
    }
    const res = this.wasmInstance.exports.div(a, b);
    return res;
  }

  getHistory() {
    return this.history;
  }
}

try {
  const wasmFile = await fs.readFile("calc.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile, { console });
  const calc = new Calculator(instance);
  calc.add(1, 2);
  calc.sub(2, 1);
  calc.mult(3, 4);
  calc.div(4, 2);
  console.log(calc.getHistory());
} catch (e) {
  console.error(e);
}
