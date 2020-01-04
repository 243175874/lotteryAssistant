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
export default class History extends Component {
    constructor(props) {
        super(props);
        this.emitter = null;
        this.state = {
            loading: false,
            list: [],
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
    getHistoryService(id, number) {
        this.setState({ loading: true });
        LotteryAPI.getHistoryService(id, number).then(data => {
            this.setState({ loading: false });
            if (data.code == 200) {
                this.setState({ list: data.data });
            } else {
                this.setState({ list: [] });
            }
        })
    }

    //渲染历史历史开奖
    renderListView() {
        return this.state.list.map((item, index) => {
            let sum = Number(item.kj_data[0]) + Number(item.kj_data[1]) + Number(item.kj_data[2]);
            return (
                <div key={index} className="w100 flex" style={{ height: "30px", background: index % 2 !== 0 ? '#f5f5f9' : "white" }}>
                    <div className="h100 flex-center" style={{ width: "33%" }}>{item.number}&nbsp;{item.kj_hour}</div>
                    <div className="h100 flex" style={{ width: "33%" }}>
                        {item.kj_data.map((element, i) => {
                            return (
                                <div key={i} className="w33 h100 flex-center">
                                    <div className="flex-center" style={{ width: "52%", height: "70%", borderRadius: "50%", background: "red", color: "white" }}>{element}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="h100 flex" style={{ width: "34%", padding: "0 4%" }}>
                        <div className="w33 h100 flex-center">{sum}</div>
                        <div className="w33 h100 flex-center">{sum % 2 == 0 ? "双" : "单"}</div>
                        <div className="w33 h100 flex-center">{item.kj_data[0] == item.kj_data[1] == item.kj_data[2] ? "通吃" : sum > 10 ? "大" : "小"}</div>
                    </div>
                </div>)
        });
    }

    render() {
        return (
            <div className="wh100" style={{ fontSize: "12px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="w100 flex" style={{ height: "36px", background: '#f5f5f9' }}>
                    <div className="h100 flex-center" style={{ width: "32%" }}>期数</div>
                    <div className="h100 flex-center" style={{ width: "34%" }}>开奖结果</div>
                    <div className="h100 flex-center" style={{ width: "34%" }}>总和</div>
                </div>
                <div className="w100" style={{ height: "calc(100% - 36px)", overflow: "auto" }}>
                    {this.renderListView()}
                </div>
            </div >
        );
    }
}
