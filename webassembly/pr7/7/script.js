async function load() {
  const wasmModuleInstance = await Module();
  wasm = wasmModuleInstance;
}

function add() {}

window.onload = load;
