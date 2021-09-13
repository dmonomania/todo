import { newToDoSubmit } from "./index.js";
import { handleIconClicks } from "./index.js";
const pubsub = require("pubsub.js");

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
    // adds the event listener to close the modal
    closeButton.addEventListener("click", () => {
      domSmashing.removeElement(modal);
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
    // adds the event listener for closgin the modal.
    closeButton2.addEventListener("click", () => {
      domSmashing.removeElement(modal);
    });

    // creates the modal body which will be returned allowing
    // the modal to be used for any purpose.
    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalContainer.appendChild(modalBody);

    document.body.appendChild(modal);

    return modalBody;
  };
  // creates the form body manually. Except for Project Selector
  // which inserts the current list of projects (param: projectsArray)
  // param: object will be used to update the form with the current
  // todo item when the "edit" button is clicked instead of NEW ToDo

  // TODO: Each of the form sections should be created with a reusable function
  // taking an ojbect as a parameter for each of the options.
  // i.e. element : input, type : text, class: input-class, name: name, etc.
  const toDoFormBody = (projectsArray, object) => {
    const label = (labelClass, labelFor, innerText) => {
      // simple <label> maker
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
    titleInput.setAttribute("required", "required");
    formGroup.appendChild(titleInput);

    const descLabel = label("form-label", "description", "Description");
    formGroup.appendChild(descLabel);

    const descInput = document.createElement("textarea");
    descInput.setAttribute("required", "required");
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
    // checking if the request to build the form is for a New item or
    // editing a current item. If it's an edit request, the item details will be
    // filled in.
    const toDoItem = object;
    
    if (toDoItem !== undefined) {
      titleInput.value = toDoItem.title;
      descInput.value = toDoItem.description;
      projectSelect.value = toDoItem.project;
      prioritySelect.value = toDoItem.priority;
      dueDateInput.value = toDoItem.dueDate;


      const completedSatusLabel = label("form-label", "completed", "Completed Status");
      formGroup.appendChild(completedSatusLabel);
      
      const completedSelect = document.createElement("select");
      completedSelect.setAttribute("name", "completed");
      completedSelect.classList.add("form-select", "form-inline", "my-2");
      
      const optionYes = document.createElement("option");
      optionYes.innerText = "Yes";
      const optionNo = document.createElement("option");
      optionNo.innerText = "No";

      completedSelect.appendChild(optionNo)
      completedSelect.appendChild(optionYes)

      let completedStatus = toDoItem.completed
      console.log(completedStatus)
      if (completedStatus === true) {
        console.log('if is true')
        optionYes.setAttribute('selected','selected');
      }
      else {
        console.log('if is false')
        optionNo.setAttribute('selected','selected');
      }
      


      formGroup.appendChild(completedSelect)
      
      // const completedSatusLabel = document.createElement('label');
      // completedSatusLabel.innerText = 'Task Completed';
      // completedSatusLabel.classList.add('form-switch');
      // const completedSatusInput = document.createElement('input');
      // completedSatusInput.setAttribute('type','checkbox');
      // completedSatusInput.setAttribute('name','completed');
      // completedSatusInput.value = toDoItem.completed;
      // const completedStatusIcon = document.createElement('i');
      // completedStatusIcon.classList.add('form-icon');
      // completedSatusLabel.appendChild(completedSatusInput)
      // completedSatusLabel.appendChild(completedStatusIcon);
      // form.appendChild(completedSatusLabel)

      submitButton.innerText = 'Edit ToDo'

      // event NEW ToDo list Item listener to submit the form
      form.addEventListener("submit", (e) => {
        domSmashing.removeElement(document.querySelector(".modal"));
        e.preventDefault();
        let fd = new FormData(e.target);
        // TODO: #3 uncouple this function newToDoSubmit from this click event

        pubsub.publish("todo/submit/edit", [[fd, toDoItem]]);
      });
    } else {
      // event NEW ToDo list Item listener to submit the form
      form.addEventListener("submit", (e) => {
        domSmashing.removeElement(document.querySelector(".modal"));
        e.preventDefault();
        let fd = new FormData(e.target);
        // TODO: #3 uncouple this function newToDoSubmit from this click event
        pubsub.publish("todo/submit/new", [fd]);
      });
    }

    form.appendChild(submitButton);

    return form;
  };
  // main function to build the form in multiple steps
  const buildToDoForm = (header, projects, object) => {
    const modal = buildModal(header);
    const formBody = toDoFormBody(projects, object);

    modal.appendChild(formBody);
  };

  return {
    buildToDoForm,
  };
})();

export const domSmashing = (() => {
  const removeElement = (element) => {
    element.parentNode.removeChild(element);
  };

  const clearElement = (element) => {
    element.innerHTML = ''
  }
  return {
    clearElement,
    removeElement,
  };
})();

// this function should handle of the DOM related changes for the
// ToDo List itself. Printing / Deleting / Changing Class(styles)
//
export const toDoDomStuff = (() => {
  const printNextToDo = (object) => {
    // arry of icons/buttons used for interacting with individual todo list items.
    const icons = ["icon-edit", "icon-delete", "icon-check"];
    // creates the icons, there are smaller ones for desktop and larger ones for mobile
    // both have event listeners added
    const createIcons = (container) => {
      for (let i = 0; i <= icons.length; i++) {
        const div = document.createElement("div");
        div.classList.add("flex-centered", "column", "col-4", "col-sm-4");
        const icon1 = document.createElement("i");
        icon1.classList.add("icon", icons[i], "hide-sm");
        const icon2 = document.createElement("i");
        icon2.classList.add("icon", "icon-2x", icons[i], "show-sm");
        div.appendChild(icon1);
        div.appendChild(icon2);
        // event listener sends to handle icon clicks, but should be separated
        // sends the icon value from the icons array and the click even path[3] which will
        // be the container div for the todo list item
        icon1.addEventListener("click", (e) =>
          handleIconClicks(icons[i], e.path[3])
        );
        icon2.addEventListener("click", (e) =>
          handleIconClicks(icons[i], e.path[3])
        );
        container.appendChild(div);
      }
    };
    // uses the function parameter "object" to fill in the todo list item
    // title as well as assigning the tolist item ID to the container for
    // lookup later
    const toDoObject = object;
    const toDosColumn = document.getElementById("to-dos-column");
    const container = document.createElement("div");
    container.classList.add("columns");
    container.setAttribute("id", toDoObject.id);

    const titleColumn = document.createElement("div");
    titleColumn.classList.add("column", "col-10");
    const titleText = document.createElement("div");
    titleText.classList.add("text-large");
    titleText.innerText = toDoObject.title;

    titleColumn.appendChild(titleText);
    container.appendChild(titleColumn);

    const iconColumn = document.createElement("div");
    iconColumn.classList.add("columns", "my-2", "hide-sm");
    createIcons(iconColumn);

    container.appendChild(iconColumn);

    const divider = document.createElement("div");
    divider.classList.add("divider");
    container.appendChild(divider);

    toDosColumn.appendChild(container);
  };

  const printToDos = (toDosArray) => {
    let array = toDosArray
    console.log(array);
    array.forEach((e) => {
    printNextToDo(e);
    })

  }

  const subscriptions = [

    pubsub.subscribe("todo/added", (data) => {
      printNextToDo(data);
    }),

    pubsub.subscribe('todo/change/*', (data) => {
      console.log(data);
      const container = document.getElementById('to-dos-column')
      domSmashing.clearElement(container);
      printToDos(data);
    }),
  ];

  return {
    printToDos,
    printNextToDo,
  };
})();
