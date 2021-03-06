var FB = require('fb');

function FacebookClass() {
    var permission;
    this.Iniciar = function (datos, respuesta) {
        permission = "EAACEdEose0cBAFhcW8pIUXIUsygpeKkSG78wlrlAnoJHWH9yhocskFZA1PKPGrQPIuIn1IC2QYgfEphmZAbZBfHI3rZCvHw1RziDqrZCgjHdrzhBt8tdEonQu3yHgsB8QIxvBk1W8NUwzRKDcORq7OkvSdTclPxAWHLHcNjfZCBnyqHg5X0IFgruxazAi3IyOckIrdoZAUjEAZDZD";
    }
    //114444105238111?fields=location

    function SyncAnalyzePost4(rs, res3, location, callback) {

        FB.api(res3.id, {
            fields: ['location'],
            access_token: permission
        }, dataLocation => {
            location.Name = rs.from.name;
            location.latitude = dataLocation.location.latitude;
            location.longitude = dataLocation.location.longitude;
            location.city = dataLocation.location.city;
            location.country = dataLocation.location.country;
            //response.send(Objectt)
            //console.log(location);
            console.log(location);
            callback(null, location);
            //console.log("Name: " + location.Name + "\nLocated in " + location.city + ", " + location.country + "\nLatitude: " + location.latitude + "\nLogintude: " + location.longitude + "\n");
            //console.log(dataLocation);                                
        })


    }


    function SyncAnalyzePost3(rs, res2, location, callback) {
        if (res2.location != undefined) {
            FB.api(res2.location.id, {
                fields: [],
                access_token: permission
            }, res3 => {
                SyncAnalyzePost4(rs, res3, location, resul3 => {
                    //console.log(location);
                    callback(null, location);
                })

            })
        } else {
            location.Name = rs.from.name;
            location.latitude = "Unauthorized";
            location.longitude = "Unauthorized";
            location.city = "Unauthorized";
            location.country = "Unauthorized";
            callback(null, location);
        }
    }

    function SyncAnalyzePost2(rs, person, callback) {
        location = {
            Name: "",
            longitude: "",
            latitude: "",
            city: "",
            country: ""
        }
        console.log("tercer paso");
        FB.api(rs.from.id + "", {
            fields: ['location'],
            access_token: permission
        }, res2 => {
            SyncAnalyzePost3(rs, res2, person, result2 => {
                //console.log(person);                
                callback(null, person);
            })

        })
    }

    function SyncAnalyzePost(res, people, callback) {
        person = {
            Name: "",
            longitude: "",
            latitude: "",
            city: "",
            country: ""
        }
        console.log("segundo paso");
        //console.log(res);
        if (res.error == undefined) {
            count = 0;
            res.data.map(rs => {
                SyncAnalyzePost2(rs, person, resultrs => {
                    count++;
                    console.log(count);
                    people.push(data = {
                        Name: person.Name,
                        longitude: person.longitude,
                        latitude: person.latitude,
                        city: person.city,
                        country: person.country
                    });
                    if (count == res.data.length) {
                        callback(null, people);
                    }
                })
            })
        } else {
            if (res.error.message.includes("Session has expired")) {
                console.log("Please, update the token of session.");
            } else {
                //console.log(res.error.message)
            }

        }

    }

    this.AnalyzePost = function (request, response) {
        people = [];
        FB.api(request.idPost + "/comments", {
            fields: [],
            access_token: permission
        }, res => {            
            if (res.data.length>0) {
                SyncAnalyzePost(res, people, result => {
                    response.send(people);
                })
            }else{
                response.send("No comments");
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
        count = 0;
        //console.log(res);
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
            if (res.error != undefined) {
                if (res.error.message.includes("Session has expired")) {
                    response.send("Please update token.");
                }
            } else {
                SyncBigPostDone(res, posts, result => {
                    //console.log(posts);
                    response.send(posts);
                    //console.log(posts);
                })
            }

        })
    };

    this.searchByUser = function (request, response) {
        users = []
        FB.api("search?limit=99&q=" + request.nombre + "&type=user", {
            fields: ['name', 'picture'],
            access_token: permission
        }, function (res) {
            //console.log(res);
            response.send(res);
        })
    }
    this.searchMoreByUser = function (request, response) {
        FB.api("search?limit=99&offset=" + request.numeroo + "&q=" + request.nombre + "&type=user", {
            fields: ['name', 'picture'],
            access_token: permission
        }, function (res) {
            console.log(res.data);
            response.send(res.data);
        })
    }
}

module.exports = new FacebookClass();