// const element = document.createElement("p");
// const text = document.createTextNode("I was just added into a container!");
// element.appendChild(text);

// document.querySelector("#container").appendChild(element);

document.querySelector("#title").innerHTML = "Hello World!";
const strings = ["hello", "world", "this", "is", "nice"];

strings.forEach((s) => {
  console.log(s);
  const element = document.createElement("li");
  const text = document.createTextNode(s);
  element.appendChild(text);
  document.querySelector("#list").appendChild(element);
});
