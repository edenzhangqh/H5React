/**
 * Created by boli on 2017/5/26.
 */
import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';
import LazyLoad from 'react-lazyload';
export default  class DetailItem extends React.Component{
    constructor(props,context){
        super(props,context);
        this.shuoldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this)
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
        let promotedList;
        if(this.props.promotedList.length){
            promotedList=this.props.promotedList.map((item,i)=>{
                return(
                    <li>
                        <div className="product-warp">
                            <div className="item-img">
                                <Link to={'/details/'+item.id}>
                                    <LazyLoad height={100}  placeholder={<img src="/static/img/loading.gif"/>}>
                                    <img alt="" src={item.image+'_200x200.jpg'}/>
                                    </LazyLoad>
                                </Link>
                                <div className="coupon-area">
                                    <p>领券减</p>
                                    <p>{item.quanMoney}</p>
                                </div>
                            </div>
                            <p className="item-title two-lines">
                                {item.title}
                                {this.itemType(item.type)}
                            </p>
                            <div className="item-box clearfix">
                                <p className="item-price fl"><span className="coupon-box">券后价 : </span><span>&yen;</span>{item.price}</p>
                                {item.quantity>0 ? <p className="sale-num fr">已售<span>{item.quantity}</span>件</p>:<p className="sale-num fr">限量抢购</p>}
                            </div>
                        </div>
                    </li>
                )
            })
        }
        return (
            <div>
                <div className="recommend">
                    <p className="line"></p>
                    <div className="text-box">类似推荐</div>
                </div>
                <div className="product-box">
                    <ul className="clearfix">
                        {promotedList}
                    </ul>
                </div>
                <div className="loading">
                    <div className="line"></div>
                    <p className="text-box">没有更多宝贝啦</p>
                </div>
            </div>
        )
    }
}