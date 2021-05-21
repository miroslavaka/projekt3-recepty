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

//seznam receptu
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

function zobrazObrazok(obrazek, index) {
    obrazek.addEventListener('click', function() {
        let image = document.querySelector('#recept-foto');
        image.src = recepty[index].img;
    });
}

function zobrazText(text, index) {
    text.addEventListener('click', function() {
        let receptNazev = document.querySelector('#recept-nazev');
        receptNazev.innerHTML = recepty[index].nadpis;

        let receptPopis = document.querySelector('#recept-popis');
        receptPopis.innerHTML = recepty[index].popis;
    });
}

function zobrazHodnoceniKategorie(recept, index) {
    recept.addEventListener('click', function() {
        let receptHodnoceni = document.querySelector('#recept-hodnoceni');
        receptHodnoceni.innerText = recepty[index].hodnoceni;

        let receptKategorie = document.querySelector('#recept-kategorie');
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

//3) Doplň filtrovanání receptů podle kategorie
let kategorie = document.querySelector('#kategorie');

window.addEventListener("load", filtrujKategorie);

function filtrujKategorie() {
    kategorie.addEventListener("change", function() {
        let text = kategorie.value;
        let receptyToDisplay = [];
        if (text == "") {
            receptyToDisplay = recepty;
        } else {
            for (let i = 0; i < recepty.length; i++) {
                if (recepty[i].kategorie == text) {
                    receptyToDisplay.push(recepty[i]);
                }
            };
        };
        zoznamReceptu.innerHTML = "";
        vytvorZoznamReceptov(receptyToDisplay);
    });
};