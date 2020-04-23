const express = require("express") 

const app = express()

//jwt密钥
app.set('secret','yl13795950539')

app.use(require('cors')())
app.use(express.json())
app.use('/admin',express.static(__dirname+'/admin'))
app.use('/',express.static(__dirname+'/web'))
app.use('/uploads',express.static(__dirname+'/uploads'))

require('./routes/admin')(app)
require('./plugins/db')(app)
require('./routes/web')(app)

app.listen(3000,()=>{
    console.log('http://localhost:3000')
});
