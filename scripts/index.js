// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// @todo: DOM узлы
const cardList = document.querySelector('.places__list')

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
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
    deleteCard()
  })

  return cardElement
}

// @todo: Функция удаления карточки
function deleteCard() {
  const card = cardList.querySelector('.card')
  card.remove()
}

// @todo: Вывести карточки на страницу
function addCard(item) {
  cardList.append(createCard(item, deleteCard))
}

initialCards.forEach((item) => {
  addCard(item)
})
