import React, { Component } from "react";
export default class LotteryTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let lotteryResults = {
            fontSize: '13px',
            fontWeight: '600',
            fontFamily: "宋体"
        }
        //期数
        let number = this.props.data.kj.number != null ? this.props.data.kj.number : "?";
        //开奖时间
        let kj_time = this.props.data.next_kj.kj_time != null ? this.props.data.next_kj.kj_time : "?";
        //开奖号码
        let haoma = this.props.data.kj.haoma != null ? this.props.data.kj.haoma : [];
        return (
            <div className="w100 h100" style={lotteryResults}>
                <header style={{ height: '40%' }} className="w100 flex-center">
                    <span style={{ fontSize: "13px" }}>{this.props.data.title}</span>
                    <span style={{ fontSize: "12px", fontWeight: "normal", marginLeft: "5px", color: "#676767" }}>{number}</span>
                    <span className="dib" style={{ fontSize: "12px", fontWeight: "normal", color: "#676767", marginLeft: "5px" }}>下期开奖</span>
                    <span className="dib" style={{ fontSize: "12px", fontWeight: "normal", color: "#ff6600", marginLeft: "5px" }}>{kj_time}</span>
                </header>
                <main className="w100 h50 flex">
                    <div className="icon flex h100 align-item-center" style={{ width: '6%', justifyContent: 'flex-start' }}>
                        <img className="w100" style={{ transform: ' rotate(180deg)' }} src="../../assets/img/lotteryResult/icon_win_more_n.png" />
                    </div>
                    <div style={{ width: "88%" }} className="w100 flex-center colorWhite">
                        {haoma.map((item, index) => {
                            return (<div key={index} className="flex-center"
                                style={{ width: "28px", height: "28px", borderRadius: "50%", background: this.props.data.kj.haoma_ys[index], marginLeft: "6px" }}>
                                {item}
                            </div>)
                        })}
                    </div>
                    <div style={{ width: '6%', justifyContent: 'flex-end' }} className="flex align-item-center">
                        <img className="w100" src="../../assets/img/lotteryResult/icon_win_more_n.png" />
                    </div>
                </main>
            </div >
        );
    }
}
