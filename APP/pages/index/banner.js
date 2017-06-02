/**
 * Created by boli on 2017/5/22.
 */
import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';
import ReactSwipe from 'react-swipe';
export default class banner extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            index:0
        }
    }

    render() {
        var opt={
            auto:5000,
            callback:(index)=>{
                this.setState({index:index})
            }
        }
        let bannerImg,
            bannerdot;

        if(this.props.banner.length){
             bannerImg=this.props.banner.map((item,i)=>{
                 return(
                     <li key={"bannerimg"+i}><Link to={item.link}><img src={item.image} alt=""/></Link></li>
                 )
             })
            bannerdot=this.props.banner.map((item,i)=>{
                if(this.props.banner.length==2){
                    return(
                        <li key={"bannerdot"+i} className={ i===this.state.index%2 ? 'active':''}></li>/*length=2*/
                    )
                }else{
                    return(
                        <li key={"bannerdot"+i} className={ i===this.state.index ? 'active':''}></li>
                    )
                }
            })
        }
        return(
            <div className="page-banner">
                <ul className="banner-box">
                <ReactSwipe className="carousel" key={this.props.banner.length} swipeOptions={opt}>
                    {bannerImg}
                </ReactSwipe>
                </ul>
                <div className="pointer-warp">
                    <ul className="pointer-box">
                        {bannerdot}
                    </ul>
                </div>
            </div>
        )
    }

    }