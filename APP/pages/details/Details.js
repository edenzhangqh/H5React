/**
 * Created by boli on 2017/5/22.
 */
import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Carousel from './Carousel';//轮播图
import ShopBtn from './ShopBtn';//购买区域
import Search from '../component/Search';//搜索
import Detailinfo from './Detailinfo';//基本信息
import Description from './description';//详情
import DetailItem from '../component/DetailItem';//类似推荐
import APP from '../port/app';//公共接口
import device from '../component/device';//判断终端
const iswx=device.isWeiXin();
const devicetype=device.browser();
export  default  class detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state= {
            cates: {},
            keyWords: {},
            mainItem: {},
            promotedList: {},
            slidingWords: {},
            imageList: [],
            dImageList:[],
            dialogShow:false,
            iswx:iswx,
            iscopy:false
        }

    }
    dialogShow(){
      this.setState({
          dialogShow:true
      })
    }
    closeDialog(){
        this.setState({
            dialogShow:false
        })
    }
    componentDidMount() {
        this.setState({
            iscopy:true
        })
        document.body.scrollTop=0;
        let self = this;
        let id = self.props.params.id;
        let args = "id=" + id;
        let result = fetch(APP.detail, {
            method: "post",
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: args
        })
        result.then(res => res.json())
              .then(json => {
                 this.setState({
                     cates:json.data.cates,
                     keyWords:json.data.keyWords,
                     mainItem:json.data.mainItem,
                     promotedList:json.data.promotedList,
                     slidingWords:json.data.slidingWords,
                     imageList:json.data.mainItem.imageList,
                     dImageList:json.data.mainItem.dImageList
                 });
            })
        //复制淘口令

        if(devicetype==0){
            document.addEventListener("selectionchange",(e)=>{
               if(document.getElementById('copy-select')!=null){
                    if (document.getElementById('copy-select').innerText != window.getSelection()) {
                        var key = document.getElementById('copy-select');
                        window.getSelection().selectAllChildren(key);
                    }
               }
            });
        }
    }
    render() {
        return (
            <div>
                <Search keyWords={this.state.keyWords} cates={this.state.cates}/>
                <ShopBtn iswx={this.state.iswx} mainItem={this.state.mainItem} dialogShow={this.dialogShow.bind(this)}/>
                <div className="main-box">
                    <div className="detail-main">
                        <Carousel imageList={this.state.imageList}/>
                        <Detailinfo mainItem={this.state.mainItem}/>
                        <Description dImageList={this.state.dImageList}/>
                        <DetailItem promotedList={this.state.promotedList}/>
                    </div>
                </div>
                <div className={this.state.dialogShow?'dialog-layer opacity transition-opacity':'dialog-layer hide'} onClick={this.closeDialog.bind(this)}></div>
                <div className={this.state.dialogShow?'dialog dialog-taoCode opacity transition-opacity-s':'dialog dialog-taoCode hide'}>
                    <svg viewBox="0 0 76 76" width="38" height="38" className="close-dialog" onClick={this.closeDialog.bind(this)}>
                        <use  xlinkHref="/static/Icon/icon.svg#svg-close-dialog"></use>
                    </svg>
                    <div className="title title-primary">淘口令购买</div>
                    <div className="dialog-content">
                        <div className="code-box">
                            <p className="tip"><span>长按框内>全选>复制</span></p>
                            <div className="copy-select" id="copy-select">{this.state.mainItem.taoCode}</div>
                        </div>
                        <div className="explain-box">
                            <p>使用说明：复制淘口令后打开【手机淘宝】即可领取 优惠券购买！</p>
                            <p>温馨提示：手机无【手机淘宝】者，可选择浏览器购买方式哦！</p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

