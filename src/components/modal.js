

export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  modal.addEventListener('click', handlerOverlay);
  document.addEventListener('keydown', handlerEsc);
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handlerEsc);
  modal.removeEventListener('click', handlerOverlay);
}

function handlerEsc(evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.popup_is-opened');
    closeModal(modal);
  }
}

function handlerOverlay(evt) {
  const modal = document.querySelector('.popup_is-opened')
  if (evt.target === modal) {
    closeModal(modal)
  }
}


