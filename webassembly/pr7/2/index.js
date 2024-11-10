import { plot } from "nodeplotlib";
import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("statistics.wasm");
  const wasmModule = new WebAssembly.Module(wasmFile);
  const wasmInstance = new WebAssembly.Instance(wasmModule, {});
  console.log(wasmInstance);

  // const plotData = {
  //   x: [],
  //   y: [],
  //   type: "scatter",
  // };

  // for (let i = 0; i < 100; i++) {
  //   plotData.x.push(i);
  //   plotData.y.push(random_number(0, 100));
  // }
  // plot(plotData);
} catch (e) {
  console.error(e);
}
