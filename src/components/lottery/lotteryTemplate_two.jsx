import React, { Component } from "react";
import icon_win_more_n from "../../assets/img/lotteryResult/icon_win_more_n.png"
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
        return (
            <div className="w100 h100" style={lotteryResults}>
                <header style={{ height: '40%' }} className="w100 flex-center">
                    <span style={{ fontSize: "13px" }}>{this.props.data.title}</span>
                    <span style={{ fontSize: "12px", fontWeight: "normal", marginLeft: "5px", color: "#676767" }}>{this.props.data.kj.number}</span>
                    <span className="dib" style={{ fontSize: "12px", fontWeight: "normal", color: "#676767", marginLeft: "5px" }}>下期开奖</span>
                    <span className="dib" style={{ fontSize: "12px", fontWeight: "normal", color: "#ff6600", marginLeft: "5px" }}>{this.props.data.next_kj.kj_time}</span>
                </header>
                <main className="w100 h50 flex">
                    <div className="icon flex h100 align-item-center" style={{ width: '6%', justifyContent: 'flex-start' }}>
                        <img className="w100" style={{ transform: ' rotate(180deg)' }} src={icon_win_more_n} />
                    </div>
                    <div style={{ width: "88%" }} className="w100 flex-center colorWhite">
                        {this.props.data.kj.haoma.map((item, index) => {
                            return (<div key={index} className="flex-center"
                                style={{ width: "23px", height: "23px", background: this.props.data.kj.haoma_ys[index], marginLeft: "6px" }}>
                                {item}
                            </div>)
                        })}
                    </div>
                    <div style={{ width: '6%', justifyContent: 'flex-end' }} className="flex align-item-center">
                        <img className="w100" src={icon_win_more_n} />
                    </div>
                </main>
            </div >
        );
    }
}
