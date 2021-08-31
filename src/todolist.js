const testToDoArray = [
  21,
  "Walk the dog",
  "I really need to walk the dog to keep him healthy.",
  "Web Development",
  "due date",
  false,
  "high",
];
const testToDoArray2 = [
  222,
  "Build a ToDo App",
  "Bulid a rocking ToDo app so you can take over the world",
  "Web Development",
  "due date",
  false,
  "high",
];
const testToDoArray3 = [
  111,
  "Learn Guitar",
  "Rock out man!!",
  "Hobbies",
  "due date",
  false,
  "high",
];
const testToDoArray4 = [
  333,
  "Do the grocery shopping",
  "Milk, Eggs, Butter, BEER!",
  "Household",
  "due date",
  true,
  "high",
];

const tempProjectsArray = ["Pets", "Web Development", "Hobbies", "Household"];

const toDoListManager = (() => {
  const toDoList = [];

  // Factory function to create the individual ToDo item.
  const toDoFactory = (
    id,
    title,
    description,
    project,
    dueDate,
    completed,
    priority
  ) => {
    return { id, title, description, project, dueDate, completed, priority };
  };

  // Load a previously saved ToDo list from offline storage or database.
  const loadSavedToDoList = (loadedToDoListArray) => {
    toDoList.push(...loadedToDoListArray);
  };
  // add a single object (toDoListItem) into the toDoList Array
  const addToDoListItem = (toDoListItemArray) => {
    toDoList.push(toDoFactory(...toDoListItemArray));
  };

  // Temporary Update Function. Removes entire previous ToDo Item and replaces
  // with entirely new item. A better way will be to update individual key/value pairs.
  const updateToDoListItem = (searchKey, searchKeyValue, toDoListItemArray) => {
    deleteSingleToDoListItem(searchKey, searchKeyValue);
    addToDoListItem(toDoListItemArray);
  };

  // Temporary Function to Update the Projects when a change has been made.
  // Should be removed when individual key/pair updates function is written.
  const tempUpdateProject = (project, updatedProject) => {
    toDoList.forEach((object) => {
      const toDoItem = object;
      for (const key in toDoItem) {
        if (toDoItem[key] === project) {
          toDoItem[key] = updatedProject;
        }
      }
    });
  };
  // Finds the ToDo List Item from the key/value pair and deletes it.
  // Designed for indexing via the ID number which should be unique.
  // May need to add a check to see if two or more of the key/value pairs match.
  const deleteSingleToDoListItem = (key, value) => {
    const index = toDoList.findIndex((element) => element[key] === value);
    toDoList.splice(index, 1);
  };

  // allows read access to the toDoList
  const readToDoList = () => {
    return toDoList;
  };

  return {
    loadSavedToDoList,
    addToDoListItem,
    readToDoList,
    updateToDoListItem,
    deleteSingleToDoListItem,
    tempUpdateProject,
  };
})();

const projectsMangager = (() => {
  const projectsList = [];

  const loadSavedToProjectsList = (loadedProjectsListArray) => {
    projectsList.push(...loadedProjectsListArray);
  };

  const addNewProject = (project) => {
    projectsList.push(project);
  };

  const deleteProject = (project) => {
    projectsList.splice(projectsList.indexOf(project));
  };

  const updateProject = (project, updatedProject) => {
    projectsList[projectsList.indexOf(project)] = updatedProject;
  };

  const readProjects = () => {
    return projectsList;
  };

  return {
    loadSavedToProjectsList,
    addNewProject,
    deleteProject,
    updateProject,
    readProjects,
  };
})();

let tempToDoList = toDoListManager.readToDoList();
let tempProjectsList = projectsMangager.readProjects();

toDoListManager.addToDoListItem(testToDoArray);
toDoListManager.addToDoListItem(testToDoArray2);
toDoListManager.addToDoListItem(testToDoArray3);
toDoListManager.addToDoListItem(testToDoArray4);
projectsMangager.loadSavedToProjectsList(tempProjectsArray);

projectsMangager.updateProject("Web Development", "WebDev");
toDoListManager.tempUpdateProject("Web Development", "WebDev");

console.log(tempToDoList);
