
const allModals = document.querySelectorAll('.popup');
export const editModal = document.querySelector('.popup_type_edit');
export const addModal = document.querySelector('.popup_type_new-card');
allModals.forEach(modal => { modal.classList.add('popup_is-animated')});

export function openModal(modal) {
  const closeButton = modal.querySelector('.popup__close');
  modal.classList.add('popup_is-opened');
  modal.addEventListener('click', handlerOverlay);
  document.addEventListener('keydown', handlerEsc);
  closeButton.addEventListener('click', () => modal.classList.remove('popup_is-opened'));
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  modal.removeEventListener('keydown', handlerEsc);
  modal.removeEventListener('click', handlerOverlay);
}

export function openModalImg(src, alt) {
  const imgModal = document.querySelector('.popup_type_image');
  const imgItem = imgModal.querySelector('.popup__image');
  const closeButton = imgModal.querySelector('.popup__close');

  imgModal.addEventListener('click', handlerOverlay);
  document.addEventListener('keydown', handlerEsc);

  imgModal.classList.add('popup_is-opened');
  imgItem.src = src;
  imgItem.alt = alt; 
  closeButton.addEventListener('click', () => imgModal.classList.remove('popup_is-opened'));
}

function handlerEsc(evt) {
  const modal = document.querySelector('.popup_is-opened')
  if (evt.key === 'Escape') {
    closeModal(modal);
  }
}

function handlerOverlay(evt) {
  const modal = document.querySelector('.popup_is-opened')
  if (evt.target === modal) {
    closeModal(modal)
  }
}

const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const nameInput = editModal.querySelector('.popup__input_type_name');
const jobInput = editModal.querySelector('.popup__input_type_description');
nameInput.value = profileTitle.textContent;
jobInput.value = profileDesc.textContent;

export function handleFormSubmit(evt) {
  evt.preventDefault(); 
  if(evt.target.closest('.popup') === editModal) {
    profileTitle.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDesc.textContent;
  }
  if(evt.target.closest('.popup') === addModal) {
    const newCard = {};
    newCard.name = addModal.querySelector('.popup__input_type_card-name').value;
    newCard.link = addModal.querySelector('.popup__input_type_url').value;
    return newCard
  }
  closeModal(evt.target.closest('.popup'))
}
