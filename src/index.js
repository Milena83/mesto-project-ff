import logo from './images/logo.svg';
import avatar from './images/avatar.jpg';
import './pages/index.css';
import {initialCards} from './components/cards.js';
import {deleteCard, createCard, handlerLike} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import { enableValidation } from './components/validation.js';
import {getUserInfo, getCards, editUserInfo, addNewCard, editUserPhoto} from './components/api.js'



// @todo: DOM узлы
const content = document.querySelector('.content');
const listCards = content.querySelector('.places__list');
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');
const allModals = document.querySelectorAll('.popup');
const editModal = document.querySelector('.popup_type_edit');
const addModal = document.querySelector('.popup_type_new-card');
const editUserPhotoModal = document.querySelector('.popup_type_edit-user-photo');
const allCloseButtons = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const editUserPhotoBtn = document.querySelector('.profile__image_edit');
const nameInput = editModal.querySelector('.popup__input_type_name');
const jobInput = editModal.querySelector('.popup__input_type_description');
const urlPhotoInput = editUserPhotoModal.querySelector('.popup__input_type_url-photo');
const formElementEdit = editModal.querySelector('.popup__form');
const formElementAdd = addModal.querySelector('.popup__form');
const formElementPhoto = editUserPhotoModal.querySelector('.popup__form');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
let userId;

Promise.all([getUserInfo(), getCards()])
  .then(([user, cards]) => {
    profileTitle.textContent = user.name;
    profileDesc.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;
    userId = user._id;
  

    cards.forEach(card => {
      const newCard = createCard(card, deleteCard, handlerLike, openModalImg, userId);
      listCards.append(newCard);
    })
  })
  .catch((error) => {
    console.log(error);
  });


// @todo: Вывести карточки на страницу

// initialCards.forEach(card => {
//   const newCard = createCard(card, deleteCard, handlerLike, openModalImg)
//   listCards.append(newCard);
// })


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

editUserPhotoBtn.addEventListener('click', () => {
  openModal(editUserPhotoModal);
})

function handleEditPhotoFormSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  const urlPhoto = urlPhotoInput.value;
  editUserPhoto(urlPhoto)
    .then((user) => {
      profileImage.style.backgroundImage = `url(${user.avatar})`;
      urlPhotoInput.value = '';
      evt.submitter.textContent = "Сохранить";
      closeModal(editUserPhotoModal);
    })
    .catch((error) => {
      console.log(error);
    })
}


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
  evt.submitter.textContent = "Сохранение...";
  editUserInfo(nameInput.value, jobInput.value)
  .then((user) => {
    profileTitle.textContent = user.name;
    profileDesc.textContent = user.about;
    evt.submitter.textContent = "Сохранить";
    closeModal(editModal)
  })
  .catch((error) => {
    console.log(error);
  })
}

function handleAddFormSubmit(evt) {
  evt.preventDefault(); 
  evt.submitter.textContent = "Сохранение...";
  const card = {};
  card.name = addModal.querySelector('.popup__input_type_card-name').value;
  card.link = addModal.querySelector('.popup__input_type_url').value;
  addNewCard(card.name, card.link)
  .then((card) => {
    const newCard = createCard(card, deleteCard, handlerLike, openModalImg, userId);
    listCards.prepend(newCard);
    formElementAdd.reset();
    closeModal(addModal);
  })
  .catch((error) => {
    console.log(error);
  })
}

formElementEdit.addEventListener('submit', handleEditFormSubmit);
formElementAdd.addEventListener('submit', handleAddFormSubmit);
formElementPhoto.addEventListener('submit', handleEditPhotoFormSubmit);

enableValidation(validationConfig); 
console.log(userId)