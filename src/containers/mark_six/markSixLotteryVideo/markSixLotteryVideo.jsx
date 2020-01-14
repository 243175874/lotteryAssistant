import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { post } from '../../../fetch/post.js';
import LotteryHistoryList from "../markSixLotteryHistory/lotteryHistoryList";
import MarkSix from '../../../components/lottery/markSix'
class MarkSixLotteryVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //最新开奖信息
            runLottery: {},
            haoma: [],
            haoma_sx: [],
            number: 0,//期数
            date: "",
            week: "",
        };
    }

    go(pageRouter) {
        this.props.history.push(pageRouter);
    }

    goback() {
        this.props.history.goBack()
    }

    componentWillMount() {
        this.getNewRunLotteryInfo();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }


    //获取最新开奖信息
    getNewRunLotteryInfo() {
        post('/v1/api/lottery/lhc_kj').then(data => {
            if (data.code == 200) {
                let d = data.data;
                this.setState({ haoma: d.numbers, haoma_sx: d.sx, number: d.period, date: d.day });
            }
        });
    }

    render() {
        const headerBg = {
            height: "200px",
            backgroundImage: `url(${require('../../../assets/img/common/bg3.png')})`,
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
                        最新开奖
                    </div>
                    <div className="pa" style={lottery}>
                        <div className="w100 h100" style={{ fontSize: '13px', fontWeight: '600', fontFamily: "宋体" }}>
                            <header style={{ height: '40%' }} className="w100 flex-center">
                                <span style={{ fontSize: "13px" }}>香港六合彩</span>
                                <span style={{ fontSize: "12px", fontWeight: "normal", marginLeft: "5px", color: "#676767" }}>{this.state.number}</span>
                                <span className="dib" style={{ fontSize: "12px", fontWeight: "normal", color: "#676767", marginLeft: "5px" }}>下期开奖</span>
                                <span className="dib" style={{ fontSize: "12px", fontWeight: "normal", color: "#ff6600", marginLeft: "5px" }}>{this.state.date}</span>
                            </header>
                            <main className="w100 h50 flex-center">
                                <div className="w70" style={{ height: "85%", width: "80%" }}>
                                    <MarkSix haoma={this.state.haoma} haoma_sx={this.state.haoma_sx}></MarkSix>
                                </div>
                            </main>
                        </div >
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