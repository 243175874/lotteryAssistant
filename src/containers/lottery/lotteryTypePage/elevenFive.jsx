import React, { Component } from "react";
import Common from '../../../assets/js/common'
import { asyncComponent } from 'react-async-component';
const FunctionMenu = asyncComponent({ name: "FunctionMenu", resolve: () => import('../../../components/lotteryArea/functionMenu') });
const Header = asyncComponent({ name: "Header", resolve: () => import('../../../components/lotteryArea/header') });
const Recommend = asyncComponent({ name: "Recommend", resolve: () => import('../../../components/lotteryArea/recommend') });
const History = asyncComponent({ name: "History", resolve: () => import('../../../components/lotteryArea/elevenFive/history') });
const BeadAnalyse = asyncComponent({ name: "BeadAnalyse", resolve: () => import('../../../components/lotteryArea/elevenFive/beadAnalyse') });
const HotAndCold = asyncComponent({ name: "HotAndCold", resolve: () => import('../../../components/lotteryArea/elevenFive/hotAndCold') });
const MissingStatistics = asyncComponent({ name: "MissingStatistics", resolve: () => import('../../../components/lotteryArea/missingStatistics') });
const Trend = asyncComponent({ name: "Trend", resolve: () => import('../../../components/lotteryArea/trend') });

// 免费参考
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
// 横板走势
import icon_hbzs from '../../../assets/img/lottery/menu/icon_hbzs.png'
import icon_hbzs_press from '../../../assets/img/lottery/menu/icon_hbzs_press.png'
//遗漏统计
import icon_yltj from '../../../assets/img/lottery/menu/icon_yltj.png'
import icon_yltj_press from '../../../assets/img/lottery/menu/icon_yltj_press.png'

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
                { icon: icon_mftj, icon_press: icon_mftj_press, name: "免费参考", type: "预测", place: "menu" },
                { icon: icon_lskj, icon_press: icon_lskj_press, name: "历史开奖", type: "综合", place: "menu" },
                { icon: icon_lzfx, icon_press: icon_lzfx_press, name: "路珠分析", type: "综合", place: "menu" },
                { icon: icon_lrfx, icon_press: icon_lrfx_press, name: "冷热分析", type: "综合", place: "menu" },
                { icon: icon_hbzs, icon_press: icon_hbzs_press, name: "横板走势", type: "综合", place: "list" },
                { icon: icon_yltj, icon_press: icon_yltj_press, name: "遗漏统计", type: "遗漏", place: "list" },
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
