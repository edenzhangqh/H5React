/**
 * Created by boli on 2017/5/22.
 */
import React,{Component} from 'react';
import PureRednerMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';

export default class intros extends React.Component {
    constructor(props,context){
        super(props,context)
        this.shouldComponentUpdate=PureRednerMixin.shouldComponentUpdate.bind(this)
    }
    render(){
        let intros;
        if(this.props.intros.length){
            intros=this.props.intros.map((item,i)=>{
                return(
                    <li key={"intros"+i}><Link to={item.link}><img src={item.image}/></Link></li>
                )
            })
        }

        return(
            <div className="banner-category">
                <ul>
                    {intros}
                </ul>
            </div>
        )
    }
}