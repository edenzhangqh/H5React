/**
 * Created by boli on 2017/5/26.
 */
import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
export default class Detailinfo extends React.Component{
    constructor(props,context){
        super(props,context);
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    itemType(itemType){
        if(itemType==1){
            return(
                <svg viewBox="0 0 34 34" width="17" height="17" className="item-icon">
                    <use xlinkHref="/static/Icon/icon.svg#svg-tmall"></use>
                </svg>
            )

        }else if(itemType==2){
            return(
                <svg viewBox="0 0 34 34" width="17" height="17" className="item-icon">
                    <use xlinkHref="/static/Icon/icon.svg#svg-taobao"></use>
                </svg>
            )
        }
        else if(itemType==3){
            return(
                <svg viewBox="0 0 34 34" width="17" height="17" className="item-icon">
                    <use xlinkHref="/static/Icon/icon.svg#svg-jd"></use>
                </svg>
            )
        }
        else if(itemType==4){
            return(
                <svg viewBox="0 0 34 34" width="17" height="17" className="item-icon">
                    <use xlinkHref="/static/Icon/icon.svg#svg-kl"></use>
                </svg>
            )
        }
    }
    render(){
        return(
            <div className="detail-box clearfix">
                <div className="title-box">
                    <h2 className="title">
                        {this.itemType(this.props.mainItem.type)}
                        {this.props.mainItem.title}</h2>
                </div>
                <div className="price-box clearfix">
                    <div className="price"><span>券后价 : </span><span className="rmb">&yen;</span>{this.props.mainItem.price}</div>
                   {this.props.mainItem.quantity>0 ? <div className="sale-box">已售<span>10</span>件</div>:<div className="sale-box">限量抢购</div>}
                </div>
            </div>
        )
    }
}