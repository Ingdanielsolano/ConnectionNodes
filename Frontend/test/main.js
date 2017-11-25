const app = new Vue({
    el: '#app',
    template: '#example',
    data: {
        nodos:[
            {name: "Oscar Daniel Solano Puentes",City:"Forencia-Caquetá",Longitude:"TakeFromApi",Latitude:"TakeFromApi"},
            {name: "Alguna persona más",City:"Forencia-Caquetá",Longitude:"TakeFromApi",Latitude:"TakeFromApi"},
        ],
        mostrar: true,
        mensaje: "Node Connections js.",
        imagen: "Images/Bugs.png"
    },
    methods: {
        toggleMostrar: function () {
            this.mostrar = !this.mostrar;
        }
    }
})