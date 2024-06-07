import './pages/index.css'
import { initialCards } from './scripts/cards'
import avatar from './images/avatar.jpg'
import { createCard, deleteCard, likeCard } from './components/card'
import { openModal, closeModal } from './components/modal'
import { enableValidation, clearValidation } from './components/validation'
import { check } from './components/api'

const cardList = document.querySelector('.places__list')

const profileBtn = document.querySelector('.profile__edit-button')
const profileAddBtn = document.querySelector('.profile__add-button')
const profileTitle = document.querySelector('.profile__title')
const profileDescrip = document.querySelector('.profile__description')
const profileEdit = document.querySelector('.popup_type_edit')

const popupList = document.querySelectorAll('.popup')
const formProfile = document.querySelector('.popup__form')
const popupNewCard = document.querySelector('.popup_type_new-card')
const nameInput = formProfile.querySelector('.popup__input_type_name')
const jobInput = formProfile.querySelector('.popup__input_type_description')
const formCard = popupNewCard.querySelector('.popup__form')

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function addCard(item) {
  cardList.append(createCard(item, deleteCard, likeCard, handleImageClick))
}

function handleImageClick(evt) {
  const popupTypeImage = document.querySelector('.popup_type_image')
  const popupImage = popupTypeImage.querySelector('.popup__image')
  const popupCaption = popupTypeImage.querySelector('.popup__caption')

  popupImage.src = evt.target.src
  popupImage.alt = evt.target.alt
  popupCaption.textContent = evt.target.alt
  openModal(popupTypeImage)
}

function loadImage() {
  const profileImage = document.querySelector('.profile__image')
  profileImage.style.backgroundImage = `url(${avatar})`
}
loadImage()

function handleFormProfileSubmit(evt) {
  evt.preventDefault()
  profileTitle.textContent = nameInput.value
  profileDescrip.textContent = jobInput.value
  closeModal(profileEdit)
}

function handleCardSubmit(evt) {
  evt.preventDefault()
  const nameImage = formCard.querySelector('.popup__input_type_card-name')
  const urlInput = formCard.querySelector('.popup__input_type_url')
  const card = {
    name: nameImage.value,
    link: urlInput.value
  }
  closeModal(popupNewCard)

  cardList.prepend(createCard(card, deleteCard, likeCard, handleImageClick))
  clearValidation(formCard, validationConfig)
  formCard.reset()
}

initialCards.forEach(addCard)

popupList.forEach((item) => {
  item.classList.add('popup_is-animated')
  item.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(item)
  })
})

profileBtn.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescrip.textContent
  openModal(profileEdit)
  clearValidation(formProfile, validationConfig)
})

profileAddBtn.addEventListener('click', () => {
  formCard.reset()
  clearValidation(formCard, validationConfig)
  openModal(popupNewCard)
})

formProfile.addEventListener('submit', handleFormProfileSubmit)

formCard.addEventListener('submit', handleCardSubmit)

enableValidation(validationConfig)
