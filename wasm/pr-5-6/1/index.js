import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("hello-world.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile, { console });
  const { get_string_pointer, get_string_length, replace, memory, idxOf } =
    instance.exports;

  // Var 1-2
  console.log(
    Buffer.from(memory.buffer).toString(
      "utf-8",
      get_string_pointer(),
      get_string_length()
    )
  );

  // Var 3
  console.log('\nReplacing char at idx 1 with "*":');
  console.log("Before: ", Buffer.from(memory.buffer).toString("utf-8"));
  replace(1, "*".charCodeAt(0));
  console.log("After: ", Buffer.from(memory.buffer).toString("utf-8"));

  // Var 4
  console.log('\nIndex of char "-": ', idxOf("-".charCodeAt(0)));
  console.log('Index of char "*": ', idxOf("*".charCodeAt(0)));
} catch (e) {
  console.error(e);
}
