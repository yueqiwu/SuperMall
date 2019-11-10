<template>
  <div class="comment" v-if="Object.keys(comment).length !== 0">
    <div class="title">
      <span>用户评价</span>
      <span><span class="more">更多</span><span class="arrow"></span></span>
    </div>
    <div class="content">
      <div class="info-user">
        <img :src="comment.user.avatar" alt="" class="user-avatar">
        <span>{{comment.user.uname}}</span>
      </div>
      <p class="rate">
        {{comment.content}}
      </p>
      <div class="other">
        <span>{{date}}</span>
        <span>{{comment.style}}</span>
      </div>
      <div class="imgs">
        <img v-for="(item,index) in comment.images" :src="item" alt="" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailComment",
  props:{
    comment:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    date(){
      let newDate = new Date(this.comment.created * 1000);
      let day = newDate.getDate();
      let _month = parseInt(newDate.getMonth()+1)
      let month = _month<10?'0'+_month:_month;
      let year = newDate.getFullYear();
      return `${year}-${month}-${day}`
    }
  },
}
</script>

<style scoped>
.comment{
  padding:5px 12px;
  border-bottom:5px solid #f2f5f8; 
}
.title{
  height:50px;
  display: flex;
  justify-content: space-between;
  align-items:center;
  border-bottom:1px solid #ddd;
}
.arrow{
  display: inline-block;
  width:10px;
  height:10px;
  border-top:1px solid #ddd;
  border-right:1px solid #ddd;
  transform: rotate(45deg)
}
.more{
  font-size:14px;
  margin-right:5px;
}
.content{
  padding:10px 5px 15px;
}
.info-user{
  height:60px;
  padding-bottom: 5px;
  display:flex;
  align-items:center;
}
.user-avatar{
  width:42px;
  height:42px;
  border-radius: 50%;
  margin-right:10px;
}
.info-user span{
  font-size: 14px;
}
.rate{
  line-height:1.5;
  font-size:14px;
  color:#777;
}
.other{
  color:#999;
  font-size: 14px;
  margin-top:10px;
}
.other span{
  margin-right:8px;
}
.imgs{
  margin-top:10px;
}
.imgs img{
  width:70px;
  height:70px;
  margin-right:5px;
}
</style>