export function createCard(
  item,
  removeCard,
  likeCard,
  handleImageClick,
  deleteCard,
  profileId,
  putLike,
  deleteLike
) {
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
  if (item.owner._id === profileId) {
    cardRemoveBtn.addEventListener('click', () => {
      deleteCard(item)
        .then(() => {
          removeCard(cardRemoveBtn.closest('.card'))
        })
        .catch((err) => {
          console.log(err)
        })
    })
  } else {
    cardRemoveBtn.remove()
  }

  const likeCounter = cardElement.querySelector('.card__like-counter')
  cardImage.addEventListener('click', handleImageClick)
  const likeBtn = cardElement.querySelector('.card__like-button')
  likeCounter.textContent = item.likes.length

  item.likes.forEach((item) => {
    if (item._id === profileId) {
      likeBtn.classList.add('card__like-button_is-active')
    }
  })

  likeBtn.addEventListener('click', (evt) => {
    if (likeCard(evt)) {
      putLike(item)
        .then((data) => {
          likeCounter.textContent = data.likes.length
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      deleteLike(item)
        .then((data) => {
          likeCounter.textContent = data.likes.length
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })

  return cardElement
}

export function removeCard(element) {
  element.remove()
}

export function likeCard(element) {
  return element.target.classList.toggle('card__like-button_is-active')
}
