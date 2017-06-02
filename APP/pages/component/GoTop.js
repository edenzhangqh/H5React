/**
 * Created by boli on 2017/5/31.
 */
import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';
export default class GoTop extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            top:false
        }
    }
    goToTop(){
        var TopH=document.body.scrollTop;
        var top;
        top=setInterval(()=>{
            if(TopH>0){
                TopH=TopH-50;
                document.body.scrollTop=TopH;
            }
            else{
                clearInterval(top);
            }
        },5)
    }
    componentDidMount(){
        window.addEventListener('scroll',()=>{
            if(document.body.scrollTop>550){
                if(!this.state.top){
                    this.setState({
                        top:true
                    })
                }

            }else{
                if(this.state.top){
                    this.setState({
                        top:false
                    })
                }

            }
        })
    }
    render() {
        return (
            <div>
                <div className={this.state.top?'go-top':'go-top hide'} onClick={this.goToTop.bind(this)}>
                    <svg viewBox="0 0 100 100" width="50" height="50" className="item-goTop">
                        <use xlinkHref="/static/Icon/icon.svg#svg-top"></use>
                    </svg>
                </div>
                <div className={this.state.top?'nav-pendant hide':'nav-pendant'}>
                    <Link to={"/"}>
                        <svg viewBox="0 0 100 100" width="50" height="50">
                            <use xlinkHref="/static/Icon/icon.svg#svg-home"></use>
                        </svg>
                    </Link>
                </div>
            </div>
        )
    }
}