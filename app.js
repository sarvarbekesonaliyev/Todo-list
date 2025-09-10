const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// localStorage-dan o‘qish
let todos = JSON.parse(localStorage.getItem("todos") || "[]");

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Har bir vazifani HTMLga chiqarish
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((item, index) => {
    const li = document.createElement("li");
    if (item.completed) li.classList.add("completed");

    // Matn
    const span = document.createElement("span");
    span.textContent = item.text;
    span.className = "text";
    span.addEventListener("click", () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    });

    // Tugmalar
    const actions = document.createElement("div");
    actions.className = "actions";

    // Edit tugmasi
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", () => {
      const newText = prompt("Yangi vazifa:", item.text);
      if (newText && newText.trim() !== "") {
        todos[index].text = newText.trim();
        saveTodos();
        renderTodos();
      }
    });

    // Delete tugmasi
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(actions);

    todoList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const task = todoInput.value.trim();
  if (task === "") return;
  todos.push({ text: task, completed: false });
  todoInput.value = "";
  saveTodos();
  renderTodos();
});

// Enter bosilganda ham ishlaydi
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// Sahifa yuklanganda mavjud vazifalarni ko‘rsatish
renderTodos();

  
   