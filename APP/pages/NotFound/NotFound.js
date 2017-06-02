/**
 * Created by boli on 2017/6/1.
 */
import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
export default class NotFound extends  React.Component{
    constructor(props,context){
        super(props,context);
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        return(
            <div>404页面</div>
        )
    }
}