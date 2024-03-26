export function openModal(modal) {
  modal.classList.add('popup_is-opened')
  modal.classList.add('popup_is-animated')

  document.addEventListener('keydown', closeModalEscape)
  document.addEventListener('click', closePopupByOverlay)
}

function closeModalEscape(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'))
  }
}

function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target)
  }
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closeModalEscape)
  document.removeEventListener('click', closePopupByOverlay)
}
