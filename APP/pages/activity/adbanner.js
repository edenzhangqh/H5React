/**
 * Created by boli on 2017/5/31.
 */
import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
export default class adbanner extends React.Component{
    constructor(props,context){
        super(props,context)
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        return(
            <div className="common-banner">
                <ul className="banner-box">
                    <li><img src={this.props.banner.image} alt=""/></li>
                </ul>
            </div>
        )
    }
}
