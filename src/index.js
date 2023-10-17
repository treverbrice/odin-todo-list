function Project(projectName) {
    let shownItems = [];
    let uncompletedItems = [];
    let completedItems = [];
    let name = projectName;
    let showCompleted = false;

    function sortTime() {

    }
    function sortPriority() {

    }
    function toggleCompleted() {
        showCompleted = !showCompleted;
    }
    function updateName(newName) {
        name = newName;
    }
    function addItem() {

    }
    function moveItem() {

    }
    function deleteItem() {

    }
    function getShownItems() {
        return{ shownItems };
    }

    return { sortTime, sortPriority, toggleCompleted, updateName, addItem, moveItem, deleteItem, getShownItems };
}

function TodoItem(itemTitle) {
    let title = itemTitle;
    let dueTime = {};
    let completed = false;
    let category = {};
    let description = "";
    
    function updateTitle(newTitle) {
        title = newTitle;
    }
    function updateDueTime() {

    }
    function updateCompleted() {

    }
    function updateCategory() {

    }
    function updateDescription(newDescription) {
        description = newDescription;
    }
    function getInfo() {
        return{ title, dueTime, completed, category, description };
    }

    return{ updateTitle, updateDueTime, updateCompleted, updateCategory, updateDescription, getInfo };
}

function Category(categoryName) {
    let name = categoryName;
    let priority = 0;
    let color = {};

    function updateName(newName) {
        name = newName;
    }
    function updatePriority() {

    }
    function updateColor(newColor) {
        color = newColor;
    }
    function getInfo() {
        return{ name, priority, color };
    }

    return{ updateName, updatePriority, updateColor, getInfo };
}

AllCategories = function CategoryContainer() {
    let categoriesList = [];

    function addCategory(newCategory) {
        categoriesList.add(newCategory);
    }
    function updatePriorities() {
        /*
            for each cat
                get pos from frond end
                cat.updatePriority(pos)
        */
    }
    function getCategoriesList() {
        return{ categoriesList };
    }

    return{ addCategory, updatePriorities, getCategoriesList };
}();

AllProjects = function ProjectContainer() {
    let projectsList = [];

    function addProject(newProject) {
        projectsList.add(newProject);
    }
    function deleteProject(projectToDelete) {

    }
    function getProjectsList() {
        return{ projectsList };
    }

    return{ addProject, deleteProject, getProjectsList };
}();