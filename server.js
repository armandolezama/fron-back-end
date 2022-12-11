const express = require('express');
const app = express();
const port = 8000;
const db = require('./db.json');
const cors = require('cors');

//Se levanta el puerto con esto
app.listen(port, function(){
    console.log(`Inicializado en el puerto ${port}`);
    console.log(`http://localhost:${port}`);
})

//Manejar las peticiones

//app.use(respuesta)

app.use(cors());
app.use(express.json());
app.use('/public', express.static('contactos'));

app.get('/', getUserInfo); //Trae algo
app.get('/:id', getSingleUser);
app.post('/', createUser); // Enviar algo
app.put('/:id', editUserInfo);
app.delete('/:id', deleteUser);

function getSingleUser(request, response, next){
    const id = request.params.id;
    response.setHeader("Content-Type", "text/html");
    let contactFound = false
    let find = {};
    for(let i = 0; i < db.contactList.length; i ++){ 
        if(db.contactList[i].id == id){
            find = db.contactList[i];
            contactFound = true;
        }
    }

    if(!contactFound){
        find = ["Usuario no encontrado"];
    }
    response.send(find);
    response.end();
}


function getUserInfo(request, response, next){
    response.setHeader("Content-Type", "text/html");
    response.send(db);
    response.end();
}


function createUser(request, response, next){
    //TODO Hacer que el ID no se repitan *
    const newUser = request.body;
    let dataBaseSize = 100;
    const warningMessage = ["Se ha llegado al límite de usuarios"];
    
    
    if(dataBaseSize == db.contactList.length){
        response.send(warningMessage);
    } else {
        newUser.id = Math.floor(Math.random()*dataBaseSize);
    
        for(let i = 0; i < db.contactList.length; i ++){
            if(db.contactList[i].id == newUser.id){
                newUser.id = Math.floor(Math.random()*(dataBaseSize + .999));
                i = 0;
            }
        }
        db.contactList.push(newUser);
        response.send(db);
        response.end();
    }

}

function editUserInfo(request, response){
    const id = request.params.id;
    let userToUpdate = {};
    
    for(let i = 0; i < db.contactList.length; i ++){
        
        if(db.contactList[i].id == id){
            userToUpdate = db.contactList[i];
        }    
    }


    if(request.body.name){
        const newName = request.body.name;
        userToUpdate.name = newName;
    }

    if(request.body.email){
        const newEmail = request.body.email;
        userToUpdate.email = newEmail;
    }

    if(request.body.ubication){
        const newUbication = request.body.ubication;
        userToUpdate.ubication = newUbication;
    }
    //Agregar las demás propiedades *
    //Hacer que se tome el ID en lugar de la posición*
    response.send(db);
}

function deleteUser(request, response){
    const id = request.params.id;
    for(let i = 0; i < db.contactList.length; i ++){
        if(db.contactList[i].id == id){
            db.contactList.splice(i, 1);
        }
    }
    response.send(db);
}

/*
app.post('/', createUser);
app.put('/:id', editUserInfo);
app.delete('/:id', deleteUser);
*/

