/**
 * Created by boli on 2017/5/22.
 */
import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import App from '../port/app';
import Searchbar from '../component/Search';//搜索
import Item from '../component/item';//产品列表
import GoTop from '../component/GoTop';//返回顶部
export default class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            item: {},
            cates: {},
            total: 0,
            keyWords: {},
            promotedItems: {},//相关推荐当item为空时
            pagesize: 2,
            isLoadingMore: false,
            loadingEnd: false,
        }
    }

    componentDidMount() {
        let keywords = this.props.params.keywords;
        this.initAJAX(keywords);
        let timeoutID;//设置timeout
        const loading = this.refs.loading;
        const callback = () => {
            const top = loading.getBoundingClientRect().top;
            const windowHeight = window.screen.height;
            if (top && top < windowHeight) {
                this.loadMore(keywords);
            }
        }
        window.addEventListener('scroll', () => {
            if (this.state.isLoadingMore) {
                return;
            }
            if (timeoutID) {
                clearTimeout(timeoutID)
            }
            timeoutID = setTimeout(callback, 5);
        })

    }

    //初始化加载数据
    initAJAX(keywords) {
        let args = "keyword=" + keywords;
        let result = fetch(App.search, {
            method: 'post',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: args
        });
        result.then(res => res.json())
            .then(json => {
                if (json.data.items.length) {
                    this.setState({
                        cates: json.data.cates,
                        item: json.data.items,
                        total: json.data.totalPage,
                        keyWords: json.data.keyWords,
                        promotedItems: json.data.promotedItems,
                        isLoadingMore: false,
                        loadingEnd: false
                    })
                }else{
                    this.setState({
                        cates: json.data.cates,
                        item: json.data.items,
                        total: 0,
                        keyWords: json.data.keyWords,
                        promotedItems: json.data.promotedItems,
                        isLoadingMore: false,
                        loadingEnd: false
                    })
                }

            })

    }

    //加载更多数据
    loadMore(keywords) {
        this.setState({
            isLoadingMore: true
        });
        const page = this.state.pagesize;//获取当前加载页数
        let args = "keyword=" + keywords + "&curPage=" + this.state.pagesize;
        if (this.state.pagesize <= this.state.total) {
            let result = fetch(App.search, {
                method: 'post',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                body: args
            });
            result.then(res => res.json())
                .then(json => {
                    this.setState({
                        item: this.state.item.concat(json.data.items),
                        isLoadingMore: false
                    })

                })
            this.setState({
                pagesize: page + 1
            })
        } else {
            this.setState({
                loadingEnd: true
            })
        }
    }

    render() {
        return (
            <div>
                <GoTop/>
                <Searchbar keyWords={this.state.keyWords} cates={this.state.cates}/>
                <div className="main-box">
                    {
                        this.state.item.length > 0
                            ?
                            <Item item={this.state.item}/>
                            :
                            <div>
                                <div className="search-empty">
                                    <div className="line"></div>
                                    <p className="text-box">没有相关宝贝 为您推荐</p></div>
                                <Item item={this.state.promotedItems}/>
                            </div>

                    }

                    {
                        this.state.isLoadingMore
                            ?
                            <div className="load-more-wrap"></div>
                            :
                            <div className="loading-img" ref="loading"><img src="/static/img/waitgif.gif" alt=""/></div>
                    }

                    {/*判断是否加载完必*/}
                    {
                        this.state.loadingEnd
                            ?
                            <div className="loading" id="loadmore">
                                <div className="line"></div>
                                <p className="text-box">没有更多宝贝啦</p></div>
                            : ''
                    }
                </div>
            </div>
        )
    }
}