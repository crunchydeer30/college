async function load() {
  const wasmModuleInstance = await Module();
  wasm = wasmModuleInstance;
}

function caesarEncrypt() {
  const shift = document.getElementById("shift").value;
  const text = document.getElementById("caesar_before").value;
  wasm.stringToUTF8(text, 0, text.length + 1);
  const cipherText = wasm.UTF8ToString(wasm._caesarEncrypt(text, shift));
  document.getElementById("caesar_after").value = cipherText;
}

function caesarDecrypt() {
  const shift = document.getElementById("shift").value;
  const text = document.getElementById("caesar_before").value;
  wasm.stringToUTF8(text, 0, text.length + 1);
  const cipherText = wasm.UTF8ToString(wasm._caesarDecrypt(text, shift));
  document.getElementById("caesar_after").value = cipherText;
}

function xorEncrypt() {
  const key = document.getElementById("key").value;
  const text = document.getElementById("xor_before").value;
  wasm.stringToUTF8(text, 0, text.length + 1);
  const cipherText = wasm.UTF8ToString(wasm._xorEncrypt(text, key));
  document.getElementById("xor_after").value = cipherText;
}

function xorDecrypt() {
  const key = document.getElementById("key").value;
  const text = document.getElementById("xor_before").value;
  wasm.stringToUTF8(text, 0, text.length + 1);
  const cipherText = wasm.UTF8ToString(wasm._xorDecrypt(text, key));
  document.getElementById("xor_after").value = cipherText;
}

window.onload = load;
