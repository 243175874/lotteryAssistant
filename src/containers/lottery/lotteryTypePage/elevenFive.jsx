import React, { Component } from "react";
import FunctionMenu from '../../../components/lotteryArea/functionMenu'
import Header from '../../../components/lotteryArea/header'
import Common from '../../../assets/js/common'
import Recommend from '../../../components/lotteryArea/recommend'
import History from '../../../components/lotteryArea/elevenFive/history'
import BeadAnalyse from '../../../components/lotteryArea/elevenFive/beadAnalyse'
import HotAndCold from '../../../components/lotteryArea/elevenFive/hotAndCold'
import MissingStatistics from '../../../components/lotteryArea/missingStatistics'
import Trend from '../../../components/lotteryArea/trend'
const path = "../../assets/img/lottery/menu/";

import { connect } from 'react-redux'
import { setCurrentLotteryName } from '../../../redux/action'
@connect(
    state => ({ currentLotteryName: state.currentLotteryName, currentLotteryPageIndex: state.currentLotteryPageIndex, currentLotteryId: state.currentLotteryId }),
    { setCurrentLotteryName }
)
//江西11选5,广东11选5，11运夺金
export default class ElevenFive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [
                { icon: `${path}icon_mftj.png`, icon_press: `${path}icon_mftj_press.png`, name: "免费参考", type: "预测", place: "menu" },
                { icon: `${path}icon_lskj.png`, icon_press: `${path}icon_lskj_press.png`, name: "历史开奖", type: "综合", place: "menu" },
                { icon: `${path}icon_lzfx.png`, icon_press: `${path}icon_lzfx_press.png`, name: "路珠分析", type: "综合", place: "menu" },
                { icon: `${path}icon_lrfx.png`, icon_press: `${path}icon_lrfx_press.png`, name: "冷热分析", type: "综合", place: "menu" },
                { icon: `${path}icon_hbzs.png`, icon_press: `${path}icon_hbzs_press.png`, name: "横板走势", type: "综合", place: "list" },
                { icon: `${path}icon_yltj.png`, icon_press: `${path}icon_yltj_press.png`, name: "遗漏统计", type: "遗漏", place: "list" },
            ],
            //当前彩种id
            currentLotteryId: "",
        };
    }

    renderContentView() {
        let currentLotteryId = this.props.currentLotteryId;
        if (this.props.currentLotteryPageIndex == "免费参考") {
            const numberTitle = ["第一球", "第二球", "第三球", "第四球", "第五球"];
            return (<Recommend id={currentLotteryId} numberTitle={numberTitle}></Recommend>)
        } else if (this.props.currentLotteryPageIndex == "历史开奖") {
            return (<History id={currentLotteryId}></History>)
        } else if (this.props.currentLotteryPageIndex == "路珠分析") {
            return (<BeadAnalyse id={currentLotteryId}></BeadAnalyse>)
        } else if (this.props.currentLotteryPageIndex == "冷热分析") {
            return (<HotAndCold id={currentLotteryId}></HotAndCold>)
        } else if (this.props.currentLotteryPageIndex == "遗漏统计") {
            const numberList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
            return (<MissingStatistics id={currentLotteryId} numberList={numberList}></MissingStatistics>)
        } else if (this.props.currentLotteryPageIndex == "横板走势") {
            const positionList = [{ key: "第一球", value: 0 }, { key: "第二球", value: 1 }, { key: "第三球", value: 2 }, { key: "第四球", value: 3 },
            { key: "第五球", value: 4 }];
            return (<Trend id={currentLotteryId} positionList={positionList}></Trend>)
        } else {
            return (<div></div>)
        }
    }

    render() {
        return (
            <div className="wh100">
                <div className="w100" style={{ height: "calc(100% - 55px)" }}>
                    <Header id={this.props.currentLotteryId} name={this.props.currentLotteryName}></Header>
                    <div className="w100" style={{ height: "calc(100% - 40px)" }}>
                        {this.renderContentView()}
                    </div>
                </div>

                <div className="w100" style={{ height: "55px", borderTop: "1px solid #BCBCBC", position: "fixed", bottom: "0", left: "0", zIndex: "20" }}>
                    <FunctionMenu menuList={this.state.menuList}></FunctionMenu>
                </div>
            </div>
        );
    }
}
