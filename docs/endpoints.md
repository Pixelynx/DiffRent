# API Endpoints

## HTML API

### Root
* `GET /`
  * loads React web app

### Session
* `POST /session`
  * Creates new session on user login
* `DELETE /session`
  * Deletes session on user logout

### Tenant
* `POST /tenant`
  * Creates new tenant
* `GET /tenant/:id`
  * Fetches single existing tenant profile
* `PATCH /tenant/:id`
  * Allows tenant to update their profile

### Landlord
* `POST /landlord`
  * Creates new landlord
* `GET /landlord/:id`
  * Fetches single existing landlord profile
* `PATCH /landlord/:id`
  * Allows landlord to update their profile

### Appointment
* `POST /appointment`
  * Creates new appointment
* `PATCH /appointment/:id`
  * Update appointment 

### Message
* `POST /message`
  * Creates new message

### Ticket 
* `POST /ticket/:id`
  * Creates a ticket
* `DELETE /ticket/:id`
  * Deletes a ticket

