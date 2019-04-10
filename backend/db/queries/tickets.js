const db = require('../../db/index.js');

const getTicketsByApt = (req, res, next) => {
    let id = parseInt(req.params.id);
  db.any(`SELECT tickets.id AS ticketId, apartment_id, subject, body, status, appt_date, appt_time, apartments.name, address, landlord_id FROM tickets JOIN apartments ON (tickets.apartment_id=apartments.id) WHERE apartment_id=$1`, [id])
  .then(data => {
      res.status(200)
         .json({
           status: 'Success',
           message: 'Received All Tickets',
           data: data
         })
    })
    .catch(err => {
      console.log('error:', err)
      next(err)
    })
}

// const getSingleLandlord = (req, res, next) => {
//   userId = Number(req.params.id)
//   db.one(`Select * FROM landlords WHERE id=$1`, userId)
//   .then(data => {
//     res.status(200)
//        .json({
//          status: 'Success',
//          message: 'Received Single Landlord',
//          data: data
//        })
//   })
//   .catch(err => {
//     console.log('error:', error)
//     next(err)
//   })
// }

const addNewTicket = (req, res, next) => {
  db.none("INSERT INTO tickets(apartment_id, subject, body, status, appt_date, appt_time) VALUES(${apartment_id}, ${subject}, ${body}, ${status}, ${appt_date}, ${appt_time})",
  {
    apartment_id: req.body.apartment_id,
    subject: req.body.subject,
    body: req.body.body,
    status: req.body.status,
    appt_date: req.body.appt_date,
    appt_time: req.body.appt_time
  })
  .then(() => {
    res.status(200)
       .json({
         status: 'success',
         message: 'New Ticket Added'
       })
  })
  .catch(err => {
    console.log('error: ', err)
    return next(err)
  })
}

const updateTicket = (req, res, next) => {
  ticketId = Number(req.params.id)
  db.none("UPDATE tickets SET apartment_id=${apartment_id}, subject=${subject}, body=${body}, status=${status}, appt_date=${appt_date}, appt_time=${appt_time} WHERE id=${id}",
  {
    id: ticketId,
    apartment_id:req.body.apartment_id,
    subject: req.body.subject,
    body: req.body.body,
    status: req.body.status,
    appt_date: req.body.appt_date,
    appt_time: req.body.appt_time
  })
    .then(() => {
    res.status(200)
       .json({
         status: "success",
         message: "Updated A Ticket!"
       })
  })
  .catch(err => {
  console.log('error:', err)
  return next(err)
  })
}

const deleteTicket = (req, res, next) => {
    ticketId = Number(req.params.id)
  db.result(`DELETE FROM tickets WHERE id=$1`, ticketId)
    .then(result => {
      res.status(200)
         .json({
           status: 'Success!',
           message: 'Ticket has been Deleted'
         })
    })
    .catch(err => {
      console.log('Error: ', err)
      return next(err)
    })
}

module.exports = {
  getTicketsByApt: getTicketsByApt,
  addNewTicket: addNewTicket,
  updateTicket: updateTicket,
  deleteTicket: deleteTicket
}