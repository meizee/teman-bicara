const functions = require("firebase-functions");
const admin = require("firebase-admin");

var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const express = require("express");
const app = express();
const db = admin.firestore();

const cors = require("cors");
app.use( cors( { origin:true } ) );

// Routes
app.get('/', (req, res) => {
    return res.status(200).send('Selamat datang di Teman bicara');
});

// ================================================================================================
// CRUD USER

// Create
app.post('/user/create', (req, res) => {
    (async() => {
        try {
            await db.collection('users').doc(`/${Date.now()}/`).create({
                id: Date.now(),
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            return res.status(200).send({status: "Success", msg: "Data saved"});
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: "Failed", msg: error})
        }
    })();
})

// read data by id
app.get('/user/read/:id', (req, res) => {
    (async() => {
        try {
            const document = db.collection('users').doc(req.params.id);
            let users = await document.get();
            let response = users.data();

            return res.status(200).send({error: "false",message:"succes",user:response});
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: "Failed", msg: error})
        }
    })();
})

// read all
app.get('/user/read', (req, res) => {
    (async() => {
        try {
            let query = db.collection('users');
            let response = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;

                for (let doc of docs){
                    const selectedItem = {
                        id: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        password: doc.data().password
                    };
                    response.push(selectedItem)
                }
                return response;
            })
            return res.status(200).send({error: "false",message:"succes",user:response})
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: "Failed", msg: error})
        }
    })();
})

// Update
app.put('/user/update/:id', (req, res) => {
    (async() => {
        try {
            const document = db.collection('users').doc(req.params.id)
            await document.update({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            return res.status(200).send({status: "Success", msg: "Data Updated"});
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: "Failed", msg: error})
        }
    })();
})

// Delete
app.delete('/user/delete/:id', (req, res) => {
    (async() => {
        try {
            const document = db.collection('users').doc(req.params.id)
            await document.delete();
            return res.status(200).send({status: "Success", msg: "Data deleted"});
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: "Failed", msg: error})
        }
    })();
})

// =====================================================================================================
// Data terapis

// Create
app.post('/terapis/create', (req, res) => {
    (async() => {
        try {
            await db.collection('terapis').doc(`/${Date.now()}/`).create({
                id: Date.now(),
                name: req.body.name,
                photo: req.body.photo,
                location: req.body.location,
                rating: req.body.rating,
                price: req.body.price,
            });
            return res.status(200).send({status: "Success", msg: "Data saved"});
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: "Failed", msg: error})
        }
    })();
})

// read data by id
app.get('/terapis/read/:id', (req, res) => {
    (async() => {
        try {
            const document = db.collection('terapis').doc(req.params.id);
            let terapis = await document.get();
            let response = terapis.data();

            return res.status(200).send({error: "false",message:"succes",terapis:response});
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: "Failed", msg: error})
        }
    })();
})

// read all
app.get('/terapis/read', (req, res) => {
    (async() => {
        try {
            let query = db.collection('terapis');
            let response = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;

                for (let doc of docs){
                    const selectedItem = {
                        id: doc.id,
                        name: doc.data().name,
                        photo: doc.data().photo,
                        location: doc.data().location,
                        rating: doc.data().rating,
                        price: doc.data().price
                    };
                    response.push(selectedItem)
                }
                return response;
            })
            return res.status(200).send({error: "false",message:"succes",terapis:response})
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: "Failed", msg: error})
        }
    })();
})

// Update
app.put('/terapis/update/:id', (req, res) => {
    (async() => {
        try {
            const document = db.collection('terapis').doc(req.params.id)
            await document.update({
                name: req.body.name,
                photo: req.body.photo,
                location: req.body.location,
                rating: req.body.rating,
                price: req.body.price
            })
            return res.status(200).send({status: "Success", msg: "Data Updated"});
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: "Failed", msg: error})
        }
    })();
})

// Delete
app.delete('/terapis/delete/:id', (req, res) => {
    (async() => {
        try {
            const document = db.collection('terapis').doc(req.params.id)
            await document.delete();
            return res.status(200).send({status: "Success", msg: "Data deleted"});
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: "Failed", msg: error})
        }
    })();
})

//=====================================================================================================
// Chat

// Create
app.post('/chat/create', (req, res) => {
    (async() => {
        try {
            let date_ob = new Date();
            let hour = date_ob.getHours();
            let minute = date_ob.getMinutes();
            await db.collection('chat').doc(`/${Date.now()}/`).create({
                id: Date.now(),
                from: req.body.from,
                to: req.body.to,
                message: req.body.message,
                time: hour + ":" + minute
            });
            return res.status(200).send({status: "Success", msg: "Data saved"});
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: "Failed", msg: error})
        }
    })();
})

// read data by id
app.get('/chat/read/:id', (req, res) => {
    (async() => {
        try {
            const document = db.collection('chat').doc(req.params.id);
            let chat = await document.get();
            let response = chat.data();

            return res.status(200).send({error: "false",message:"succes",chat:response});
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: "Failed", msg: error})
        }
    })();
})

// read all
app.get('/chat/read', (req, res) => {
    (async() => {
        try {
            let query = db.collection('chat');
            let response = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;

                for (let doc of docs){
                    const selectedItem = {
                        id: doc.id,
                        from: doc.data().from,
                        to: doc.data().to,
                        message: doc.data().message,
                        time: doc.data().time,
                    };
                    response.push(selectedItem)
                }
                return response;
            })
            return res.status(200).send({error: "false",message:"succes",chat:response})
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: "Failed", msg: error})
        }
    })();
})

// Update
app.put('/chat/update/:id', (req, res) => {
    (async() => {
        try {
            let date_ob = new Date();
            let hour = date_ob.getHours();
            let minute = date_ob.getMinutes();
            const document = db.collection('chat').doc(req.params.id)
            await document.update({
                message: req.body.message,
                time: hour + ":" + minute
            })
            return res.status(200).send({status: "Success", msg: "Data Updated"});
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: "Failed", msg: error})
        }
    })();
})

// Delete
app.delete('/chat/delete/:id', (req, res) => {
    (async() => {
        try {
            const document = db.collection('chat').doc(req.params.id)
            await document.delete();
            return res.status(200).send({status: "Success", msg: "Data deleted"});
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: "Failed", msg: error})
        }
    })();
})


// Export api ke firebase cloud function
exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
