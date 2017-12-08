<template>
    <div class="hello">
    <img src="../assets/logo.png" alt="CnLogo">
        <div>
            <div class="form-inline"style="margin-left:35%;">
                <div class="form-group mx-sm-3"style="">
                    <input v-model="datas.nombre" class="form-control " style="width:200px;" placeholder="Usuario" >        
                </div>
                <button id="btn" class="btn btn-primary" @click="Buscar()">Buscar usuario</button> 
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <div v-if="algo" id="lists"> 
                <ul>                 
                       <li v-for="(person,index) in people" :key="index">                   
                        <div class="card" style="width:10rem;margin-top:10%;">
                            <router-link :to="{name:'Posts',params:{idPerson:person.id} }">
                                <img class="card-img-top" :src="person.picture.data.url" alt="Card image cap">                        
                            </router-link>                    
                            <div class="card-body">
                                <h4 class="card-title">Nombre: {{person.name}}</h4>                                            
                            </div>      
                        </div>
                    </li>
                </ul>
                <button id="btn2"class="btn btn-primary" @click="BuscarMas()">Ver más</button> 
            </div>                        
        </div>
    </div>
</template>

<script>
export default {
  name: "Buscar",
  data() {
    return {
      people: [],
      datas: {
        nombre: ""
      },
      datamas: {
        nombre: "",
        number: Number
      },
      counta: 0,
      algo: false
    };
  },
  methods: {
    Buscar: function() {
      this.$http
        .post("http://localhost:8000/Search", this.datas, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          this.people = res.data.data;
          console.log(this.people);
          if(!this.algo){
            this.algo = true; 
          }          
        });
    },
    BuscarMas: function() {
      this.counta=this.counta+ 99;
      console.log(this.counta);
      this.datamas = {
        nombre: this.datas.nombre,
        numeroo: this.counta
      };
      this.$http
        .post("http://localhost:8000/SearchMore", this.datamas, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);
          this.people = null;
          this.people = res.body;
          // console.log(this.people);          
        });
    }
  }
};
</script>

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

