fetch('https://nomoreparties.co/v1/cohort-magistr-2/cards', {
  headers: {
    authorization: '94465c48-7af1-4690-b6f0-4d6d1f8ea56c'
  }
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result)
  })
