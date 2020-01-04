import React, { Component } from "react";
import FunctionMenu from '../../../components/lotteryArea/functionMenu'
import Header from '../../../components/lotteryArea/header'
import Common from '../../../assets/js/common'
import Recommend from '../../../components/lotteryArea/recommend'
import History from '../../../components/lotteryArea/happyTenPoints/history'
import NumberStatistics from '../../../components/lotteryArea/happyTenPoints/numberStatistics'
import BeadAnalyse from '../../../components/lotteryArea/happyTenPoints/beadAnalyse'
import MissingStatistics from '../../../components/lotteryArea/missingStatistics'
import BigAndSmallOmit from '../../../components/lotteryArea/bigAndSmallOmit'
import OddAndEvenOmit from '../../../components/lotteryArea/oddAndEvenOmit'
import DoubleLongDragon from '../../../components/lotteryArea/happyTenPoints/doubleLongDragon'
import BigAndSmallHistory from '../../../components/lotteryArea/bigAndSmallHistory'
import OddAndEvenHistory from '../../../components/lotteryArea/oddAndEvenHistory'
import DoubleStatistics from '../../../components/lotteryArea/oftenLottery/doubleStatistics'
import Trend from '../../../components/lotteryArea/trend'
const path = "../../assets/img/lottery/menu/";

import { connect } from 'react-redux'
import { setCurrentLotteryName } from '../../../redux/action'
@connect(
    state => ({ currentLotteryName: state.currentLotteryName, currentLotteryPageIndex: state.currentLotteryPageIndex, currentLotteryId: state.currentLotteryId }),
    { setCurrentLotteryName }
)
//湖南快乐十分，幸运农场，广东快乐十分，天津快乐十分，
export default class HappyTenPoints extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [
                { icon: `${path}icon_mftj.png`, icon_press: `${path}icon_mftj_press.png`, name: "免费参考", type: "预测", place: "menu" },
                { icon: `${path}icon_lskj.png`, icon_press: `${path}icon_lskj_press.png`, name: "历史开奖", type: "综合", place: "menu" },
                { icon: `${path}icon_lzfx.png`, icon_press: `${path}icon_lzfx_press.png`, name: "路珠分析", type: "综合", place: "menu" },
                { icon: `${path}icon_hbzs.png`, icon_press: `${path}icon_hbzs_press.png`, name: "横板走势", type: "综合", place: "menu" },
                { icon: `${path}icon_dxyl.png`, icon_press: `${path}icon_dxyl_press.png`, name: "大小遗漏", type: "遗漏", place: "list" },
                { icon: `${path}icon_dsyl.png`, icon_press: `${path}icon_dsyl_press.png`, name: "单双遗漏", type: "遗漏", place: "list" },
                { icon: `${path}icon_lmtj.png`, icon_press: `${path}icon_lmtj_press.png`, name: "两面长龙", type: "遗漏", place: "list" },
                { icon: `${path}icon_yltj.png`, icon_press: `${path}icon_yltj_press.png`, name: "遗漏统计", type: "遗漏", place: "list" },
                { icon: `${path}icon_dxls.png`, icon_press: `${path}icon_dxls_press.png`, name: "大小历史", type: "历史", place: "list" },
                { icon: `${path}icon_dsls.png`, icon_press: `${path}icon_dsls_press.png`, name: "单双历史", type: "历史", place: "list" },
                { icon: `${path}icon_lmtj.png`, icon_press: `${path}icon_lmtj_press.png`, name: "两面统计", type: "历史", place: "list" },
                { icon: `${path}icon_hmtj.png`, icon_press: `${path}icon_hmtj_press.png`, name: "号码统计", type: "历史", place: "list" }],
            //当前彩种id
            currentLotteryId: "",
        };
    }

    renderContentView() {
        //大小遗漏，单双遗漏 菜单选项卡
        const menuList = [{ key: "第一球", value: 0 }, { key: "第二球", value: 1 }, { key: "第三球", value: 2 }, { key: "第四球", value: 3 }, { key: "第五球", value: 4 },
        { key: "第六球", value: 5 }, { key: "第七球", value: 6 }, { key: "第八球", value: 7 }];

        //大小，单双，两面历史  表格 title
        const titleList = ["第一球", "第二球", "第三球", "第四球", "第五球", "第六球", "第七球", "第八球"];

        let currentLotteryId = this.props.currentLotteryId;
        if (this.props.currentLotteryPageIndex == "免费参考") {
            const numberTitle = ["第一球", "第二球", "第三球", "第四球", "第五球", "第六球", "第七球", "第八球"];
            return (<Recommend id={currentLotteryId} numberTitle={numberTitle}></Recommend>)
        } else if (this.props.currentLotteryPageIndex == "历史开奖") {
            return (<History id={currentLotteryId}></History>)
        } else if (this.props.currentLotteryPageIndex == "号码统计") {
            return (<NumberStatistics id={currentLotteryId}></NumberStatistics>)
        } else if (this.props.currentLotteryPageIndex == "路珠分析") {
            return (<BeadAnalyse id={currentLotteryId}></BeadAnalyse>)
        } else if (this.props.currentLotteryPageIndex == "遗漏统计") {
            const numberList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
            return (<MissingStatistics id={currentLotteryId} numberList={numberList}></MissingStatistics>)
        } else if (this.props.currentLotteryPageIndex == "大小遗漏") {
            return (<BigAndSmallOmit id={currentLotteryId} menuList={menuList} menuWidth={"160%"} thresholdValue={10}></BigAndSmallOmit>)
        } else if (this.props.currentLotteryPageIndex == "单双遗漏") {
            return (<OddAndEvenOmit id={currentLotteryId} menuList={menuList} menuWidth={"160%"}></OddAndEvenOmit>)
        } else if (this.props.currentLotteryPageIndex == "两面长龙") {
            return (<DoubleLongDragon id={currentLotteryId}></DoubleLongDragon>)
        } else if (this.props.currentLotteryPageIndex == "大小历史") {
            return (<BigAndSmallHistory id={currentLotteryId} titleList={titleList} width={"180%"}></BigAndSmallHistory>)
        } else if (this.props.currentLotteryPageIndex == "单双历史") {
            return (<OddAndEvenHistory id={currentLotteryId} titleList={titleList} width={"180%"}></OddAndEvenHistory>)
        } else if (this.props.currentLotteryPageIndex == "两面统计") {
            return (<DoubleStatistics id={currentLotteryId}></DoubleStatistics>)
        } else if (this.props.currentLotteryPageIndex == "横板走势") {
            const positionList = [{ key: "第一球", value: 0 }, { key: "第二球", value: 1 }, { key: "第三球", value: 2 }, { key: "第四球", value: 3 },
            { key: "第五球", value: 4 }, { key: "第六球", value: 5 }, { key: "第七球", value: 6 }, { key: "第八球", value: 7 }];
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
