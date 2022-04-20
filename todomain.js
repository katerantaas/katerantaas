
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});
//проверка значений поля Клиент
let formValidation = () => {
  if (textInput1.value === "") {
    console.log("failure");
    msg.innerHTML = "Обязательно заполни имя клиента!";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput1.value,
    contact: textInput2.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};
//создание записи
let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="fw-bold">${x.contact}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>

          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

//удаление записи
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);

};


//редактирование записи
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput1.value = selectedTask.children[0].innerHTML;
  textInput2.value = selectedTask.children[1].innerHTML;
  dateInput.value = selectedTask.children[2].innerHTML;
  textarea.value = selectedTask.children[3].innerHTML;


};

let resetForm = () => {
  textInput1.value = "";
  textInput2.value = "";
  dateInput.value = "";
  textarea.value = "";
};


//чтоб данные не исчезали при обновлении странички
(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();



