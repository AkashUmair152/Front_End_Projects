let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const filters = document.querySelectorAll('.filters button');

// Save to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render Tasks
function renderTasks(filter = 'all') {
  taskList.innerHTML = '';
  tasks
    .filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement('li');
      li.className = `priority-${task.priority}`;
      if (task.completed) li.classList.add('completed');

      li.innerHTML = `
        <strong>${task.title}</strong><br/>
        <small>${task.description || ''}</small><br/>
        ${task.dueDate ? `<em>Due: ${task.dueDate}</em>` : ''}
        <div class="task-actions">
          <div>
            <button type="button" onclick="toggleComplete(${index})">
              ${task.completed ? 'Uncomplete' : 'Complete'}
            </button>
            <button type="button" onclick="editTask(${index})">Edit</button>
            <button type="button" onclick="deleteTask(${index})">Delete</button>
          </div>
          <span style="font-size: 0.9em; color: gray;">${task.priority.toUpperCase()}</span>
        </div>
      `;
      taskList.appendChild(li);
    });
}

// Toggle Complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks(getCurrentFilter());
}

// Delete Task
function deleteTask(index) {
  if (confirm("Are you sure?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks(getCurrentFilter());
  }
}

// Edit Task
function editTask(index) {
  const task = tasks[index];
  const newTitle = prompt("Edit Task Title:", task.title);
  const newDesc = prompt("Edit Description:", task.description);
  const newDate = prompt("Edit Due Date (YYYY-MM-DD):", task.dueDate || '');
  const newPriority = prompt("Edit Priority (low/medium/high):", task.priority);

  if (newTitle !== null && newTitle.trim() !== '') {
    task.title = newTitle.trim();
    task.description = newDesc !== null ? newDesc.trim() : '';
    task.dueDate = newDate.trim() || '';
    task.priority = ['low', 'medium', 'high'].includes(newPriority.toLowerCase())
      ? newPriority.toLowerCase()
      : task.priority;

    saveTasks();
    renderTasks(getCurrentFilter());
  }
}

// Add Task
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority').value;

  if (title === '') return alert("Please enter a task title.");

  tasks.push({ title, description, dueDate, priority, completed: false });
  saveTasks();
  taskForm.reset();
  renderTasks(getCurrentFilter());
});

// Filter Buttons
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks(btn.dataset.filter);
  });
});

function getCurrentFilter() {
  return document.querySelector('.filters button.active').dataset.filter;
}

// Initial Load
renderTasks();