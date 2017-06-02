/**
 * Created by boli on 2017/5/22.
 */
import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
export default class cates extends React.Component{
    constructor(props,context){
        super(props,context)
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            catesId:this.props.catesId
        }
    }
    clickTab(id){
        this.setState({
            catesId:id
        });
        //点击滚动
        /*let scrollL=-100;
        this.refs.iScroll.withIScroll((iScroll)=>{
            iScroll.scrollTo(scrollL,0)
        })*/
        event.preventDefault();
        this.props.tabDataAjax(id);
    }

    render(){
        let nav=[];
        let iScrollOptions={
                momentum:true,
                preventDefault:false,
                mouseWheel: true,
                scrollbars: false,
                scrollX: true,
                startX:this.props.startX
            }
        if(this.props.cates.length){
            nav=this.props.cates.map((item,i)=>{
               return(
                   <li key={"cate"+i}><a href="javascript:;" className={this.state.catesId==item.id?'router-link-active':''} onClick={this.clickTab.bind(this,item.id)}>{item.name}</a></li>
               )
            })
        }
        return(
            <div className="nav-primary" ref="category">
                <div>
                    <ReactIScroll ref="iScroll" iScroll={iScroll} options={iScrollOptions}>
                    <ul className="clearfix" style={{width:"760px"}}>
                        {nav}
                    </ul>
                    </ReactIScroll>
                </div>
            </div>
        )
    }

}
