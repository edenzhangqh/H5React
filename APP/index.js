/**
 * Created by boli on 2017/5/18.
 */
import 'babel-polyfill';
import 'es6-promise';
import 'es5-shim';
import 'es5-shim/es5-sham';
import React,{Component} from 'react';
import {render} from 'react-dom';
import {Router,hashHistory} from 'react-router';
import router from './routers/index';//路由配置
import '../static/css/index.css';
import 'whatwg-fetch';
export default class Main extends React.Component{
    render(){
        return(
            <Router history={hashHistory}>
                {router}
            </Router>
        )
    }
}
render(
    <Main/>,document.getElementById('app')
)