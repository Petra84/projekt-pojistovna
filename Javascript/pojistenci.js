
function Pojistenec(idNumber, name, surname, age, tel) {
    this.idNumber = idNumber;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.tel = tel;
}

let pojistenci = [];

function saveData() {
    let pojistenec = new Pojistenec(
        document.getElementById("idNumber").value,
        document.getElementById("name").value, 
        document.getElementById("surname").value, 
        document.getElementById("age").value, 
        document.getElementById("phone").value);

    pojistenci.push(pojistenec);

    const personsJson = JSON.stringify(pojistenci);    
    localStorage.setItem("pojistenci", personsJson);

    let tabulka = document.getElementById("pojistenci");
    tabulka.remove();

    document.body.insertAdjacentHTML('beforeend', createTable(pojistenci));

    return false;
}

function deletePerson() {
    let idNumber = document.getElementById("idNumberDelete").value;
    const objWithIdIndex = pojistenci.findIndex((obj) => obj.idNumber.toString() === idNumber);
    
    
    if (objWithIdIndex > -1) {
        pojistenci.splice(objWithIdIndex, 1);
    }

    const personsJson = JSON.stringify(pojistenci);    
    localStorage.setItem("pojistenci", personsJson);
  
    let tabulka = document.getElementById("pojistenci");
    tabulka.remove();

    document.body.insertAdjacentHTML('beforeend', createTable(pojistenci));

    return false;
}

function getCells(data, type) {
    return Object.values(data).map(cell => `<${type}>${cell}</${type}>`).join('');
}

function createBody(data) {
    return data.map(row => `<tr>${getCells(row, 'td')}</tr>`).join('');
}

function createTable(data) {
    const headings = new Pojistenec("Identifikační číslo", "Jméno", "Příjmeni", "Věk", "Telefon");
    
    return `
    <table class="myTable" id="pojistenci">
      <thead>${getCells(headings, 'th')}</thead>
      <tbody>${createBody(data)}</tbody>
    </table>`;
}

function onLoaded() { 
    const pojistenciJson = localStorage.getItem("pojistenci");
    const pojistenciTemp = JSON.parse(pojistenciJson);

    pojistenciTemp.forEach(pojistenec => {
        pojistenci.push(pojistenec);
    });

    document.body.insertAdjacentHTML('beforeend', createTable(pojistenci));
}

