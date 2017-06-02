/**
 * Created by boli on 2017/5/26.
 */
import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';
export  default  class ShopBtn extends React.Component{
    constructor(props,context){
        super(props,context);
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render(){
        return(
            <div className="bottom_bar">
                <Link className="btn btn-link"to="/">
                     <svg viewBox="0 0 32 32" width="20" height="20" className="icon-home-mini">
                        <use xlinkHref="/static/Icon/icon.svg#svg-home-mini"></use>
                    </svg>更多秒杀
                </Link>
                {
                    this.props.iswx
                        ?
                        <a href={'/page-'+this.props.mainItem.id} className="btn btn-warning" >浏览器购买</a>
                        :
                        <a href={this.props.mainItem.link} target="_blank" className="btn btn-warning" >直接购买</a>
                }
                <button className="btn btn-primary" type="button" onClick={this.props.dialogShow}>淘口令购买</button>
            </div>
        )
    }
}
