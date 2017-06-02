/**
 * Created by boli on 2017/5/22.
 */
import React,{Component} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
export default class APP extends React.Component{
    render(){
        return(
            <CSSTransitionGroup
                component="div"
                transitionName="main"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                <div className="position" key={ this.props.location.pathname}>{this.props.children}</div>
            </CSSTransitionGroup>
        )
    }
}