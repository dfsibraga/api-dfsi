const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post('/tasks', async (req, res) => {
    
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }

    /*
    task.save().then(() => {
        res.status(201).send(task);
    })
    .catch((e) => {
        res.status(400).send(e);
    });
    */
});

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }

    /*
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((e) => {
        res.status(500).send();
    });
    */
});

router.get('/tasks/:id', async (req, res) => {

    const _id = req.params.id;
    
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        };
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }

    /*
    Task.findById(_id).then(task => {
        if (!task) {
            return res.status(404).send();
        };
        res.send(task);
    }).catch(e => {
        res.status(500).send()
    });
    */

});

router.patch('/tasks/:id', async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['descricao','efetuada'];
    const isValidOperation = updates.every((item) => allowedUpdates.includes(item));

    if (!isValidOperation) {
        return res.status(400).send({erro: "Campos inválidos."});
    }
    
    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true}); //, runValidators : true

        const task = await Task.findById(req.params.id);

        updates.forEach((item) => {
            task[item]= req.body[item];
        });

        await task.save();

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    };

});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id); 
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        return res.status(500).send();
    }
});

module.exports = router;