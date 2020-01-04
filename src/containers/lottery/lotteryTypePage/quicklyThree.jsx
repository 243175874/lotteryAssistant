import React, { Component } from "react";
import FunctionMenu from '../../../components/lotteryArea/functionMenu'
import Common from '../../../assets/js/common'
import Header from '../../../components/lotteryArea/header'
import History from '../../../components/lotteryArea/quicklyThree/history'
import BeadAnalyse from '../../../components/lotteryArea/quicklyThree/beadAnalyse'
import NumberStatistics from '../../../components/lotteryArea/quicklyThree/numberStatistics'
const path = "../../assets/img/lottery/menu/";
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
                { icon: `${path}icon_lskj.png`, icon_press: `${path}icon_lskj_press.png`, name: "历史开奖", type: "综合", place: "menu" },
                { icon: `${path}icon_lzfx.png`, icon_press: `${path}icon_lzfx_press.png`, name: "路珠分析", type: "综合", place: "menu" },
                { icon: `${path}icon_hmtj.png`, icon_press: `${path}icon_hmtj_press.png`, name: "号码统计", type: "历史", place: "menu" },
            ]
        };
    }


    renderContentView() {
        let currentLotteryId = this.props.currentLotteryId;
        if (this.props.currentLotteryPageIndex == "历史开奖") {
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
