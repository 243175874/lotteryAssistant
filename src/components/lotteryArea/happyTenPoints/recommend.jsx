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
        //获取免费参考数据
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

    //获取免费参考数据
    getRecommend(id) {
        LotteryAPI.getRecommendService(id).then(data => {
            this.setState({ loading: false });
            if (data.code == 200) {
                this.setState({ list: data.data.history_yc });
            } else {
                this.setState({ list: [] });
            }
        })
    }

    //渲染开奖号码
    renderNumber(list) {
        return list.map((item, index) => {
            return (
                <div key={index} className="flex-center" style={{ width: "26px", height: "26px", marginLeft: "6px", background: "#FF3344", color: "white", borderRadius: "50%" }}>{item}</div>
            )
        });
    }

    //渲染预测数据
    renderRecommend(recommedList, code) {
        let isHasCode = recommedList.indexOf(code);
        return recommedList.map((item, index, array) => {
            if (array.length - 1 == index) {
                //最后一行没有逗号
                return (
                    <div style={{ color: item == code ? "#FF3344" : "black" }} key={index}>
                        <span>{item}</span>
                        <span style={{ display: isHasCode > -1 ? "inline-block" : "none", marginLeft: "10px", color: "#FF3344" }}>（中）</span>
                        <span style={{ display: isHasCode == -1 ? "inline-block" : "none", marginLeft: "10px" }}>（不中）</span>
                    </div>
                )
            } else {
                return (<span style={{ color: item == code ? "#FF3344" : "black" }} key={index}>{item},</span>)
            }
        });
    }

    renderListView() {
        return this.state.list.map((item, index) => {
            return (
                <div key={index} className="w100 clearfix" style={{ fontSize: "12px", color: "black" }}>
                    <div className="w100 flex align-item-center" style={{ height: "30px", fontSize: "12px", background: "#E6E6E6" }}>
                        <div style={{ marginLeft: "10px" }}>第{item.number}期</div>
                    </div>
                    <div className="w100 flex" style={{ height: "42px", padding: "8px 3px" }}>
                        {this.renderNumber(item.kj)}
                    </div>
                    {/* <div className="w100 flex" style={{ height: "40px", borderTop: "1px solid #E6E6E6" }}>
                        <div className="h100 flex-center" style={{ width: "80px", borderRight: "1px solid #E6E6E6" }}>第一球</div>
                        <div className="h100 flex-center" style={{ width: "calc(100% - 80px)" }}>{this.renderRecommend(item.yc[0].v, item.kj[0])}</div>
                    </div>

                    <div className="w100 flex" style={{ height: "40px", borderTop: "1px solid #E6E6E6", borderBottom: "1px solid #E6E6E6" }}>
                        <div className="h100 flex-center" style={{ width: "80px", borderRight: "1px solid #E6E6E6" }}>第二球</div>
                        <div className="h100 flex-center" style={{ width: "calc(100% - 80px)" }}>{this.renderRecommend(item.yc[1].v, item.kj[1])}</div>
                    </div>

                    <div className="w100 flex" style={{ height: "40px", borderTop: "1px solid #E6E6E6", borderBottom: "1px solid #E6E6E6" }}>
                        <div className="h100 flex-center" style={{ width: "80px", borderRight: "1px solid #E6E6E6" }}>第三球</div>
                        <div className="h100 flex-center" style={{ width: "calc(100% - 80px)" }}>{this.renderRecommend(item.yc[2].v, item.kj[2])}</div>
                    </div>

                    <div className="w100 flex" style={{ height: "40px", borderTop: "1px solid #E6E6E6", borderBottom: "1px solid #E6E6E6" }}>
                        <div className="h100 flex-center" style={{ width: "80px", borderRight: "1px solid #E6E6E6" }}>第四球</div>
                        <div className="h100 flex-center" style={{ width: "calc(100% - 80px)" }}>{this.renderRecommend(item.yc[3].v, item.kj[3])}</div>
                    </div>

                    <div className="w100 flex" style={{ height: "40px", borderTop: "1px solid #E6E6E6", borderBottom: "1px solid #E6E6E6" }}>
                        <div className="h100 flex-center" style={{ width: "80px", borderRight: "1px solid #E6E6E6" }}>第五球</div>
                        <div className="h100 flex-center" style={{ width: "calc(100% - 80px)" }}>{this.renderRecommend(item.yc[4].v, item.kj[4])}</div>
                    </div>

                    <div className="w100 flex" style={{ height: "40px", borderTop: "1px solid #E6E6E6", borderBottom: "1px solid #E6E6E6" }}>
                        <div className="h100 flex-center" style={{ width: "80px", borderRight: "1px solid #E6E6E6" }}>第六球</div>
                        <div className="h100 flex-center" style={{ width: "calc(100% - 80px)" }}>{this.renderRecommend(item.yc[5].v, item.kj[5])}</div>
                    </div>

                    <div className="w100 flex" style={{ height: "40px", borderTop: "1px solid #E6E6E6", borderBottom: "1px solid #E6E6E6" }}>
                        <div className="h100 flex-center" style={{ width: "80px", borderRight: "1px solid #E6E6E6" }}>第七球</div>
                        <div className="h100 flex-center" style={{ width: "calc(100% - 80px)" }}>{this.renderRecommend(item.yc[6].v, item.kj[6])}</div>
                    </div>

                    <div className="w100 flex" style={{ height: "40px", borderTop: "1px solid #E6E6E6", borderBottom: "1px solid #E6E6E6" }}>
                        <div className="h100 flex-center" style={{ width: "80px", borderRight: "1px solid #E6E6E6" }}>第八球</div>
                        <div className="h100 flex-center" style={{ width: "calc(100% - 80px)" }}>{this.renderRecommend(item.yc[7].v, item.kj[7])}</div>
                    </div> */}
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
