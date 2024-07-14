// scripts.js

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  // Загрузка задач из локального хранилища при загрузке страницы
  loadTasks();

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = input.value.trim();
    if (taskText !== '') {
      addTask(taskText);
      input.value = '';
    }
  });

  function addTask(taskText) {
    const li = document.createElement('li');

    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.addEventListener('change', function () {
      if (completeCheckbox.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
      saveTasks();
    });

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () {
      const newTask = prompt('Edit your task:', taskSpan.textContent);
      if (newTask) {
        taskSpan.textContent = newTask;
        saveTasks();
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
      list.removeChild(li);
      saveTasks();
    });

    li.appendChild(completeCheckbox);
    li.appendChild(taskSpan);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    list.appendChild(li);
    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    list.querySelectorAll('li').forEach((li) => {
      tasks.push({
        text: li.querySelector('span').textContent,
        completed: li.classList.contains('completed'),
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
      addTask(task.text);
      const lastLi = list.lastChild;
      if (task.completed) {
        lastLi.classList.add('completed');
        lastLi.querySelector('input[type="checkbox"]').checked = true;
      }
    });
  }
});
