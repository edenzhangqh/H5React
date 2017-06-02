/**
 * Created by boli on 2017/5/26.
 */
import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import LazyLoad from 'react-lazyload'
export default class description extends React.Component{
    constructor(props,context){
        super(props,context)
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            descShow:false
        }
    }
    showDescription(){
        if(this.state.descShow){
            this.setState({
                descShow:false
            })
        }else{
            this.setState({
                descShow:true
            })
        }

    }
    render(){
        let dImageList;
        if(this.props.dImageList.length){
            dImageList=this.props.dImageList.map((item,i)=>{
                return(
                        <LazyLoad placeholder={<img src="/static/img/loading.gif"/>}>
                            <img src={item}/>
                        </LazyLoad>
                )
            })
        }
        return(
            <div className="product-detail">
                <div className={this.state.descShow?'title':'title up'} onClick={this.showDescription.bind(this)}>商品详情图（点击收起）
                    <svg viewBox="0 0 12 12" width="10" height="10" className="icon-double-arrow">
                        <use  xlinkHref="/static/Icon/icon.svg#svg-double-arrow"></use>
                    </svg>
                </div>
                <div className={this.state.descShow?'desc':'desc hide'}>
                    {dImageList}
                </div>
            </div>
        )
    }
}