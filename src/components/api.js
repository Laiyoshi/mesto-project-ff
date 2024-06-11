import { checkResponce } from './utils'

const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    authorization: '94465c48-7af1-4690-b6f0-4d6d1f8ea56c',
    'Content-Type': 'application/json'
  }
}

const request = (url, options) => {
  return fetch(url, options).then(checkResponce)
}

export const getUserInfo = () => {
  return request(`${config.baseUrl}/users/me`, { headers: config.headers })
}

export const getInitialCards = () => {
  return request(`${config.baseUrl}/cards`, { headers: config.headers })
}

export const updateProfile = (profileName, profileAbout) => {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout
    })
  })
}

export const postCard = (card) => {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
}

export const deleteCard = (card) => {
  return request(`${config.baseUrl}/cards/${card._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export const putLike = (card) => {
  return request(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'PUT',
    headers: config.headers
  })
}

export const deleteLike = (card) => {
  return request(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export const updateAvatar = (avatar) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
}
