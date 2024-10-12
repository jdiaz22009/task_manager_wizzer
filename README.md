
# task_manager app

    1. node version v20.12.0
    2. npm install


# Docker compose

    1. cd docker
    2. docker-compose | docker compose up -d
    3. docker ps 
    4. docker-compose | docker compose down 
    5. npm run start:dev



## API Reference

#### Get all task by user for token

```http
  GET /api/tasks
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer Token |

#### created  task 

```http
  POST /api/task
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required**. Bearer Token |
| `body`      | `object` | **Required**. 

    {
    "title": "Hola esto es una tarea",
    "description": "la tarea description",
    }



#### UPDATE  task 

```http
  POST /api/task/update_task/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required**. Bearer Token |
| `id`      | `string` | **Required**. uuid task |
| `body`      | `object` | **Required**. 

    {
    "title": "Hola esto es una tarea",
    "description": "la tarea description",
    "status": "COMPLETED | PENDING"
    }


#### DELETE  task 


```http
  DELETE /api/tasks/delete_task/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer Token |
| `id`      | `string` | **Required**. uuid task |


#### REGISTER  USER 


```http
  POST /api/user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body` | `objec` | **Required**. |
    {
        
    "username":"jddiazdev",
    "password": "1234"
    }


#### LOGIN  USER 

```http
  POST /api/user/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body` | `objec` | **Required**. |
    {
        
    "username":"jddiazdev",
    "password": "1234"
    }
