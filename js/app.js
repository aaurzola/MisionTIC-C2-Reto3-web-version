//DOM selectors
//inputs
const nameInput = document.querySelector("input[name=name]");
const cityInput = document.querySelector("input[name=city]");
const idInput = document.querySelector("input[name=idNumber]");
const epsInput = document.querySelector("input[name=eps]");
const ageInput = document.querySelector("input[name=age]");
const illnessInput = document.querySelector("input[name=illness]");

//buttons
const addBtn = document.querySelector("#add");
const deleteBtn = document.querySelector("#delete");
const executeBtn = document.querySelector("#execute");

//others
const table = document.querySelector("tbody");
const messageBox = document.querySelector("#message-box")


//gloabl variables
let mainList = [];
let personObject = {
  name: "afddf",
  city: "df",
  id: "dfdf",
  eps: "dfdf",
  age: "",
  illness: "",
};

//onLoad
document.addEventListener("DOMContentLoaded", () => {
  disableBtn(addBtn);
  disableBtn(deleteBtn);
  disableBtn(executeBtn);
})

//events
//Form Events
nameInput.addEventListener("blur", addProperty);
cityInput.addEventListener("blur", addProperty)
idInput.addEventListener("blur", addProperty)
epsInput.addEventListener("blur", addProperty)
ageInput.addEventListener("blur", addProperty)
illnessInput.addEventListener("blur", addProperty)

//buttons Events
addBtn.addEventListener("click", addEntry);
deleteBtn.addEventListener("click", deleteEntry);
// executeBtn.addEventListener("click", );




//functions
function addProperty(e) {
  let completed = true;
  switch (e.target.name) {
    case "name": {
      personObject.name = e.target.value;
    } break;
    case "city": {
      personObject.city = e.target.value;
    } break;
    case "idNumber": {
      personObject.id = e.target.value;
    } break;
    case "eps": {
      personObject.eps = e.target.value;
    } break;
    case "age": {
      personObject.age = e.target.value;
    } break;
    case "illness": {
      personObject.illness = e.target.value;
    } break;
  }

  for (const key in personObject) {
    if (personObject[key] === '') {
      completed = false;
    }
  }

  if (completed) {
    enableBtn(addBtn);
  }
}

function addEntry() {
  mainList.push({ ...personObject });
  addToTable(mainList);
  resetPersonValues(personObject);
  clearForm();
  disableBtn(addBtn);
  enableBtn(deleteBtn);
  enableBtn(executeBtn);
}

function resetPersonValues(object) {
  for (let key in object) {
    personObject[key] = "";
  }
}



function addToTable(list) {
  clearTable();
  list.forEach(element => {
    let newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td>${element.name}</td>
    <td>${element.id}</td>
    <td>${element.age}</td>
    <td>${element.city}</td>
    <td>${element.eps}</td>
    <td>${element.illness}</td>
    `;
    table.appendChild(newRow);
  });
}

function clearTable() {
  while (table.children.length > 1) {
    table.removeChild(table.lastChild);
  }
}

function clearForm() {
  nameInput.value = "";
  cityInput.value = "";
  idInput.value = "";
  epsInput.value = "";
  ageInput.value = "";
  illnessInput.value = "";
}

function deleteEntry() {
  if (table.children.length > 1) {
    table.removeChild(table.lastChild);
    mainList.pop();
  }
  if (mainList.length === 0) {
    disableBtn(deleteBtn);
    disableBtn(executeBtn);
  }
}

function disableBtn(button) {
  button.classList.add("disable-btn");
  button.disabled = true;
}

function enableBtn(button) {
  button.classList.remove("disable-btn");
  button.disabled = false;
}