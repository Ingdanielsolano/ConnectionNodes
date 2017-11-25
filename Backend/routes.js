var FB=require("./FacebookClass");

function http() {
    this.configurar = function (app) {
        app.post('/AnalyzePost',function(request,response){
            FB.AnalyzePost(request.body,response);
        })
    }
}
module.exports = new http();