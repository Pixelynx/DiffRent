#Sample State

```

state = {
    landlord : {
        0: {
            id: 0,
            name : 'John Doe',
            email: 'jDoe@gmail.com',
            phone: '123-456-7890',
            dob: 12/12/1990,
            password: 'j3id39djeirgjerijog03'
        },
        1: {
            id: 1,
            name : 'Daniel John',
            email: 'dJohn@gmail.com',
            phone: '098-765-4321',
            dob: 08/22/1988,
            password: 'sfjs4983r4reiow'
        }
    },
    apartment: {
        0: {
            id: 0,
            address: '123 Wall St.',
            landlord_id: 0
        },
        1: {
            id: 1,
            address: '424 Fulton St.',
            landlord_id: 1
        }
    },
    tenants: {
        0: {
            id: 0,
            name: 'Sample Tenant',
            dob: 01/01/1995,
            email: 'tenant0@gmail.com',
            apt: 0,
            phone: '123-242-5678',
            password: 'asr38w9ur743tu'
        }
        1: {
            id: 1,
            name: 'Tenant Sample',
            dob: 08/08/1998,
            email: 'sample1@gmail.com',
            apt: 1,
            phone: '347-092-5434',
            password: 'asr38w9ur743tu'
        }
    },
    tickets: {
        0: {
            id: 0,
            apartment_id: 1,
            body: 'Drain pipe broken',
            appt_date: 01/02/2019,
            appt_time: 03:00PM
        },
        1: {
            id: 1,
            apartment_id: 0,
            body: 'Doorknob not turning',
            appt_date: 01/03/2019,
            appt_time: 11:00AM
        }
    }
}


```