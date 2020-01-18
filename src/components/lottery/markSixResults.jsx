import React, { Component } from "react";
import MarkSix from './markSix'
import icon_win_more_n from "../../assets/img/lotteryResult/icon_win_more_n.png"
export default class MarkSixResults extends Component {
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
                    <span style={{ fontSize: "13px" }}>{this.props.title}</span>
                    <span style={{ fontSize: "12px", fontWeight: "normal", marginLeft: "5px", color: "#676767" }}>{this.props.number}</span>
                    <span className="dib" style={{ fontSize: "12px", fontWeight: "normal", color: "#676767", marginLeft: "5px" }}>下期开奖</span>
                    <span className="dib" style={{ fontSize: "12px", fontWeight: "normal", color: "#ff6600", marginLeft: "5px" }}>{this.props.kj_time}</span>
                </header>
                <main className="w100 h50 flex">
                    {/* <div className="icon flex h100 align-item-center" style={{ width: '15%', justifyContent: 'flex-start' }}>
                        <img style={{ width: '40%', transform: ' rotate(180deg)' }} src={icon_win_more_n} />
                    </div> */}
                    <div style={{ width: "85%", margin: "0 auto" }}>
                        <MarkSix haoma={this.props.haoma} haoma_sx={this.props.haoma_sx}></MarkSix>
                    </div>
                    {/* <div style={{ width: '15%', justifyContent: 'flex-end' }} className="flex align-item-center">
                        <img style={{ width: '40%' }} src={icon_win_more_n} />
                    </div> */}
                </main>
            </div >
        );
    }
}
