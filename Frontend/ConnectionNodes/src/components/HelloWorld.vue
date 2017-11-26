<template>
  <div class="hello">    
    <div>          
        <img src="../assets/Bugs.png" alt="This image contain a rabbit." id="logo">
        <p id="title">
            {{titlee}}
        </p>
        <button id="btn" @click="toggleMostrar()">Mostrar/Ocultar</button>
        <div v-if="algo" id="lists">          
            <ul>
                <li v-for="(nodo,index) in nodos" :key="index">
                    <label>{{nodo.name}} from {{nodo.City}} </label>                            
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
    nodos: String,
    mostrar: Boolean
  },
  data() {
    return {
      algo: this.mostrar,
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    toggleMostrar: function() {
      console.log(this.algo);
      this.algo = !this.algo;
    }
  },
  created:function(){
    this.$http.get('http://localhost:8000/AnalyzePost/')
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
