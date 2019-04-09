# Schema
---


## Landlords
---
| Column Name  | Data Type | Details |
| ------------- | ------------- | ------------- |
| id | integer | primary key |
| name | string | not null |
| email | string | unique, not null |
| phone | string | |
| dob | date | not null |
| password | string | not null |
## Apartments
---
| Column Name | Data Type | Details |
| ------------- | ------------- | ------------- |
| id | integer | primary key |
| name | string | not null |
| address | string | not null |
| landlord_id | int ref | not null |

## Tenants
---
| Column Name | Data Type | Details |
| ------------- | ------------- | ------------- |
| id | integer | primary key |
| name | string | not null |
| dob | date | not null |
| email | string | unique, not null |
| apartment_id | int ref, not null | |
| phone | string | |
| password | string | not null |

## Tickets
---
| ------------- | ------------- | ------------- |
| id | integer | primary key |
| apartment_id | int ref | not null |
| subject | text | not null |
| body | text | not null |
| appt_date | date | |
| appt_time | time | |
| status | boolean |
