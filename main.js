// JavaScript source code

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textArea");
let msg = document.getElementById("msg");
let data = [];
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log('Failure');
        msg.innerHTML = "Task cannot be blank";
    }
    else {
        console.log('Success');
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "modal");
        })
    }
}

let accceptdata = () => {
    //data["text        "] = textInput.value;
    //data["date        "] = dateInput.value;
    //data["description "] = textArea.value;

    //createTask();

    //console.log(data);

    data.push({
        text: textInput.value,       
        date: dateInput.value,
        description: textArea.value
    });

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTask();
};

let createTask = () => {

    data.map((x, y) => {
        return (tasks.innerHTML += `
        <div>
            <span class="fw-bold">${data.text}</span>
            <span class="small text-secondary">${data.date}</span>
            <p>${data.description}</p>
            <span class="options">
                <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
                <i onClick="deleteTask(this)" class="fa-solid fa-trash-can"></i>
            </span>
        </div>
    `);
    });

    resetForm();
};

let resetForm = () => {
    text.value = "";
    dateInput.value = "";
    textArea.value = "";
};

let deleteTask = () => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};

let editTask = (e) => {
    //Seleccionar la tarjeta
    let selectedTask = e.parentElement.parentElement;

    text.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textArea.value = selectedTask.children[2].innerHTML;

    selectTask.remove();
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTask();
    console.log(data);
})