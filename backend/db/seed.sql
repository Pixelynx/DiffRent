DROP DATABASE IF EXISTS diffrent;
CREATE DATABASE diffrent;

\c diffrent;

CREATE TYPE userAcc as ENUM('landlord', 'tenant');

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    phone VARCHAR NOT NULL,
    dob DATE,
    password_digest VARCHAR NOT NULL,
    user_type userAcc
);

CREATE TABLE apartments(
    id SERIAL PRIMARY KEY,
    apt VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    landlord_id INT NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    tenant_id INT REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE tickets(
    id SERIAL PRIMARY KEY,
    apartment_id INT NOT NULL REFERENCES apartments(id) ON DELETE SET NULL,
    subject VARCHAR NOT NULL,
    body TEXT NOT NULL,
    completed_tenant BIT,
    completed_landlord BIT,
    in_progress BIT,
    appt_date DATE,
    appt_time TIME
);

CREATE TABLE threads(
    id SERIAL PRIMARY KEY,
    title TEXT,
    tenant_id INT REFERENCES users(id),
    landlord_id INT REFERENCES users(id)
);

CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    owner_id INT NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    threads_id INT REFERENCES threads(id),
    body TEXT NOT NULL,
    message_date TIMESTAMP NOT NULL DEFAULT NOW()
);



INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('James Bennett', 'jBennet@gmail.com', '(458)201-9297', '1992-01-01', '$2a$10$ljQkp/aLpymNrrlFrtsEY.MdCn5wxvhwbAjRKxt3fgN/DWddHTc12', 'landlord');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Reya Herbert', 'rHerbert@gmail.com', '(562)298-3280', '1992-04-05', '$2a$10$ljQkp/aLpymNrrlFrtsEY.MdCn5wxvhwbAjRKxt3fgN/DWddHTc12', 'landlord');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Ricardo Sheridan', 'Ricardosheridan@gmail.com', '(321)402-7158', '1978-10-05', '$2a$10$ljQkp/aLpymNrrlFrtsEY.MdCn5wxvhwbAjRKxt3fgN/DWddHTc12', 'landlord');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Jim Sears', 'Jimsears@gmail.com', '(316)755-8390', '1983-01-26', '456xyz', 'landlord');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Rick Nixon', 'rNixon@gmail.com', '(321)861-7901', '1990-02-02', '123abc', 'landlord');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Jamie Cummings', 'Jamiecummings@gmail.com', '(480)927-7470', '1959-04-10', 'cookie123', 'landlord');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Zane Daniels', 'Zanedaniels@gmail.com', '(302)219-8677', '1963-09-16', 'qwerty', 'landlord');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Sol Finney', 'sFinney@gmail.com', '(402)899-1372', '1992-01-02', '987abc', 'landlord');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Yasmin Henry', 'yHenry@gmail.com', '(434)847-4706', '1992-03-03', '456xyz', 'landlord');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Elliot Horn', 'Elliothorn@gmail.com', '(432)221-7567', '1985-12-15', 'JFK123', 'landlord');

INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Zoe Goulding', 'zGoulding@gmail.com', '(609)367-5162', '1998-10-01',  '$2a$10$ljQkp/aLpymNrrlFrtsEY.MdCn5wxvhwbAjRKxt3fgN/DWddHTc12', 'tenant');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Nikola Ryder', 'nRyder@gmail.com', '(319)471-7363', '1995-12-02',  '$2a$10$ljQkp/aLpymNrrlFrtsEY.MdCn5wxvhwbAjRKxt3fgN/DWddHTc12', 'tenant');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Kylie Thomas', 'kThomas@gmail.com', '(440)685-5383', '1996-06-03', '$2a$10$ljQkp/aLpymNrrlFrtsEY.MdCn5wxvhwbAjRKxt3fgN/DWddHTc12', 'tenant');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Brody Welsh', 'bWelsh@gmail.com', '(312)600-6147', '1991-04-05',  'xyz456', 'tenant');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Karol Lu', 'kLu@gmail.com', '(206)213-6903', '1980-09-02', '987abc' , 'tenant');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Kamil Penn', 'Kamilpenn@gmail.com', '(248)943-5521', '1985-09-08', 'ABCD1234', 'tenant');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Katelyn Barrow', 'Katelynbarrow@gmail.com', '(281)336-6863', '1990-03-25', '1234ABCD', 'tenant');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Marilyn Quinn', 'Marilynquinn@gmail.com', '(620)495-1375', '1992-07-01', 'JFK123', 'tenant');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Ben Guevara', 'Benguevara@gmail.com', '(319)334-7531','1989-06-13', 'qwerty', 'tenant');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Cynthia Tyler', 'Cynthiatyler@gmail.com', '(262)748-9749','1988-08-18', 'cookie123', 'tenant');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Son Goku', 'isdinnerready@gmail.com', '(999)999-9999','1208-04-12', 'ramen123', 'tenant');
INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES ('Prince Vegeta', 'IAmThePrinceOfAllSaiyans@gmail.com', '(666)666-6666','1202-12-01', 'StrongerThanKakorot', 'tenant');


INSERT INTO apartments(apt, address, tenant_id, landlord_id) VALUES ('4C', '939 Woodycrest Ave, Bronx, NY 10452', 11, 1);
INSERT INTO apartments(apt, address, tenant_id, landlord_id) VALUES ('3', '5959 Broadway, Bronx, NY 10463', 12, 2);
INSERT INTO apartments(apt, address, tenant_id, landlord_id) VALUES ('10', '250 Bedford Park Blvd, Bronx, NY 10458', 13, 3);
INSERT INTO apartments(apt, address, tenant_id, landlord_id) VALUES ('1A', '287 Onderdonk Ave, Queens, NY 11385', 14, 4);
INSERT INTO apartments(apt, address, tenant_id, landlord_id) VALUES ('5D', '16-74 Bell Blvd, Queens, NY 11360', 15, 5);
INSERT INTO apartments(apt, address, tenant_id, landlord_id) VALUES ('2A', '1251 East 19th Street, Brooklyn, NY 11230', 16, 6);
INSERT INTO apartments(apt, address, tenant_id, landlord_id) VALUES ('3D', '85 Herbert Street, Brooklyn, NY 11222', 17, 7);
INSERT INTO apartments(apt, address, tenant_id, landlord_id) VALUES ('22B', '280 Park Avenue South, New York, NY 10010', 18, 8);
INSERT INTO apartments(apt, address, tenant_id, landlord_id) VALUES ('5D', '152 Ludlow Street, New York, NY 10002', 19, 9);
INSERT INTO apartments(apt, address, tenant_id, landlord_id) VALUES ('3', '10 East 8th Street, New York, NY 10003', 20, 10);



INSERT INTO tickets(apartment_id, subject, body, completed_tenant, completed_landlord, in_progress, appt_date, appt_time) VALUES (1, 'Plumbing', 'Bathroom sink not working', '0', '0', '1', '2019-05-05', '12:00 [PM]' );
INSERT INTO tickets(apartment_id, subject, body, completed_tenant, completed_landlord, in_progress, appt_date, appt_time) VALUES(2, 'Unit Entrance', 'Door not closing right', '1', '1', '1', '2019-05-07', '1:00 [PM]' );
INSERT INTO tickets(apartment_id, subject, body, completed_tenant, completed_landlord, in_progress, appt_date, appt_time) VALUES(2, 'Unit Entrance', 'Door STILL not closing right', '0', '0', '0', NULL, NULL );
INSERT INTO tickets(apartment_id, subject, body, completed_tenant, completed_landlord, in_progress, appt_date, appt_time) VALUES(2, 'Unit Entrance', 'key broke in door', '1', '1', '0', '2019-05-07', '1:00 [PM]' );
INSERT INTO tickets(apartment_id, subject, body, completed_tenant, completed_landlord, in_progress, appt_date, appt_time) VALUES(2, 'Unit Entrance', 'gas leak', '0', '0', '0', NULL, NULL );
INSERT INTO tickets(apartment_id, subject, body, completed_tenant, completed_landlord, in_progress, appt_date, appt_time) VALUES(3, 'Ceiling', 'Living room ceiling needs small repair', '0', '0', '1', '2019-05-08', '2:00 [PM]' );
INSERT INTO tickets(apartment_id, subject, body, completed_tenant, completed_landlord, in_progress, appt_date, appt_time) VALUES(4, 'Window', 'Window lock not working', '0', '0', '0', NULL, NULL );
INSERT INTO tickets(apartment_id, subject, body, completed_tenant, completed_landlord, in_progress, appt_date, appt_time) VALUES(5, 'Building key', 'Lost key for the entrance of the building', '0', '0', '1', '2019-05-09', '4:00 [PM]' );

INSERT INTO threads(title, tenant_id, landlord_id)
VALUES
('Will be on vacation', 11, 1), 
('Quick question regarding heat', 12, 2),
('Follow Up on Ticket', 12, 2),
('On Vacation next week', 12, 2),
('Question about rent', 12, 2) ;

INSERT INTO messages(owner_id, threads_id, body, message_date)
VALUES
('11', '1', 'Please fix this','1995-12-17T03:24:00'),
('12', '2', 'Hi Reya','2019-05-01 08:13:20'),
('12', '2', 'Just checking in with you on the heat problem','2019-05-01 08:14:10'),
('2', '2', 'Hi Nikola','2019-05-01 09:26:40'),
('2', '2', 'I apologize for the inconvenience but it will be fixed this afternoon','2019-05-01 09:28:40'),
('2', '3', 'Good afternoon Nikola, just letting you know the problem is resolved', '2019-05-01 09:28:40');



-- CREATE TABLE landlords (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR NOT NULL,
--     email VARCHAR NOT NULL,
--     phone VARCHAR NOT NULL,
--     dob DATE,
--     password_digest VARCHAR NOT NULL
-- );
--
-- CREATE TABLE apartments (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR NOT NULL,
--     address VARCHAR NOT NULL,
--     landlord_id INT NOT NULL REFERENCES landlords(id)
-- );
--
-- CREATE TABLE tenants(
--     id SERIAL PRIMARY KEY,
--     name VARCHAR NOT NULL,
--     dob DATE,
--     email VARCHAR NOT NULL,
--     phone VARCHAR NOT NULL,
--     apartment_id INT NOT NULL REFERENCES apartments(id),
--     password_digest VARCHAR NOT NULL
-- );
--
-- CREATE TABLE tickets(
--     id SERIAL PRIMARY KEY,
--     apartment_id INT NOT NULL REFERENCES apartments(id),
--     subject VARCHAR NOT NULL,
--     body TEXT NOT NULL,
--     status BIT,
--     appt_date DATE,
--     appt_time TIME
-- );
--
-- CREATE TABLE messages(
--     id SERIAL PRIMARY KEY,
--     landlord_id INT NOT NULL REFERENCES landlords(id),
--     tenant_id INT NOT NULL REFERENCES tenants(id),
--     body TEXT NOT NULL,
--     message_date DATE
-- );
--
-- INSERT INTO landlords(name, email, phone, dob, password_digest) VALUES ('James Bennett', 'jBennet@gmail.com', '(458)201-9297', '1992-01-01', 'abc123' ),
--                                                                         ('Rick Nixon', 'rNixon@gmail.com', '(321)861-7901', '1990-02-02', '123abc' ),
--                                                                         ('Yasmin Henry', 'yHenry@gmail.com', '(434)847-4706', '1992-03-03', '456xyz' ),
--                                                                         ('Reya Herbert', 'rHerbert@gmail.com', '(562)298-3280', '1992-04-05', 'xyz456' ),
--                                                                         ('Sol Finney', 'sFinney@gmail.com', '(402)899-1372', '1992-01-02', '987abc' ),
--                                                                         ('Ricardo Sheridan', 'Ricardosheridan@gmail.com', '(321)402-7158', '1978-10-05', 'ABCD1234'),
--                                                                         ('Jim Sears', 'Jimsears@gmail.com', '(316)755-8390', '1983-01-26', '1234ABCD'),
--                                                                         ('Elliot Horn', 'Elliothorn@gmail.com', '(432)221-7567', '1985-12-15', 'JFK123'),
--                                                                         ('Zane Daniels', 'Zanedaniels@gmail.com', '(302)219-8677', '1963-09-16', 'qwerty'),
--                                                                         ('Jamie Cummings', 'Jamiecummings@gmail.com', '(480)927-7470', '1959-04-10', 'cookie123');
--
-- INSERT INTO apartments(name, address, landlord_id) VALUES ('4C', '939 Woodycrest Ave, Bronx, NY 10452', 1),
--                                                      ('3', '5959 Broadway, Bronx, NY 10463', 2),
--                                                      ('10', '250 Bedford Park Blvd, Bronx, NY 10458', 3),
--                                                      ('1A', '287 Onderdonk Ave, Queens, NY 11385', 4),
--                                                      ('5D', '16-74 Bell Blvd, Queens, NY 11360', 5),
--                                                      ('2A', '1251 East 19th Street, Brooklyn, NY 11230', 6),
--                                                      ('3D', '85 Herbert Street, Brooklyn, NY 11222', 7),
--                                                      ('22B', '280 Park Avenue South, New York, NY 10010', 8),
--                                                      ('5D', '152 Ludlow Street, New York, NY 10002', 9),
--                                                      ('3', '10 East 8th Street, New York, NY 10003', 10);
--
-- INSERT INTO tenants(name, email, phone, dob, apartment_id, password_digest) VALUES ('Zoe Goulding', 'zGoulding@gmail.com', '(609)367-5162', '1998-10-01', 1,  'abc123' ),
--                                                                                     ('Nikola Ryder', 'nRyder@gmail.com', '(319)471-7363', '1995-12-02', 2,  '123abc' ),
--                                                                                     ('Kylie Thomas', 'kThomas@gmail.com', '(440)685-5383', '1996-06-03', 3, '456xyz' ),
--                                                                                     ('Brody Welsh', 'bWelsh@gmail.com', '(312)600-6147', '1991-04-05', 4,  'xyz456' ),
--                                                                                     ('Karol Lu', 'kLu@gmail.com', '(206)213-6903', '1980-09-02', 5, '987abc' ),
--                                                                                     ('Kamil Penn', 'Kamilpenn@gmail.com', '(248)943-5521', '1985-09-08', 6, 'ABCD1234'),
--                                                                                     ('Katelyn Barrow', 'Katelynbarrow@gmail.com', '(281)336-6863', '1990-03-25', 7, '1234ABCD'),
--                                                                                     ('Marilyn Quinn', 'Marilynquinn@gmail.com', '(620)495-1375', '1992-07-01', 8, 'JFK123'),
--                                                                                     ('Ben Guevara', 'Benguevara@gmail.com', '(319)334-7531','1989-06-13', 9, 'qwerty'),
--                                                                                     ('Cynthia Tyler', 'Cynthiatyler@gmail.com', '(262)748-9749','1988-08-18', 10, 'cookie123');
--
-- INSERT INTO tickets(apartment_id, subject, body, status, appt_date, appt_time) VALUES (1, 'Plumbing', 'Bathroom sink not working', '0', '2019-05-05', '12:00 [PM]' ),
--                                                                                       (2, 'Unit Entrance', 'Door not closing right', '1', '2019-05-07', '1:00 [PM]' ),
--                                                                                       (2, 'Unit Entrance', 'Door STILL not closing right', '1', '2019-05-07', '1:00 [PM]' ),
--                                                                                       (2, 'Unit Entrance', 'key broke in door', '1', '2019-05-07', '1:00 [PM]' ),
--                                                                                       (2, 'Unit Entrance', 'gas leak', '1', '2019-05-07', '1:00 [PM]' ),
--                                                                                       (3, 'Ceiling', 'Living room ceiling needs small repair', '0', '2019-05-08', '2:00 [PM]' ),
--                                                                                       (4, 'Window', 'Window lock not working', '0', '2019-05-08', '11:00 [AM]' ),
--                                                                                       (5, 'Building key', 'Lost key for the entrance of the building', '0', '2019-05-09', '4:00 [PM]' );
