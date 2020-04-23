module.exports = app =>{
    const mongoose = require("mongoose") 

    
    // mongoose.connect = ('mongodb://127.0.0.1:27017/node-vue-moba',{
    //     useNewUrlParser: true
    // })


    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{
        useNewUrlParser: true
    })

    //把models文件夹里所有的模型全部引用了一次。
    require('require-all')(__dirname + '/../models')

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
        console.log('连接成功');
    });
    
}

