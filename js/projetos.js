document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const editForm = document.getElementById('edit-form');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');
  const cancelEdit = document.getElementById('cancelEdit');

  let currentEditId = null;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const status = document.getElementById('status').value;
    const prazo = document.getElementById('prazo').value;
    const cor = document.getElementById('cor').value;
    const subtarefas = document.getElementById('subtarefas').value.split(',').map(s => s.trim());

    const id = Date.now().toString();

    const task = {
      id,
      titulo,
      status,
      prazo,
      cor,
      subtarefas
    };

    addTaskToColumn(task);
    form.reset();
  });

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = document.getElementById('edit-titulo').value;
    const status = document.getElementById('edit-status').value;
    const prazo = document.getElementById('edit-prazo').value;
    const cor = document.getElementById('edit-cor').value;
    const subtarefas = document.getElementById('edit-subtarefas').value.split(',').map(s => s.trim());

    const updatedTask = {
      id: currentEditId,
      titulo,
      status,
      prazo,
      cor,
      subtarefas
    };

    document.querySelectorAll('.task').forEach(t => {
      if (t.dataset.id === currentEditId) {
        t.remove();
      }
    });

    addTaskToColumn(updatedTask);
    modal.style.display = 'none';
    currentEditId = null;
  });

  cancelEdit.addEventListener('click', () => {
    modal.style.display = 'none';
    currentEditId = null;
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    currentEditId = null;
  });

  function addTaskToColumn(task) {
    const column = document.getElementById(task.status.toLowerCase().replace(' ', '-'));

    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.style.borderLeft = `8px solid ${task.cor}`;
    taskElement.dataset.id = task.id;

    const subtarefasHTML = task.subtarefas.length ? `<ul>${task.subtarefas.map(s => `<li>${s}</li>`).join('')}</ul>` : '';

    taskElement.innerHTML = `
      <h4>${task.titulo}</h4>
      <p>Status: ${task.status}</p>
      <p>Prazo: ${task.prazo}</p>
      ${subtarefasHTML}
      <div class="task-actions">
        <button onclick="editTask('${task.id}')">✏️</button>
        <button onclick="removeTask('${task.id}')">🗑️</button>
      </div>
    `;

    column.appendChild(taskElement);
  }
});

function editTask(id) {
  const taskElement = document.querySelector(`.task[data-id='${id}']`);

  const titulo = taskElement.querySelector('h4').innerText;
  const status = taskElement.querySelector('p:nth-child(2)').innerText.replace('Status: ', '');
  const prazo = taskElement.querySelector('p:nth-child(3)').innerText.replace('Prazo: ', '');
  const subtarefas = Array.from(taskElement.querySelectorAll('ul li')).map(li => li.innerText);
  const cor = taskElement.style.borderLeftColor || '#cccccc';

  document.getElementById('edit-titulo').value = titulo;
  document.getElementById('edit-status').value = status;
  document.getElementById('edit-prazo').value = prazo;
  document.getElementById('edit-cor').value = cor;
  document.getElementById('edit-subtarefas').value = subtarefas.join(', ');

  document.getElementById('modal').style.display = 'flex';
  window.currentEditId = id;
}

function removeTask(id) {
  const taskElement = document.querySelector(`.task[data-id='${id}']`);
  if (taskElement) taskElement.remove();
}
