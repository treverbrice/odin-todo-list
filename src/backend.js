function Project(projectName) {
    let shownItems = [];
    let uncompletedItems = [];
    let completedItems = [];
    let name = projectName;
    let showCompleted = false;
    let sortBy = "time"; //"time" or "priority"

    function sortTime() {
        function timeCompare(a, b) {
            if(a.getInfo().dueTime < b.getInfo().dueTime) {
                return( -1 );
            }
            return( 1 );
        }
        sortBy = "time"; // sets the flag in the case that this was called externally
        shownItems.sort(timeCompare);
    }
    function sortPriority() {
        function priorityCompare(a, b) {
            if(a.getInfo().category.getInfo().priority < b.getInfo().category.getInfo().priority) {
                return( -1 );
            }
            return( 1 );
        }
        sortBy = "priority"; // sets the flag in the case that this was called externally
        shownItems.sort(priorityCompare);
    }
    function toggleCompleted() {
        showCompleted = !showCompleted;
        updateShownItems();
    }
    function updateName(newName) {
        name = newName;
    }
    function addItem(newItem) {
        if(newItem.getInfo().completed == true) {
            completedItems.push(newItem);
        } else {
            uncompletedItems.push(newItem);
        }
        updateShownItems();
    }
    function moveItem(item) {
        deleteItem(item);
        if(item.getInfo().completed == true) {
            completedItems.push(item);
        } else {
            uncompletedItems.push(item);
        }
        updateShownItems();
    }
    function deleteItem(item) {
        let index = uncompletedItems.indexOf(item);
        if(index == -1) { // item not found in uncompletedItems, check completedItems
            index = completedItems.indexOf(item);
            if(index == -1) { // item not found in completedItems
                return;
            } else {
                completedItems.splice(index, 1);
            }
        } else {
            uncompletedItems.splice(index, 1);
        }
        updateShownItems();
    }
    function updateShownItems() {
        if(showCompleted) {
            shownItems = uncompletedItems.concat(completedItems);
        } else {
            shownItems = uncompletedItems;
        }
        if(sortBy == "time") {
            sortTime();
        } else {
            sortPriority();
        }
    }
    function getShownItems() {
        return( shownItems );
    }
    function getName() {
        return( name );
    }

    return { sortTime, sortPriority, toggleCompleted, updateName, addItem, moveItem, deleteItem, updateShownItems, getShownItems, getName };
}

function TodoItem(itemTitle, itemDueTime, itemCategory, isComplete = false, itemDescription = "") {
    let title = itemTitle;
    let dueTime = itemDueTime;
    let completed = isComplete;
    let category = itemCategory;
    let description = itemDescription;
    
    function updateTitle(newTitle) {
        title = newTitle;
    }
    function updateDueTime(newDueTime) {
        dueTime = newDueTime;
    }
    function updateCompleted(parentProject) {
        completed = !completed;
        parentProject.moveItem(this);
    }
    function updateCategory(newCategory) {
        category = newCategory;
    }
    function updateDescription(newDescription) {
        description = newDescription;
    }
    function getInfo() {
        return{ title, dueTime, completed, category, description };
    }

    return{ updateTitle, updateDueTime, updateCompleted, updateCategory, updateDescription, getInfo };
}

function Category(categoryName, categoryPriority, categoryColor) {
    let name = categoryName;
    let priority = categoryPriority;
    let color = categoryColor;

    function updateName(newName) {
        name = newName;
    }
    function updatePriority(newPriority) {
        priority = newPriority
    }
    function updateColor(newColor) {
        color = newColor;
    }
    function getInfo() {
        return{ name, priority, color };
    }

    return{ updateName, updatePriority, updateColor, getInfo };
}

let AllCategories = function CategoryContainer() {
    let categoriesList = [];

    function addCategory(newCategory) {
        categoriesList.push(newCategory);
    }
    function updatePriorities(cat, newPriority) {
        categoriesList.splice((cat.getInfo().priority - 1), 1); // removes category
        categoriesList.splice((newPriority - 1), 0, cat); // replaces category
        for(let i = 0; i < categoriesList.length; i++) {
            categoriesList[i].updatePriority(i + 1);
        }
        AllProjects.updateAllShownItems();
    }
    function getCategoriesList() {
        return( categoriesList );
    }
    function removeCategory(cat) {
        categoriesList.splice((cat.getInfo().priority - 1), 1);
        for(let i = 0; i < categoriesList.length; i++) {
            categoriesList[i].updatePriority(i + 1);
        }
        AllProjects.updateAllShownItems();
    }

    return{ addCategory, updatePriorities, getCategoriesList, removeCategory };
}();

let AllProjects = function ProjectContainer() {
    let projectsList = [];

    function addProject(newProject) {
        projectsList.push(newProject);
    }
    function deleteProject(projectToDelete) {
        let index = projectsList.indexOf(projectToDelete);
        if(index != -1) { // item found
            projectsList.splice(index, 1);
        }
    }
    function getProjectsList() {
        return( projectsList );
    }
    function updateAllShownItems() {
        projectsList.forEach(element => {
            element.updateShownItems();
        });
    }

    return{ addProject, deleteProject, getProjectsList, updateAllShownItems };
}();

export { Project, TodoItem, Category, AllCategories, AllProjects };

// tests for Project object
/*
function printAll() {
    myProject.getShownItems().forEach(element => {
        console.log(element.getInfo());
    })
}

let myProject = Project("my project");
let myTodoItem1 = TodoItem("my item 1", new Date("October 31, 2023 13:00"));
myProject.addItem(myTodoItem1);
let myTodoItem2 = TodoItem("my item 2", new Date("November 3, 2023 13:00"));
myProject.addItem(myTodoItem2);
let completedItem1 = TodoItem("completed", new Date("October 12, 2023 11:00"), true);
myProject.addItem(completedItem1);

console.log(myProject.getShownItems());
console.log(myProject.getShownItems()[0].getInfo().dueTime);
console.log(myProject.getShownItems()[1].getInfo().dueTime);

myProject.toggleCompleted();
printAll();

myProject.sortTime();
printAll();

console.log(myProject.getName());
myProject.updateName("New Name!");
console.log(myProject.getName());

myTodoItem2.updateCompleted();
myProject.moveItem(myTodoItem2);
printAll();
myProject.toggleCompleted();
printAll();
myProject.toggleCompleted();
printAll();
myProject.deleteItem(completedItem1);
printAll();
*/

//tests for TodoItem object
/*
function printAll(statement) {
    console.log(statement);
    myProject.getShownItems().forEach(element => {
        console.log(element.getInfo());
    })
}

let urgentCategory = Category("Urgent", 1, "rgb(255, 0, 0)");
AllCategories.addCategory(urgentCategory);
let eventuallyCategory = Category("Eventually", 4, "rgb(0, 255, 0)");
AllCategories.addCategory(eventuallyCategory);
let thirdCategory = Category("other one", 2, "rgb(0, 0, 255)");
AllCategories.addCategory(thirdCategory);

let myProject = Project("my project");
AllProjects.addProject(myProject);
let myTodoItem1 = TodoItem("my item 1", new Date("October 31, 2023 13:00"), eventuallyCategory);
myProject.addItem(myTodoItem1);
let myTodoItem2 = TodoItem("my item 2", new Date("November 3, 2023 13:00"), urgentCategory);
myProject.addItem(myTodoItem2);
let completedItem1 = TodoItem("completed", new Date("October 12, 2023 11:00"), thirdCategory, true);
myProject.addItem(completedItem1);

console.log(myProject.getShownItems());

myProject.toggleCompleted();
printAll("show completed");

myTodoItem1.updateCompleted(myProject);
printAll("complete myTodoItem1");

myProject.toggleCompleted();
printAll("hide completed");
*/
/*
myProject.sortTime();
printAll("sort by time");

myProject.sortPriority();
printAll("sort by priority (2, completed, 1)");

AllCategories.updatePriorities([urgentCategory, eventuallyCategory, thirdCategory], [2, 3, 1]);
printAll("sort by new priority (completed, 2, 1)");

myProject.sortPriority();
printAll("sort again by new priority");
*/