var FB = require('fb');

function FacebookClass() {
    var permission;
    this.Iniciar = function (datos, respuesta) {
        permission = "EAACEdEose0cBAIABaVy2WMMdwppi6ygLZB7mbR4uHJddbWVZCKGdaqnVm4l1VFHvcHJg0KFuOY08RUD1LInakEdFMW3GjfQ6iAazHDy1h3xDZBvXUcC6xZCOzpPl3SKNJjc5PsUUZAnStbVQycjtlB4odofKVw4pXtETswh5wFVYqQCBvpOq0V1hqlsezvHk86NhqPknr5gZDZD";
    }
    //114444105238111?fields=location
    this.AnalyzePost = function (request, response) {

        FB.api(request.idUser + "_" + request.idPost + "/comments", {
            fields: [],
            access_token: permission
        }, res => {
            if (res.error == undefined) {
                res.data.map(rs => {
                    FB.api(rs.from.id + "", {
                        fields: ['location'],
                        access_token: permission
                    }, res2 => {
                        if (res2.location != undefined) {
                            FB.api(res2.location.id, {
                                fields: [],
                                access_token: permission
                            }, res3 => {
                                FB.api(res3.id, {
                                    fields: ['location'],
                                    access_token: permission
                                }, dataLocation => {
                                    console.log("Name: " + rs.from.name + "\nLocated in " + dataLocation.location.city + ", " + dataLocation.location.country + "\nLatitude: " + dataLocation.location.latitude + "\nLogintude: " + dataLocation.location.longitude + "\n");
                                    //console.log(dataLocation);                                
                                })
                            })
                        } else {
                            console.log("Name: " + rs.from.name + "\nUnauthorized\n");
                        }
                    })
                })
            } else {
                if (res.error.message.includes("Session has expired")) {
                    console.log("Please, update the token of session.");
                } else {
                    console.log(res.error.message)
                }

            }
        });
    }
    this.PostDone = function (idUser) {
        FB.api(request.idUser + "", {
            fields: ['posts'],
            access_token: permission
        }, function (res) {
            //console.log(res);
            res.posts.data.map(rs => {
                console.log(rs);
            })
        });
    }



}

module.exports = new FacebookClass();