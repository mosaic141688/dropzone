<template>
  <div class="hello">
    <md-card>
      <md-card-header>
        <md-layout :md-gutter="8">
         <md-layout>
          <span @click="openDialog('name')" class="md-subhead">{{flyer.name}}<md-icon>edit</md-icon></span>
         </md-layout>
         <md-layout>
            <span class="md-subhead" @click="openDialog('count')">Total Flyers <md-chip>{{flyer.count}}<md-icon>add</md-icon></md-chip></span>
         </md-layout>
          <md-layout>
            <span class="md-subhead">Remainig Flyers <md-chip>{{flyer.count-pins}}</md-chip></span>
         </md-layout>
          <md-layout>
            <span class="md-subhead"><md-icon>map</md-icon>View on map</span>
         </md-layout>
        <md-layout>
            <span class="md-subhead"><md-switch v-model="flyer.enabled" @change="enable()" id="my-test1" name="my-test1" class="md-primary">{{flyer.enabled?'Enabled':'Disabled'}}</md-switch></span>
         </md-layout>
        <md-layout>
            <span class="md-subhead"><md-switch @change="lock()" v-model="flyer.locked" id="my-test1" name="my-test1" class="md-primary">{{flyer.locked?'Unlocked':'Locked'}}</md-switch></span>
         </md-layout>
            <md-layout>
            <span class="md-subhead" @click="openDialog('del')"><md-icon>delete</md-icon>delete flyer</span>
         </md-layout>
        </md-layout> 
      </md-card-header>
     </md-card>

    <md-dialog  md-open-from="#fab" md-close-to="#fab" ref="name">
      <md-dialog-title>Change Flyer Name</md-dialog-title>
        <md-dialog-content>
          <form>
            <md-subheader class="md-inset"> <span><md-icon>book</md-icon>Flyer Name</span></md-subheader>
            <md-layout class="" :md-gutter="80"  id="personal">
              <md-layout md-flex="40"  md-flex-offset="5">
                <md-input-container>
                  <label><span>Flyer Name</span></label>
                  <md-textarea v-model="name"></md-textarea>
                </md-input-container>
              </md-layout>
            </md-layout>
         </form>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click.native="closeDialog('name')">cancel</md-button>
          <md-button class="md-primary" @click.native="savePoll()">save</md-button>
      </md-dialog-actions>
    </md-dialog>


    <md-dialog  md-open-from="#fab" md-close-to="#fab" ref="count">
      <md-dialog-title>Add a Number of Flyers</md-dialog-title>
        <md-dialog-content>
          <form>
            <md-subheader class="md-inset"> <span><md-icon>book</md-icon>More Flyers</span></md-subheader>
            <md-layout class="" :md-gutter="80"  id="personal">
              <md-layout md-flex="40"  md-flex-offset="5">
                <md-input-container>
                  <label><span># of new Flyers</span></label>
                  <md-textarea v-model="count"></md-textarea>
                </md-input-container>
              </md-layout>
            </md-layout>
         </form>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click.native="closeDialog('count')">cancel</md-button>
          <md-button class="md-primary" @click.native="saveCount()">save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog  md-open-from="#fab" md-close-to="#fab" ref="del">
      <md-dialog-title>Are You sure you want to delete this flyer</md-dialog-title>
        <md-dialog-content>
          Once you click the delete button there will be no turning back
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click.native="closeDialog('del')">cancel</md-button>
          <md-button class="md-primary" @click.native="deleteFlyer()">Delete</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>

//import Firebase from 'firebase'
//Firebase.initializeApp()
//var db = Firebase().database();
console.log('Firebase',window.db);
var db = window.db;
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name:'',
      count:0,
      pin_ids:[],
      pins:0
    }
  },
  created:function(){
    this.name=this.flyer.name
    this.count=this.flyer.count
    window.db.ref('drops').on('value',v=>{
      var val = v.val()
      this.pin_ids=[]
      this.pins = 0
      for(var i in val){
        if(val[i].id==this.flyer['.key']){
          this.pins++
          this.pin_ids.push(i)
        }
      }
    })
  },
  props:{
    flyer:Object
  },
  methods:{
    closeDialog(ref){
      this.$refs[ref].close()
    },
    openDialog(ref) {
      this.$refs[ref].open()
    },
    savePoll(){
      window.db.ref('flyers/'+this.flyer['.key']+'/name').set(this.name)
      this.$refs['name'].close()
    },
    saveCount(){
      window.db.ref('flyers/'+this.flyer['.key']+'/count').set(Number(this.count)+Number(this.flyer.count))
      this.$refs['count'].close()
    },
    lock(){
     setTimeout(()=>window.db.ref('flyers/'+this.flyer['.key']+'/locked').set(this.flyer['locked']),100)
    },
    enable(){
      setTimeout(()=>window.db.ref('flyers/'+this.flyer['.key']+'/enabled').set(this.flyer['enabled']),100)
    },
    deleteFlyer(){
      for(i of this.pin_ids){
        window.db.ref('drops/'+i).set(null)
      }
      window.db.ref('flyers/'+this.flyer['.key']).set(null)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
