let searchInputEl = document.getElementById('searchInput');
let resultCountriesEl = document.getElementById('resultCountries');
let spinnerEl = document.getElementById('spinner');

let searchInputval = "";
let countriesList = [];

function createAndAppendCountry(countries) {
    let countryCard = document.createElement('div');
    countryCard.classList.add("country-card", "col-12", "col-md-5", "d-flex", "flex-row", "mb-4","mr-auto","ml-auto");
    resultCountriesEl.appendChild(countryCard);

    let countryFlag = document.createElement('img');
    countryFlag.classList.add('country-flag', "mt-auto", "mb-auto");
    countryFlag.src = countries.flag;
    countryCard.appendChild(countryFlag);

    let innerCard = document.createElement('div');
    innerCard.classList.add('d-flex', 'flex-column', "ml-4")
    countryCard.appendChild(innerCard);

    let countryName = document.createElement('p');
    countryName.classList.add('country-name');
    countryName.textContent = countries.name;
    innerCard.appendChild(countryName);

    let countryPopulation = document.createElement('p');
    countryPopulation.classList.add('country-population');
    countryPopulation.textContent = countries.population;
    innerCard.appendChild(countryPopulation);
}




function displaySearchResults() {
    resultCountriesEl.textContent = "";
    for (let country of countriesList){
        let countryName = country.name;
        
        if (countryName.toLowerCase().includes(searchInputval.toLowerCase())){
            createAndAppendCountry(country);
        }
    }

}

function allCountriesList() {
    resultCountriesEl.textContent = "";
    let url = "https://apis.ccbp.in/countries-data"
   
    let option = {
        method: "GET"
    }
    spinnerEl.classList.remove('d-none');
    fetch(url, option)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add('d-none');
            countriesList = jsonData;
            displaySearchResults();
        })
}

function onchangeSearchInput(event){
    searchInputval = event.target.value;
    displaySearchResults();
}

allCountriesList();
searchInputEl.addEventListener('keyup', onchangeSearchInput);

    
