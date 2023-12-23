function addDropdown (categoryName, tasks) {
    let newDropdown = `
                                        <div
                                            data-hover="false"
                                            data-delay="20"
                                            data-w-id="23df6058-9325-fe01-4f10-779a60659a0b"
                                            class="position-relative---z-index-2 w-dropdown" 
                                        > 
                                            <div class="dropdown-toggle w-dropdown-toggle"> 
                                                <span class="text-block">${categoryName}</span> 
                                                <span class="line-rounded-icon header-dropdown-icon">
                                                    
                                                </span>
                                            </div> 
    `;
    newDropdown += `<nav class="dropdown-list w-dropdown-list dropdown-move-tasklist">`;

                                            // data-w-id="f18a1fce-0ff6-7565-5f48-1e0735f5d8ed"
    tasks.forEach(task => {
        
         newDropdown += `<a href="#" class="w-dropdown-link">${task.text}</a>`;
    });

    newDropdown += `                                            
                                            </nav>
                                        </div>
    `;

    $("div.category-dropdown").append(newDropdown);
    // $("div.w-icon-dropdown-toggle").html('&#709;');
}

function Task(taskText, similars) {
    this.text = taskText;
    this.similar = similars;
}

class Category {
    _CategoryName;
    _Tasks;

    constructor(categoryName, taskList) {
        this._CategoryName = categoryName;
        this._Tasks = taskList;
    }

    print() {
        console.log("Category: " + this._CategoryName);
        console.log("\n" + this._Tasks);
    }
}

function setDropdown(izbornik) {
    $("div.category-dropdown").html('');

    izbornik.forEach(category => {
        addDropdown(category._CategoryName, category._Tasks);
    });
}



const Tasks = [
    new Task("Učitaj", ["Učitaj paran", "Učitaj neparan", "Učitaj palindrom"]),
    new Task("Upiši", ["Upiši paran", "Upiši neparan", "Upiši palindrom"]),
    new Task("Izračunaj", ["Izračunaj zbroj", "Izračunaj razliku", "Izračunaj aritmetičku sredinu"])
];

var izbornik = [
    new Category("For loop", Tasks),
    new Category("While loop", Tasks),
];


setDropdown(izbornik);
Webflow.require("ix2").init(rawData);