<template>
  <div class="hello">    
    <div>          
        <img src="../assets/Bugs.png" alt="This image contain a rabbit." id="logo">
        <p id="title">
            {{titlee}}
        </p>
        {{Showa}}
        <div v-if="!algo">
          <div class="loader">        
          </div>
          <h4 style="margin-left:5%;" >{{msg}}</h4>
        </div>
        
        <div v-if="algo" id="lists">          
            <ul>
                <li v-for="(nodo,index) in nodos" :key="index">                  
                  <div class="card" style="width: 10rem;margin-top:10%;">
                      <img class="card-img-top" :src="nodo.picture" alt="Card image cap">
                    <div class="card-body">                      
                      <p class="card-text">Mensaje: {{nodo.message}} </p>                      
                      <router-link :to="{name:'AnalyzePost',params:{idPost:nodo.id} }" class="btn btn-primary">Analizar</router-link>
                    </div>      
                  </div>
                </li>
            </ul>
        </div>                   
    </div>        
  </div>
</template>

<script>
import AnalyzePost from "./AnalyzePost.vue";

export default {
  name: "Posts",
  props: {
    titlee: String,
    mostrar: Boolean,
    person: String
  },
  data() {
    return {
      algo: this.mostrar,
      error:true,
      idPerson: this.$route.params.idPerson,
      nodos: [],
      data: {
        idUser: this.$route.params.idPerson
      },
      msg: "Buscando"
    };
  },
  computed: {
    Showa: function() {
      this.$http
        .post("http://localhost:8000/ViewPost", this.data, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          if (res.body == "Please update token.") {
            this.error=true;
            this.msg=res.body+"\nPor favor actualiza el token.";            
          } else {            
            this.error=false;
            this.nodos = res.data;
            this.algo = true;
            this.nodos.map((rs,index)=>{
              if(rs.message!=undefined){
                this.nodos[index].message=rs.message.substr(0,20)+"...";
              }
              console.log(rs.message);
            })
            //console.log(this.nodos);
          }
          //console.log(res);
        });
    }
  },
  methods: {
    go: function(id) {}
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
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid blue;
  border-bottom: 16px solid blue; 
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  margin-left:45%; 
}
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
