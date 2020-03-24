new Vue({
  el: '#app',
  data:{
      saitamaHealth: 100,
      gokuHealth: 100,
      saitamaMana:50,
      gokuMana:50,
      isRunningGame: false,
      turn: [
        {isSai: false},
        {content: null}
      ],
      saitamaSkills: ['đấm thường', 'liên hoàn đấm', 'húc đầu nghiêm túc'],
      gokuSkills:['cắn', 'chưởng khí', 'đá liên hoàn']
  },
  methods:{
    startGame: function(){
      this.saitamaHealth=100;
      this.gokuHealth=100;
      this.saitamaMana=50;
      this.gokuMana=50;
      this.isRunningGame=true;
    },
    actack: function(){
      
      this.saiActack(9,6);
      if(this.gokuMana>=50){
        this.gkActack(15,8);
        this.gokuMana=0;
      }
      else{
        this.gkActack(13,10);
      }
    },
    gkActack :function(maxDamageGoku,minDamageGoku){
      //goku
      var damageGoku=this.caculation(maxDamageGoku,minDamageGoku)
      this.saitamaHealth-=damageGoku;
      this.saitamaMana=Math.min(damageGoku+this.saitamaMana,50);
    },
    saiActack: function(maxDamageSai,minDamageSai){
      //saitama
      var damegeSai=this.caculation(maxDamageSai,minDamageSai);
      this.gokuHealth-=damegeSai;
      this.gokuMana=Math.min(damegeSai+this.gokuMana,50);
    },
    caculation: function(max, min){
      return Math.floor(min+ Math.random()*(max-min+1));
    },
    specialAttack: function(){
      var maxDamageSai=20;
      var minDamageSai=10;
      var maxDamageGoku=15;
      var minDamageGoku=8;
      //saitama
      if(this.saitamaMana!=50){
        alert('Bạn Không đủ Mana!!')
      }
      else{
        this.saitamaMana=0;
        this.saiActack(maxDamageSai,minDamageSai);
        
        //gokuMana
        if(this.gokuMana==50){
          this.gokuMana=0;
          this.gkActack(maxDamageGoku,minDamageGoku);
        }
        else{
          this.gkActack(13,10);
        }
      }
    },
    heal :function(){
      if(this.saitamaHealth>=100){
        alert("Your Health Is FUll");
      }
      else{
        if(this.saitamaMana>=5){
          var amountHeal=this.caculation(6,4);
          var tempt=this.saitamaHealth;
          this.saitamaHealth=Math.min(this.saitamaHealth+amountHeal,100);
          this.turn.unshift({
            content: 'Bạn đã hồi ' +(this.saitamaHealth-tempt)+' máu',
            isSai:true
          });
          this.saitamaMana-=5;
          if(this.gokuMana+15>=50){
            this.gokuMana=0;
            this.gkActack(15,8);
          }
          else{
            this.gokuMana+=15;
          }
        }
      }
      
    },
    giveUp: function(){
      var xacNhan= confirm('Do you want to give up ?');
      if(xacNhan==true)
        this.isRunningGame=false;

    }
  },
  watch:{
    saitamaHealth:function(newValue, oldValue){
      if(newValue<=0){
        alert('You lose');
        this.isRunningGame=false;
      }
      else{
        if(newValue<oldValue){
          this.turn.unshift({
            content: 'Goku đã '+this.gokuSkills[Math.floor(Math.random()*3)]+' Bạn',
            isSai:false
          }); 
        }
       
      }
    },
    gokuHealth:function(newValue,oldValue){
      if(newValue<=0){
        alert('You win');
        this.isRunningGame=false;
      }
      else{
        if(newValue<oldValue){
          this.turn.unshift({
            content: 'Bạn đã '+this.saitamaSkills[Math.floor(Math.random()*3)]+' Goku',
            isSai:true
          });
        }
        
      }
    },
    isRunningGame: function(newValue){
      if(newValue==false){
        this.turn=[];
      }
    }
  }
});