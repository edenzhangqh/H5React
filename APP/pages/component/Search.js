/**
 * Created by boli on 2017/5/26.
 */
import React, {Component} from 'react';
import PureRenderMixin from  'react-addons-pure-render-mixin';
import {Link} from 'react-router';
import { createHashHistory } from 'history'
const history = createHashHistory()
export default class Search extends React.Component {
    constructor(props,context){
        super(props,context);
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            searchShow:false,
            closeShow:false
        }
    }
    searchFocus(){
        this.setState({
            searchShow:true
        })
    }
    SearchHide(){
        this.setState({
            searchShow:false
        })
    }
    searchEnter(e){
        let val=encodeURI(this.refs.searchInput.value)
       if(e.keyCode===13){
           history.push( '/search/'+val)
       }
    }
    search(){}
    render() {
        let keyWords,
            cates;
        if(this.props.keyWords.length){
            keyWords=this.props.keyWords.map((item,i)=>{
                return(
                    <li key={"keyword"+i}><Link to={"/search/"+encodeURI(item)}>{item}</Link></li>
                )
            })
        }
        if(this.props.cates.length){
            cates=this.props.cates.map((item,i)=>{
                return(
                    <li><Link to={"/index/"+item.id}>{item.name}</Link></li>
                )
            })
        }
        return (
            <div className="search-box">
                <div className="search-top">
                    <div className="title"><Link to={"/"}>更多优惠</Link></div>
                        <div className="search-form">
                            <input className="search-input" type="text" ref="searchInput" onFocus={this.searchFocus.bind(this)} onKeyUp={this.searchEnter.bind(this)} placeholder=""/>
                            <div className="icon-box">
                            <span className={this.state.closeShow?'search-close':'search-close hide'}>
                                <svg viewBox="0 0 24 24" width="12" height="12">
                                    <use xlinkHref="/static/Icon/icon.svg#svg-close"></use>
                                </svg>
                            </span>
                            <span className="ico-search" onClick={this.search.bind(this)}>
                                <svg viewBox="0 0 23 23" width="12" height="12">
                                    <use xlinkHref="/static/Icon/icon.svg#svg-search"></use>
                                </svg>
                            </span>
                         </div>
                    </div>
                </div>
                <div className={this.state.searchShow?'search-content opacity transition-opacity-s':'search-content hide'}>
                    <div className="sc-list">
                        <ul>
                            {cates}
                        </ul>
                    </div>
                    <div className="sc-menu-item">
                        <div className="title">热门搜索</div>
                        <ul className="menu-list clearfix">
                            {keyWords}
                        </ul>
                    </div>
                </div>
                <div className={this.state.searchShow?'search-layer opacity transition-opacity':'search-layer hide'} onClick={this.SearchHide.bind(this)}></div>
            </div>
        )
    }
}