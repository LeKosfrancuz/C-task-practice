let c_taskViewID = "c-prevtask";
let c_taskViewSuf = ":task";

function addTask(catID, subCatID, task, taskID) {
	let taskHTML = `
        					<div
								data-w-id="a2155654-6d7f-027d-a70b-e30d05955b75"
								style="opacity: 0"
								class="grid-2-column header-dropdown-card"
							>
								<div class="inner-container mg-left-24px">
									
									
									<h1 class="text-task mg-bottom-24px">
										<span class="text-task bold">${taskID + 1}.</span>
										<a href="#${c_taskViewID}-c${catID}-s${subCatID}-t${taskID}${c_taskViewSuf}" class="no-underline">${task._name}</a>
									</h1>
                    `;
				
    /*
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
                                                            src="./resources/icons/button-right-arrow.svg"
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
    }*/

	taskHTML += `
								</div>
							</div>

							
                `;

	$("div.tasks-container").append(taskHTML);
}

let error404ID = "404"
let homeID = "home";
let c_tasksID = "c-tasks";
let c_tasksSuf = ":tasklist";
let useHash = true;

function displayCTask(categoryID, subCategoryID, taskID) {
    if (categoryID === "" || subCategoryID === "" || taskID === "") {
        location.hash = "#404";
        return;
    }
    let task = g_izbornik[categoryID]._SubCategories[subCategoryID]._TaskList[taskID];
    
    $("div.tasks-container").html("");
    let taskHTML = `
        					<div
								data-w-id="a2155654-6d7f-027d-a70b-e30d05955b75"
								style="opacity: 0"
								class="card grid-2-column header-dropdown-card"
							>
								<div class="inner-container mg-left-24px">
									<div class="component-card-badge-top-wrapper" >
										<span class="component-card-badge-top text-500">Task ${parseInt(taskID) + 1}</span>
									</div>

									<h1 class="text-500 bold mg-bottom-24px">
										${task._name}
									</h1>
                    `;
				
	if (task._TestInputs !== null && task._TestOutputs !== null) {
		if (task._TestInputs.length === 1 && task._TestOutputs.length === task._TestInputs.length) {
			taskHTML += `
									<div class="input mg-bottom-16px">
										<strong>INPUT :</strong>
											<blockquote>${task._TestInputs[0]}</blockquote>
										<strong>OUTPUT :</strong>
											<blockquote>${task._TestOutputs[0]}</blockquote>
									</div>
			
			`
		} else if (task._TestInputs.length === task._TestOutputs.length && task._TestInputs.length > 1) {
			taskHTML += `
			<div class="inner-container">
				<div data-easing="ease" data-duration-in="300" data-duration-out="100" class="flex-vertical align-start w-tabs">
					<div class="tabs-menu w-tab-menu">
			`;

			task._TestInputs.forEach((_, i) => {
				taskHTML += `
							<a data-w-tab="Tab ${i}" class="tab-menu-badge-link w-tab-link w--current">
								<div>Example ${i + 1}</div>
							</a>
				`;
			});

			taskHTML += `
					</div>
					
					<div class="overflow-visible w-tab-content">
					`;

			task._TestInputs.forEach((_, i) => {
				taskHTML += `
							<div data-w-tab="Tab ${i}" class="w-tab-pane" >
									<div class="input mg-bottom-16px">
										<strong>INPUT :</strong>
											<blockquote>${task._TestInputs[i]}</blockquote>
										<strong>OUTPUT :</strong>
											<blockquote>${task._TestOutputs[i]}</blockquote>
									</div>
							</div>
				`;
			});
			  
			taskHTML += `
					</div>
                </div>
            </div>
			`;
		}
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
                                                        <div style="color:white" >View Solution</div>
                                                        <img
                                                            src="./resources/icons/button-right-arrow.svg"
                                                            loading="eager"
                                                            alt=""
                                                            class="link-icon arrow-right"/>
                                                    </div>
                                                </a> 
                                            <nav class="w-dropdown-list dropdown-move-simlist rounded-rect-16">
                            `;

        //task._Similar.forEach(similar => {
            //taskHTML += `<span class="dropdown-similars">${similar}</span>`;
            taskHTML += `<span class="dropdown-similars">int main(void) { return 0; }</span>`;
        //});

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

$home = $("div.tasks-container").clone();

function displayHome() {
    $("div.tasks-container").html($home);
	$("div.izbornik.hidden-on-tablet").addClass("sidebar-hidden");
	$("div.main-dashboard-grid").removeClass("grid-2-columns");
    Webflow.require("ix2").init(rawData);
}

function displayCTasks() {
	$("div.sidebar-title").html("C Tasks - By Difficulty");

    $("div.tasks-container").html("<h1>C Tasks</h1> Ova stranica nije završena! <br> Odabir zadatka omogućen je kroz padajuće izbornike ili klikom na kategoriju.");
    let ctasksHTML = "";
    g_izbornik.forEach((category, i) => {
        ctasksHTML += `
            <h3> ${category._CategoryName} </h3>
        `;
        category._SubCategories.forEach((subCategory, j) => {
            ctasksHTML += `
                <a href="#${c_tasksID}-c${i}-s${j}${c_tasksSuf}" class="ctasks-category-link"> 
                <div class="card container-default mg-bottom-24px" style="padding-bottom: 8px">
                    <h4> ${subCategory._name} </h4>
            `;

            subCategory._TaskList.forEach((task, k) => {
                ctasksHTML += `
                    <div> <strong>Task ${k + 1}:</strong> ${task._name}</div>
                `;
            });

            ctasksHTML += `</div> </a>`;
        });
    });

    $("div.tasks-container").append(ctasksHTML);
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

function displayCategory(izbornik, categoryID, subCategoryID) {
	$(`div.dropdown-${categoryID}`).addClass("w--open")
	$(`div.dropdown-${categoryID}`).html(`
                                                <div class="text-block" style="display: inline-block;">${izbornik[categoryID]._CategoryName}</div> 
                                                        <img
                                                            src="./resources/icons/button-right-arrow-black.svg"
                                                            loading="eager"
                                                            alt=""
                                                            class="link-icon arrow-right"/>

												`);
	$(`nav.dropdown-${categoryID}`).addClass("w--open");
	$(`nav.dropdown-${categoryID}`).addClass("dropdown-open-override");
	$(`a.dropdown-${categoryID}-${subCategoryID}`).addClass("w--current");

	$("div.sidebar-title").html(`C Tasks - ${izbornik[categoryID]._CategoryName}`);


	$("div.tasks-container").html("");
	let tasks = izbornik[categoryID]._SubCategories[subCategoryID]._TaskList;

	tasks.forEach((task, i) => addTask(categoryID, subCategoryID, task, i));
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