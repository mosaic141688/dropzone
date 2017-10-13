<template>
  <gmap-map
    :center="center"
    :zoom="12"
    style="width: 100%; height: 400px"
  >
    <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        <div><b>{{infoContent}}</b></div>
        <div>on {{time.toString().substr(0,15)}}</div>
        <div>at {{time.toString().substr(15,6)}}</div>
    </gmap-info-window>
    <gmap-marker
      :key="i"
      v-for="(m, i) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="false"
      :title="m.title"
      @click="toggleInfoWindow(m,i)"
    ></gmap-marker>
  </gmap-map>
</template>

<script>
  /////////////////////////////////////////
  // New in 0.4.0
  import * as VueGoogleMaps from 'vue2-google-maps';
  import Vue from 'vue';

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCDNUh9drF-hwfKtl_An8yDXjgzRWAIQEQ'
    }
  });

  export default {
    data () {
      return {
        center: {lat: -26.3291606, lng: 31.14687648},
        flyers:[],
        time:'',
        infoContent: '',
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        infoWinOpen: false,
        currentMidx: null,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        markers: [{
          position: {lat: 10.0, lng: 10.0}
        }, {
          position: {lat: 11.0, lng: 11.0}
        }]
      }
    },
    computed:{
    },
    created:function(){
      window.db.ref('flyers').on('value',v=>{
        //console.log('Flyers: ',v.val())
        this.flyers=v.val();
        window.db.ref('drops').on('value',v=>{
          var val = v.val()
          this.markers=[];
          for(var i in val){
            this.markers.push({
              position:{lat:val[i].lat,lng:val[i].lng},
              infoText:this.flyers[val[i].id].name,
              time:val[i].time
            })
          }
        })
      })


   },
  methods: {
    toggleInfoWindow: function(marker, idx) {
    this.infoWindowPos = marker.position;
    this.infoContent = marker.infoText;
    this.time = new Date(marker.time);
    //check if its the same marker that was selected if yes toggle
    if (this.currentMidx == idx) {
      this.infoWinOpen = !this.infoWinOpen;
    }
    //if different marker set infowindow to open and reset current marker index
    else {
      this.infoWinOpen = true;
      this.currentMidx = idx;
    }
  }
}
}
</script>

<style>
</style>