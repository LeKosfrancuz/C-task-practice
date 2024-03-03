// Refresh site on url change
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


function selectPage(izbornik) {
	if (window.location.hash === `#${homeID}` || window.location.hash === "") {
		localStorage.setItem("g_page", homeID);
		if (window.location.hash !== "") {
			// clear # from url after #home
			window.location.href = window.location.origin + window.location.pathname; 
		}
	} else if (window.location.hash === "#" + c_tasksID) {
		localStorage.setItem("g_page", c_tasksID);
	} else if (window.location.hash.startsWith(`#${c_tasksID}`)) {
		localStorage.setItem("g_page", c_tasksID);
		
		let delim1 = window.location.hash.indexOf('-c');
		let delim2 = window.location.hash.indexOf('-s');
		let delim3 = window.location.hash.indexOf(c_tasksSuf);

		if (delim1 !== -1 && delim2 !== -1 && delim3 !== -1 && delim1 !== delim2 && delim2 !== delim3) {
			let categoryID = parseInt(window.location.hash.substring(delim1+2, delim2));
			let subCategoryID = parseInt(window.location.hash.substring(delim2+2, delim3));
			if (Number.isInteger(categoryID) && Number.isInteger(subCategoryID)
			&& categoryID < izbornik.length && subCategoryID < izbornik[categoryID]._SubCategories.length) {
				localStorage.setItem("g_categoryID", categoryID);
				localStorage.setItem("g_subCategoryID", subCategoryID);
			} else {
				localStorage.setItem("g_page", error404ID);
			}
		} else {
			localStorage.setItem("g_page", error404ID);
		}
	} else if (window.location.hash.startsWith(`#${c_taskViewID}`)) {
		localStorage.setItem("g_page", c_taskViewID);

		let dCat = window.location.hash.indexOf('-c');
		let dSubCat = window.location.hash.indexOf('-s');
		let dTask = window.location.hash.indexOf('-t');
		let dEnd = window.location.hash.indexOf(c_taskViewSuf);

		if (dCat !== -1 && dSubCat !== -1 && dTask !== -1 && dEnd !== -1 
			&& dCat !== dSubCat && dSubCat !== dTask && dTask !== dEnd) {
			let categoryID = parseInt(window.location.hash.substring(dCat+2, dSubCat));
			let subCategoryID = parseInt(window.location.hash.substring(dSubCat+2, dTask));
			let taskID = parseInt(window.location.hash.substring(dTask+2, dEnd));

			if (Number.isInteger(categoryID) && Number.isInteger(subCategoryID) && Number.isInteger(taskID)
			&& categoryID < izbornik.length && subCategoryID < izbornik[categoryID]._SubCategories.length
			&& taskID < izbornik[categoryID]._SubCategories[subCategoryID]._TaskList.length) {
				localStorage.setItem("g_categoryID", categoryID);
				localStorage.setItem("g_subCategoryID", subCategoryID);
				localStorage.setItem("g_taskID", taskID);
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


function displayPage(izbornik) {
	if (localStorage.getItem("g_categoryID") != null && localStorage.getItem("g_subCategoryID") != null && localStorage.getItem("g_page") === c_tasksID) {
		$("a.home-btn").removeClass("w--current");
		$("a.ctasks-btn").addClass("w--current");
		displayCategory(izbornik, localStorage.getItem("g_categoryID"), localStorage.getItem("g_subCategoryID"));
		if (useHash) {
			window.location.hash = "#" + c_tasksID + "-c" + localStorage.getItem("g_categoryID") + "-s" + localStorage.getItem("g_subCategoryID") + c_tasksSuf;
		}
	} else if (localStorage.getItem("g_page") === c_taskViewID) {
		displayCTask(localStorage.getItem("g_categoryID"), localStorage.getItem("g_subCategoryID"), localStorage.getItem("g_taskID"));
	} else if (localStorage.getItem("g_page") === homeID) {
		displayHome();
	} else if (localStorage.getItem("g_page") === c_tasksID) {
		$("a.home-btn").removeClass("w--current");
		$("a.ctasks-btn").addClass("w--current");
		displayCTasks();
	} else if (localStorage.getItem("g_page") === error404ID) {
		display404();
	}

	izbornik.forEach((izbor) => {
		izbor.print();
	});
}


selectPage(g_izbornik);
displayPage(g_izbornik);

Webflow.require("ix2").init(rawData);

/*
localStorage.removeItem("g_categoryID");
localStorage.removeItem("g_subCategoryID");
localStorage.removeItem("g_taskID")
localStorage.removeItem("g_page");*/