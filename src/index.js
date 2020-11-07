import './styles.css';
import API from './js/fetchCountries';
const debounce = require('lodash.debounce');
import countriesListTpl from './templates/countries-list.hbs';
import countryCardTpl from './templates/country-card.hbs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { notice, error } from '@pnotify/core';
import fetchCountries from './js/fetchCountries';


const refs = {
    searchForm : document.querySelector('.form-input'),
    countriesContainer : document.querySelector('.js-countries-container'),
};

refs.searchForm.addEventListener(`input`, debounce(onSearch, 500));

function onSearch(e){
    e.preventDefault();
    const searchQuery = e.target.value;
    if (searchQuery === ``)
        return;

    API.fetchCountries(searchQuery)
    .then(responce => {
        if (responce.length > 10){onFetchManyMatches()}
else if ( responce.length > 1){console.log(responce);
    renderMarkUp(responce, countriesListTpl)}
else if (responce.length === 1){renderMarkUp(responce[0], countryCardTpl)}
else {onFetchNoMatches()}}).catch(fetchError()) ;
};

function renderMarkUp(countries, tamplate){
const markup = tamplate(countries);
refs.countriesContainer.innerHTML = markup;
};


function onFetchManyMatches(){
    notice({
        title: 'Too many matches found.',
        text: ' Please enter a more specific query!',
        delay: 1000
      });
}

function onFetchNoMatches(){
    error({
        title: 'There are no matches!',
        text: ' Please enter country name!',
        delay: 1000
      });
}
function fetchError(){
    error({
        title: 'Something went wrong!',
        text: ' Try else!',
        delay: 1000
      });
}




