<template>
<div>
<router-link to="/ ">Seleccionar otra persona</router-link>  
{{Analyze}}
<br/>
<br/>
<br/>
<gmap-map
    :center="center"
    :zoom="7"
    style="width: 700px; height: 500px;margin-left:24%;"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position",
      :label="m.label"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
</div>
  
</template>
<script>
export default {
  name: "AnalyzePost",
  props: {
    titlee: String,
    mostrar: Boolean
  },
  data() {
    return {
      idPost: this.$route.params.idPost,
      people: [],
      center: { lat: 10.0, lng: 10.0 },
      markers: []
    };
  },
  computed: {
    Analyze: function() {
      var data = {
        idPost: ""
      };

      data.idPost = this.idPost;
      this.$http
        .post("http://localhost:8000/AnalyzePost", data, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          if (res.body == "No comments") {
            console.log("No comments");
          } else {
            res.body.map(rs => {
              if (rs.latitude != "Unauthorized") {
                this.center = {
                  lat: rs.latitude,
                  lng: rs.longitude
                };
                var marca = {
                  label: rs.Name,
                  position: { lat: rs.latitude, lng: rs.longitude }
                };  
                var algo=true;
                for(var i=0; i<this.markers.length;i++){ 
                  if(marca.label==this.markers[i].label){
                    algo=false;
                  }                  
                }                                                  
                if(algo){
                  this.markers.push(marca);
                }                
              }
            });
          }
        });
    }
  }
};
</script>
<style>

</style>
