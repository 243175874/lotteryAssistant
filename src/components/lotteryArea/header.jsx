import React, { Component } from "react";
import LotteryAPI from "../../assets/js/lotteryAPI"
import { ActionSheet, ActivityIndicator } from 'antd-mobile';
import Common from '../../assets/js/common'
import emitter from '../../assets/js/events'
import { connect } from 'react-redux'
import { setCurrentPeriods } from '../../redux/action'
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown-now';
@connect(
    state => ({ currentPeriods: state.currentPeriods, currentLotteryPageIndex: state.currentLotteryPageIndex }),
    { setCurrentPeriods }
)
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.countdownInterval = null;
        this.state = {
            loading: true,
            currentLotteryIcon: require('../../assets/img/common/lottery-icon.png'),
            num: 50, //查询期数
            number: "", //当前开奖期数
            countdown: 0,
        };
    }

    componentDidMount() {
        //获取倒计时
        this.getCount(this.props.id);
        this.countdownInterval = setInterval(() => {
            this.getCount(this.props.id);
        }, 60000);
    }

    componentWillUnmount() {
        window.clearInterval(this.countdownInterval);
        this.setState = (state, callback) => {
            return;
        }
    }

    componentWillReceiveProps(nextProps) {
        //获取倒计时
        this.getCount(nextProps.id)
    }

    showActionSheet = () => {
        const BUTTONS = ['近50期', '近100期', '近150期'];
        const number = [50, 100, 150];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
        },
            (buttonIndex) => {
                let num = number[buttonIndex];
                //如果没有选择，不改变期数
                if (buttonIndex > -1) {
                    this.setState({ num });
                    this.props.setCurrentPeriods(num);
                    emitter.emit("emitChangeNumber");
                }
            });
    }

    //获取倒计时
    getCount(id) {
        LotteryAPI.getCountService(id).then(data => {
            this.setState({ loading: false });
            if (data.code == 200) {
                let d = data.data;
                let kj_time = d.kj_time ? d.kj_time : 0;
                let countdown = (Number(kj_time) - Number(d.server_time)) * 1000;
                this.setState({ currentLotteryIcon: d.icon, number: d.number, countdown });
                //console.log(new Date(data.next_kj.next_time * 1000).getTime() - new Date().getTime());
                //console.log(new Date());
                //console.log(new Date(data.next_kj.next_time * 1000));
            }
        })
    }

    //倒计时结束时，触发更新数据
    refreshData() {
        emitter.emit("emitChangeNumber");
        //重新获取倒计时
        this.getCount(this.props.id);
    }


    renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <div>开奖中</div>;
        } else {
            // Render a countdown
            return <span>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
        }
    };

    render() {

        let page = this.props.currentLotteryPageIndex;
        let flag = page == "历史开奖" || page == "路珠分析" || page == "横板走势" || page == "遗漏统计" || page == "大小遗漏" || page == "单双遗漏"
            || page == "两面长龙" || page == "冠亚统计" || page == "遗漏统计"
        let btnStyle = {
            boxSizing: "border-box", width: "65px", height: "60%", fontSize: "11px", borderRadius: "15px",
            color: "#999999", border: "1px solid #999999", display: flag ? "flex" : "none"
        };
        return (
            <div className="w100 flex" style={{ height: "40px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="h100 flex-center" style={{ width: "60px" }}>
                    <img style={{ width: "36px" }} src={this.state.currentLotteryIcon} onError={(e) => { e.target.onerror = null; e.target.src = "../../assets/img/common/lottery-icon.png" }} />
                </div>
                <div className="h100" style={{ width: "calc(100% - 140px)", padding: "4px 0" }}>
                    <div className="wh100  flex align-item-center" style={{ borderLeft: "1px solid #DFDFDF" }}>
                        <span style={{ fontSize: "12px", color: "black", marginLeft: "10px" }}>{this.state.number}期倒计时</span>
                        <span style={{ marginLeft: "10px", color: "#FF6600" }}>
                            <Countdown renderer={this.renderer} key={Date.now()} onComplete={() => { this.refreshData() }} date={Date.now() + this.state.countdown} />
                        </span>
                    </div>
                </div>
                <div className="h100 flex-center" style={{ width: "80px" }}>
                    <div className="flex-center" onClick={this.showActionSheet} style={btnStyle}>近{this.props.currentPeriods}期</div>
                </div>
            </div>
        );
    }
}
