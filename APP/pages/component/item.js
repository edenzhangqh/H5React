/**
 * Created by boli on 2017/5/24.
 */
import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router'
import LazyLoad from 'react-lazyload';
export default class item extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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

    render() {
        let itemList = '';
        if (this.props.item.length) {
            itemList = this.props.item.map((item, i) => {
                return (
                    <li key={"item"+i}>
                        <Link to={'/details/'+item.id}>
                            <div className="product-item">
                                <div className="item-img">
                                    <LazyLoad  height={100} placeholder={<img src="/static/img/loading.gif"/>}>
                                    <img alt="" src={item.image+"_200x200.jpg"}/>
                                    </LazyLoad>
                                </div>
                                <div className="item-content">
                                    <p className="item-title">
                                            {this.itemType(item.type)}
                                            {item.title}
                                    </p>
                                    <div className="item-price">
                                        券后价 : <span className="yen">&yen;</span><span className="coupon-price">{item.price}</span>
                                    </div>
                                    <div className="item-box clearfix">
                                        <p className="item-label">包邮</p>
                                        <p className="item-label">已售{item.quantity}件</p>
                                    </div>
                                    <div className="coupon-area"><span className="icon-coupon-left"></span>
                                        <span href="javascript:;" className="btn-coupon">领券立省 ¥<span
                                            className="price">{item.quanMoney}</span></span>
                                        <span className="triangle"></span>
                                        <span href="javascript:;" className="btn-buy">立即抢购</span>
                                        <span className="icon-coupon-right"></span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                )
            })
        }
        return (
            <div className="product-items">
                <ul className="clearfix">
                    {itemList}
                </ul>
            </div>
        )
    }

}