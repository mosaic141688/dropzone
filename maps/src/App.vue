<template>
<div id="app">
      <md-toolbar>
        <h1 class="md-title">Flyers Delivery Dashboard</h1>
       <md-subheader class="md-inset"><h3>home</h3></md-subheader>
      </md-toolbar>
      <md-tabs>
         <md-tab  v-for="item in flyers" :key="item.name" :id="item.name" :md-label="item.name">
           <FlyerView :flyer="item"></FlyerView>
         </md-tab>
      </md-tabs>

  <div class="main-content">
  <gmp></gmp>
  </div>
  <md-button @click.native="openDialog('new_flyer')" class="md-fab md-fab-bottom-right">
    <md-icon>add</md-icon>
  </md-button>

<md-dialog  md-open-from="#fab" md-close-to="#fab" ref="new_flyer">
   <md-dialog-title>Add New Flyer</md-dialog-title>
        <md-dialog-content>
          <form>
            <md-subheader class="md-inset"> <span><md-icon>book</md-icon>New Flyer</span></md-subheader>
            <md-layout class="" :md-gutter="80"  id="personal">
              <md-layout md-flex="40"  md-flex-offset="5">
                <md-input-container>
                  <label><span>Flyer Name</span></label>
                  <md-textarea v-model="newFlyer.name"></md-textarea>
                </md-input-container>
              </md-layout>
              <md-layout md-flex="40"  md-flex-offset="5">
                <md-input-container>
                  <label><span># of Flyers </span></label>
                  <md-textarea v-model="newFlyer.count"></md-textarea>
                </md-input-container>
              </md-layout>
            </md-layout>
          </form>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click.native="closeDialog('new_flyer')">cancel</md-button>
          <md-button class="md-primary" @click.native="savePoll()">save</md-button>
        </md-dialog-actions>
  </md-dialog>
  </div>
</template>

<script>

import Firebase from 'firebase'
import Vue from 'vue';
import gmp from './components/Map'
import FlyerView from './components/FlyerView'

var config = {
  apiKey: "AIzaSyA8B_KV_CcM4veHRysjGWvG5-gesNlKFTQ",
  authDomain: "dropzone-7eae5.firebaseapp.com",
  databaseURL: "https://dropzone-7eae5.firebaseio.com",
  projectId: "dropzone-7eae5",
  storageBucket: "dropzone-7eae5.appspot.com",
  messagingSenderId: "1098127471717"
};
  
window.app = Firebase.initializeApp(config)
window.db = app.database()
console.log('Window',window.db)
export default {
  data : function() {
    return{
      newFlyer:{
        name:'',
        count:0
      }
    }
  },
  methods:{
    openDialog(ref) {
      this.$refs[ref].open()
    },
    savePoll(){
      this.$firebaseRefs.flyers.push(this.newFlyer)
      this.$refs['new_flyer'].close()
    }
  },
  components:{
    gmp,
    FlyerView
  },
  firebase: {
    flyers: db.ref('flyers')
  }
}
</script>

