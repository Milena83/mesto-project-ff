// @todo: Функция создания карточки
export function createCard (initialCard, funcDel, funcLike, funcOpenImgModal) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const delButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  
  cardElement.querySelector('.card__image').setAttribute('src', initialCard.link);
  cardElement.querySelector('.card__image').setAttribute('alt', initialCard.name);
  cardElement.querySelector('.card__title').textContent = initialCard.name;

  delButton.addEventListener('click', funcDel);
  likeButton.addEventListener('click', funcLike);
  cardImage.addEventListener('click', () => funcOpenImgModal(cardImage.src, cardImage.alt));

  return cardElement;
}
// @todo: Функция удаления карточки

export function resetCard(e) {
  const delCard = e.target.closest('.card');
  delCard.remove();
}

export function handlerLike(e) {
  e.target.classList.toggle('card__like-button_is-active');
}

