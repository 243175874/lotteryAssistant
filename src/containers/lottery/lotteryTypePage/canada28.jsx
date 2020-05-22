import React, { Component } from "react";
import Common from '../../../assets/js/common'
import { asyncComponent } from 'react-async-component';
const FunctionMenu = asyncComponent({ name: "FunctionMenu", resolve: () => import('../../../components/lotteryArea/functionMenu') });
const Header = asyncComponent({ name: "Header", resolve: () => import('../../../components/lotteryArea/header') });
const Recommend = asyncComponent({ name: "Recommend", resolve: () => import('../../../components/lotteryArea/canada28/recommend') });
const History = asyncComponent({ name: "History", resolve: () => import('../../../components/lotteryArea/canada28/history') });
const BeadAnalyse = asyncComponent({ name: "BeadAnalyse", resolve: () => import('../../../components/lotteryArea/canada28/beadAnalyse') });
const Trend = asyncComponent({ name: "Trend", resolve: () => import('../../../components/lotteryArea/canada28/trend') });

// 参考计划
import icon_mftj from '../../../assets/img/lottery/menu/icon_mftj.png'
import icon_mftj_press from '../../../assets/img/lottery/menu/icon_mftj_press.png'
// 历史开奖
import icon_lskj from '../../../assets/img/lottery/menu/icon_lskj.png'
import icon_lskj_press from '../../../assets/img/lottery/menu/icon_lskj_press.png'
// 路珠分析
import icon_lzfx from '../../../assets/img/lottery/menu/icon_lzfx.png'
import icon_lzfx_press from '../../../assets/img/lottery/menu/icon_lzfx_press.png'
// 冷热分析
import icon_lrfx from '../../../assets/img/lottery/menu/icon_lrfx.png'
import icon_lrfx_press from '../../../assets/img/lottery/menu/icon_lrfx_press.png'


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
                { icon: icon_mftj, icon_press: icon_mftj_press, name: "参考计划", type: "预测", place: "menu" },
                { icon: icon_lskj, icon_press: icon_lskj_press, name: "历史开奖", type: "综合", place: "menu" },
                { icon: icon_lzfx, icon_press: icon_lzfx_press, name: "路珠分析", type: "综合", place: "menu" },
                // { icon: icon_lrfx, icon_press: icon_lrfx_press, name: "冷热分析", type: "综合", place: "menu" },
            ],
            //当前彩种id
            currentLotteryId: "",
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
        } else if (this.props.currentLotteryPageIndex == "横板走势") {
            return (<Trend id={currentLotteryId}></Trend>)
        } else {
            return (<div></div>)
        }
    }

    renderContentBoxView(currentLotteryId, currentLotteryName) {
        if (currentLotteryId == "") {
            return (<div></div>)
        } else {
            return (
                <div className="w100" style={{ height: "calc(100% - 55px)" }}>
                    <Header id={currentLotteryId} name={currentLotteryName}></Header>
                    <div className="w100" style={{ height: "calc(100% - 40px)" }}>
                        {this.renderContentView(currentLotteryId)}
                    </div>
                </div>
            )
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
                {this.renderContentBoxView(currentLotteryId, currentLotteryName)}
                <div className="w100" style={{ height: "55px", borderTop: "1px solid #BCBCBC", position: "fixed", bottom: "0", left: "0", zIndex: "20" }}>
                    <FunctionMenu name={currentLotteryName} menuList={this.state.menuList}></FunctionMenu>
                </div>
            </div>
        );
    }
}
