const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
  }
});

function addTask(taskText) {
  const li = document.createElement('li');
  li.draggable = true;
  li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <i class="fa-solid fa-pen-to-square edit-btn"></i>
      <i class="fa-solid fa-trash delete-btn"></i>
      <i class="fa-solid fa-bars drag-handle"></i>
    </div>
  `;
  taskList.appendChild(li);

  const editBtn = li.querySelector('.edit-btn');
  const deleteBtn = li.querySelector('.delete-btn');

  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  editBtn.addEventListener('click', () => {
    const newText = prompt('Edit your task:', taskText);
    if (newText !== null && newText.trim() !== '') {
      li.querySelector('span').textContent = newText.trim();
    }
  });

  li.addEventListener('dragstart', () => {
    li.classList.add('dragging');
  });

  li.addEventListener('dragend', () => {
    li.classList.remove('dragging');
  });
}

taskList.addEventListener('dragover', (e) => {
  e.preventDefault();
  const draggingItem = document.querySelector('.dragging');
  const afterElement = getDragAfterElement(taskList, e.clientY);
  if (afterElement == null) {
    taskList.appendChild(draggingItem);
  } else {
    taskList.insertBefore(draggingItem, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}