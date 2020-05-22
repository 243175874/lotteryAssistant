import React, { Component } from "react";
import { post } from '../../fetch/post.js'
import Common from '../../assets/js/common'
import { asyncComponent } from 'react-async-component';
//北京赛车
const BeiJingRacing = asyncComponent({ name: "BeiJingRacing", resolve: () => import('./lotteryTypePage/beiJingRacing') });
//重庆时时彩
const ChongQingOftenLottery = asyncComponent({ name: "ChongQingOftenLottery", resolve: () => import('./lotteryTypePage/chongQingOftenLottery') });
//新疆时时彩,天津时时彩
const OftenLottery = asyncComponent({ name: "OftenLottery", resolve: () => import('./lotteryTypePage/oftenLottery') });
//江苏快3，广西快3，安徽快3，北京快3，湖北快3，河北快3
const QuicklyThree = asyncComponent({ name: "QuicklyThree", resolve: () => import('./lotteryTypePage/quicklyThree') });
//湖南快乐十分，幸运农场，广东快乐十分，天津快乐十分
const HappyTenPoints = asyncComponent({ name: "HappyTenPoints", resolve: () => import('./lotteryTypePage/happyTenPoints') });
//江西11选5,广东11选5，11运夺金
const ElevenFive = asyncComponent({ name: "ElevenFive", resolve: () => import('./lotteryTypePage/elevenFive') });
//福彩3D,排列3D
const WelfareLottery = asyncComponent({ name: "WelfareLottery", resolve: () => import('./lotteryTypePage/welfareLottery') });
//加拿大28,PC蛋蛋
const Canada28 = asyncComponent({ name: "Canada28", resolve: () => import('./lotteryTypePage/canada28') });

import { connect } from 'react-redux'
import { setCurrentLotteryName, setCurrentLotteryId, setCurrentLotteryType } from '../../redux/action'
@connect(
    state => ({ currentLotteryName: state.currentLotteryName, currentLotteryId: state.currentLotteryId, currentLotteryType: state.currentLotteryType }),
    { setCurrentLotteryName, setCurrentLotteryId, setCurrentLotteryType }
)
export default class LotteryIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowTitleTable: false,
            //标题列表
            titleList: [],
        };
    }

    componentWillMount() {
        //调用接口初始化所有彩种选项卡
        this.getLotteryData();
    }

    //找到彩票列表数据
    getLotteryData() {
        let list = Common.getAllLotteryMenu();
        this.setState({ titleList: list });
    }

    //选中当前彩种绑定数据
    selectTitle(name, id, type) {
        //存入redux
        this.props.setCurrentLotteryName(name);
        this.props.setCurrentLotteryId(id);
        //把彩种类型存入redux
        this.props.setCurrentLotteryType(type);
        this.setState({ isShowTitleTable: false });
    }

    //显示或者关闭彩种列表
    showTitleTable() {
        this.setState({ isShowTitleTable: !this.state.isShowTitleTable });
    }

    renderTitleTableView(currentLotteryName) {
        return this.state.titleList.map((item, index) => {
            return (
                <div className="fl flex-center"
                    onClick={() => { this.selectTitle(item.name, item.id, item.type) }}
                    style={{
                        width: "28%", height: "30px", marginLeft: "5%", marginTop: "10px", fontSize: "13px",
                        background: item.name == currentLotteryName ?
                            `url(${require('../../assets/img/mark_six/bg_orange_statistical.png')})` : "#F5F5F5",
                        backgroundSize: item.name == currentLotteryName ? "100% 100%" : "0",
                    }}
                    key={index}>
                    {item.name}
                </div>
            )
        });
    }

    //渲染当前彩种页面
    renderContentView(lotteryName,lotteryType) {

        if (lotteryName == "重庆时时彩") {
            return (<ChongQingOftenLottery></ChongQingOftenLottery>)
        } else if (lotteryType == 1) {
            return (<BeiJingRacing></BeiJingRacing>)
        } else if (lotteryType == 3) {
            return (<OftenLottery></OftenLottery>)
        } else if (lotteryType == 4) {
            return (<QuicklyThree></QuicklyThree>)
        } else if (lotteryType == 9) {
            return (<HappyTenPoints></HappyTenPoints>)
        } else if (lotteryType == 7) {
            return (<ElevenFive></ElevenFive>)
        } else if (lotteryType == 0) {
            return (<WelfareLottery></WelfareLottery>)
        } else if (lotteryType == 2) {
            return (<Canada28></Canada28>)
        } else {
            return (<div></div>)
        }
    }

    render() {

        let currentLotteryName = this.props.currentLotteryName;
     
        if(this.props.currentLotteryName == ""){
            currentLotteryName = localStorage.getItem("currentLotteryName");
        }else{
            localStorage.setItem("currentLotteryName",this.props.currentLotteryName);
        }

        let currentLotteryType = this.props.currentLotteryType;
        if(this.props.currentLotteryType == "" ){
            currentLotteryType = localStorage.getItem("currentLotteryType");
        }else{
            localStorage.setItem("currentLotteryType",this.props.currentLotteryType);
        }
        

        const dialogBgStyle = {
            display: this.state.isShowTitleTable ? "block" : "none",
            position: "fixed", top: "9%", left: "0", zIndex: "100", background: 'rgba(0, 0, 0, 0.3)'
        };
        return (
            <div className="wh100 bgWhite">
                <div className="w100 navbar_bg flex">
                    <div onClick={() => { this.props.history.goBack() }} className="h100 flex align-item-center" style={{ width: "25%" }}>
                        <img style={{ width: "8%", marginLeft: "20px" }} src={require("../../assets/img/user/icon_goback.png")} />
                    </div>
                    <div className="h100" className="w50 flex-center"
                        onClick={() => { this.showTitleTable() }}
                        style={{ color: "white" }}>
                        <div>
                            {currentLotteryName}
                            {this.state.isShowTitleTable ?
                                (<img style={{ width: "12px", marginLeft: "10px", transform: "rotate(180deg)" }}
                                    src={require("../../assets/img/mark_six/icon_tab_unfold.png")} />) :
                                (<img style={{ width: "12px", marginLeft: "10px" }}
                                    src={require("../../assets/img/mark_six/icon_tab_unfold.png")} />)}
                        </div>
                    </div>
                    <div className="h100" style={{ width: "25%" }}></div>
                </div>

                <div className="wh100" onClick={() => { this.showTitleTable() }} style={dialogBgStyle}>
                    <div className="w100 clearfix bgWhite" style={{ position: "fixed", top: "9%", left: "0", paddingBottom: "10px", zIndex: "100" }}>
                        {this.renderTitleTableView(currentLotteryName)}
                    </div>
                </div>

                <div className="w100" style={{ height: "91%" }}>
                    {this.renderContentView(currentLotteryName,currentLotteryType)}
                </div>
            </div>
        );
    }
}
