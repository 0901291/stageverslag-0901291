import query from 'query-string';
import * as actionTypes from './actionTypes';

export function fetchCards(filters = { q: 'archangel' }) {
  return function (dispatch) {
    if (!filters.q || filters.q === '') return;

    const BASE = 'https://api.deckbrew.com/mtg/cards/typeahead?';
    const FILTERS = query.stringify(filters);
    const URI = `${BASE}${FILTERS}`;

    fetch(URI)
      .then(cards => cards.json())
      .then(cards => dispatch(fetchCardsFulfilled(cards)))
      .catch(error => dispatch(fetchCardsRejected(error)));
  };
}

export const fetchCardsFulfilled = (cards) => {
  return {
    type: actionTypes.FETCH_CARDS_FULFILLED,
    cards
  }
}

export const fetchCardsRejected = (error) => {
  return {
    type: actionTypes.FETCH_CARDS_REJECTED,
    error
  }
}
