DROP DATABASE IF EXISTS diffrent;
CREATE DATABASE diffrent;

\c diffrent;

CREATE TABLE landlords (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    dob DATE,
    password_digest VARCHAR NOT NULL 
)

CREATE TABLE apartments (
    id SERIAL PRIMARY KEY,
    address VARCHAR NOT NULL,
    landlord_id INT NOT NULL REFERENCES landlords(id)
)

CREATE TABLE tenants(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL, 
    dob DATE, 
    email VARCHAR NOT NULL,
    apartment_id INT NOT NULL REFERENCES apartments(id),
    password_digest VARCHAR NOT NULL
)

CREATE TABLE tickets(
    id SERIAL PRIMARY KEY,
    apartment_id INT NOT NULL REFERENCES apartments(id),
    subject VARCHAR NOT NULL,
    body TEXT NOT NULL,
    status BOOLEAN,
    appt_date DATE NOT NULL,
    appt_time TIME NOT NULL
)

