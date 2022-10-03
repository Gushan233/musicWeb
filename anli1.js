
var app=new Vue({
    el:'#player',
    data:{
        query:"洛天依",
        musicList:[],
        playUrl: '',
        musicid:'',
        musicimg:'',
        hotComments:[],
        mvShow:false,
        mvUrl:''
    },
    methods:{
        searchMusic:function(){
            var that=this;
            if(that.query!=''){
                axios.get('https://autumnfish.cn/search?keywords='+that.query).then(function(response){
                // console.log(response)
                console.log(response.data.result.songs)
                that.musicList=response.data.result.songs;
                })
                that.query=''
            }else{
                alert("请输入歌名或歌手名")
            }
            
            // .err(function(err){

            // })
        },
        playmusic:function(musicid){
            var that=this;
            console.log(musicid)
            axios.get("https://autumnfish.cn/song/url?id="+musicid)
            .then(function(response){
                console.log(response)
                that.playUrl= response.data.data[0].url
                // console.log(that.playUrl)
            },function(err){})

            axios.get("https://autumnfish.cn/song/detail?ids="+musicid)
            .then(function(response){
                // console.log(response)
                // console.log(response.data.songs[0].al.picUrl)
                that.musicimg=response.data.songs[0].al.picUrl
            },function(err){})

            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicid)
            .then(function(response){
                // console.log(response)
                // console.log(response.data.hotComments)
                that.hotComments=response.data.hotComments
            },function(err){})

            

        },
        playmv:function(mvid){
            var that =this
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
            .then(function(response){
                console.log(mvid)
                console.log(response.data.data.url)
                that.mvShow=true;
                that.mvUrl=response.data.data.url
            })
        },
        hide:function(){
            this.mvShow=false;
            this.mvUrl=''
        }

    }
})