/**
 * Created by boli on 2017/5/31.
 */
import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
export default  class Sortby extends React.Component{
    constructor(props,context){
        super(props,context);
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            sortsActiveId:this.props.sortsActiveId,
            descType:false,
            ascType:false,
            sales:false
        }
    }
    liClassName(id){
        let active='',
            down='',
            up='',
            sales='';
        if(id==this.state.sortsActiveId){
            active='active'
        }
        if(this.state.descType){
            down='down'
        }
        if(this.state.ascType){
            up='up'
        }
        if(id==3){
            sales='sales'
        }
        return active+' '+down+' '+up+' '+sales;
    }
    SortByFun(id){
        let isDesc;//传到父组件用于ajax接收排序方式
        if(id===3){
            isDesc=1
        }else if(this.state.sortsActiveId==id){
            if(this.state.ascType){
                this.setState({
                    ascType:false,
                    descType:true
                })
                isDesc=1
            }else{
                this.setState({
                    ascType:true,
                    descType:false
                })
                isDesc=0
            }
        }else{
            this.setState({
                ascType:true,
                descType:false
            })
            isDesc=0
        }
        this.setState({
            sortsActiveId:id
        })
        this.props.SortBy(id,isDesc);
    }
    render(){
        let sortList;
        if(this.props.sorts.length){
            sortList=this.props.sorts.map((item,i)=>{
                return(
                    <li className={this.liClassName(item.id)} onClick={this.SortByFun.bind(this,item.id)}>
                        <a href="javascript:;">{item.name}</a>
                        {item.id!=1 && item.id!=3
                            ?
                            <div className="condition-box">
                                <div className="triangle-box">
                                    <svg viewBox="0 0 18 9" width="9" className="ico-sort triangle-up">
                                        <use xlinkHref="/static/Icon/icon.svg#svg-triangle"></use>
                                    </svg>
                                    <svg viewBox="0 0 18 9" width="9"  className="ico-sort triangle-down">
                                        <use xlinkHref="/static/Icon/icon.svg#svg-triangle"></use>
                                    </svg>
                                </div>
                            </div>
                            :''
                        }
                        {item.id==3
                            ?
                            <div className="condition-box">
                                <svg viewBox="0 0 18 18" width="9" height="9" className="ico-sort">
                                    <use xlinkHref="/static/Icon/icon.svg#svg-sales"></use>
                                </svg>
                            </div>
                            :''
                        }

                    </li>
                )
            })
        }
        return(
            <div className="sort-nav nav-solid">
                <ul>
                    {sortList}
                </ul>
            </div>
        )
    }
}
