import React, { Component } from "react";
import LotteryAPI from '../../../assets/js/lotteryAPI'
import { ActivityIndicator } from 'antd-mobile';
import emitter from '../../../assets/js/events'
export default class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.getRecommend(nextProps.id);
    }

    componentWillMount() {
        //获取参考计划数据
        this.getRecommend(this.props.id);
    }

    componentDidMount() {
        //根据改变的期数，加载相应的数据
        this.emitter = emitter.on("emitChangeNumber", this.listenerCallback);
    }

    listenerCallback = () => {
        setTimeout(() => {
            //获取历史数据
            this.getRecommend(this.props.id);
        }, 500);
    }

    componentWillUnmount() {
        this.emitter.removeListener("emitChangeNumber", this.listenerCallback)
    }

    //获取参考计划数据
    getRecommend(id) {
        LotteryAPI.getRecommendService(id).then(data => {
            //console.log(data);
            if (data.code == 200) {
                this.setState({ list: data.data.history_yc });
            } else {
                this.setState({ list: [] });
            }
            this.setState({ loading: false });
        })
    }

    //渲染开奖号码
    renderNumber(list) {
        return list.map((item, index, array) => {
            let div = "";
            if (index == 0 || index == 1) {
                div = (
                    <div key={index} className="flex">
                        <div className="flex-center" style={{ width: "26px", height: "26px", marginLeft: "6px", background: "rgb(188, 188, 188)", color: "white", borderRadius: "50%" }}>{item}</div>
                        <div className="flex-center" style={{ width: "10px", height: "26px", marginLeft: "6px", fontSize: "16px" }}>+</div>
                    </div>)
            } else if (index == 2) {
                let sum = array.reduce((prev, cur) => {
                    return Number(prev) + Number(cur);
                });
                div = (
                    <div key={index} className="flex">
                        <div className="flex-center" style={{ width: "26px", height: "26px", marginLeft: "6px", background: "rgb(188, 188, 188)", color: "white", borderRadius: "50%" }}>{item}</div>
                        <div className="flex-center" style={{ width: "10px", height: "26px", marginLeft: "6px", fontSize: "16px" }}>=</div>
                        <div className="flex-center" style={{ width: "26px", height: "26px", marginLeft: "6px", background: "#FF3344", color: "white", borderRadius: "50%" }}>{sum}</div>
                    </div>)
            }
            return div;
        });
    }

    //渲染预测数据
    renderRecommend(recommedList, kj_data, i = 0) {
        //console.log(recommedList);
        //console.log(kj_data);
        //计算开奖总和
        let sum = 0;
        kj_data.forEach(element => {
            sum += Number(element);
        });
        if (recommedList[i] == null) {
            return;
        }
        let list = recommedList[i].v;
        let isWin = 0;
        if (i == 0) {
            isWin = list.indexOf(sum);
        } else if (i == 1) {
            let state = sum > 13 ? "大" : "小";
            isWin = state == list ? 1 : -1;
        } else if (i == 2) {
            let state = sum % 2 == 0 ? "双" : "单";
            isWin = state == list ? 1 : -1;
        }
        return list.map((item, index, array) => {
            if (array.length - 1 == index) {
                //最后一行没有逗号
                return (
                    <div key={index}>
                        <span>{item}</span>
                        {
                            kj_data.length > 0 ?
                                <span style={{ fontSize: "13px" }}>
                                    <span style={{ display: isWin > -1 ? "inline-block" : "none", marginLeft: "10px", color: "#FF3344" }}>（中）</span>
                                    <span style={{ display: isWin == -1 ? "inline-block" : "none", marginLeft: "10px" }}>（挂）</span>
                                </span>
                                : ""
                        }
                    </div >
                )
            } else {
                return (<span key={index}>{item},</span>)
            }
        });
    }

    //预测号码列表
    renderRecommendList(item) {
        return this.props.numberTitle.map((element, index) => {
            return (
                <div key={index} className="w100 flex" style={{ height: "40px", borderTop: "1px solid #E6E6E6", fontSize: "14px" }}>
                    <div className="h100 flex-center" style={{ width: "80px", borderRight: "1px solid #E6E6E6" }}>{this.renderLabel(index)}</div>
                    <div className="h100 flex-center" style={{ width: "calc(100% - 80px)" }}>{this.renderRecommend(item.data, item.kj_data, index)}</div>
                </div>
            )
        });
    }

    renderLabel(index) {
        let label = "特码";
        if (index == 0) {
            label = "特码";
        } else if (index == 1) {
            label = "大小";
        } else if (index == 2) {
            label = "单双";
        }
        return <span>{label}</span>
    }

    renderListView() {
        return this.state.list.map((item, index) => {
            //console.log(item);
            return (
                <div key={index} className="w100 clearfix" style={{ fontSize: "12px", color: "black" }}>
                    <div className="w100 flex align-item-center" style={{ height: "30px", fontSize: "12px", background: "#E6E6E6" }}>
                        <div style={{ marginLeft: "10px" }}>第{item.number}期</div>
                    </div>
                    <div className="w100 flex" style={{ height: "42px", padding: "8px 3px", display: item.kj_data.length > 0 ? "flex" : "none" }}>
                        {this.renderNumber(item.kj_data)}
                    </div>
                    {this.renderRecommendList(item)}
                </div>
            )
        });
    }

    render() {
        return (
            <div className="wh100" style={{ overflow: "auto" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="w100 clearfix">
                    <div className="w100 flex" style={{ height: "36px", fontSize: "12px", color: "#FF3344", borderTop: "1px solid #E6E6E6" }}>
                        <div className="w50 h100 flex align-item-center" style={{ justifyContent: "flex-end", paddingRight: "10px" }}>每天推荐计划时间段</div>
                        <div className="w50 h100">
                            <div className="w100 h50">时间段一：10:50:00-15:00:00</div>
                            <div className="w100 h50">时间段二：17:55:00-23:00:00</div>
                        </div>
                    </div>
                    <div className="w100 clearfix">
                        {this.renderListView()}
                    </div>
                </div>
            </div>
        );
    }
}
