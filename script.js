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

function getCountryAndBordersData(country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();
    request.addEventListener('load', function() {
        const [data] = JSON.parse(this.responseText);

        displayCountry(data);

        //get neighbours

        const [firstNeighbour] = data.borders;

        if (!firstNeighbour) return;

        const request1 = new XMLHttpRequest();
        request1.open('GET', `https://restcountries.com/v3.1/alpha/${firstNeighbour}`);
        request1.send();

        request1.addEventListener('load', function() {
            const [data1] = JSON.parse(this.responseText);

            displayCountry(data1, 'neighbour');
        });
    });
};

getCountryAndBordersData('russia');






