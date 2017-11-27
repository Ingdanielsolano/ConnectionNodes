var FB = require('fb');

function FacebookClass() {
    var permission;
    this.Iniciar = function (datos, respuesta) {
        permission = "EAACEdEose0cBABBjnREfyvUZASYZBjjTphhRm6qAjcXZB1lrMiw95Mp9tQQg4zmeQ1wD9w9rNCEsZCWT3FxI1u4hZB5fdiX0nkJKKnP8As5TCZCqzVzC1ZBv89ZC7cojf6jjDZB3D4xWzyhczAQPXQk8EyUt8fahPEli11ZBP6D0jkCagKigHhKnptA5yA7fM8fE0tvfWIyhqYRwZDZD";
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
                                    Objectt: {
                                        Name: String;
                                        Latitude: String;
                                        Longitude: String;
                                    }
                                    Objectt.Name = rs.from.name;
                                    Objectt.latitude = dataLocation.location.latitude;
                                    Objectt.longitude = dataLocation.location.longitude;
                                    response.send(Objectt)
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

    function SyncPostDone(rs, posts, callback) {
        var post = {
            id: "",
            message: "",
            picture: ""
        };
        FB.api(rs.id + "", {
            fields: ['picture'],
            access_token: permission
        }, function (res2) {
            post.id = rs.id;
            post.message = rs.message;
            post.picture = res2.picture;
            posts.push(post);
            callback(null, posts);
        });
    }

    function SyncBigPostDone(res, posts, callback) {
        post = {
            id: "",
            message: "",
            picture: ""
        };
        count=0;
        res.posts.data.map((rs, index) => {
            SyncPostDone(rs, posts, result => {
                count++;
                if (count == res.posts.data.length - 1) {
                    callback(null, posts);
                }

            })
        })
    }
    this.PostDone = function (request, response) {
        post = {
            id: "",
            message: "",
            picture: ""
        }
        var posts = [];
        FB.api(request.idUser + "", {
            fields: ['posts'],
            access_token: permission
        }, function (res) {
            SyncBigPostDone(res, posts, result => {
                response.send(posts);
                console.log(posts);
            })

        })
    };
}

module.exports = new FacebookClass();