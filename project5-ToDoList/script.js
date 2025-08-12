document.addEventListener('DOMContentLoaded',()=>{
const todo_input = document.getElementById("todo-input")
const addTaskBtn = document.getElementById("add-task-btn")
const todo_list = document.getElementById("todo-list")

let tasks= JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => renderTask(task));
addTaskBtn.addEventListener('click',()=>{
    const taskText = todo_input.value.trim()
    if(taskText==="") return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.push(newTask);
    saveTasks(); 
    renderTask(newTask);
    todo_input.value = "";
    console.log(tasks);  
});

function renderTask(task){
    const li = document.createElement("li")
    li.setAttribute("data-id",task.id)
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>Done</button>`;
    li.addEventListener('click',(e)=>{
        if(e.target.tagName==='BUTTON') return;
        task.completed = !task.completed
        li.classList.toggle("completed")
        saveTasks();
    });
    li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation
        tasks = tasks.filter(t => t.id !== task.id)
        li.remove();
        saveTasks();
    });

    todo_list.appendChild(li);
}

function saveTasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
})