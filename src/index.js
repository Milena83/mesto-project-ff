import logo from "./images/logo.svg";
import avatar from "./images/avatar.jpg";
import './pages/index.css';
import {initialCards} from './components/cards.js';
import {resetCard, createCard, handlerLike} from './components/card.js';
import {openModal, closeModal, openModalImg, editModal, addModal, handleFormSubmit} from './components/modal.js'



// @todo: DOM узлы
const content = document.querySelector('.content');
const listCards = content.querySelector('.places__list');
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');
const formsElement = document.querySelectorAll('.popup__form');


// @todo: Вывести карточки на страницу

initialCards.forEach(card => {
  const newCard = createCard(card, resetCard, handlerLike, openModalImg)
  listCards.append(newCard);
})


editButton.addEventListener('click', () => openModal(editModal));
addButton.addEventListener('click', () => openModal(addModal));

formsElement.forEach(el => el.addEventListener('submit', (el) => {
  const answer = handleFormSubmit(el)
  if(answer) {
    const newCard = createCard(answer, resetCard, handlerLike, openModalImg);
    listCards.prepend(newCard);
    closeModal(el.target.closest('.popup'));
  }
}));
