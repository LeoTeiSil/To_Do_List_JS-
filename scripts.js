// seleção de elementos
const ToDoForm = document.querySelector("#ToDo-form");
const ToDoInput = document.querySelector("#ToDo-input");
const ToDoList = document.querySelector("#ToDo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector("#filter-select");
const eraseButton = document.querySelector("#erase-button");
let oldInputValue;

// funções
const saveTodo = (text) => {
    const ToDo = document.createElement("div");
    ToDo.classList.add("ToDo");

    const ToDoTitle = document.createElement("h3");
    ToDoTitle.innerText = text;
    ToDo.appendChild(ToDoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-ToDo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    ToDo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-ToDo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    ToDo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-ToDo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    ToDo.appendChild(deleteBtn);

  
    ToDoList.appendChild(ToDo);

    ToDoInput.value = '';
    ToDoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    ToDoForm.classList.toggle("hide");
    ToDoList.classList.toggle("hide");
  };

const UpdateToDo = (text) => {

    const ToDos = document.querySelectorAll(".ToDo")

    ToDos.forEach((ToDo) =>{

        let ToDoTitle = ToDo.querySelector("h3")

        if(ToDoTitle.innerText === oldInputValue) {
            ToDoTitle.innerText = text;
        }
    })
};

const searchToDos = (term) => {
    const ToDos = document.querySelectorAll(".ToDo");
    ToDos.forEach((ToDo) => {
        let ToDoTitle = ToDo.querySelector("h3").innerText.toLowerCase();
        if (ToDoTitle.includes(term.toLowerCase())) {
            ToDo.style.display = "flex";
        } else {
            ToDo.style.display = "none";
        }
    });
};
  
  const filterToDos = (status) => {
    const ToDos = document.querySelectorAll(".ToDo");
    ToDos.forEach((ToDo) => {
        switch (status) {
            case "all":
                ToDo.style.display = "flex";
                break;
            case "done":
                if (ToDo.classList.contains("done")) {
                    ToDo.style.display = "flex";
                } else {
                    ToDo.style.display = "none";
                }
                break;
            case "todo":
                if (!ToDo.classList.contains("done")) {
                    ToDo.style.display = "flex";
                } else {
                    ToDo.style.display = "none";
                }
                break;
        }
    });
};

// eventos
ToDoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = ToDoInput.value;

    if (inputValue) {
        saveTodo(inputValue); 
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let ToDoTitle;

    if(parentEl && parentEl.querySelector("h3")) {
        ToDoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-ToDo")) {
        parentEl.classList.toggle("done");
    }

    if(targetEl.classList.contains("remove-ToDo")) {
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-ToDo")) {
        toggleForms()

        editInput.value = ToDoTitle
        oldInputValue = ToDoTitle
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault()

    toggleForms();
});

editForm.addEventListener("submit", (e) =>  {

    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue) {
        UpdateToDo(editInputValue)
    }

    toggleForms()
});

searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value;
    searchToDos(searchTerm);
});

filterSelect.addEventListener("change", (e) => {
    const filterValue = e.target.value;
    filterToDos(filterValue);
});

eraseButton.addEventListener("click", (e) => {
    e.preventDefault();
    searchInput.value = "";
    searchToDos("");
});