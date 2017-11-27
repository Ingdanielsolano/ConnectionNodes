var FB=require("./FacebookClass");

function http() {
    this.configurar = function (app) {
        app.post('/AnalyzePost',function(request,response){
            FB.AnalyzePost(request.body,response);
        })
        app.post('/ViewPost',function(request,response){            
            FB.PostDone(request.body,response);
        })
    }
}
module.exports = new http();