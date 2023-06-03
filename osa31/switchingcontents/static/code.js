const title = document.querySelector("#title").innerHTML;
const text = document.querySelector("#text").innerHTML;
console.log(title, text);

document.querySelector("#title").innerHTML = text;
document.querySelector("#text").innerHTML = title;
