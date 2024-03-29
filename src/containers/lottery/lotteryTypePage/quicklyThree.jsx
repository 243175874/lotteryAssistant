import React, { Component } from "react";
import Common from '../../../assets/js/common'
import { asyncComponent } from 'react-async-component';
const FunctionMenu = asyncComponent({ name: "FunctionMenu", resolve: () => import('../../../components/lotteryArea/functionMenu') });
const Header = asyncComponent({ name: "Header", resolve: () => import('../../../components/lotteryArea/header') });
const History = asyncComponent({ name: "History", resolve: () => import('../../../components/lotteryArea/quicklyThree/history') });
const BeadAnalyse = asyncComponent({ name: "BeadAnalyse", resolve: () => import('../../../components/lotteryArea/quicklyThree/beadAnalyse') });
const NumberStatistics = asyncComponent({ name: "NumberStatistics", resolve: () => import('../../../components/lotteryArea/quicklyThree/numberStatistics') });
const Recommend = asyncComponent({ name: "Recommend", resolve: () => import('../../../components/lotteryArea/canada28/recommend') });

// 参考计划
import icon_mftj from '../../../assets/img/lottery/menu/icon_mftj.png'
import icon_mftj_press from '../../../assets/img/lottery/menu/icon_mftj_press.png'
// 历史开奖
import icon_lskj from '../../../assets/img/lottery/menu/icon_lskj.png'
import icon_lskj_press from '../../../assets/img/lottery/menu/icon_lskj_press.png'
// 路珠分析
import icon_lzfx from '../../../assets/img/lottery/menu/icon_lzfx.png'
import icon_lzfx_press from '../../../assets/img/lottery/menu/icon_lzfx_press.png'
// 号码统计
import icon_hmtj from '../../../assets/img/lottery/menu/icon_hmtj.png'
import icon_hmtj_press from '../../../assets/img/lottery/menu/icon_hmtj_press.png'

import { connect } from 'react-redux'
import { setCurrentLotteryName } from '../../../redux/action'
@connect(
    state => ({ currentLotteryName: state.currentLotteryName, currentLotteryPageIndex: state.currentLotteryPageIndex, currentLotteryId: state.currentLotteryId }),
    { setCurrentLotteryName }
)
//江苏快3，广西快3，安徽快3，北京快3，湖北快3，河北快3
export default class QuicklyThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [
                { icon: icon_mftj, icon_press: icon_mftj_press, name: "参考计划", type: "预测", place: "menu" },
                { icon: icon_lskj, icon_press: icon_lskj_press, name: "历史开奖", type: "综合", place: "menu" },
                { icon: icon_lzfx, icon_press: icon_lzfx_press, name: "路珠分析", type: "综合", place: "menu" },
                { icon: icon_hmtj, icon_press: icon_hmtj_press, name: "号码统计", type: "历史", place: "menu" },
            ]
        };
    }


    renderContentView(currentLotteryId) {
        if (this.props.currentLotteryPageIndex == "参考计划") {
            const numberTitle = ["第一球", "第二球", "第三球"];
            return (<Recommend id={currentLotteryId} numberTitle={numberTitle}></Recommend>)
        } else if (this.props.currentLotteryPageIndex == "历史开奖") {
            return (<History id={currentLotteryId}></History>)
        } else if (this.props.currentLotteryPageIndex == "路珠分析") {
            return (<BeadAnalyse id={currentLotteryId}></BeadAnalyse>)
        } else if (this.props.currentLotteryPageIndex == "号码统计") {
            return (<NumberStatistics id={currentLotteryId}></NumberStatistics>)
        } else {
            return (<div></div>)
        }
    }

    render() {
        let currentLotteryId = this.props.currentLotteryId;
        if (this.props.currentLotteryId == "") {
            currentLotteryId = localStorage.getItem("currentLotteryId");
        } else {
            localStorage.setItem("currentLotteryId", this.props.currentLotteryId);
        }


        let currentLotteryName = this.props.currentLotteryName;

        if (this.props.currentLotteryName == "") {
            currentLotteryName = localStorage.getItem("currentLotteryName");
        } else {
            localStorage.setItem("currentLotteryName", this.props.currentLotteryName);
        }

        return (
            <div className="wh100">
                <div className="w100" style={{ height: "calc(100% - 55px)" }}>
                    <Header id={currentLotteryId} name={currentLotteryName}></Header>
                    <div className="w100" style={{ height: "calc(100% - 40px)" }}>
                        {this.renderContentView(currentLotteryId)}
                    </div>
                </div>

                <div className="w100" style={{ height: "55px", borderTop: "1px solid #BCBCBC", position: "fixed", bottom: "0", left: "0", zIndex: "20" }}>
                    <FunctionMenu menuList={this.state.menuList}></FunctionMenu>
                </div>
            </div>
        );
    }
}
