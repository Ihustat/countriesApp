'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


function displayCountry(data, className = '') {
    const currencies = data.currencies;
    const currencyName = Object.values(currencies)[0].name;
    const currencySymbol = Object.values(currencies)[0].symbol;

    const languages = data.languages;
    const fLanguage = Object.values(languages)[0]


    const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👨‍👩‍👧‍👦</span>${(+data.population / 1000000).toFixed(1)} millions</p>
        <p class="country__row"><span>🗣️</span>${fLanguage}</p>
        <p class="country__row"><span>💰</span>${currencySymbol} ${currencyName}</p>
        </div>
    </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = '1';
};

function getCountryData(country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
        displayCountry(data[0]);
        const firstNeighbour = data[0].borders[0];

        return fetch(`https://restcountries.com/v3.1/alpha/${firstNeighbour}`);
    })
    .then(response => response.json())
    .then(data => displayCountry(data[0], ' neighbour'));
};

getCountryData('russia');






