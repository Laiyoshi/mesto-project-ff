import './pages/index.css'
import { createCard, removeCard, likeCard } from './components/card'
import { openModal, closeModal } from './components/modal'
import { enableValidation, clearValidation } from './components/validation'
import {
  getUserInfo,
  getInitialCards,
  updateProfile,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
  updateAvatar
} from './components/api'

const cardList = document.querySelector('.places__list')

const profileBtn = document.querySelector('.profile__edit-button')
const profileAddBtn = document.querySelector('.profile__add-button')
const profileImage = document.querySelector('.profile__image')
const profileTitle = document.querySelector('.profile__title')
const profileDescrip = document.querySelector('.profile__description')
const profileEdit = document.querySelector('.popup_type_edit')

const popupList = document.querySelectorAll('.popup')
const formProfile = document.querySelector('.popup__form')
const popupNewCard = document.querySelector('.popup_type_new-card')
const nameInput = formProfile.querySelector('.popup__input_type_name')
const jobInput = formProfile.querySelector('.popup__input_type_description')
const formCard = popupNewCard.querySelector('.popup__form')
const nameImage = formCard.querySelector('.popup__input_type_card-name')
const urlInput = formCard.querySelector('.popup__input_type_url')
const cardBtn = formCard.querySelector('.popup__button')
const popupAvatar = document.querySelector('.popup_type_avatar')
const formAvatar = popupAvatar.querySelector('.popup__form')
const avatarUrl = formAvatar.querySelector('.popup__input_type_url')
const avatarBtn = formAvatar.querySelector('.popup__button')
const popupTypeImage = document.querySelector('.popup_type_image')
const popupImage = popupTypeImage.querySelector('.popup__image')
const popupCaption = popupTypeImage.querySelector('.popup__caption')
const profilePopupBtn = formProfile.querySelector('.popup__button')

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

let profile = ''

function handleImageClick(evt) {
  popupImage.src = evt.target.src
  popupImage.alt = evt.target.alt
  popupCaption.textContent = evt.target.alt
  openModal(popupTypeImage)
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault()
  profilePopupBtn.textContent = 'Сохранение...'
  updateProfile(profileTitle.textContent, profileDescrip.textContent)
    .then(() => {
      profileTitle.textContent = nameInput.value
      profileDescrip.textContent = jobInput.value
      closeModal(profileEdit)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      profilePopupBtn.textContent = 'Сохранить'
    })
}

function handleCardSubmit(evt) {
  evt.preventDefault()
  const card = {
    name: nameImage.value,
    link: urlInput.value,
    likes: []
  }
  card.owner = { _id: profile._id }

  cardBtn.textContent = 'Сохранение...'
  postCard(card)
    .then((res) => {
      cardList.prepend(
        createCard(
          res,
          removeCard,
          likeCard,
          handleImageClick,
          deleteCard,
          profile._id,
          putLike,
          deleteLike
        )
      )
      closeModal(popupNewCard)
      formCard.reset()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      cardBtn.textContent = 'Сохранить'
    })
}

function handleAvatarSubmit(evt) {
  evt.preventDefault()
  profileImage.style.backgroundImage = `url(${avatarUrl.value})`
  avatarBtn.textContent = 'Сохранение...'
  updateAvatar(avatarUrl.value)
    .then(() => {
      formAvatar.reset()
      closeModal(popupAvatar)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      avatarBtn.textContent = 'Сохранить'
    })
}

function loadInitialInfo() {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, arrCards]) => {
      profile = userData
      const cards = arrCards

      profileImage.style.backgroundImage = `url(${profile.avatar})`
      profileTitle.textContent = profile.name
      profileDescrip.textContent = profile.about

      cards.forEach((item) => {
        cardList.append(
          createCard(
            item,
            removeCard,
            likeCard,
            handleImageClick,
            deleteCard,
            profile._id,
            putLike,
            deleteLike
          )
        )
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

popupList.forEach((item) => {
  item.classList.add('popup_is-animated')
  item.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(item)
  })
})

profileImage.addEventListener('click', () => {
  clearValidation(formAvatar, validationConfig)
  formAvatar.reset()
  openModal(popupAvatar)
})

profileBtn.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescrip.textContent
  openModal(profileEdit)
  clearValidation(formProfile, validationConfig)
})

profileAddBtn.addEventListener('click', () => {
  clearValidation(formCard, validationConfig)
  formCard.reset()
  openModal(popupNewCard)
})
formProfile.addEventListener('submit', handleFormProfileSubmit)

formCard.addEventListener('submit', handleCardSubmit)

formAvatar.addEventListener('submit', handleAvatarSubmit)

loadInitialInfo()
enableValidation(validationConfig)
