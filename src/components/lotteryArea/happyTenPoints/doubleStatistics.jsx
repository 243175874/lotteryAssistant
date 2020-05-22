import React, { Component } from "react";
import LotteryAPI from '../../../assets/js/lotteryAPI'
import { post } from '../../../fetch/post'
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
        post('/v1/api/arrondi/history_lm', { id }).then(data => {
            this.setState({ loading: false });
            if (data.code == 200) {
                //处理数据
                this.setState({ list: data.data });
            } else {
                this.setState({ list: [] });
            }
        });
    }

    renderListView() {
        let o = [item.data.ds[0], item.data.ds[1], item.data.dx[0], item.data.dx[1], item.data.lh[0], item.data.lh[1]]
        return this.state.list.map((item, index) => {
            return (
                <div className="w100 flex" style={{ height: "34px", flexDirection: "row", background: index % 2 !== 0 ? '#f5f5f9' : "white" }} key={index}>
                    <div className="flex-center" style={{ flex: "2" }}>{item.number}</div>
                    <div className="flex-center" style={{ flex: "1" }}>{o.find(element => element.key == "单").value}</div>
                    <div className="flex-center" style={{ flex: "1" }}>{o.find(element => element.key == "双").value}</div>
                    <div className="flex-center" style={{ flex: "1" }}>{o.find(element => element.key == "大").value}</div>
                    <div className="flex-center" style={{ flex: "1" }}>{o.find(element => element.key == "小").value}</div>
                    <div className="flex-center" style={{ flex: "1" }}>{o.find(element => element.key == "龙").value}</div>
                    <div className="flex-center" style={{ flex: "1" }}>{o.find(element => element.key == "虎").value}</div>
                </div>
            )
        });
    }

    renderTitleView() {
        const title = ["单", "双", "大", "小", "龙", "虎"];
        return title.map((item, index) => {
            return (<div key={index} className="flex-center" style={{ flex: "1" }}>{item}</div>);
        });
    }

    render() {
        return (
            <div className="wh100" style={{ fontSize: "12px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="w100 flex-center" style={{ height: "36px", borderTop: "1px solid rgb(153, 153, 153)" }}>两面统计</div>
                <div className="w100 flex" style={{ height: "34px", flexDirection: "row", background: '#f5f5f9' }}>
                    <div className="flex-center" style={{ flex: "2" }}>日期</div>
                    {this.renderTitleView()}
                </div>
                <div className="w100" style={{ height: "calc(100% - 70px)", overflow: "auto" }}>
                    {this.renderListView()}
                </div>
            </div>
        );
    }
}
