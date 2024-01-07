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

class Task {
	_name;
	_Similar;
	_TestInputs;
	_TestOutputs;

	constructor(taskText, ins = null, outs = null, similars = null) {
		this._name = taskText;
		
		if (Array.isArray(similars)) {
			this._Similar = similars;
		} else if (similars !== null) {
			this._Similar = [similars];
		} else {
			this._Similar = null;
		}

		if (Array.isArray(ins)) {
			this._TestInputs = ins;
		} else if (ins !== null) {
			this._TestInputs = [ins];
		} else {
			this._TestInputs = null;
		}

		if (Array.isArray(outs)) {
			this._TestOutputs = outs;
		} else if (ins !== null) {
			this._TestOutputs = [outs];
		} else {
			this._TestOutputs = null;
		}
	}
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

let g_izbornik;
function setDropdown(izbornik) {
	$("div.category-dropdown").html("");
	g_izbornik = izbornik;

	for (let i = 0; i < izbornik.length; i++) {
		addDropdown(izbornik[i]._CategoryName, i, izbornik[i]._SubCategories);
	};
}



function addTask(task, taskID) {
	let taskHTML = `
        					<div
								data-w-id="a2155654-6d7f-027d-a70b-e30d05955b75"
								style="opacity: 0"
								class="card grid-2-column header-dropdown-card"
							>
								<div class="inner-container mg-left-24px">
									<div class="component-card-badge-top-wrapper" >
										<!--Dodati bjelu boju-->
										<span class="component-card-badge-top text-500">Task ${taskID + 1}</span>
									</div>

									<h1 class="text-500 bold mg-bottom-24px">
										${task._name}
									</h1>
                    `;
				
	if (task._TestInputs !== null && task._TestOutputs !== null) {
		console.log(task._TestOutputs);
		taskHTML += `
								<div class="input mg-bottom-16px">
									<strong>INPUT :</strong>
										<blockquote>${task._TestInputs[0]}</blockquote>
									<strong>OUTPUT :</strong>
										<blockquote>${task._TestOutputs[0]}</blockquote>
								</div>
		
		`
	}
    
    if (task._Similar != null) {
        taskHTML += `
                                        <div
                                            data-hover="false"
                                            data-delay="20"
                                            data-w-id="dc3b625c-4a68-4ebe-9b74-d3193fa9f32f"
                                            href="#"
                                            class="w-dropdown"
                                            >
                                                <a class="btn-primary w-inline-block w-dropdown-toggle pad-similar-btn"> 
                                                    <div class="flex-horizontal gap-column-4px">
                                                        <div style="color:white" >Find similar</div>
                                                        <img
                                                            src="./resources/icons/right-arrow.svg"
                                                            loading="eager"
                                                            alt=""
                                                            class="link-icon arrow-right"/>
                                                    </div>
                                                </a> 
                                            <nav class="w-dropdown-list dropdown-move-simlist rounded-rect-16">
                            `;

        task._Similar.forEach(similar => {
            taskHTML += `<span class="dropdown-similars">${similar}</span>`;
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

let error404ID = "404"
let homeID = "home";
let c_tasksID = "c-tasks";
let c_tasksSuf = ":task";
let useHash = true;

$home = $("div.tasks-container").clone();

function displayHome() {
    $("div.tasks-container").html($home);
    Webflow.require("ix2").init(rawData);
}

function displayCTasks() {
    $("div.tasks-container").html("<h1>C Tasks</h1> Ova stranica nije završena!");
    Webflow.require("ix2").init(rawData);
}

function display404() {
	$.ajax( {url: "index.html", context: document.body}).done( function () {
    $("div.tasks-container").html(`
	<div
	class="card _404"
>
	<div class="_404-not-found">404</div>
	<h2 class="text-500 bold color-neutral-800">
		Oops! Page not found
	</h2>
	<div class="inner-container _326px center">
		<p class="mg-bottom-24px">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel consectetur lorem, ac porta.
		</p>
	</div>
	<div class="flex-horizontal">
		<a
			href="/"
			class="btn-primary w-inline-block w--current"
			><div class="flex-horizontal gap-column-4px">
				<div>
					Back to home
				</div>
			</div
		></a>
	</div>
</div>
	`);
	});
    Webflow.require("ix2").init(rawData);
}

function displayCategory(categoryID, subCategoryID) {
	// TODO: Spojiti linkove s njihovim odgovarajućim stranicama
	$("div.tasks-container").html(`
		<div class="breadcrumb-wrapper mg-bottom-24px">
			<div class="flex align-center">
				<a data-w-id="520db6ac-b746-24e0-5769-1b51fae2710b" href="#c-tasks" class="breadcrumb-link-wrapper w-inline-block">
					<div class="text-600">C Tasks</div>
					<div class="breadcrumb-underline" style="background-color: rgb(31, 45, 84);"></div>
				</a>
				<img src="./resources/icons/breadcrumb-divider-icon.svg" loading="eager" alt=">" class="breadcrumb-divider">
			</div>
			
			<div class="flex align-center">
				<a data-w-id="520db6ac-b746-24e0-5769-1b51fae2710b" href="#notconnected" class="breadcrumb-link-wrapper w-inline-block">
					<div class="text-600">${g_izbornik[categoryID]._CategoryName}</div>
					<div class="breadcrumb-underline" style="background-color: rgb(31, 45, 84);"></div>
				</a>
				<img src="./resources/icons/breadcrumb-divider-icon.svg" loading="eager" alt=">" class="breadcrumb-divider">
			</div>
			
			<div class="text-600 breadcrumb-current">${g_izbornik[categoryID]._SubCategories[subCategoryID]._name}</div>
		</div>
	`);
	let tasks = g_izbornik[categoryID]._SubCategories[subCategoryID]._TaskList;

	for (let i = 0; i < tasks.length; i++) {
		addTask(tasks[i], i);
	}
}


function selectCategory(categoryID, subCategoryID) {
    // TODO: Istražiti može li se updateat HTML sa animacijama bez reloada stranice
    localStorage.setItem("g_categoryID", categoryID);
    localStorage.setItem("g_subCategoryID", subCategoryID);
    localStorage.setItem("g_page", c_tasksID);
	if (useHash) {
		window.location.hash = "#" + c_tasksID + "-c" + categoryID + "-s" + subCategoryID + c_tasksSuf;
	}
    location.reload();
}
