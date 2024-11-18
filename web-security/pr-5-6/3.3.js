function tokenize(data) {
  return btoa(data);
}

function detokenize(token) {
  return atob(token);
}

const data = "Это секретные данные";
const token = tokenize(data);
console.log(token);

const detokenizedData = detokenize(token);
console.log(detokenizedData);
