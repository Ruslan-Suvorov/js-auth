// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// router.get Створює нам один ентпоїнт
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву контейнера
    name: 'index',
    // вказуємо назву компонентів
    component: ['heading', 'back-button'],

    // вказуємо назву сторінки
    title: 'Назва сторінки',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {
      links: [
        { href: '/signup', text: 'Sign Up' },
        { href: '/signin', text: 'Sign In' },
      ],
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// router.get Створює нам один ентпоїнт
router.get('/home', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('home', {
    // вказуємо назву контейнера
    name: 'Home page',
    // вказуємо назву компонентів
    component: ['heading', 'back-button'],

    // вказуємо назву сторінки
    title: 'Назва сторінки',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {
      links: [
        { href: '/signout', text: 'Sign Out' },
        { href: '/user-list', text: 'User list' },
      ],
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// Підключіть файли роутів
const auth = require('./auth')
// Підключіть інші файли роутів, якщо є
const user = require('./user')

// Об'єднайте файли роутів за потреби
router.use('/', auth)
// Використовуйте інші файли роутів, якщо є
router.use('/', user)

// Експортуємо глобальний роутер
module.exports = router
