var express = require('express');
var router = express.Router();

// Требующиеся модули контроллеров.
var table_controller = require('../controllers/tableController');

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
// GET-запрос для создания экземпляра книги. Должен появиться до маршрута, выводящего BookInstance с использованием id

// GET request for list of all BookInstance.
router.get('/', table_controller.index)
router.get('/tables', table_controller.table_list);
router.get('/tables/:id', table_controller.table_detail);
router.get('/tables/:id/booked/:name', table_controller.table_detail_booked);

module.exports = router;