import React, { Component } from "react";
import LotteryAPI from '../../../assets/js/lotteryAPI'
import emitter from '../../../assets/js/events'
import { ActivityIndicator, Toast } from 'antd-mobile';
import Common from '../../../assets/js/common'
import { connect } from 'react-redux'
import { setCurrentPeriods } from '../../../redux/action'
@connect(
    state => ({ currentPeriods: state.currentPeriods }),
    { setCurrentPeriods }
)
export default class NumberStatistics extends Component {
    constructor(props) {
        super(props);
        this.emitter = null;
        this.state = {
            loading: false,
            list: [],
            tab: "总和"
        };
    }

    componentWillReceiveProps(nextProps) {
        this.getHistoryService(nextProps.id, this.props.currentPeriods);
    }

    componentWillMount() {
        this.getHistoryService(this.props.id, this.props.currentPeriods);
    }

    componentDidMount() {
        //根据改变的期数，加载相应的数据
        this.emitter = emitter.on("emitChangeNumber", this.listenerCallback);
    }

    listenerCallback = () => {
        setTimeout(() => {
            this.getHistoryService(this.props.id, this.props.currentPeriods);
        }, 500);
    }

    componentWillUnmount() {
        this.emitter.removeListener("emitChangeNumber", this.listenerCallback)
    }

    //获取历史开奖数据
    getHistoryService(id) {
        this.setState({ loading: true });
        LotteryAPI.getNumberStatistics(id).then(data => {
            this.setState({ loading: false });
            if (data.code == 200) {
                this.setState({ list: data.data });
            } else {
                this.setState({ list: [] });
            }
        })
    }

    renderListView() {
        return this.state.list.map((item, index) => {
            return (
                <div className="w100 flex" style={{ height: "34px", flexDirection: "row", background: index % 2 !== 0 ? '#f5f5f9' : "white" }} key={index}>
                    <div className="flex-center" style={{ flex: "3" }}>{item.number}</div>
                    {item.data.map((element, i) => {
                        return (<div className="flex-center" key={i} style={{ flex: "1" }}>{element.num}</div>)
                    })}
                </div>
            )
        });
    }

    render() {
        return (
            <div className="wh100" style={{ fontSize: "12px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="w100 flex-center" style={{ height: "36px", borderTop: "1px solid rgb(153, 153, 153)" }}>号码统计</div>
                <div className="w100 flex" style={{ height: "34px", flexDirection: "row", background: '#f5f5f9' }}>
                    <div className="flex-center" style={{ flex: "3" }}>日期</div>
                    <div className="flex-center" style={{ flex: "1" }}>0</div>
                    <div className="flex-center" style={{ flex: "1" }}>1</div>
                    <div className="flex-center" style={{ flex: "1" }}>2</div>
                    <div className="flex-center" style={{ flex: "1" }}>3</div>
                    <div className="flex-center" style={{ flex: "1" }}>4</div>
                    <div className="flex-center" style={{ flex: "1" }}>5</div>
                    <div className="flex-center" style={{ flex: "1" }}>6</div>
                    <div className="flex-center" style={{ flex: "1" }}>7</div>
                    <div className="flex-center" style={{ flex: "1" }}>8</div>
                    <div className="flex-center" style={{ flex: "1" }}>9</div>
                </div>
                <div className="w100" style={{ height: "calc(100% - 70px)", overflow: "auto" }}>
                    {this.renderListView()}
                </div>
            </div>
        );
    }
}
