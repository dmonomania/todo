import { newToDoSubmit } from "./index.js";

export const formBuilding = (() => {
  const buildModal = (header) => {
    // create the modal
    const modal = document.createElement("div");
    modal.classList.add("modal", "active");

    // create the overlay and the ID for closing the modal
    // via an out-of-modal click
    const closeButton = document.createElement("a");
    closeButton.setAttribute("href", "#close");
    closeButton.setAttribute("class", "modal-overlay");
    closeButton.setAttribute("aria-label", "Close");
    modal.appendChild(closeButton);

    closeButton.addEventListener("click", () => {
      formSmashing.removeForm(modal);
    });

    // create the main container holding the header and body
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    modal.appendChild(modalContainer);

    // create the header including dynamic title and
    // the second close button
    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");
    const closeButton2 = document.createElement("a");
    closeButton2.classList.add("btn", "btn-clear", "float-right");
    const headerTitle = document.createElement("div");
    headerTitle.classList.add("modal-title", "h5");
    headerTitle.innerText = header;
    modalHeader.appendChild(closeButton2);
    modalHeader.appendChild(headerTitle);
    modalContainer.appendChild(modalHeader);

    closeButton2.addEventListener("click", () => {
      formSmashing.removeForm(modal);
    });

    // creates the modal body which will be returned allowing
    // the modal to be used for any purpose.
    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalContainer.appendChild(modalBody);

    document.body.appendChild(modal);

    return modalBody;
  };
  const toDoFormBody = (projectsArray, object) => {
    const label = (labelClass, labelFor, innerText) => {
      const label = document.createElement("label");
      label.innerHTML = `<label class='${labelClass}' for='${labelFor}'>${innerText}</label>`;
      return label;
    };

    const form = document.createElement("form");
    form.setAttribute("id", "new-todo");
    form.classList.add("form");

    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group");

    form.appendChild(formGroup);

    const titleLabel = label("form-label", "title", "Title");
    formGroup.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.setAttribute("class", "form-input");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("placeholder", "Title");
    titleInput.setAttribute('required','required');
    formGroup.appendChild(titleInput);
    
    const descLabel = label("form-label", "description", "Description");
    formGroup.appendChild(descLabel);
    
    const descInput = document.createElement("textarea");
    descInput.setAttribute('required','required');
    descInput.setAttribute("name", "description");
    descInput.setAttribute("class", "form-input");
    descInput.setAttribute("placeholder", "Description");
    descInput.setAttribute("rows", "3");
    formGroup.appendChild(descInput);
    
    const projectLabel = label("form-label", "project", "Project");
    formGroup.appendChild(projectLabel);
    
    const projectSelect = document.createElement("select");
    projectSelect.setAttribute("name", "project");
    projectSelect.classList.add("form-select", "form-inline", "my-2");
    if (projectsArray === undefined) {
    } else {
      projectsArray.forEach((element) => {
        const option = document.createElement("option");
        option.innerText = element;
        projectSelect.appendChild(option);
      });
    }
    formGroup.appendChild(projectSelect);
    
    const priorityLabel = label("form-label", "priority", "Priority");
    formGroup.appendChild(priorityLabel);
    
    const prioritySelect = document.createElement("select");
    prioritySelect.setAttribute("name", "priority");
    prioritySelect.classList.add("form-select", "form-inline", "my-2");
    
    const optionLow = document.createElement("option");
    optionLow.innerText = "Low";
    const optionMed = document.createElement("option");
    optionMed.innerText = "Medium";
    const optionHigh = document.createElement("option");
    optionHigh.innerText = "High";
    
    prioritySelect.appendChild(optionLow);
    prioritySelect.appendChild(optionMed);
    prioritySelect.appendChild(optionHigh);
    
    formGroup.appendChild(prioritySelect);
    
    const dueDateLabel = label("form-label", "due-date", "Due Date");
    formGroup.appendChild(dueDateLabel);
    
    const dueDateInput = document.createElement("input");
    dueDateInput.classList.add("form-input", "form-inline");
    dueDateInput.setAttribute("type", "date");
    dueDateInput.setAttribute("name", "dueDate");
    
    formGroup.appendChild(dueDateInput);
    
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", "submit");
    submitButton.classList.add("btn", "btn-primary");
    submitButton.innerText = "Add ToDo";

    form.addEventListener("submit", (e) => {
      formSmashing.removeForm(document.querySelector('.modal'));
      e.preventDefault();
      let fd = new FormData(e.target);
      // TODO: #3 uncouple this function newToDoSubmit from this click event
      newToDoSubmit(fd);
    });

    form.appendChild(submitButton);

    return form;
  };
  const buildToDoForm = (header, projects, object) => {
    const modal = buildModal(header);
    const formBody = toDoFormBody(projects, object);

    modal.appendChild(formBody);
  };

  return {
    buildToDoForm,
  };
})();

const formSmashing = (() => {
  const removeForm = (element) => {
    element.parentNode.removeChild(element);
  };

  return {
    removeForm,
  };
})();

export const toDoDomStuff = (()=>{

  const printNextToDo = (object) => {
    console.log('printing next to do');
    console.log(object)
}

return {
  printNextToDo
}
})()
