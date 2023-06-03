// no code so far!
const list = [];

const addToList = () => {
  const inputValue = document.querySelector("#text").value;
  console.log(inputValue)
  list.push(inputValue);
  document.querySelector("#text").value = "";

  const element = document.createElement("li");
  const text = document.createTextNode(inputValue);
  element.appendChild(text);
  document.querySelector("#list").appendChild(element);
};

