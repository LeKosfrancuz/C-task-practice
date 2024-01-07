const Tasks = [
	new Task("Učitaj", null, null, ["Učitaj paran", "Učitaj neparan", "Učitaj palindrom"]),
	new Task("Upiši", null, null, ["Upiši paran", "Upiši neparan", "Upiši palindrom"]),
	new Task("Izračunaj", null, null, [
		"Izračunaj zbroj",
		"Izračunaj razliku",
		"Izračunaj aritmetičku sredinu",
	]),
	new Task("Učitaj još", null, null, ["Učitaj paran", "Učitaj neparan", "Učitaj palindrom"]),
	new Task("Upiši još", null, null, ["Upiši paran", "Upiši neparan", "Upiši palindrom"]),
	new Task("Izračunaj još", null, null, [
		"Izračunaj zbroj",
		"Izračunaj razliku",
		"Izračunaj aritmetičku sredinu",
	]),
];

const SeqNumericalTasks = [
	// Ulaz: Upiši sate i minute: 2 20
	// izlaz: 2 sata i 20 minuta iznosi 8400 sekundi
	new Task("U programu omogućite unos dva broja, broj sati i minuta. Ispišite koliko taj broj sati i minuta iznosi u sekundama.", 
			 "Upiši sate i minute: 2 20", 
			 "2 sata i 20 minuta iznosi 8400 sekundi", 
	[
		"U programu omogućite unos broja dana. Izračunati koliko to iznosi godina, mjeseci i dana.",
		"U programu omogućite unos broja sekundi i ispišite odgovarajuće vrijeme u satima, minutama i sekundama.",
	]),
	// Ulaz:
	// Izlaz: 
	new Task("U programu omogućite unos 10 brojeva. Ispišite najmanji i najveći od njih.", null, null, [
		"U programu omogućite unos 5 brojeva i zbrojiti samo one koji su dvoznamenkasti.",
		"U programu omogućite unos dva cijela broja i ispišite njihov zbroj, aritmetičku sredinu i zbroj kvadrata brojeva.",
		"U programu omogućite unos pozitivnog realnog broja. Izračunati kvadrat, kub i drugi korijen tog broja. Rezultat ispisati u redu (s dva 2 decimalna mjesta)",
		"U programu omogućite unos pet brojeva i izračunati aritmetičku sredinu.",
	]),
];

const SeqGeometryTasks = [
	// Ulaz: Učitaj stranicu a trokuta: 4
	// Izlaz: Opseg je: 12 \n Površina trokuta je: 6.93
	new Task("U programu omogućite unos stranicu a istostraničnog trokuta. Izračunati opseg i površinu trokuta.",
			 "Učitaj stranicu a trokuta: 4",
			 "Opseg je: 12 <br> Površina trokuta je: 6.93", 
	[
		"U programu omogućite unos stranice kvadrata. Izračunati površinu, opseg i dijagonalu kvadrata (na 2 decimale)",
		"U programu omogućite unos promjera kruga. Izračunati njegov opseg i površinu (ispisati na 2 decimale)",
	]),
	// Ulaz:  Upišite koordinate točke A(x1 i y1): 1 2
	//		  Upišite koordinate točke A(x1 i y1): 3 5
	// Izlaz: Dvije točake su udaljene 3.61
	new Task("U programu omogućite unos koordinata točaka A(x1,y1) i B(x2,y2). Izračunati i ispisati njihovu udaljenost u koordinantnom sustavu!",
			 "Upišite koordinate točke A(x1 i y1): 1 2 <br> Upišite koordinate točke A(x1 i y1): 3 5",
			 "Dvije točake su udaljene 3.61"
	),
	new Task("Default Task")
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