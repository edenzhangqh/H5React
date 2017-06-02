/**
 * Created by boli on 2017/5/22.
 */
import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Adbanner from './adbanner';//广告位
import Sortby from './Sortby';//排序
import Item from '../component/item';//商品排序
import GoTop from '../component/GoTop';//返回顶部
import App from '../port/app';//所有接口
export  default  class Activity extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            item:{},
            pageSize:2,
            total:0,
            sortsActiveId:1,
            sorts:{},
            isLoadingMore: false,
            loadingEnd:false,
            isDesc:'',
            banner:{}
        }
    }
    //首次加载数据
    componentDidMount(){
       let id=this.props.params.id;
        this.initAJAX(id);
        //滚动加载更多
        let timeoutID;//设置timeout触发方法
        const loading=this.refs.loading;//获取需要加载时显示效果的div
        const callback=()=>{
            const top=loading.getBoundingClientRect().top;//用于获得页面中某个元素距离上相对浏览器视窗的位置。
            const windowHeight=window.screen.height;
            if(top && top<windowHeight){
                this.loadMore();
            }
        }
        window.addEventListener('scroll',()=>{//监听窗口的滚动事件
           if(this.state.isLoadingMore){
               return;//判断是否还有数据需要加载
           }
           if(timeoutID){
               clearTimeout(timeoutID)
           }
           timeoutID=setTimeout(callback,50);//50毫秒之后执行滚动
        })
    }
    initAJAX(id){
        let args="type="+id;
        fetch(App.activity,{
            method:'post',
            headers:{
                'Content-type':'application/x-www-form-urlencoded'
            },
            body:args
        })
            .then(res=>res.json())
            .then(json=>{
                this.setState({
                    item:json.data.items,
                    total:json.data.totalPage,
                    sorts:json.data.sorts,
                    banner:json.data.banner
                })
            })

    }
    loadMore(){
        let args="type="+this.props.params.id+"&sortId="+this.state.sortsActiveId+"&curPage="+this.state.pageSize+"&isDesc="+this.state.isDesc;
        this.setState({
            isLoadingMore:true
        })
        const page=this.state.pageSize
        if(page<=this.state.total){
            fetch(App.activity,{
                method:'post',
                headers:{
                    'Content-type':'application/x-www-form-urlencoded'
                },
                body:args
            })
                .then(res=>res.json())
                .then(json=>{
                    this.setState({
                        item:this.state.item.concat(json.data.items),
                        isLoadingMore:false
                    })
                })
            this.setState({
                pageSize:page+1
            })
        }else{
            this.setState({
                loadingEnd:true
            })
        }

    }
    SortBy(id,isDesc){
        //获取分类以及排序方式
        this.setState({
            isLoadingMore:true,
            loadingEnd:false,
            pageSize:1,
            sortsActiveId:id,
            isDesc:isDesc
        },()=>{//通过回调试立即执行setState里设置的参数
            let args="type="+this.props.params.id+"&sortId="+this.state.sortsActiveId+"&curPage="+this.state.pageSize+"&isDesc="+this.state.isDesc;
            fetch(App.activity,{
                method:'post',
                headers:{
                    'Content-type':'application/x-www-form-urlencoded'
                },
                body:args
            })
                .then(res=>res.json())
                .then(json=>{
                    this.setState({
                        item:json.data.items,
                        total:json.data.totalPage,
                        isLoadingMore:false,
                        pageSize:this.state.pageSize+1
                    })
                })
        })
    }
    render(){
        return(
            <div className="main-box">
                <GoTop/>
                <Adbanner banner={this.state.banner}/>
                <Sortby SortBy={this.SortBy.bind(this)} sorts={this.state.sorts} sortsActiveId={this.state.sortsActiveId}/>
                <div className="margin-t-10">
                    <Item item={this.state.item}/>
                </div>
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
}
