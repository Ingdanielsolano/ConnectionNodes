<template>
  <div class="hello">    
    <div>          
        <img src="../assets/Bugs.png" alt="This image contain a rabbit." id="logo">
        <p id="title">
            {{titlee}}
        </p>
        <input v-model="data.idUser" placeholder="Id del usuario">        
        <button id="btn" @click="toggleMostrar()">Buscar Post</button> 
        <br/>
        <br/>
        <br/>
        <br/>
        <div v-if="algo" id="lists">          
            <ul>
                <li v-for="(nodo,index) in nodos" :key="index">                  
                  <div class="card" style="width: 20rem;margin-top:10%;">
                      <img class="card-img-top" :src="nodo.picture" alt="Card image cap">
                    <div class="card-body">
                      <h4 class="card-title">Id: id: {{nodo.id}}</h4>
                      <p class="card-text">Mensaje: {{nodo.message}} </p>
                      <a href="#" class="btn btn-primary">Analizar</a>
                    </div>      
                  </div>
                </li>
            </ul>
        </div>
    </div>    
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    titlee: String,
    mostrar: Boolean
  },
  data() {
    return {
      algo: this.mostrar,
      idPerson: "",
      nodos: [],
      data: {
        idUser: ""
      },
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    toggleMostrar: function() {
      this.$http
        .post("http://localhost:8000/ViewPost", this.data, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          this.nodos = res.data;
          console.log(res);
        });
      this.algo = !this.algo;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
