import './pages/index.css'
import { initialCards } from './scripts/cards'
import avatar from './images/avatar.jpg'
import { createCard, deleteCard, likeCard } from './components/card'
import { openModal, closeModal } from './components/modal'

const cardList = document.querySelector('.places__list')

const profileBtn = document.querySelector('.profile__edit-button')
const profileAddBtn = document.querySelector('.profile__add-button')
const profileTitle = document.querySelector('.profile__title')
const profileDescrip = document.querySelector('.profile__description')
const profileEdit = document.querySelector('.popup_type_edit')

const popupContainer = document.querySelectorAll('.popup')
const formElement = document.querySelector('.popup__form')
const newCard = document.querySelector('.popup_type_new-card')
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_description')
const formCard = newCard.querySelector('.popup__form')

function addCard(item) {
  cardList.append(createCard(item, deleteCard, likeCard, handleImageClick))
}

function handleImageClick(evt) {
  const popupTypeImage = document.querySelector('.popup_type_image')
  const popupImage = popupTypeImage.querySelector('.popup__image')
  const popupCaption = popupTypeImage.querySelector('.popup__caption')

  popupImage.src = evt.target.src
  popupCaption.textContent = evt.target.alt
  openModal(popupTypeImage)
}

function loadImage() {
  const profileImage = document.querySelector('.profile__image')
  profileImage.style.backgroundImage = `url(${avatar})`
}
loadImage()

function handleFormSubmit(evt) {
  evt.preventDefault()
  profileTitle.textContent = nameInput.value
  profileDescrip.textContent = jobInput.value
  closeModal(formElement.closest('.popup'))
  formElement.removeEventListener('click', handleFormSubmit)
}

function handleCardSubmit(evt) {
  evt.preventDefault()
  const nameImage = formCard.querySelector('.popup__input_type_card-name')
  const urlInput = formCard.querySelector('.popup__input_type_url')
  const card = {
    name: nameImage.value,
    link: urlInput.value
  }
  closeModal(formCard.closest('.popup'))

  cardList.prepend(createCard(card, deleteCard, likeCard, handleImageClick))
  nameImage.value = ''
  urlInput.value = ''
  formCard.removeEventListener('click', handleFormSubmit)
}

initialCards.forEach(addCard)

popupContainer.forEach((item) => {
  item.classList.add('popup_is-animated')
})

profileBtn.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescrip.textContent
  openModal(profileEdit)
})

profileAddBtn.addEventListener('click', () => {
  openModal(newCard)
})

formElement.addEventListener('submit', handleFormSubmit)

formCard.addEventListener('submit', handleCardSubmit)
