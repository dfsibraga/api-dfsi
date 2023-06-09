const express = require('express');
const User = require('../models/user');

const router = new express.Router();

router.get('/test', (req, res) => {
    res.send('Teste');
});

router.post('/users', async (req, res) => {
    
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
    
    /*
    user.save().then(() => {
        res.status(201).send(user);
    })
    .catch((e) => {
        res.status(400).send(e);
    });
    */
});

router.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send();
    }

    /*
    User.find({}).then((users) => {
        res.send(users);
    }).catch((e) => {
        res.status(500).send();
    });
    */
});

router.get('/users/:id', async (req, res) => {

    const _id = req.params.id;
    
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        };
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }

    /*
    User.findById(_id).then(user => {
        if (!user) {
            return res.status(404).send();
        };

        res.send(user);
    }).catch(e => {
        res.status(500).send()
    });
    */

});

router.patch('/users/:id', async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['nome','password'];
    const isValidOperation = updates.every((item) => allowedUpdates.includes(item));

    if (!isValidOperation) {
        return res.status(400).send({erro: "Campos inválidos."});
    }
    
    try {
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true}); //, runValidators : true

        const user = await User.findById(req.params.id);

        updates.forEach((item) => {
            user[item]= req.body[item];
        });

        await user.save();
        
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    };

});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id); 
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        return res.status(500).send();
    }
});

module.exports = router;