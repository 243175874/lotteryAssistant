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
        this.titleList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
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
        //滚动条操作
        this.srcollOperation();
    }

    listenerCallback = () => {
        setTimeout(() => {
            this.getHistoryService(this.props.id, this.props.currentPeriods);
        }, 500);
    }

    componentWillUnmount() {
        this.emitter.removeListener("emitChangeNumber", this.listenerCallback)
    }

    //滚动条操作
    srcollOperation() {
        let titleDom = this.refs.title;
        let viewListDom = this.refs.viewList;
        let dateListDom = this.refs.dateList;
        titleDom.addEventListener('scroll', () => {
            viewListDom.scrollLeft = titleDom.scrollLeft;
        });

        viewListDom.addEventListener('scroll', () => {
            titleDom.scrollLeft = viewListDom.scrollLeft;
        });

        viewListDom.addEventListener('scroll', () => {
            dateListDom.scrollTop = viewListDom.scrollTop;
        });

        dateListDom.addEventListener('scroll', () => {
            viewListDom.scrollTop = dateListDom.scrollTop;
        });
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

    renderTitleView() {
        return this.titleList.map((item, index) => {
            return (
                <div key={index} className="flex-center" style={{ flex: "1", background: '#f5f5f9' }}>{item}</div>
            );
        });
    }

    renderListView() {
        return this.state.list.map((item, index) => {
            return (
                <div className="w100 flex" style={{ width: "210%", height: "30px", flexDirection: "row", background: index % 2 !== 0 ? '#f5f5f9' : "white" }} key={index}>
                    {item.data.map((element, i) => {
                        return (<div className="flex-center" key={i} style={{ flex: "1" }}>{element.num}</div>)
                    })}
                </div>
            )
        });
    }

    renderDateListView() {
        return this.state.list.map((item, index) => {
            return (<div className="w100 flex-center" style={{ height: "30px", background: index % 2 !== 0 ? '#f5f5f9' : "white" }} key={index}>{item.number}</div>)
        })
    }

    render() {
        return (
            <div className="wh100" style={{ fontSize: "12px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="w100 flex-center" style={{ height: "36px", borderTop: "1px solid rgb(153, 153, 153)" }}>号码统计</div>

                <div className="w100 flex" style={{ height: "30px" }}>
                    <div className="h100" style={{ width: "20%" }}>
                        <div className="h100 flex-center" style={{ background: '#f5f5f9' }}>日期</div>
                    </div>

                    <div className="h100" ref="title" style={{ width: "80%", overflow: "auto" }}>
                        <div className="h100 flex" style={{ width: "210%", flexDirection: "row" }}>
                            {this.renderTitleView()}
                        </div>
                    </div>
                </div>
                <div className="w100 flex" style={{ height: "calc(100% - 66px)" }}>
                    <div className="clearfix" ref="dateList" style={{ width: "20%", overflow: "auto" }}>
                        {this.renderDateListView()}
                    </div>
                    <div className="clearfix" ref="viewList" style={{ width: "80%", overflow: "auto" }}>
                        {this.renderListView()}
                    </div>
                </div>

                {/* <div className="w100 flex" style={{ height: "34px", flexDirection: "row", background: '#f5f5f9' }}>
                    <div className="flex-center" style={{ flex: "2" }}>日期</div>
                    <div className="flex-center" style={{ flex: "1" }}>1</div>
                    <div className="flex-center" style={{ flex: "1" }}>2</div>
                    <div className="flex-center" style={{ flex: "1" }}>3</div>
                    <div className="flex-center" style={{ flex: "1" }}>4</div>
                    <div className="flex-center" style={{ flex: "1" }}>5</div>
                    <div className="flex-center" style={{ flex: "1" }}>6</div>
                    <div className="flex-center" style={{ flex: "1" }}>7</div>
                    <div className="flex-center" style={{ flex: "1" }}>8</div>
                    <div className="flex-center" style={{ flex: "1" }}>9</div>
                    <div className="flex-center" style={{ flex: "1" }}>10</div>
                    <div className="flex-center" style={{ flex: "1" }}>11</div>
                    <div className="flex-center" style={{ flex: "1" }}>12</div>
                    <div className="flex-center" style={{ flex: "1" }}>13</div>
                    <div className="flex-center" style={{ flex: "1" }}>14</div>
                    <div className="flex-center" style={{ flex: "1" }}>15</div>
                    <div className="flex-center" style={{ flex: "1" }}>16</div>
                    <div className="flex-center" style={{ flex: "1" }}>17</div>
                    <div className="flex-center" style={{ flex: "1" }}>18</div>
                    <div className="flex-center" style={{ flex: "1" }}>19</div>
                    <div className="flex-center" style={{ flex: "1" }}>20</div>
                </div>
                <div className="w100" style={{ height: "calc(100% - 70px)", overflow: "auto" }}>
                    {this.renderListView()}
                </div> */}
            </div>
        );
    }
}
