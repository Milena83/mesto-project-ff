import logo from "./images/logo.svg";
import avatar from "./images/avatar.jpg";
import './pages/index.css';
import {initialCards} from './components/cards.js';
import {deleteCard, createCard, handlerLike} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';



// @todo: DOM узлы
const content = document.querySelector('.content');
const listCards = content.querySelector('.places__list');
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');
const allModals = document.querySelectorAll('.popup');
const editModal = document.querySelector('.popup_type_edit');
const addModal = document.querySelector('.popup_type_new-card');
const allCloseButtons = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const nameInput = editModal.querySelector('.popup__input_type_name');
const jobInput = editModal.querySelector('.popup__input_type_description');
const formElementEdit = editModal.querySelector('.popup__form');
const formElementAdd = addModal.querySelector('.popup__form');


// @todo: Вывести карточки на страницу

initialCards.forEach(card => {
  const newCard = createCard(card, deleteCard, handlerLike, openModalImg)
  listCards.append(newCard);
})


editButton.addEventListener('click', () => {
  openModal(editModal);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
});
addButton.addEventListener('click', () => openModal(addModal));
allModals.forEach(modal => { modal.classList.add('popup_is-animated')});
allCloseButtons.forEach(button => {
   button.addEventListener('click', () => {
     const openModal = button.closest('.popup');
     closeModal(openModal);
  })
})


function openModalImg(src, alt) {
  const imgModal = document.querySelector('.popup_type_image');
  const imgItem = imgModal.querySelector('.popup__image');
  const descImg = imgModal.querySelector('.popup__caption');

  openModal(imgModal);
  imgItem.src = src;
  imgItem.alt = alt; 
  descImg.textContent = alt;

}

function handleEditFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closeModal(editModal);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault(); 
  const newCard = {};
  newCard.name = addModal.querySelector('.popup__input_type_card-name').value;
  newCard.link = addModal.querySelector('.popup__input_type_url').value;
  return newCard
}

formElementEdit.addEventListener('submit', handleEditFormSubmit);
formElementAdd.addEventListener('submit', (el) => {
  const answer = handleAddFormSubmit(el)
  if(answer) {
    const newCard = createCard(answer, deleteCard, handlerLike, openModalImg);
    listCards.prepend(newCard);
    addModal.querySelector('.popup__input_type_card-name').value = '';
    addModal.querySelector('.popup__input_type_url').value = '';
    closeModal(addModal);
  }
});
