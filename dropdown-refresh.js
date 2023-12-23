function addDropdown(categoryName, categoryID, subCategories) {
	let newDropdown = `
                                        <div
                                            data-hover="false"
                                            data-delay="20"
                                            data-w-id="23df6058-9325-fe01-4f10-779a60659a0b"
                                            class="w-dropdown"
                                        > 
                                            <div class="dropdown-toggle w-dropdown-toggle"> 
                                                <div class="text-block" style="display: inline-block;">${categoryName}</div> 
                                                <div class="line-rounded-icon header-dropdown-icon" style="display: inline-block;">
                                                    
                                                </div>
                                            </div> 
    `;
	newDropdown += `<nav class="dropdown-list w-dropdown-list dropdown-move-tasklist rounded-rect-6">`;

	// data-w-id="f18a1fce-0ff6-7565-5f48-1e0735f5d8ed"
	for (let i = 0; i < subCategories.length; i++) {
		newDropdown += `<a onclick="selectCategory(${categoryID}, ${i})" class="w-dropdown-link">${subCategories[i]._name}</a>`;
	};

	newDropdown += `                                            
                                            </nav>
                                        </div>
    `;

	$("div.category-dropdown").append(newDropdown);
	// $("div.w-icon-dropdown-toggle").html('&#709;');
}

function Task(taskText, similars) {
	this._name = taskText;
	this._Similar = similars;
}

function SubCategory(subName, taskList) {
	this._name = subName;
	this._TaskList = taskList;
}

class Category {
	_CategoryName;
	_SubCategories;

	constructor(categoryName, subCategoryList) {
		this._CategoryName = categoryName;
		this._SubCategories = subCategoryList;
	}

	print() {
		console.log("Category: " + this._CategoryName);

		this._SubCategories.forEach((subCategory) => {
			console.log("   > " + subCategory._name);
			console.log(subCategory);
		});

		console.log("");
	}
}

function setDropdown(izbornik) {
	$("div.category-dropdown").html("");

	for (let i = 0; i < izbornik.length; i++) {
		addDropdown(izbornik[i]._CategoryName, i, izbornik[i]._SubCategories);
	};
}

$home = $("div.tasks-container").clone();

function displayHome() {
    $("div.tasks-container").html($home);
    Webflow.require("ix2").init(rawData);
}


function addTask(task, taskID) {
	let taskHTML = `
        					<div
								data-w-id="a2155654-6d7f-027d-a70b-e30d05955b75"
								style="opacity: 0"
								class="card grid-2-column header-dropdown-card"
							>
								<div class="inner-container mg-left-24px">
									<h1 class="text-500 bold mg-bottom-24px">
										Task ${taskID + 1}: ${task._name}
									</h1>
                    `;
    
    if (task._Similar != null) {
        taskHTML += `
                                        <div
                                            data-hover="false"
                                            data-delay="20"
                                            data-w-id="dc3b625c-4a68-4ebe-9b74-d3193fa9f32f"
                                            href="#"
                                            class="w-dropdown"
                                            >
                                                <a class="btn-primary w-inline-block w-dropdown-toggle"> 
                                                    <div class="flex-horizontal gap-column-4px">
                                                        <div style="color:white" >Find similar</div>
                                                        <img
                                                            src="./resources/icons/right-arrow.svg"
                                                            loading="eager"
                                                            alt=""
                                                            class="link-icon arrow-right"/>
                                                    </div>
                                                </a> 
                                            <nav class="w-dropdown-list dropdown-move-simlist rounded-rect-50">
                            `;

        task._Similar.forEach(similar => {
            taskHTML += `<span class="w-dropdown-btn">${similar}</span>`;
        });

        taskHTML += `
                                            </nav>
                                        </div>
                    `;
    }

	taskHTML += `
								</div>
							</div>

							<div
								data-w-id="a0cc1e3b-376e-4003-b6f7-490f4a5479fb"
								style="opacity: 0"
								class="divider home-sections-divider"
							></div>
                `;

	$("div.tasks-container").append(taskHTML);
}

function displayCategory(categoryID, subCategoryID) {
	$("div.tasks-container").html("");
	let tasks = izbornik[categoryID]._SubCategories[subCategoryID]._TaskList;

	for (let i = 0; i < tasks.length; i++) {
		addTask(tasks[i], i);
	}
}

function selectPage(pageID) {
    // TODO: Istražiti može li se updateat HTML sa animacijama bez reloada stranice
    if (pageID === 0)
        localStorage.setItem("g_page", "home");
    location.reload();
}

function selectCategory(categoryID, subCategoryID) {
    // TODO: Istražiti može li se updateat HTML sa animacijama bez reloada stranice
    localStorage.setItem("g_categoryID", categoryID);
    localStorage.setItem("g_subCategoryID", subCategoryID);
    localStorage.setItem("g_page", "c-tasks");
    location.reload();
}

const Tasks = [
	new Task("Učitaj", ["Učitaj paran", "Učitaj neparan", "Učitaj palindrom"]),
	new Task("Upiši", ["Upiši paran", "Upiši neparan", "Upiši palindrom"]),
	new Task("Izračunaj", [
		"Izračunaj zbroj",
		"Izračunaj razliku",
		"Izračunaj aritmetičku sredinu",
	]),
];

var izbornik = [
	new Category("For loop", [
		new SubCategory("Sequential", Tasks),
		new SubCategory("Geometric", Tasks),
	]),
	new Category("While loop", [new SubCategory("Characters", Tasks)]),
];

setDropdown(izbornik);

if (localStorage.getItem("g_categoryID") != null && localStorage.getItem("g_subCategoryID") != null && localStorage.getItem("g_page") === "c-tasks") {
    $("a.home-btn").removeClass("w--current");
    $("a.ctasks-btn").addClass("w--current");
    displayCategory(localStorage.getItem("g_categoryID"), localStorage.getItem("g_subCategoryID"));
} else if (localStorage.getItem("g_page") === "home") {
    displayHome();
}

izbornik.forEach((izbor) => {
	izbor.print();
});
    
Webflow.require("ix2").init(rawData);