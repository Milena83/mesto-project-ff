
import { deleteCardRequest, addLike, deleteLike }  from './api.js'

export function createCard (initialCard, funcDel, funcLike, funcOpenImgModal, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const delButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  
  cardElement.querySelector('.card__image').setAttribute('src', initialCard.link);
  cardElement.querySelector('.card__image').setAttribute('alt', initialCard.name);
  cardElement.querySelector('.card__title').textContent = initialCard.name;
  likeCounter.textContent  = initialCard.likes.length;

  if(initialCard.owner._id != userId) {
    delButton.remove();
  }


  delButton.addEventListener('click', evt => funcDel(evt, initialCard._id));
  likeButton.addEventListener('click', evt => funcLike(evt, initialCard._id, likeCounter));
  cardImage.addEventListener('click', () => funcOpenImgModal(cardImage.src, cardImage.alt));

  return cardElement;
}
// @todo: Функция удаления карточки

export function deleteCard(e, cardId) {
  deleteCardRequest(cardId)
  .then(() => {
    const delCard = e.target.closest('.card');
    delCard.remove();
  })
  .catch((error) => {
    console.log(error);
  });
}

export function handlerLike(e, cardId, counter) {
  if(!e.target.classList.contains('card__like-button_is-active'))  {
    addLike(cardId)
     .then((card) => {
       e.target.classList.add('card__like-button_is-active');
       counter.textContent = card.likes.length;
    })
    .catch((error) => {
      console.log(error);
    });
  } else {
    deleteLike(cardId)
      .then((card) => {
        e.target.classList.remove('card__like-button_is-active');
       counter.textContent = card.likes.length;
       console.log(card.likes.length)
      }) 
      .catch((error) => {
        console.log(error);
      });
  }


  
}

