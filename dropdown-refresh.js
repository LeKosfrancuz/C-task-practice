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
										<span class="component-card-badge-top" style="background-color: var(--neutral-100)">Task ${taskID + 1}</span>
									</div>
									<h1 class="text-500 bold mg-bottom-24px">
										${task._name}
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
let useNameNotID = false; // Korisiti ce ime kategorija umjesto njihovih id-eva (ne provjerava za duplikate!)

$home = $("div.tasks-container").clone();

function displayHome() {
    $("div.tasks-container").html($home);
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
	$("div.tasks-container").html("");
	let tasks = izbornik[categoryID]._SubCategories[subCategoryID]._TaskList;

	for (let i = 0; i < tasks.length; i++) {
		addTask(tasks[i], i);
	}
}

function selectPage(pageID) {
    // TODO: Istražiti može li se updateat HTML sa animacijama bez reloada stranice
    if (pageID === 0) {
        localStorage.setItem("g_page", homeID);
	} if (pageID === 404 || pageID === error404ID) {
		localStorage.setItem("g_page", error404ID);
	}
    location.reload();
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

const Tasks = [
	new Task("Učitaj", ["Učitaj paran", "Učitaj neparan", "Učitaj palindrom"]),
	new Task("Upiši", ["Upiši paran", "Upiši neparan", "Upiši palindrom"]),
	new Task("Izračunaj", [
		"Izračunaj zbroj",
		"Izračunaj razliku",
		"Izračunaj aritmetičku sredinu",
	]),
	new Task("Učitaj još", ["Učitaj paran", "Učitaj neparan", "Učitaj palindrom"]),
	new Task("Upiši još", ["Upiši paran", "Upiši neparan", "Upiši palindrom"]),
	new Task("Izračunaj još", [
		"Izračunaj zbroj",
		"Izračunaj razliku",
		"Izračunaj aritmetičku sredinu",
	]),
];

const SeqNumericalTasks = [
	// Ulaz: Upiši sate i minute: 2 20
	// izlaz: 2 sata i 20 minuta iznosi 8400 sekundi
	new Task("U programu omogućite unos dva broja, broj sati i minuta. Ispišite koliko taj broj sati i minuta iznosi u sekundama.", [
		"U programu omogućite unos broja dana. Izračunati koliko to iznosi godina, mjeseci i dana.",
		"U programu omogućite unos broja sekundi i ispišite odgovarajuće vrijeme u satima, minutama i sekundama.",
	]),
	// Ulaz:
	// Izlaz: 
	new Task("U programu omogućite unos 10 brojeva. Ispišite najmanji i najveći od njih.", [
		"U programu omogućite unos 5 brojeva i zbrojiti samo one koji su dvoznamenkasti.",
		"U programu omogućite unos dva cijela broja i ispišite njihov zbroj, aritmetičku sredinu i zbroj kvadrata brojeva.",
		"U programu omogućite unos pozitivnog realnog broja. Izračunati kvadrat, kub i drugi korijen tog broja. Rezultat ispisati u redu (s dva 2 decimalna mjesta)",
		"U programu omogućite unos pet brojeva i izračunati aritmetičku sredinu.",
	]),
];

const SeqGeometryTasks = [
	// Ulaz: Učitaj stranicu a trokuta: 4
	// Izlaz: Opseg je: 12 \n Površina trokuta je: 6.93
	new Task("U programu omogućite unos stranicu a istostraničnog trokuta. Izračunati opseg i površinu trokuta.", [
		"U programu omogućite unos stranice kvadrata. Izračunati površinu, opseg i dijagonalu kvadrata (na 2 decimale)",
		"U programu omogućite unos promjera kruga. Izračunati njegov opseg i površinu (ispisati na 2 decimale)",
	]),
	// Ulaz:  Upišite koordinate točke A(x1 i y1): 1 2
	//		  Upišite koordinate točke A(x1 i y1): 3 5
	// Izlaz: Dvije točake su udaljene 3.61
	new Task("U programu omogućite unos koordinata točaka A(x1,y1) i B(x2,y2). Izračunati i ispisati njihovu udaljenost u koordinantnom sustavu!", null)
];

var izbornik = [
	new Category("Sequential", [
		new SubCategory("Numerical", SeqNumericalTasks),
		new SubCategory("Geometry", SeqGeometryTasks),
	]),
	new Category("For loop", [
		new SubCategory("Sequential", Tasks),
		new SubCategory("Geometric", Tasks),
	]),
	new Category("While loop", [new SubCategory("Characters", Tasks)]),
];

setDropdown(izbornik);

if (useHash) {
	//let this snippet run before your hashChange event binding code
	if( !window.HashChangeEvent )( function() {
		let lastURL = document.URL;
		window.addEventListener( "hashchange", function( event ) {
			Object.defineProperty( event, "oldURL", { enumerable: true, configurable: true, value: lastURL } );
			Object.defineProperty( event, "newURL", { enumerable: true, configurable: true, value: document.URL } );
			lastURL = document.URL;
		} );
	} () );
	function locationHashChanged( e ) {
		console.log( location.hash );
		console.log( e.oldURL, e.newURL );
		window.location.reload();
	}

	window.onhashchange = locationHashChanged;

	if (window.location.hash === `#${homeID}` || window.location.hash === "") {
		localStorage.setItem("g_page", homeID);
	} else if (window.location.hash.startsWith(`#${c_tasksID}`)) {
		localStorage.setItem("g_page", c_tasksID);

		let delim1 = window.location.hash.indexOf('-c');
		let delim2 = window.location.hash.indexOf('-s');
		let delim3 = window.location.hash.indexOf(c_tasksSuf);

		if (delim1 !== -1 && delim2 !== -1 && delim3 !== -1 && delim1 !== delim2 && delim2 !== delim3) {
			let categoryID = parseInt(window.location.hash.substring(delim1+2, delim2));
			let subCategoryID = parseInt(window.location.hash.substring(delim2+2, delim3));
			if (Number.isInteger(categoryID) && Number.isInteger(subCategoryID)
			&& categoryID < g_izbornik.length && subCategoryID < g_izbornik[categoryID]._SubCategories.length) {
				localStorage.setItem("g_categoryID", categoryID);
				localStorage.setItem("g_subCategoryID", subCategoryID);
			} else {
				localStorage.setItem("g_page", error404ID);
			}
		} else {
			localStorage.setItem("g_page", error404ID);
		}
	} else {
		localStorage.setItem("g_page", error404ID);
	}
}


if (localStorage.getItem("g_categoryID") != null && localStorage.getItem("g_subCategoryID") != null && localStorage.getItem("g_page") === c_tasksID) {
    $("a.home-btn").removeClass("w--current");
    $("a.ctasks-btn").addClass("w--current");
    displayCategory(localStorage.getItem("g_categoryID"), localStorage.getItem("g_subCategoryID"));
	if (useHash) {
		window.location.hash = "#" + c_tasksID + "-c" + localStorage.getItem("g_categoryID") + "-s" + localStorage.getItem("g_subCategoryID") + ":task";
	}
} else if (localStorage.getItem("g_page") === homeID) {
    displayHome();
} else if (localStorage.getItem("g_page") === error404ID) {
	display404();
}

izbornik.forEach((izbor) => {
	izbor.print();
});
    
Webflow.require("ix2").init(rawData);


localStorage.removeItem("g_categoryID");
localStorage.removeItem("g_subCategoryID");
localStorage.removeItem("g_page");