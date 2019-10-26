"use strict"

var storageArr = [];

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light',description: "A light variant of City"},
    {id: 2, name: 'Half City', roast: 'light' ,description: "A half-strength variant of City"},
    {id: 3, name: 'Cinnamon', roast: 'light',description: "A coffee with some spice"},
    {id: 4, name: 'City', roast: 'medium',description: "Classic city coffee!"},
    {id: 5, name: 'American', roast: 'medium',description: "A taste of Freedom!©"},
    {id: 6, name: 'Breakfast', roast: 'medium',description: "A great way to start the day!"},
    {id: 7, name: 'High', roast: 'dark',description: "Match your blood pressure"},
    {id: 8, name: 'Continental', roast: 'dark',description: "A hotel classic"},
    {id: 9, name: 'New Orleans', roast: 'dark',description: "A taste of Bourbon St."},
    {id: 10, name: 'European', roast: 'dark',description: "Like American with less Freedom"},
    {id: 11, name: 'Espresso', roast: 'dark',description: "Who needs sleep?"},
    {id: 12, name: 'Viennese', roast: 'dark',description: "Willst du trinken?"},
    {id: 13, name: 'Italian', roast: 'dark',description: "Ciao"},
    {id: 14, name: 'French', roast: 'dark',description: "Goes great with a cigarette"}
];
const orginalCoffeeLength = coffees.length;

var retrievedObject = JSON.parse(localStorage.getItem("newCoffee"));

var cardArea = document.getElementById("coffee-card-area");

var buttonClicked;

var roastButton;

var searchTerm = document.getElementById('searchTerm');

if(retrievedObject !== null){
    coffees = coffees.concat(retrievedObject);
}

populateCoffeeArea();

for(let i = 0;i<document.getElementsByClassName('roast').length;i++){
    buttonClicked = document.getElementsByClassName('roast').value;
}

searchTerm.addEventListener("input",function () {
    cardArea.innerHTML = '';
    for(let i = 0; i<coffees.length;i++){
        if(coffees[i].name.toLowerCase().startsWith(searchTerm.value.toLowerCase())){
            cardArea.innerHTML += '<div class="card float-left mx-3 mb-2  border-dark-shade" style="width: 40%;">\n' +
                '                    <div class="card-body bg-soft-white ">\n' +
                '                        <h4 class="card-title text-center spookyText ">' + coffees[i].name + '</h4>\n' +
                '                        <h6 class="card-subtitle mb-2 text-muted text-center">' + coffees[i].roast + '</h6>\n' +
                '                        <p class="card-text text-center">'+ coffees[i].description +'</p>\n' +
                '                        <button type="button" class="btn btn-outline-primary mx-auto w-100">Buy Now!</button>\n' +
                '                    </div>\n' +
                '                </div>'
        }
    }
});

window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        document.getElementById('submitCoffee').addEventListener('click', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
            if(form.checkValidity() === true){
                addCoffee();
            }}, false);
    });
}   , false);


function specifyRoast(buttonClicked){
    cardArea.innerHTML = '';
    for(let x = 0; x<coffees.length;x++){
        if(buttonClicked === coffees[x].roast){
            cardArea.innerHTML += '<div class="card float-left mx-3 mb-2  border-dark-shade" style="width: 40%;">\n' +
                '                    <div class="card-body bg-soft-white ">\n' +
                '                        <h4 class="card-title text-center spookyText ">' + coffees[x].name + '</h4>\n' +
                '                        <h6 class="card-subtitle mb-2 text-muted text-center">' + coffees[x].roast + '</h6>\n' +
                '                        <p class="card-text text-center">'+ coffees[x].description +'</p>\n' +
                '                        <button type="button" class="btn btn-outline-primary mx-auto w-100">Buy Now!</button>\n' +
                '                    </div>\n' +
                '                </div>'
        }
        else if(buttonClicked === 'all'){
            cardArea.innerHTML += '<div class="card float-left mx-3 mb-2  border-dark-shade" style="width: 40%;">\n' +
                '                    <div class="card-body bg-soft-white spookyText">\n' +
                '                        <h4 class="card-title text-center ">' + coffees[x].name + '</h4>\n' +
                '                        <h6 class="card-subtitle mb-2 text-muted text-center">' + coffees[x].roast + '</h6>\n' +
                '                        <p class="card-text text-center">'+ coffees[x].description +'</p>\n' +
                '                        <button type="button" class="btn btn-outline-primary mx-auto w-100">Buy Now!</button>\n' +
                '                    </div>\n' +
                '                </div>'
        }
    }
}

function populateCoffeeArea(){
    cardArea.innerHTML = '';
    for(let x = 0; x<coffees.length;x++){
        cardArea.innerHTML += '<div class="card float-left mx-3 mb-2  border-dark-shade" style="width: 40%;">\n' +
        '                    <div class="card-body bg-soft-white ">\n' +
        '                        <h4 class="card-title text-center spookyText">' + coffees[x].name + '</h4>\n' +
        '                        <h6 class="card-subtitle mb-2 text-muted text-center">' + coffees[x].roast + '</h6>\n' +
        '                        <p class="card-text text-center">'+ coffees[x].description +'</p>\n' +
        '                        <button type="button" class="btn btn-outline-primary mx-auto w-100">Buy Now!</button>\n' +
        '                    </div>\n' +
        '                </div>'
    }
}

function clearCoffees(){
    storageArr = [];
    localStorage.clear();
    cardArea.innerHTML = "";
    for(let x = 0; x<orginalCoffeeLength;x++){
        cardArea.innerHTML += '<div class="card float-left mx-3 mb-2  border-dark-shade" style="width: 40%;">\n' +
            '                    <div class="card-body bg-soft-white ">\n' +
            '                        <h4 class="card-title text-center spookyText">' + coffees[x].name + '</h4>\n' +
            '                        <h6 class="card-subtitle mb-2 text-muted text-center">' + coffees[x].roast + '</h6>\n' +
            '                        <p class="card-text text-center">'+ coffees[x].description +'</p>\n' +
            '                        <button type="button" class="btn btn-outline-primary mx-auto w-100">Buy Now!</button>\n' +
            '                    </div>\n' +
            '                </div>'
    }
}

function addCoffee(){
    var retrievedObject = JSON.parse(localStorage.getItem("newCoffee"));
    for(let i = 0;i<document.getElementById('roastSelect').length;i++){
            roastButton = document.getElementById('roastSelect').value;
    }
    let coffee = {
        id: coffees.length + 1,
        name: document.getElementById("enteredName").value,
        roast: roastButton,
        description: document.getElementById("roastDescription").value
    };
    coffees.push(coffee);
    document.getElementById("enteredName").value = '';
    document.getElementById('roastSelect').value = '';
    document.getElementById("roastDescription").value = '';
    cardArea.innerHTML = '';
    for(let x = 0; x<coffees.length;x++){
        cardArea.innerHTML += '<div class="card float-left mx-3 mb-2  border-dark-shade" style="width: 40%;">\n' +
            '                    <div class="card-body bg-soft-white spookyText">\n' +
            '                        <h4 class="card-title text-center ">' + coffees[x].name + '</h4>\n' +
            '                        <h6 class="card-subtitle mb-2 text-muted text-center">' + coffees[x].roast + '</h6>\n' +
            '                        <p class="card-text text-center">'+ coffees[x].description +'</p>\n' +
            '                        <button type="button" class="btn btn-outline-primary mx-auto w-100">Buy Now!</button>\n' +
            '                    </div>\n' +
            '                </div>'
    }
    if(retrievedObject === null){
        storageArr = [];
        storageArr.push(coffee);
        localStorage.setItem("newCoffee", JSON.stringify(storageArr));
    }
    else{
        storageArr = JSON.parse(localStorage.getItem("newCoffee"));
        storageArr.push(coffee);
        localStorage.setItem("newCoffee", JSON.stringify(storageArr));
    }
}
