/*
Co je za úkol v tomto projektu:

1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/

//zoznam receptu
let zoznamReceptu = document.querySelector('#recepty');

function vytvorZoznamReceptov(recepty) {

    for (let i = 0; i < recepty.length; i++) {
        let divRecepty = document.createElement('div');
        divRecepty.className = 'recept';
        zobrazObrazok(divRecepty, i);
        zobrazText(divRecepty, i);
        zobrazHodnoceniKategorie(divRecepty, i);

        let divReceptObr = document.createElement('div');
        divReceptObr.className = 'recept-obrazek';
        divRecepty.appendChild(divReceptObr);

        let obrazek = document.createElement('img');
        obrazek.src = recepty[i].img;
        divReceptObr.appendChild(obrazek);

        let divReceptInfo = document.createElement('div');
        divReceptInfo.className = 'recept-info';
        divRecepty.appendChild(divReceptInfo);

        let text = document.createElement('h3');
        let textnode = document.createTextNode(recepty[i].nadpis);
        text.appendChild(textnode);
        divReceptInfo.appendChild(text);

        zoznamReceptu.appendChild(divRecepty);
    }
}
vytvorZoznamReceptov(recepty);

//kliknout na recepty a na pravé polovině se objeví detail receptu
let image = document.querySelector('#recept-foto');

function zobrazObrazok(obrazek, index) {
    obrazek.addEventListener('click', function() {
        image.src = recepty[index].img;
    });
}

let receptNazev = document.querySelector('#recept-nazev');
let receptPopis = document.querySelector('#recept-popis');

function zobrazText(text, index) {
    text.addEventListener('click', function() {
        receptNazev.innerHTML = recepty[index].nadpis;
        receptPopis.innerHTML = recepty[index].popis;

        uloz(recepty[index].id);
    });
}

let receptHodnoceni = document.querySelector('#recept-hodnoceni');
let receptKategorie = document.querySelector('#recept-kategorie');

function zobrazHodnoceniKategorie(recept, index) {
    recept.addEventListener('click', function() {
        receptHodnoceni.innerText = recepty[index].hodnoceni;
        receptKategorie.innerText = recepty[index].kategorie;
    });
}

//hledání
//kod: https: //www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_list
let recept = document.getElementsByClassName('recept');

window.addEventListener("load", vyfiltruj);

function vyfiltruj() {
    let hledat = document.querySelector('#hledat');

    hledat.addEventListener('keyup', function() {
        let filter = hledat.value.toLowerCase();

        for (let i = 0; i < recept.length; i++) {
            let h3 = recept[i].getElementsByTagName('h3')[0];
            let txtValue = h3.textContent || h3.innerText;
            let item = txtValue.toLowerCase();
            if (item.indexOf(filter) > -1) {
                recept[i].style.display = "";
            } else {
                recept[i].style.display = "none";
            };
        };

    });
};

// filtrovanání receptů podle kategorie
let kategorie = document.querySelector('#kategorie');

window.addEventListener("load", filtrujKategorie);

function filtrujKategorie() {
    kategorie.addEventListener("change", function() {
        let text = kategorie.value;
        let receptyZobrazenie = [];
        if (text == "") {
            receptyZobrazenie = recepty;
        } else {
            for (let i = 0; i < recepty.length; i++) {
                if (recepty[i].kategorie == text) {
                    receptyZobrazenie.push(recepty[i]);
                    console.log(receptyZobrazenie);
                }
            };
        };
        zoznamReceptu.innerHTML = "";
        vytvorZoznamReceptov(receptyZobrazenie);
    });
};

//řazení receptů podle hodnocení
//https://www.javascripttutorial.net/javascript-array-sort/
let razeni = document.querySelector('#razeni');

window.addEventListener("load", razeniReceptu);

function razeniReceptu() {
    razeni.addEventListener('change', function() {
        let values = razeni.value;

        //JSON.parse and JSON.stringify (Deep copy)
        //https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
        let receptyCopy = JSON.parse(JSON.stringify(recepty));

        if (values == 2) {
            receptyCopy.sort(function(r1, r2) {
                return r1.hodnoceni - r2.hodnoceni;
            });
        } else
        if (values == 1) {
            receptyCopy.sort(function(r1, r2) {
                return r2.hodnoceni - r1.hodnoceni;
            });
        } else {
            receptyCopy = recepty;
        }
        zoznamReceptu.innerHTML = "";
        vytvorZoznamReceptov(receptyCopy);
    });
}

//local storage
window.addEventListener("load", nacitaj);

// uloženie do local storage
function uloz(id) {
    localStorage.setItem('recepty', id);
}
//  načitanie z local storage
function nacitaj() {
    let hodnota = localStorage.getItem('recepty');
    //alert(hodnota);
    let index = 0;
    for (let i = 0; i < recepty.length; i++) {
        if (recepty[i].id == hodnota) {
            index = i;
        }
    }
    image.src = recepty[index].img;
    receptNazev.innerHTML = recepty[index].nadpis;
    receptPopis.innerHTML = recepty[index].popis;
    receptHodnoceni.innerText = recepty[index].hodnoceni;
    receptKategorie.innerText = recepty[index].kategorie;
}