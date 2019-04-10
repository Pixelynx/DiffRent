const express = require('express');
const router = express.Router();
const queries = require('../db/queries/tickets');

router.get('/:id', queries.getTicketsByApt);
router.post('/', queries.addNewTicket);
router.put('/:id', queries.updateTicket);
router.delete('/:id', queries.deleteTicket);

module.exports = router;