
# api authentication
 in this project have 3 differnt models

        
        1:user model 
(which contains name,email,password,role)
        2:resturant model
(have name of restaurant,menu,staffs which have the reference of usermodel)
        3 reservation model
(date,number of the guests and restaurnt which have the reference of resetaurant schema)


## Deployment

To deploy this project run

```bash
  npm run dev
```


## API Reference

####create user

http://localhost:3001/api/v1/users/staff
```

####register user

```http://localhost:3001/api/v1/users/



#### login

````http://localhost:3001/api/v1/users/login

```

#### Get cocineros

```http://localhost:3001/api/v1/users/cocinero
```
(here check the user is authenticated to acess the data)

#### Get camareros
```http://localhost:3001/api/v1/users/camarero
```
(here check the user is authenticated to acess the data)

#### Get staffs

```http://localhost:3001/api/v1/users/

```here check the user is authenticated to acess the data)


#### put  update staff
http://localhost:3001/api/v1/users/id

``here check the user is authenticated to acess the data and his role is admin)


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. passing id of the requesting user |

####  delete user
http://localhost:3001/api/v1/users/id

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** |passing id of the requesting user and check his role is admin or reuesting user itself delete his account

restaurant schema
#### Get restaurant
http://localhost:3001/api/v1/restaurants
```
```

#### post restaurant

```http://localhost:3001/api/v1/restaurant/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the requesting user and check weather he is dmin or jefe |


#### update restaurant
http://localhost:3001/api/v1/restaurants/id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Id of the requesting user and check weather he is admin or jefe |


```delete staff
http://localhost:3001/api/v1/restaurants/id

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the requesting user and check weather he is admin or jefe ||


#### delete restaurant
http://localhost:3001/api/v1/restaurants/delete/id

```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|``id` | `string` |  |    **Required**. Id of the requesting user  and check weather he is admin or jefe

reservation schema

#### post reservation
http://localhost:3001/api/v1/reservation/
```
```



#### get reservation

```http://localhost:3001/api/v1/reservation/restaurant_id
  
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `restaurant_id` | `string` | **Required**. id of the restaurant |

#### update reservation

```http://localhost:3001/api/v1/reservation/reservation_id
  
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `reservation_id`      | `string` | **Required**. reservation_id of the reservation |

.
#### delete reservation

```http://localhost:3001/api/v1/reservation/reservation_id
  
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `reservation_id` | `string` | **Required**. reservation_id|

#