import React, { Component } from "react";
import LotteryAPI from '../../assets/js/lotteryAPI'
import { post } from '../../fetch/post'
import emitter from '../../assets/js/events'
import { ActivityIndicator, Toast } from 'antd-mobile';
import Common from '../../assets/js/common'
import { connect } from 'react-redux'
import { setCurrentPeriods } from '../../redux/action'
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

    //获取大小历史数据
    getHistoryService(id, number) {
        this.setState({ loading: true });
        post('/v1/api/arrondi/history_ds', { id }).then(data => {
            this.setState({ loading: false });
            if (data.code = 200) {
                this.setState({ list: data.data });
            } else {
                this.setState({ list: [] });
            }
        });
    }

    renderTitleView() {
        return this.props.titleList.map((item, index) => {
            return (
                <div key={index} className="flex-center" style={{ flex: "1", background: '#f5f5f9', borderRight: "0.1px solid #E6E6E6" }}>{item}</div>
            );
        });
    }

    renderTitleBottomView() {
        let style = { width: "65%", height: "70%", borderRadius: "50%", color: "white" }
        return this.props.titleList.map((item, index) => {
            return (
                <div key={index} className="flex" style={{ flex: "1", borderRight: "0.5px solid #E6E6E6", borderBottom: "0.5px solid #E6E6E6" }}>
                    <div className="w50 h100 flex-center">
                        <div className="flex-center" style={{ ...style, background: "#ff3344" }}>单</div>
                    </div>
                    <div className="w50 h100 flex-center">
                        <div className="flex-center" style={{ ...style, background: "#0068b7" }}>双</div>
                    </div>
                </div >
            );
        });
    }

    renderDateListView() {
        return this.state.list.map((item, index) => {
            return (<div className="w100 flex-center" style={{ height: "30px", borderRight: "0.5px solid #E6E6E6", background: index % 2 !== 0 ? '#f5f5f9' : "white" }} key={index}>{item.number}</div>)
        })
    }

    renderListView() {
        return this.state.list.map((item, index) => {
            return (<div className="flex" key={index} style={{ width: this.props.width, height: "30px", background: index % 2 !== 0 ? '#f5f5f9' : "white" }}>
                {
                    item.data.map((element, j) => {
                        let odd = element.v[0].key == "单" ? element.v[0].value : element.v[1].value;
                        let even = element.v[0].key == "双" ? element.v[0].value : element.v[1].value;

                        return (
                            <div className="flex" key={j} style={{ flex: "1", borderRight: "0.5px solid #E6E6E6" }}>
                                <div className="w50 h100 flex-center" style={{ color: "#ff3344" }}>{odd}</div>
                                <div className="w50 h100 flex-center" style={{ color: "#0068b7" }}>{even}</div>
                            </div>)
                    })
                }
            </div>)
        })
    }

    render() {
        return (
            <div className="wh100" style={{ fontSize: "12px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="w100 flex-center" style={{ height: "36px", fontSize: "12px", borderTop: "1px solid #E6E6E6", fontSize: "15px" }}>
                    单双历史
                </div>
                <div className="w100 flex" style={{ height: "60px" }}>
                    <div className="h100" style={{ width: "20%" }}>
                        <div className="h50 flex-center" style={{ background: '#f5f5f9', borderRight: "0.5px solid #E6E6E6" }}>日期</div>
                        <div className="h50" style={{ borderRight: "0.5px solid #E6E6E6", borderBottom: "0.5px solid #E6E6E6" }}></div>
                    </div>

                    <div className="h100" ref="title" style={{ width: "80%", overflow: "auto" }}>
                        <div className="h50 flex" style={{ width: this.props.width, flexDirection: "row" }}>
                            {this.renderTitleView()}
                        </div>
                        <div className="h50 flex" style={{ width: this.props.width, flexDirection: "row" }}>
                            {this.renderTitleBottomView()}
                        </div>
                    </div>
                </div>
                <div className="w100 flex" style={{ height: "calc(100% - 96px)" }}>
                    <div className="clearfix" ref="dateList" style={{ width: "20%", overflow: "auto" }}>
                        {this.renderDateListView()}
                    </div>
                    <div className="clearfix" ref="viewList" style={{ width: "80%", overflow: "auto" }}>
                        {this.renderListView()}
                    </div>
                </div>
            </div >
        );
    }
}
