import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { post } from '../../../fetch/post.js';
import LotteryHistoryList from './lotteryHistoryList'

class MarkSixLotteryVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    go(pageRouter) {
        this.props.history.push(pageRouter);
    }

    goback() {
        this.props.history.goBack()
    }

    componentWillMount() {
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const headerBg = {
            height: "200px",
            background: `url(${require('../../../assets/img/common/bg3.png')})`,
            backgroundSize: "100% 100%",
            paddingTop: "20px",
            boxSizing: "content-box"
        }

        const lottery = {
            width: "90%",
            height: "130px",
            top: "80px",
            left: "50%",
            marginLeft: "-45%",
            backgroundImage: `url(${require('../../../assets/img/promotion/boxBg.png')})`,
            backgroundSize: "100% 100%"
        }

        return (
            <div className="wh100">
                <header className="w100" style={headerBg}>
                    <div className="w100 text-center pr" style={{ height: "36px", lineHeight: "36px", fontSize: "16px", color: "#fff" }}>
                        <div onClick={() => { this.goback() }} className="h100 pa" style={{ width: "50px", top: "4%", left: "4%" }}>
                            <img style={{ width: "15%", marginTop: "10px" }} src={require("../../../assets/img/user/icon_goback.png")} />
                        </div>
                        历史开奖
                    </div>
                    <div className="pa flex" style={lottery}>
                        <div className="w50 h100" onClick={() => { this.go('markSixLotteryRecord') }}>
                            <div className="w100 flex-center" style={{ marginTop: "30px" }}>
                                <img style={{ width: "15%" }} src={require("../../../assets/img/lotteryHistory/history-icon.png")} />
                            </div>
                            <div className="w100 flex-center" style={{ marginTop: "5px", height: "20px", fontSize: "12px" }}>开奖记录</div>
                            <div className="w100 flex-center" style={{ height: "20px", fontSize: "11px", color: "#666666" }}>六合彩开奖历史数据</div>
                        </div>
                        <div className="w50 h100" onClick={() => { this.go('lotteryQueryAssistant') }}>
                            <div className="w100 flex-center" style={{ marginTop: "30px" }}>
                                <img style={{ width: "15%" }} src={require("../../../assets/img/lotteryHistory/query-assistant-icon.png")} />
                            </div>
                            <div className="w100 flex-center" style={{ marginTop: "5px", height: "20px", fontSize: "12px" }}>查询助手</div>
                            <div className="w100 flex-center" style={{ height: "20px", fontSize: "11px", color: "#666666" }}>选择条件查询历史位置</div>
                        </div>
                    </div>
                </header>
                <main className="w100" style={{ height: "calc(100% - 220px)" }}>
                    <LotteryHistoryList></LotteryHistoryList>
                </main>
            </div >
        );
    }
}
export default withRouter(MarkSixLotteryVideo)