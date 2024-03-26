export function createCard(item, deleteCard, likeCard, handleImageClick) {
  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true)

  const cardTitle = cardElement.querySelector('.card__title')
  cardTitle.textContent = item.name

  const cardImage = cardElement.querySelector('.card__image')
  cardImage.src = item.link
  cardImage.alt = item.name

  const cardRemoveBtn = cardElement.querySelector('.card__delete-button')
  cardRemoveBtn.addEventListener('click', () => {
    deleteCard(cardRemoveBtn.closest('.card'))
  })

  cardImage.addEventListener('click', handleImageClick)

  const likeBtn = cardElement.querySelector('.card__like-button')
  likeBtn.addEventListener('click', likeCard)

  return cardElement
}

export function deleteCard(element) {
  element.remove()
}

export function likeCard(element) {
  element.target.classList.toggle('card__like-button_is-active')
}
