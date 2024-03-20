import './pages/index.css'
import { initialCards } from './scripts/cards'
import avatar from './images/avatar.jpg'

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
    deleteCard(cardRemoveBtn.closest('.card'))
  })

  return cardElement
}

// @todo: Функция удаления карточки
function deleteCard(element) {
  element.remove()
}

// @todo: Вывести карточки на страницу
function addCard(item) {
  cardList.append(createCard(item, deleteCard))
}

initialCards.forEach(addCard)

// Загрузка аватарки
function loadImage() {
  const profileImage = document.querySelector('.profile__image')
  profileImage.style.backgroundImage = `url(${avatar})`
}

loadImage()

// Модальные окна
function openModal(modal) {
  const modalWindow = document.querySelector(`.${modal}`)
  modalWindow.classList.remove('popup_is-animated')
  modalWindow.classList.add('popup_is-opened')
  const closeBtn = modalWindow.querySelector('.popup__close')
  closeBtn.addEventListener('click', () => {
    closeModal(modalWindow)
  })
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened')
  modal.classList.add('popup_is-animated')
}

const profileBtn = document.querySelector('.profile__edit-button')
const profileAddBtn = document.querySelector('.profile__add-button')
const cardImage = document.querySelectorAll('.places__item')

profileBtn.addEventListener('click', () => {
  openModal('popup_type_edit')
})

profileAddBtn.addEventListener('click', () => {
  openModal('popup_type_new-card')
})

cardImage.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const popupImage = document.querySelector('.popup__image')
    const captionImage = document.querySelector('.popup__caption')
    console.log(popupImage, evt.target.src)
    popupImage.src = evt.target.src
    captionImage.textContent = evt.target.alt
    openModal('popup_type_image')
  })
})
