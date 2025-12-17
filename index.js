let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadInitialTasks() {
  const savedTasks = localStorage.getItem('items');
  return savedTasks ? JSON.parse(savedTasks) : items;
}

function createTaskElement(taskText) {
  const template = document.getElementById("to-do__item-template");
  const taskElement = template.content.querySelector(".to-do__item").cloneNode(true);
  const taskTextElement = taskElement.querySelector(".to-do__item-text");
  const deleteButton = taskElement.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = taskElement.querySelector(".to-do__item-button_type_duplicate");
  const editButton = taskElement.querySelector(".to-do__item-button_type_edit");

  taskTextElement.textContent = taskText;

  deleteButton.addEventListener('click', () => {
    removeTask(taskElement);
  });

  duplicateButton.addEventListener('click', () => {
    duplicateTask(taskText);
  });

  editButton.addEventListener('click', () => {
    enableTaskEditing(taskTextElement);
  });

  taskTextElement.addEventListener('blur', () => {
    finishTaskEditing(taskTextElement);
  });

  taskTextElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      taskTextElement.blur();
    }
  });

  return taskElement;
}

function removeTask(taskElement) {
  taskElement.remove();
  updateStoredTasks();
}

function duplicateTask(taskText) {
  const newTaskElement = createTaskElement(taskText);
  listElement.prepend(newTaskElement);
  updateStoredTasks();
}

function enableTaskEditing(taskTextElement) {
  taskTextElement.setAttribute('contenteditable', 'true');
  taskTextElement.focus();
}

function finishTaskEditing(taskTextElement) {
  taskTextElement.setAttribute('contenteditable', 'false');
  updateStoredTasks();
}

function getAllTasks() {
  const taskElements = listElement.querySelectorAll('.to-do__item-text');
  const currentTasks = [];
  
  taskElements.forEach(element => {
    currentTasks.push(element.textContent);
  });
  
  return currentTasks;
}

function updateStoredTasks() {
  const currentTasks = getAllTasks();
  localStorage.setItem('items', JSON.stringify(currentTasks));
}

function addNewTask(taskText) {
  if (taskText.trim()) {
    const newTaskElement = createTaskElement(taskText);
    listElement.prepend(newTaskElement);
    updateStoredTasks();
    inputElement.value = '';
  }
}

function renderAllTasks() {
  items = loadInitialTasks();
  items.forEach(task => {
    listElement.append(createTaskElement(task));
  });
}

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  addNewTask(inputElement.value);
});

renderAllTasks();