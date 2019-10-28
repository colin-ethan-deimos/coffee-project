"use strict"
// This arr is used as a way to add the created coffees to local storage later on.
var storageArr = [];

// Array of coffee objects from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
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

// This const is equal to the original length of the coffee array, used later for repopulating the coffee card area without any added coffees after the local storage is cleared
const orginalCoffeeLength = coffees.length;

// retrievedObject pulls the coffees from local storage
var retrievedObject = JSON.parse(localStorage.getItem("newCoffee"));

// cardArea is assigned to be the coffee card area in html
var cardArea = document.getElementById("coffee-card-area");

// buttonClicked is later used to determine which type of roast is selected with the roast dropdown menu, needs to be a global variable because it is used in a method and a separate function
var buttonClicked;

// roastButton is similar to the buttonClicked, except this one is used for the addCoffee function, so it must be a separate variable
var roastButton;

// searchTerm is assigned to be the input of the "Search by Name" card
var searchTerm = document.getElementById('searchTerm');

// Here if the local storage isn't empty the coffees array is combined with the local storage coffees
if(retrievedObject !== null){
    coffees = coffees.concat(retrievedObject);
}

// This fills the coffee card area on load
populateCoffeeArea();

// This will determine which of the 4 buttons in the select roast dropdown menu are selected and assigns the selected value to the buttonClicked variable
for(let i = 0;i<document.getElementsByClassName('roast').length;i++){
    buttonClicked = document.getElementsByClassName('roast').value;
}

// This method is used to populate the coffee card area with coffees that include the input in the Search by Name area
searchTerm.addEventListener("input",function () {
    cardArea.innerHTML = '';
    for(let i = 0; i<coffees.length;i++){
        if(coffees[i].name.toLowerCase().startsWith(searchTerm.value.toLowerCase().trim())){
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

// This method I pulled from the bootstrap input documentation, it requires that the input fields in the add coffee areas are valid before allowing the coffee to be added
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

// This function filters the coffees by the roast type selected in the dropdown menu
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

// This function fills the card area with all the coffees in the coffee array without discrimination
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

// This function is used to clear the local storage and the reset the coffee card area with only the original coffees
function clearCoffees(){
    storageArr = [];
    localStorage.clear();
    cardArea.innerHTML = "";
    location.reload();
}

// This function is used to add a coffee to the coffee array and to also add it to the local storage at the same time
function addCoffee(){
    var retrievedObject = JSON.parse(localStorage.getItem("newCoffee"));
    for(let i = 0;i<document.getElementById('roastSelect').length;i++){
            roastButton = document.getElementById('roastSelect').value;
    }
    let coffee = {
        id: coffees.length + 1,
        name: document.getElementById("enteredName").value.trim(),
        roast: roastButton,
        description: document.getElementById("roastDescription").value.trim()
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
