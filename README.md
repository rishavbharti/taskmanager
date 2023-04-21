# Task Manager (Backend)

This project serves as a backend for the Task Manager application which allows one to create, update, retreive, and delete tasks. 

This service is implemented in [Node.js](https://nodejs.org/en) using [Express](https://expressjs.com/). 
It stores the tasks in a custom-built [In-memory database](https://github.com/rishavbharti/taskmanager/tree/main/db/index.js).

## Project Setup

If you wish to run this project, 
the first step is [installing Node.js](https://cloud.google.com/nodejs/docs/setup).
- Make sure Node.js version 18 LTS or later is installed. 
- Setup Git and clone this repository to a working directory.
- Point a terminal to the project's folder and run `npm i` in the project root to install dependencies.

After finishing the setup, run `npm start` to start the development server. By default, server is set to run on port 8000 and can be accessed at [http://localhost:8000/](http://localhost:8000/).

## APIs

### Schema
The schema of a task is as follows:
```
{
  "title": "Mandatory field. Length between 3 - 100 characters.,
  "description": "Mandatory field. Length between 3 - 1000 characters. 
  "completed": false,
  "priority": "medium",
  "id": "1682097744037",
  "createdAt": "2023-04-21T17:22:24.037Z",
  "updatedAt": "2023-04-21T17:22:24.037Z"
}
```
- `title` & `description` are mandatory fields & should have a minimum length of 3.
- `completed` & `priority` are optional fields having a default value of `false` and `"medium"` respectively.
- `id`, `createdAt` & `updatedAt` are populated by the database.

##
This application exposes the following endpoints at [/api](http://localhost:8000/api) route.

#### 1. GET /tasks
###### a.
```
@desc    Get all tasks
@route   GET /api/tasks
```

###### b.
```
@desc    Get selected tasks based on filters specified in the query parameters
@route   /api/tasks?property1=value&property2=value
@param   {string} property (specified in the schema)
@param   {string | number | boolean} value (without quotes)
@example /api/tasks?priority=high&completed=true
```

###### c.
```
@desc    Get tasks sorted on a specified property in ascending / descending order
@route   GET /api/tasks
@body    { sortBy: 'createdAt, orderBy: 'desc' }
```

#### 2. GET /tasks/:id
```
@desc    Get a task by id
@route   GET /api/tasks/:id
@param   {number} id
```

#### 3. GET /tasks/priority/:level
```
@desc    Get tasks by priority
@route   GET /api/tasks/priority/:level
@param   {enum} (low | medium | high) level
```

#### 4. CREATE /tasks
```
@desc    Create a task
@route   POST /api/tasks
@body    { name: string, description: string } name & description are mandatory fields. Fields present in the schema can also be specified (except id, createdAt, updatedAt)
```

#### 5. UPDATE /tasks/:id
```
@desc    Update a task by id
@route   PUT /api/tasks/:id
@param   {number} id
@body    { name: string, description: string } Any field present in the schema be specified (except id, createdAt, updatedAt)
```

#### 6. DELETE /tasks/:id
```
@desc    Delete a task by id
@route   DELETE /api/tasks/:id
@param   {number} id
```

For ease of testing, one can use the Postman collection (`TaskManager.postman_collection.json`) present in the repo. 

#
## In-memory database
The database stores data in-memory as JSON. By default, data is indexed by the id. 
Here's an example of how it looks like: 
```
{
  Tasks: {
    _schema: {
      title: {
        type: 'String',
        trim: true,
        minLength: 3,
        maxLength: 100,
        required: true
      },
      priority: {
        type: 'String',
        enum: ['low', 'medium', 'high'],
        default: 'medium'
      }
    },
    store: {
      1682100568216: {
        "title": "Task 1",
        "description": "Description",
        "completed": true,
        "priority": "medium",
        "id": "1682100568216",
        "createdAt": "2023-04-21T18:09:28.216Z",
        "updatedAt": "2023-04-21T18:09:28.216Z"
      }
    }
  }
}
```

Database can be instantiated with the name of the collection and the schema. 
The schema is stored in the `_schema` property and is used for validating data in `POST` & `PUT` operations. 
It populates `id`, `createdAt`, and `updatedAt` by default for every item. 

Besides supporting Create, Read, Update & Delete operations, it can also be queried using the filters - `$in`, `$gt` and `$lt`. 
Here's an example for the same. 
```
- This will return all the tasks with priority low and medium: { 'priority': { '$in': ['low', 'medium'] } }
- This will return all the items with rating greater than 4 : { 'rating': { '$gt': 4 } }
```

It supports sorting data on a given property in ascending & descending order.
Here's an example for the same. 
```
{ 'sortBy': 'createdAt', 'orderBy': 'asc' }
```