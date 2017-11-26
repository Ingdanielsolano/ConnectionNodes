var server = require('http').Server(app);
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors');
var routes = require('./routes');

var facebook= require('./FacebookClass');

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(cors());
app.use(express.static('public'));
routes.configurar(app);

facebook.Iniciar();
//1702132073131493
/*var request={
    idUser:1025000047511369,
    idPost:1702132073131493
}

facebook.AnalyzePost(request,1702132073131493);
//facebook.AnalyzePost(1744230332255000,1702132073131493);
//"1744230332255000"
//facebook.PostDone(1744230332255000);
//facebook.PostDone(1025000047511369);
*/

var server = app.listen(8000, function () {
    console.log('Port: '+ server.address().port+"\n");
})