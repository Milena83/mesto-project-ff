// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const listCards = content.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard (initialCard, funcDel) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const delButton = cardElement.querySelector('.card__delete-button');
  
  cardElement.querySelector('.card__image').setAttribute('src', initialCard.link);
  cardElement.querySelector('.card__image').setAttribute('alt', initialCard.name);
  cardElement.querySelector('.card__title').textContent = initialCard.name;

  delButton.addEventListener('click', funcDel);
  return cardElement;
}
// @todo: Функция удаления карточки

function resetCard(e) {
  const delCard = e.target.closest('.card');
  delCard.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(card => {
  const newCard = addCard(card, resetCard)
  listCards.append(newCard);
})

