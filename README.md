## Rest Api Node js With MongoDb
### Study Kasus ```Reservasi Hotel```

## Requirment

- node js
- npm
- nodemon
- mongoos
- body-parse
- router-group

## Result 

- Request:
    - EndPoint: 'api/v1/customer/data'
    - Method: 'GET'

- Result

```
    {
        "message": "GET",
        "result": [
            {
                "_id": "605c0e3242f0761c743f0078",
                "user_id": "60595c643248981f2374c6c8",
                "reservation_id": "605af4ed79297505669b91c4",
                "date_in": "19/10/2021",
                "date_out": "20/10/2021",
                "createdAt": "2021-03-25T04:14:42.162Z",
                "updatedAt": "2021-03-25T04:14:42.162Z",
                "users": {
                    "_id": "60595c643248981f2374c6c8",
                    "name": "admin",
                    "username": "@admin123"
                },
                "reservations": {
                    "_id": "605af4ed79297505669b91c4",
                    "user_id": "60595c643248981f2374c6c8",
                    "room_id": "605aeb3240a95968c68aea37",
                    "name_reservation": "ini ke relasi ga Hai",
                    "createdAt": "2021-03-24T08:14:37.412Z",
                    "updatedAt": "2021-03-24T08:14:37.412Z",
                    "rooms": [
                        {
                            "_id": "605aeb3240a95968c68aea37",
                            "name_room": "ROOM 01",
                            "type_room": "ROOM TYPE",
                            "price_room": "12000",
                            "number_of_room": "12",
                            "createdAt": "2021-03-24T07:33:06.432Z",
                            "updatedAt": "2021-03-24T07:33:06.432Z"
                        }
                    ]
                }
            }
        ],
        "code": 200
    }
```

## Result Mongo

![alt text](https://github.com/Ilyasyasin072/Rest-Api-Node-Mongo/blob/main/public/assets/img/Screenshot%20from%202021-03-23%2013-37-47.png)