const toDoForm = document.querySelector(".todoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".toDoList");

const TODO_LS = "toDos";

let toDos = [];

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.toDoText);
    });
  }
}
function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

let idNumbers = 0;
function paintToDo(element) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const newId = idNumbers;
  idNumbers += 1;
  span.addEventListener("click", deleteToDo);
  span.innerText = element;
  li.appendChild(span);
  li.id = newId;
  li.classList.add("list");
  toDoList.appendChild(li);

  const toDoObj = {
    toDoText: element,
    id: newId,
  };

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
