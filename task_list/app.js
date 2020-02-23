// UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();
initializeTasksFromLocalStorage();

function loadEventListeners() {
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', deleteTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

function addTask(e) {
  if (taskInput.value === '') alert('Add a task');
  addTaskToDOM(taskInput.value);
  storeTaskInLocalStorage(taskInput.value);
  taskInput.value = '';
  e.preventDefault();
}

function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fas fa-trash"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
}

function initializeTasksFromLocalStorage() {
  const tasks = localStorage.getItem('tasks');
  if (tasks) {
    JSON.parse(tasks).forEach(task => addTaskToDOM(task));
  }
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(e) {
  if (e.target.parentNode.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      // Remove from local storage
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.splice(tasks.indexOf(e.target.parentNode.parentNode.textContent), 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));

      // Remove from DOM
      e.target.parentNode.parentNode.remove();
    }
  }
}

function clearTasks() {
  // This method is slower than using a while loop
  // taskList.innerHTML = '';

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Won't do anything if there is no 'tasks' item
  localStorage.removeItem('tasks');
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
