function addDropdown(categoryName, categoryID, subCategories) {
	let newDropdown = `
                                        <div
                                            data-hover="false"
                                            data-delay="20"
                                            data-w-id="23df6058-9325-fe01-4f10-779a60659a0b"
                                            class="w-dropdown"
                                        > 
                                            <div class="dropdown-toggle w-dropdown-toggle dropdown-${categoryID}"> 
                                                <div class="text-block" style="display: inline-block;">${categoryName}</div> 
                                                <div class="line-rounded-icon header-dropdown-icon" style="display: inline-block;">
                                                    
                                                </div>
                                            </div> 
    `;
	newDropdown += `<nav class="dropdown-list w-dropdown-list dropdown-move-tasklist rounded-rect-6 dropdown-${categoryID}">`;

	// data-w-id="f18a1fce-0ff6-7565-5f48-1e0735f5d8ed"
	for (let i = 0; i < subCategories.length; i++) {
		newDropdown += `<a onclick="selectCategory(${categoryID}, ${i})" class="w-dropdown-link dropdown-${categoryID}-${i}">${subCategories[i]._name}</a>`;
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
