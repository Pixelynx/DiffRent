# Schema
---
## Landlords
---
| Column Name  | Data Type | Details |
| ------------- | ------------- | ------------- |
| id | integer | primary key |
| apartments_id | int ref | not null |
| name | string | not null |
| email | string | unique, not null |
| phone | string | |
| dob | date | not null |
| password | string | not null |

## Tenants
---
| Column Name | Data Type | Details |
| ------------- | ------------- | ------------- |
| id | integer | primary key |
| name | string | not null |
| dob | date | not null |
| email | string | unique, not null |
| apt | string | |
| building_id | int ref | |
| phone | string | |
| password | string | not null |

## Apartments
---
| Column Name | Data Type | Details |
| ------------- | ------------- | ------------- |
| id | integer | primary key |
| name | string | not null |
| address | string | not null |
| landlord_id | int ref | not null |

## Tickets
---
| ------------- | ------------- | ------------- |
| id | integer | primary key |
| tenant_id | int ref | not null |
| landlord_id | int ref | not null |
| body | text | not null |
| appt_date | date | |
| appt_time | time | |
