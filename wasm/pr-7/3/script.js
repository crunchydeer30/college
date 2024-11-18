let wasm;

async function load() {
  const wasmModuleInstance = await Module();
  wasm = wasmModuleInstance;
}

function calc(op) {
  const x1 = document.getElementById("x1").value;
  const y1 = document.getElementById("y1").value;
  const x2 = document.getElementById("x2").value;
  const y2 = document.getElementById("y2").value;

  const v1 = wasm._malloc(8);
  const v2 = wasm._malloc(8);
  const res = wasm._malloc(8);

  wasm.HEAP32.set([x1, y1], v1 / 4);
  wasm.HEAP32.set([x2, y2], v2 / 4);

  switch (op) {
    case "add":
      wasm._add(v1, v2, res);
      break;
    case "sub":
      wasm._sub(v1, v2, res, 2);
      break;
    case "scalar":
      wasm._scalar(v1, v2, 2);
      break;
  }

  result(res);
}

function result(res) {
  const [x, y] = Array.from(new Int32Array(wasm.HEAP32.buffer, res, 2));
  alert(
    JSON.stringify({
      x,
      y,
    })
  );
}

window.onload = load;
