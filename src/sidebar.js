import { Category, AllCategories } from "./backend";

export function sidebar() {
    // retrieves and clears the sidebar to refresh it
    const categoryDivContainer = document.getElementById("categoryDivContainer");
    categoryDivContainer.innerHTML = "";

    // existing categories
    AllCategories.getCategoriesList().forEach(cat => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("categoryRow");
        categoryDiv.style.borderColor = cat.getInfo().color;
        const rankSpan = document.createElement("span");
        rankSpan.textContent = cat.getInfo().priority;
        const nameSpan = document.createElement("span");
        nameSpan.textContent = ` | ${cat.getInfo().name}`;
        const settingsButton = document.createElement("button");
        settingsButton.innerHTML = `<i class="fa-solid fa-gear"></i>`;
        settingsButton.addEventListener("click", function openSettings() {
            if(settingsDiv.style.display == "none") {
                settingsDiv.style.display = "block";
            } else { settingsDiv.style.display = "none"; }
        });

        // settingsDiv
        const settingsDiv = document.createElement("div");
        const renameLabel = document.createElement("label");
        renameLabel.setAttribute("for", "rename");
        renameLabel.textContent = "Name: ";
        const rename = document.createElement("input");
        rename.setAttribute("type", "text");
        rename.setAttribute("name", "rename");
        rename.setAttribute("value", cat.getInfo().name);
        settingsDiv.appendChild(renameLabel);
        settingsDiv.appendChild(rename);

        const recolorLabel = document.createElement("label");
        recolorLabel.setAttribute("for", "recolor");
        recolorLabel.textContent = "Color: ";
        const recolor = document.createElement("input");
        recolor.setAttribute("type", "color");
        recolor.setAttribute("name", "recolor");
        recolor.setAttribute("value", cat.getInfo().color);
        settingsDiv.appendChild(recolorLabel);
        settingsDiv.appendChild(recolor);

        const repriorityLabel = document.createElement("label");
        repriorityLabel.setAttribute("for", "repriority");
        repriorityLabel.textContent = "Priority: ";
        const repriority = document.createElement("select");
        repriority.setAttribute("name", "repriority");
        const currentPriority = cat.getInfo().priority;
        for(let i = 1; i <= AllCategories.getCategoriesList().length; i++) {
            const option = document.createElement("option");
            option.setAttribute("value", i);
            option.textContent = i;
            if(i == currentPriority) {
                option.selected = true;
            }
            repriority.appendChild(option);
        }
        settingsDiv.appendChild(repriorityLabel);
        settingsDiv.appendChild(repriority);

        const settingsSubmitButton = document.createElement("button");
        settingsSubmitButton.classList.add("categorySettingsSubmitBtn");
        settingsSubmitButton.textContent = "Submit";
        settingsSubmitButton.addEventListener("click", function changeCategorySettings() {
            cat.updateName(rename.value);
            AllCategories.updatePriorities(cat, repriority.value);
            cat.updateColor(recolor.value);
            sidebar();
        });
        settingsDiv.appendChild(settingsSubmitButton);

        const settingsDeleteButton = document.createElement("button");
        settingsDeleteButton.classList.add("categorySettingsDeleteBtn");
        settingsDeleteButton.textContent = "Delete";
        settingsDeleteButton.addEventListener("click", function deleteCategory() {
            AllCategories.removeCategory(cat);
            sidebar();
        });
        settingsDiv.appendChild(settingsDeleteButton);

        settingsDiv.style.display = "none";
    
        categoryDiv.appendChild(rankSpan);
        categoryDiv.appendChild(nameSpan);
        categoryDiv.appendChild(settingsButton);
        categoryDiv.appendChild(settingsDiv);
        categoryDivContainer.appendChild(categoryDiv);
    });
}

export function assignSidebarListeners() {
    document.getElementById("newCategoryButton").addEventListener("click", toggleNewCategoryForm);
    document.getElementById("categoryFormSubmitButton").addEventListener("click", submitNewCategoryForm);
    function submitNewCategoryForm(e) {
        e.preventDefault();
        let name = document.getElementById("categoryName").value;
        let color = document.getElementById("categoryColor").value;
        let priority = AllCategories.getCategoriesList().length + 1;
        let newCategory = Category(name, priority, color);
        AllCategories.addCategory(newCategory);
        sidebar();

        // reset form
        document.getElementById("categoryName").value = "";
        document.getElementById("categoryColor").value = "#b22222";
        toggleNewCategoryForm();
    }
    function toggleNewCategoryForm() {
        const newCategoryForm = document.getElementById("newCategoryForm");
        if(newCategoryForm.style.display == "none") {
            newCategoryForm.style.display = "block";
            document.getElementById("categoryName").select();
        } else { newCategoryForm.style.display = "none"; }
    }

}