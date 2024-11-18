let wasm;

async function load() {
  wasm = await Module();
}

function generate() {
  const size = document.getElementById("size").value;
  const min = document.getElementById("min").value;
  const max = document.getElementById("max").value;

  const numbersPtr = wasm._malloc(size * Int32Array.BYTES_PER_ELEMENT);
  const numbers = new Int32Array(wasm.HEAP32.buffer, numbersPtr, size);
  wasm._rand_array(numbersPtr, size, min, max);
  console.log(numbers);

  plot(Array.from(numbers));
  _avg(wasm._calc_mean(numbersPtr, size));
  _min(wasm._calc_min(numbersPtr, size));
  _max(wasm._calc_max(numbersPtr, size));
}

function plot(numbers) {
  const xyValues = numbers.map((number, idx) => ({ x: idx, y: number }));

  new Chart("myChart", {
    type: "scatter",
    data: {
      datasets: [
        {
          pointRadius: 4,
          pointBackgroundColor: "rgba(0,0,255,1)",
          data: xyValues,
        },
      ],
    },
  });
}

function _avg(mean) {
  document.getElementById("_avg").innerHTML = `Avg: ${mean}`;
}

function _min(min) {
  console.log(min);
  document.getElementById("_min").innerHTML = `Min: ${min}`;
}

function _max(max) {
  document.getElementById("_max").innerHTML = `Max: ${max}`;
}

window.onload = load;
