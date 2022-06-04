//DOM selectors
//inputs
const nameInput = document.querySelector("input[name=name]");
const cityInput = document.querySelector("input[name=city]");
const idInput = document.querySelector("input[name=idNumber]");
const epsInput = document.querySelector("input[name=eps]");
const ageInput = document.querySelector("input[name=age]");
const illnessInput = document.querySelector("select[name=illness]");

//buttons
const addBtn = document.querySelector("#add");
const deleteBtn = document.querySelector("#delete");
const executeBtn = document.querySelector("#execute");

//others
const peopleTable = document.querySelector("tbody");
const citiesTable = document.querySelector("#city-table");
const oldPeopleTable = document.querySelector("#old-people-table");
const messageBox = document.querySelector("#message-box");
const initialMessage = document.querySelector("#initial-message");
const loader = document.querySelector(".sk-folding-cube");
const waitRightPanel = document.querySelector("#wait-panel");
const resultsRightPanel = document.querySelector("#data-output");
const secondResult = document.querySelector("#second-result-target");


//gloabl variables
let mainList = [];
let personObject = {
  name: "",
  city: "",
  id: "",
  eps: "",
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
illnessInput.addEventListener("change", addProperty)

//buttons Events
addBtn.addEventListener("click", addEntry);
deleteBtn.addEventListener("click", deleteEntry);
executeBtn.addEventListener("click", calculate);


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
      personObject.age = parseInt(e.target.value);
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
  addToTable(mainList, peopleTable);
  addMessage();
  resetPersonValues(personObject);
  clearForm();
  disableBtn(addBtn);
  enableBtn(deleteBtn);
  enableBtn(executeBtn);
  console.log(mainList);
}

function resetPersonValues(object) {
  for (let key in object) {
    personObject[key] = "";
  }
}

function addToTable(list, table) {
  clearTable(table);
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

function addToOldPeopleTable(list, table) {
  clearTable(table);
  list.forEach(element => {
    let newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td>${element.name}</td>
    <td>${element.id}</td>
    `;
    table.appendChild(newRow);
  });
}

function addToCitiesTable(list, table) {
  clearTable(table);
  list.forEach(element => {
    let newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td>${element.city}</td>
    <td>${element.quantity}</td>
    `;
    table.appendChild(newRow);
  });
}

function clearTable(table) {
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
  if (peopleTable.children.length > 1) {
    peopleTable.removeChild(peopleTable.lastChild);
    mainList.pop();
    removeMessage();
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

function addMessage() {
  messageBox.classList.add("success");
  messageBox.textContent = "Paciente agregado";
  setTimeout(() => {
    messageBox.classList.remove("success");
  }, 1500)
}

function removeMessage() {
  messageBox.classList.add("alert");
  messageBox.textContent = "Paciente eliminado";
  setTimeout(() => {
    messageBox.classList.remove("alert");
  }, 1500)
}

function calculate() {
  initialMessage.style.display = "none";
  loader.classList.remove("hide");

  setTimeout(() => {
    waitRightPanel.style.display = "none";
    resultsRightPanel.style.display = "flex";
  }, 2500);

  /* first we get the unique Cities as an array of obj with two properties
  name of the city and counter of repetition within people */
  uniqueCities = getUniqueCities(mainList);
  for (const item of uniqueCities) {
    let counter = 0;
    for (const element of mainList) {
      if (element.city === item.city) {
        counter++;
      }
    }
    item.quantity = counter;
  }
  addToCitiesTable(uniqueCities, citiesTable);

  /* now we need to find the first-lowest city members*/
  const cityCounter = new Set(Array.from(uniqueCities).map(function (e) {
    return e.quantity;
  }));

  const lowestCityCount = Math.min(...cityCounter);
  console.log(lowestCityCount);

  const lowestCityName = uniqueCities.filter((e) => {
    return (e.quantity === lowestCityCount)
  })
  console.log(lowestCityName);

  document.querySelector("#second-result-target").textContent = `${lowestCityName[0].city} es la ciudad con menor numero de pacientes`;


  /*here we need to filterout our mainlist by people over 60 years old*/
  const oldPeople = mainList.filter((person) => {
    return (person.age > 60);
  });

  if (oldPeople.length) {
    addToOldPeopleTable(oldPeople, oldPeopleTable);
  } else {
    oldPeopleTable.removeChild(oldPeopleTable.lastChild);
    const oldPeopleNotFound = document.createElement("div");
    oldPeopleNotFound.textContent = "No se encontraron pacientes de tercera edad";
    oldPeopleNotFound.style.width = "100%";
    oldPeopleNotFound.classList.add("alert");
    oldPeopleTable.appendChild(oldPeopleNotFound);
  }

  disableBtn(executeBtn);
}

function getUniqueCities(array) {
  const uniqueCities = new Set(Array.from(array).map(function (e) {
    return e.city;
  }));

  let outputArray = [];
  uniqueCities.forEach((e) => {
    outputArray.push({ city: e });
  });
  return outputArray;
};