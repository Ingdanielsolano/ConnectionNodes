<template>
  <div class="hello">
    <div>        
        <img :src="logo" alt="This image contain a rabbit." id="logo">
        <p id="title">
            {{titlee}}
        </p>
        <button id="btn" @click="toggleMostrar()">Mostrar/Ocultar</button>
        <div v-if="mostrar" id="lists">
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
    titlee: string,
    nodos: string,
    mostrar: string,
    logo: string
  },
  methods: {
    toggleMostrar: function() {
      this.mostrar = !this.mostrar;
    }
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
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
