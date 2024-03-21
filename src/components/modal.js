export function openModal(modal) {
  modal.classList.add('popup_is-opened')
  modal.classList.add('popup_is-animated')
  const closeBtn = modal.querySelector('.popup__close')

  closeBtn.addEventListener('click', () => {
    closeModal(modal)
  })

  modal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(modal)
    }
  })

  function closeModalEscape(evt) {
    if (evt.key === 'Escape') {
      closeModal(modal)
    }
    document.removeEventListener('keydown', closeModalEscape)
  }

  document.addEventListener('keydown', closeModalEscape)
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened')
}

