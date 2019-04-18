const db = require('../../db/index.js');

const getTicketsByApt = (req, res, next) => {
    let tId = parseInt(req.params.id);
  db.any(`SELECT tickets.id AS ticketId, apartment_id, subject, body, completed_tenant, completed_landlord, in_progress, appt_date, appt_time, apartments.apt, address, landlord_id FROM tickets JOIN apartments ON (tickets.apartment_id=apartments.id) WHERE apartment_id=$1`, tId)
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

const getTicketsByLandlord = (req, res, next) => {
    let lId = parseInt(req.params.id);
  db.any(`SELECT tickets.id AS ticketId, apartment_id, subject, body, completed_tenant, completed_landlord, in_progress, apartments.apt, appt_date, appt_time, address, landlord_id, users.name, users.email, users.phone FROM tickets JOIN apartments ON (tickets.apartment_id=apartments.id) JOIN users ON (apartments.landlord_id=users.id) WHERE users.id=$1`, lId)
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


const addNewTicket = (req, res, next) => {
  db.none("INSERT INTO tickets(apartment_id, subject, body, completed_tenant, completed_landlord, in_progress, appt_date, appt_time) VALUES(${apartment_id}, ${subject}, ${body}, ${completed_tenant}, ${completed_landlord}, ${in_progress}, ${appt_date}, ${appt_time})",
  {
    apartment_id: req.body.apartment_id,
    subject: req.body.subject,
    body: req.body.body,
    completed_tenant: req.body.completed_tenant,
    completed_landlord: req.body.completed_landlord,
    in_progress: req.body.in_progress,
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
  db.none("UPDATE tickets SET apartment_id=${apartment_id}, subject=${subject}, body=${body}, completed_tenant=${completed_tenant}, completed_landlord=${completed_landlord}, in_progress=${in_progress}, appt_date=${appt_date}, appt_time=${appt_time} WHERE id=${id}",
  {
    id: ticketId,
    apartment_id:req.body.apartment_id,
    subject: req.body.subject,
    body: req.body.body,
    completed_tenant: req.body.completed_tenant,
    completed_landlord: req.body.completed_landlord,
    in_progress: req.body.in_progress,
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
  getTicketsByLandlord: getTicketsByLandlord,
  addNewTicket: addNewTicket,
  updateTicket: updateTicket,
  deleteTicket: deleteTicket
}
