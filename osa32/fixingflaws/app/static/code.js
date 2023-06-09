const listNames = async () => {
  const response = await fetch("/api/names");
  const usersJson = await response.json();

  // clear the old list
  document.querySelectorAll("#list > *").forEach((item) => item.remove());

  // add users to the list
  usersJson.forEach((user) => {
    const htmlContent = `<li>${encodeURIComponent(user.name)}</li>`;
    document.querySelector("#list").innerHTML += htmlContent;
  });
};

const addName = async () => {
  const name = document.querySelector("#name").value;
  const jsonDocument = { name: name };

  await fetch("/api/names", {
    method: "POST",
    body: JSON.stringify(jsonDocument),
  });
  await listNames();
  document.querySelector("#name").value = "";
};

const init = async () => {
  await listNames();
};

window.onload = () => {
  init();
};
