/**
 * Created by boli on 2017/5/26.
 */
import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactSwipe from 'react-swipe';
export default class Carousel extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            index: 0
        }
    }

    next() {
        this.refs.reactSwipe.next();
    }

    prev() {
        this.refs.reactSwipe.prev();
    }

    render() {
        var opt = {
            auto: false,
            stopPropagation:true,
            callback: (index) => {
                this.setState({index: index})
            }
        }
        let imageList,
            bannerdot;
        if (this.props.imageList.length) {
            imageList = this.props.imageList.map((item, i) => {
                return (
                    <li><img src={item + '_440x440.jpg'} alt=""/></li>

                )
            })
            bannerdot = this.props.imageList.map((item, i) => {
                if (this.props.imageList.length == 2) {
                    return (
                        <li key={"bannerdot" + i}
                            className={ i === this.state.index % 2 ? 'active' : ''}></li>/*length=2*/
                    )
                } else {
                    return (
                        <li key={"bannerdot" + i} className={ i === this.state.index ? 'active' : ''}></li>
                    )
                }
            })
        }
        return (
            <div className="scroller clearfix">
                <div className="coupon-box">
                    <p>领券减</p>
                    <p>30元</p>
                </div>
                <div className="slider-cont">
                    <ul>
                        <ReactSwipe ref="reactSwipe" className="carousel" key={this.props.imageList.length} swipeOptions={opt}>
                            {imageList}
                        </ReactSwipe>
                    </ul>
                </div>
                <div className="slider-size">
                    <ul>
                        {bannerdot}
                    </ul>
                </div>
                <div className="slider-option">
                    <div className="prev" onClick={this.prev.bind(this)}>
                        <svg viewBox="0 0 14 24" width="7" height="12" className="icon-slider">
                            <use xlinkHref="/static/Icon/icon.svg#svg-next"></use>
                        </svg>
                    </div>
                    <div className="next" onClick={this.next.bind(this)}>
                        <svg viewBox="0 0 14 24" width="7" height="12" className="icon-slider">
                            <use xlinkHref="/static/Icon/icon.svg#svg-next"></use>
                        </svg>
                    </div>
                </div>
            </div>
        )
    }
}