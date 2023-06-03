// // no code so far!
// const list = [];

// const addToList = () => {
//   const inputValue = document.querySelector("#text").value;
//   console.log(inputValue)
//   list.push(inputValue);
//   document.querySelector("#text").value = "";

//   const element = document.createElement("li");
//   const text = document.createTextNode(inputValue);
//   element.appendChild(text);
//   document.querySelector("#list").appendChild(element);
// };


const retrieveContentFromApi = async () => {
  const response = await fetch("/api/magic");
  console.log(response);

  const json = await response.json();
  console.log(json["magic"]);

  // const element = document.createElement("li");
  const text = document.createTextNode(json["magic"]);
  // element.appendChild(text);
  console.log(text)
  document.querySelector("#magic").innerHTML = json["magic"];
};
