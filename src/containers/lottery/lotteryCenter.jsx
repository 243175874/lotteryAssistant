import React, { Component } from "react";
import { post } from '../../fetch/post.js'
import Common from '../../assets/js/common'
//北京赛车
import BeiJingRacing from './lotteryTypePage/beiJingRacing'
//重庆时时彩
import ChongQingOftenLottery from './lotteryTypePage/chongQingOftenLottery'
//新疆时时彩,天津时时彩
import OftenLottery from './lotteryTypePage/oftenLottery'
//江苏快3，广西快3，安徽快3，北京快3，湖北快3，河北快3
import QuicklyThree from './lotteryTypePage/quicklyThree'
//湖南快乐十分，幸运农场，广东快乐十分，天津快乐十分
import HappyTenPoints from './lotteryTypePage/happyTenPoints'
//江西11选5,广东11选5，11运夺金
import ElevenFive from './lotteryTypePage/elevenFive'
//福彩3D,排列3D
import WelfareLottery from './lotteryTypePage/welfareLottery'
//加拿大28,PC蛋蛋
import Canada28 from './lotteryTypePage/canada28'


import { connect } from 'react-redux'
import { setCurrentLotteryName, setCurrentLotteryId } from '../../redux/action'
@connect(
    state => ({ currentLotteryName: state.currentLotteryName, currentLotteryId: state.currentLotteryId }),
    { setCurrentLotteryName, setCurrentLotteryId }
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
    selectTitle(name, id) {
        //存入redux
        this.props.setCurrentLotteryName(name);
        this.props.setCurrentLotteryId(id);
        this.setState({ isShowTitleTable: false });
    }

    //显示或者关闭彩种列表
    showTitleTable() {
        this.setState({ isShowTitleTable: !this.state.isShowTitleTable });
    }

    renderTitleTableView() {
        return this.state.titleList.map((item, index) => {
            return (
                <div className="fl flex-center"
                    onClick={() => { this.selectTitle(item.name, item.id) }}
                    style={{
                        width: "28%", height: "30px", marginLeft: "5%", marginTop: "10px", fontSize: "13px",
                        background: item.name == this.props.currentLotteryName ?
                            "url(../../../assets/img/mark_six/bg_orange_statistical.png)" : "#F5F5F5",
                        backgroundSize: item.name == this.props.currentLotteryName ? "100% 100%" : "0",
                    }}
                    key={index}>
                    {item.name}
                </div>
            )
        });
    }

    //渲染当前彩种页面
    renderContentView() {
        let lotteryName = this.props.currentLotteryName;
        if (lotteryName == "北京赛车" || lotteryName == "幸运飞艇") {
            return (<BeiJingRacing name={lotteryName}></BeiJingRacing>)
        } if (lotteryName == "重庆时时彩") {
            return (<ChongQingOftenLottery name={lotteryName}></ChongQingOftenLottery>)
        } if (lotteryName == "新疆时时彩" || lotteryName == "天津时时彩") {
            return (<OftenLottery name={lotteryName}></OftenLottery>)
        } if (lotteryName == "江苏快三" || lotteryName == "广西快三" || lotteryName == "安徽快三" ||
            lotteryName == "北京快三" || lotteryName == "湖北快三" || lotteryName == "河北快三") {
            return (<QuicklyThree name={lotteryName}></QuicklyThree>)
        } if (lotteryName == "湖南快乐十分" || lotteryName == "幸运农场" ||
            lotteryName == "广东快乐十分" || lotteryName == "天津快乐十分") {
            return (<HappyTenPoints name={lotteryName}></HappyTenPoints>)
        } if (lotteryName == "江西11选5" || lotteryName == "广东11选5" || lotteryName == "11运夺金") {
            return (<ElevenFive name={lotteryName}></ElevenFive>)
        } if (lotteryName == "福彩3D" || lotteryName == "排列3") {
            return (<WelfareLottery name={lotteryName}></WelfareLottery>)
        } if (lotteryName == "加拿大28" || lotteryName == "PC蛋蛋") {
            return (<Canada28 name={lotteryName}></Canada28>)
        } else {
            return (<div>功能开发中……</div>)
        }
    }

    render() {
        const dialogBgStyle = {
            display: this.state.isShowTitleTable ? "block" : "none",
            position: "fixed", top: "9%", left: "0", zIndex: "100", background: 'rgba(0, 0, 0, 0.3)'
        };
        return (


            <div className="wh100 bgWhite">
                <div className="w100 navbar_bg flex">
                    <div onClick={() => { this.props.history.goBack() }} className="h100 flex align-item-center" style={{ width: "25%" }}>
                        <img style={{ width: "8%", marginLeft: "20px" }} src="../../assets/img/user/icon_goback.png" />
                    </div>
                    <div className="h100" className="w50 flex-center"
                        onClick={() => { this.showTitleTable() }}
                        style={{ color: "white" }}>
                        <div>
                            {this.props.currentLotteryName}
                            {this.state.isShowTitleTable ?
                                (<img style={{ width: "12px", marginLeft: "10px", transform: "rotate(180deg)" }}
                                    src="../../../assets/img/mark_six/icon_tab_unfold.png" />) :
                                (<img style={{ width: "12px", marginLeft: "10px" }}
                                    src="../../../assets/img/mark_six/icon_tab_unfold.png" />)}
                        </div>
                    </div>
                    <div className="h100" style={{ width: "25%" }}></div>
                </div>

                <div className="wh100" onClick={() => { this.showTitleTable() }} style={dialogBgStyle}>
                    <div className="w100 clearfix bgWhite" style={{ position: "fixed", top: "9%", left: "0", paddingBottom: "10px", zIndex: "100" }}>
                        {this.renderTitleTableView()}
                    </div>
                </div>

                <div className="w100" style={{ height: "91%" }}>
                    {this.renderContentView()}
                </div>
            </div>
        );
    }
}