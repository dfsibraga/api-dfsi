const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    dbName: "demo",
    useNewUrlParser:true,
    useUnifiedTopology: true
});


