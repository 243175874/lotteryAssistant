import React, { Component } from "react";
import FunctionMenu from '../../../components/lotteryArea/functionMenu'
import Header from '../../../components/lotteryArea/header'
import Common from '../../../assets/js/common'
import Recommend from '../../../components/lotteryArea/recommend'
import History from '../../../components/lotteryArea/canada28/history'
import BeadAnalyse from '../../../components/lotteryArea/canada28/beadAnalyse'
import Trend from '../../../components/lotteryArea/canada28/trend'
const path = "../../assets/img/lottery/menu/";

import { connect } from 'react-redux'
import { setCurrentLotteryName } from '../../../redux/action'
@connect(
    state => ({ currentLotteryName: state.currentLotteryName, currentLotteryPageIndex: state.currentLotteryPageIndex, currentLotteryId: state.currentLotteryId }),
    { setCurrentLotteryName }
)
//加拿大28，PC蛋蛋
export default class Canada28 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [
                { icon: `${path}icon_mftj.png`, icon_press: `${path}icon_mftj_press.png`, name: "免费参考", type: "预测", place: "menu" },
                { icon: `${path}icon_lskj.png`, icon_press: `${path}icon_lskj_press.png`, name: "历史开奖", type: "综合", place: "menu" },
                { icon: `${path}icon_lzfx.png`, icon_press: `${path}icon_lzfx_press.png`, name: "路珠分析", type: "综合", place: "menu" },
                { icon: `${path}icon_hbzs.png`, icon_press: `${path}icon_hbzs_press.png`, name: "横板走势", type: "综合", place: "menu" },
            ],
            //当前彩种id
            currentLotteryId: "",
        };
    }


    renderContentView() {
        let currentLotteryId = this.props.currentLotteryId;
        if (this.props.currentLotteryPageIndex == "免费参考") {
            const numberTitle = ["第一球", "第二球", "第三球"];
            return (<Recommend id={currentLotteryId} numberTitle={numberTitle}></Recommend>)
        } else if (this.props.currentLotteryPageIndex == "历史开奖") {
            return (<History id={currentLotteryId}></History>)
        } else if (this.props.currentLotteryPageIndex == "路珠分析") {
            return (<BeadAnalyse id={currentLotteryId}></BeadAnalyse>)
        } else if (this.props.currentLotteryPageIndex == "横板走势") {
            return (<Trend id={currentLotteryId}></Trend>)
        } else {
            return (<div></div>)
        }
    }

    renderContentBoxView() {
        if (this.props.currentLotteryId == "") {
            return (<div></div>)
        } else {
            return (
                <div className="w100" style={{ height: "calc(100% - 55px)" }}>
                    <Header id={this.props.currentLotteryId} name={this.props.currentLotteryName}></Header>
                    <div className="w100" style={{ height: "calc(100% - 40px)" }}>
                        {this.renderContentView()}
                    </div>
                </div>
            )
        }

    }

    render() {
        return (
            <div className="wh100">
                {this.renderContentBoxView()}
                <div className="w100" style={{ height: "55px", borderTop: "1px solid #BCBCBC", position: "fixed", bottom: "0", left: "0", zIndex: "20" }}>
                    <FunctionMenu menuList={this.state.menuList}></FunctionMenu>
                </div>
            </div>
        );
    }
}
