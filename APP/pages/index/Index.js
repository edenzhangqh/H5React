/**
 * Created by boli on 2017/5/22.
 */
import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Banner from './banner';
import Intros from './intros';//广告
import Cates from './cates';//导航
import Item from '../component/item';//所有产品列表
import GoTop from '../component/GoTop';//返回顶部
import App from '../port/app';//所有接口


export  default  class  Index extends React.Component{
    constructor(props,context){
        super(props,context);
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            banner:{},
            intros:{},
            cates:{},
            catesId:0,
            item:{},
            pagesize: 2,
            total: "",
            isLoadingMore: false,
            loadingEnd:false,
            fixedNav:false,
            scrollTop:0,
            startX:0
        }
    }
    render(){
        return(
            <div>
                <GoTop/>
                <Banner banner={this.state.banner}/>
                <Intros intros={this.state.intros}/>
                <Cates startX={this.state.startX} cates={this.state.cates} catesId={this.state.catesId} tabDataAjax={this.tabDataAjax.bind(this)}/>
                <Item item={this.state.item}/>
                {
                    this.state.isLoadingMore ? <div className="load-more-wrap"></div> :  <div className="loading-img" ref="loading"><img src="/static/img/waitgif.gif" alt=""/></div>
                }

                {/*判断是否加载完必*/}
                {
                    this.state.loadingEnd?<div className="loading" id="loadmore"><div className="line"></div><p className="text-box">没有更多宝贝啦</p></div>:''
                }
            </div>
        )
    }
    componentWillMount(){
        ////根据获取ID进行分类
        let catesId=parseInt(this.props.params.id)
        if(catesId!=null && catesId>4){
            let startX=-(catesId-1)*58;
            this.setState({
                startX:startX,
            })
        }else{
            catesId=0;
        }
        this.setState({
            catesId:catesId
        });
    }
    componentDidMount(){
        //首页加载
        this.initAJAX(this.state.catesId);
        //添加滚动加载
        let timeoutID;//设置timeout
        const loading=this.refs.loading;
        const callback=()=>{
            const top=loading.getBoundingClientRect().top;
            const windowHeight=window.screen.height;
            if(top && top< windowHeight){
                this.loadMore();
            }
        }
        const category=document.getElementsByClassName('nav-primary')[0].offsetTop-40;
        this.setState({
            scrollTop:category
        })
        window.addEventListener('scroll',()=>{
            let scrollTop=document.body.scrollTop;
            if(scrollTop>=category && document.getElementsByClassName('nav-primary')[0]){

                document.getElementsByClassName('nav-primary')[0].className="nav-primary fixedNav"
            }else if(document.getElementsByClassName('nav-primary')[0]){
                document.getElementsByClassName('nav-primary')[0].className="nav-primary"
            }
            if(this.state.isLoadingMore){
                return;
            }
            if(timeoutID){
                clearTimeout(timeoutID)
            }
            timeoutID=setTimeout(callback,5);
        });

    }
    tabDataAjax(id){
        //点击之后重置加载更多 加载完成 分页数
        document.body.scrollTop=this.state.scrollTop;
        this.setState(
           Object.assign({},{
               isLoadingMore:true,
               loadingEnd:false,
               pagesize:1,
               catesId:id
           }),()=>{
               //通过回调获取ID
                let args="c="+id+"&p="+this.state.pagesize;
                let result=fetch(App.home,{
                    method:'post',
                    headers:{
                        'Content-type':'application/x-www-form-urlencoded'
                    },
                    body:args
                })
                result.then(res=>res.json())
                    .then(json=>{
                        this.setState({
                            item:json.data.items,
                            total:json.data.counts,
                            isLoadingMore: false,
                            pagesize:this.state.pagesize+1
                        })
                    })

            }
        )


    }
    loadMore(){
        this.setState({
            isLoadingMore:true
        });
        const page=this.state.pagesize;//获取当前加载页数
        let args="c="+this.state.catesId+"&p="+this.state.pagesize;
        if(this.state.pagesize<=this.state.total){
            let result = fetch(App.home, {
                method: 'post',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                body: args
            });
            result.then(res => res.json())
                .then(json => {
                    this.setState({
                        item: this.state.item.concat(json.data.items),
                        isLoadingMore: false
                    })

                })
            this.setState({
                pagesize: page + 1
            })
        }else{
            this.setState({
                loadingEnd:true
            })
        }

    }
    initAJAX(id){
        let args="c="+id;
        let result=fetch(App.home,{
            method:'post',
            headers:{
                'Content-type':'application/x-www-form-urlencoded'
            },
            body:args
        })
        result.then(res=>res.json())
            .then(json=>{
                this.setState({
                    banner:json.data.banners,
                    intros:json.data.intros,
                    cates:json.data.cates,
                    item:json.data.items,
                    total:json.data.counts
                })
            })
    }
}