import './scss/main.scss';
import API from './js/fetchCountries';
const debounce = require('lodash.debounce');
import countriesListTpl from './templates/countries-list.hbs';
import countryCardTpl from './templates/country-card.hbs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { notice, error } from '@pnotify/core';
import getRefs from './js/refs.js';

const refs = getRefs();

refs.searchForm.addEventListener(`input`, debounce(onSearch, 500));

function onSearch(e){
    e.preventDefault();
    clearMarkUp();

    const searchQuery = e.target.value;
    if (searchQuery === ``)
        return;            

    API.fetchCountries(searchQuery)
    .then(responce => {
        if (responce.length > 10){onFetchManyMatches()}
else if ( responce.length > 1){console.log(responce);
    renderMarkUp(responce, countriesListTpl)}
else if (responce.length === 1){renderMarkUp(responce[0], countryCardTpl)}
else {onFetchNoMatches()}}).catch(error) ;
};

function renderMarkUp(countries, tamplate){
 const markup = tamplate(countries);
refs.countriesContainer.innerHTML = markup;
};

function clearMarkUp(){
    refs.countriesContainer.innerHTML = '';
}

function onFetchManyMatches(){
    notice({
        title: 'Too many matches found.',
        text: ' Please enter a more specific query!',
        delay: 2000
      });
}

function onFetchNoMatches(){
    error({
        title: 'There are no matches!',
        text: ' Please enter country name!',
        delay: 2000
      });
}





