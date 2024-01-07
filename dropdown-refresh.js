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
    
Webflow.require("ix2").init(rawData);


localStorage.removeItem("g_categoryID");
localStorage.removeItem("g_subCategoryID");
localStorage.removeItem("g_page");