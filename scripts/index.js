// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// @todo: DOM узлы
const cardList = document.querySelector('.places__list')

// @todo: Функция создания карточки
function addTemplate(cardTitle, cardLink) {
  const cardElement = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true)
  const cardRemoveBtn = cardElement.querySelector('.card__delete-button')

  cardRemoveBtn.addEventListener('click', (evt) => {
    const card = cardRemoveBtn.closest('.card')
    removeTemplate(card)
  })
  cardElement.querySelector('.card__title').textContent = cardTitle
  cardElement.querySelector('.card__image').src = cardLink
  cardList.append(cardElement)
}

// @todo: Функция удаления карточки
function removeTemplate(element) {
  element.remove()
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  addTemplate(item.name, item.link)
})
