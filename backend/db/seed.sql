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
);

CREATE TABLE apartments (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    landlord_id INT NOT NULL REFERENCES landlords(id)
);

CREATE TABLE tenants(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL, 
    dob DATE, 
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    apartment_id INT NOT NULL REFERENCES apartments(id),
    password_digest VARCHAR NOT NULL
);

CREATE TABLE tickets(
    id SERIAL PRIMARY KEY,
    apartment_id INT NOT NULL REFERENCES apartments(id),
    subject VARCHAR NOT NULL,
    body TEXT NOT NULL,
    status BIT,
    appt_date DATE,
    appt_time TIME
);

INSERT INTO landlords(name, email, phone, dob, password_digest) VALUES ('James Bennett', 'jBennet@gmail.com', '(458)201-9297', '1992-01-01', 'abc123' ),
                                                                        ('Rick Nixon', 'rNixon@gmail.com', '(321)861-7901', '1990-02-02', '123abc' ),
                                                                        ('Yasmin Henry', 'yHenry@gmail.com', '(434)847-4706', '1992-03-03', '456xyz' ),
                                                                        ('Reya Herbert', 'rHerbert@gmail.com', '(562)298-3280', '1992-04-05', 'xyz456' ),
                                                                        ('Sol Finney', 'sFinney@gmail.com', '(402)899-1372', '1992-01-02', '987abc' ),
                                                                        ('Ricardo Sheridan', 'Ricardosheridan@gmail.com', '(321)402-7158', '1978-10-05', 'ABCD1234'),
                                                                        ('Jim Sears', 'Jimsears@gmail.com', '(316)755-8390', '1983-01-26', '1234ABCD'),
                                                                        ('Elliot Horn', 'Elliothorn@gmail.com', '(432)221-7567', '1985-12-15', 'JFK123'),
                                                                        ('Zane Daniels', 'Zanedaniels@gmail.com', '(302)219-8677', '1963-09-16', 'qwerty'),
                                                                        ('Jamie Cummings', 'Jamiecummings@gmail.com', '(480)927-7470', '1959-04-10', 'cookie123');

INSERT INTO apartments(name, address, landlord_id) VALUES ('4C', '939 Woodycrest Ave, Bronx, NY 10452', 1),
                                                     ('3', '5959 Broadway, Bronx, NY 10463', 2),
                                                     ('10', '250 Bedford Park Blvd, Bronx, NY 10458', 3),
                                                     ('1A', '287 Onderdonk Ave, Queens, NY 11385', 4),
                                                     ('5D', '16-74 Bell Blvd, Queens, NY 11360', 5),
                                                     ('2A', '1251 East 19th Street, Brooklyn, NY 11230', 6),
                                                     ('3D', '85 Herbert Street, Brooklyn, NY 11222', 7),
                                                     ('22B', '280 Park Avenue South, New York, NY 10010', 8),
                                                     ('5D', '152 Ludlow Street, New York, NY 10002', 9),
                                                     ('3', '10 East 8th Street, New York, NY 10003', 10);

INSERT INTO tenants(name, email, phone, dob, apartment_id, password_digest) VALUES ('Zoe Goulding', 'zGoulding@gmail.com', '(609)367-5162', '1998-10-01', 1,  'abc123' ),
                                                                                    ('Nikola Ryder', 'nRyder@gmail.com', '(319)471-7363', '1995-12-02', 2,  '123abc' ),
                                                                                    ('Kylie Thomas', 'kThomas@gmail.com', '(440)685-5383', '1996-06-03', 3, '456xyz' ),
                                                                                    ('Brody Welsh', 'bWelsh@gmail.com', '(312)600-6147', '1991-04-05', 4,  'xyz456' ),
                                                                                    ('Karol Lu', 'kLu@gmail.com', '(206)213-6903', '1980-09-02', 5, '987abc' ),
                                                                                    ('Kamil Penn', 'Kamilpenn@gmail.com', '(248)943-5521', '1985-09-08', 6, 'ABCD1234'),
                                                                                    ('Katelyn Barrow', 'Katelynbarrow@gmail.com', '(281)336-6863', '1990-03-25', 7, '1234ABCD'),
                                                                                    ('Marilyn Quinn', 'Marilynquinn@gmail.com', '(620)495-1375', '1992-07-01', 8, 'JFK123'),
                                                                                    ('Ben Guevara', 'Benguevara@gmail.com', '(319)334-7531','1989-06-13', 9, 'qwerty'),
                                                                                    ('Cynthia Tyler', 'Cynthiatyler@gmail.com', '(262)748-9749','1988-08-18', 10, 'cookie123');

INSERT INTO tickets(apartment_id, subject, body, status, appt_date, appt_time) VALUES (1, 'Plumbing', 'Bathroom sink not working', '0', '2019-05-05', '12:00 [PM]' ),
                                                                                      (2, 'Unit Entrance', 'Door not closing right', '1', '2019-05-07', '1:00 [PM]' ),
                                                                                      (3, 'Ceiling', 'Living room ceiling needs small repair', '0', '2019-05-08', '2:00 [PM]' ),
                                                                                      (4, 'Window', 'Window lock not working', '0', '2019-05-08', '11:00 [AM]' ),
                                                                                      (5, 'Building key', 'Lost key for the entrance of the building', '0', '2019-05-09', '4:00 [PM]' );
