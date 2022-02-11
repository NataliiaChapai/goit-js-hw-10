import '../css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countryListTemplate from '../templates/country-list.hbs';
import countryInfoTemplate from '../templates/country-info.hbs'

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('ul');
const countryInfoRef = document.querySelector('div');
let dataInput = '';

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
    dataInput = event.target.value.trim();
    countryListRef.innerHTML = '';
    countryInfoRef.innerHTML = '';
    if (dataInput !== '') {
        fetchCountries(dataInput)
        .then(renderResponse)
        .catch(onErrorMessage);
    }
}

function renderResponse(countries) {
            if (countries.length > 10) {
                tooManyMatches();
            } else if (countries.length > 1 && countries.length <= 10) {
                createCountryList(countries);
            } else {
                createCountryInfo(countries);
        }}


function createCountryList(countries) {
    countries.map(country => {
        countryListRef.insertAdjacentHTML('beforeend', countryListTemplate(country))
    })
}

function createCountryInfo(countries) {
    let { name, flags, capital, population, languages } = countries[0];
    languages = languages.map(language => language.name).join(', ');
    countryInfoRef.insertAdjacentHTML('beforeend', countryInfoTemplate({ name, flags, capital, population, languages }))
}

function tooManyMatches() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

function onErrorMessage() {
    Notiflix.Notify.failure("Oops, there is no country with that name")
}

