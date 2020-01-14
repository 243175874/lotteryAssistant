import React, { Component } from "react";
import { NavBar, Icon, ActivityIndicator } from 'antd-mobile';
import { post } from '../../../fetch/post.js';
import Prompt from '../../../components/dialog/prompt'
import MarkSixLottery from '../../../components/sixLotteryArea/markSixLottery'
class MarkSixLotteryRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            orderState: 0,
            fiveState: false,
            currentYear: new Date().getFullYear(),
            //开奖记录数据
            lotteryRecordList: [],
        };
    }

    componentWillMount() {
        let { currentYear, orderState } = this.state;
        this.getLotteryRecordList(currentYear, orderState);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    go(pageRouter) {
        this.props.history.push(pageRouter);
    }
    goToDetail(item) {
        this.props.history.push({ pathname: '/markSixlotteryDetail', query: item });
    }

    //排序
    order() {
        let orderState = 0;
        if (this.state.orderState == 0) {
            orderState = 1;
        } else {
            orderState = 0;
        }
        this.setState({ orderState });
        this.getLotteryRecordList(this.state.currentYear, orderState);
    }

    //获取开奖记录数据
    getLotteryRecordList(year, order) {
        this.setState({ loading: true });
        post('/v1/api/lottery/record', { year, order }).then(data => {
            if (data.code == 200) {
                this.setState({ lotteryRecordList: data.data });
            }
            this.setState({ loading: false });
        });
    }


    // //选择年份
    // promptFun() {
    //     let year = prompt("请输入年份", this.state.currentYear);
    //     year = Number(year);
    //     if (year < 2050 && year > 2000) {
    //         this.setState({ currentYear: year });
    //         this.filterHistoryListByYear(year, this.state.orderState);
    //     }
    // }

    // //升序
    // orderByAscending() {
    //     let data = this.state.lotteryRecordList.sort((a, b) => a.period - b.period)
    //     this.setState({ lotteryRecordList: data });
    // }

    // //降序
    // orderByDescending() {
    //     let data = this.state.lotteryRecordList.sort((a, b) => b.period - a.period)
    //     this.setState({ lotteryRecordList: data });
    // }

    //根据年份筛选
    filterHistoryListByYear(year, orderState) {
        this.getLotteryRecordList(year, orderState);
    }


    //选中五行按钮，显示彩球的五行属性
    selectedFive() {
        let fiveState = this.state.fiveState ? false : true;
        this.setState({ fiveState: fiveState });
    }

    //选择年份
    promptCallback(value) {
        let year = Number(value);
        if (year < 2050 && year > 2000) {
            this.setState({ currentYear: value });
            this.filterHistoryListByYear(value, this.state.orderState);
        }
    }

    //渲染六合彩列表
    renderMarkSixLotteryList() {
        return this.state.lotteryRecordList.map((item, index) => {
            return (
                <div key={index} className="w100 flex" onClick={() => { this.goToDetail(item) }}
                    style={{ height: "50px", background: index % 2 != 0 ? "#f5f5f9" : "white" }}>
                    <div className="h100 flex-center" style={{ width: "55px", fontSize: "12px" }}>
                        {item.period}期
                    </div>
                    <div className="h100" style={{ width: "calc(100% - 55px)" }}>
                        <MarkSixLottery number={item.numbers.split(',')} attribute={item.wx.split(',')} five={item.sx.split(',')} fiveState={this.state.fiveState}>
                        </MarkSixLottery>
                    </div>
                </div>
            )
        });
    }

    render() {
        //按钮通用样式
        let baseBtnStyle = { boxSizing: "border-box", width: "13.5%", height: "75%", fontSize: "11px", borderRadius: "15px" }
        //按钮普通样式
        let btnStyle = { color: "#999999", border: "1px solid #999999" };
        //合并样式对象
        Object.assign(btnStyle, baseBtnStyle);
        //第二个按钮增加一个样式
        let btn2Style = { marginLeft: "10px" };
        //合并样式对象
        Object.assign(btn2Style, btnStyle);
        //第二个样式和第三个一样，直接赋值
        let btn3Style = btn2Style;
        //创建选中样式对象
        let btn2StyleSelected = { color: "white", background: "#ff7344", marginLeft: "10px" };
        //合并样式对象
        Object.assign(btn2StyleSelected, baseBtnStyle);
        //用表达式判断五行（第二个）的按钮是否是选中样式
        btn2Style = this.state.fiveState ? btn2StyleSelected : btn2Style;

        //头部彩球序号样式
        const itemWidth = { width: "12.5%" };


        return (
            <div className="wh100">
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <Prompt value={this.state.currentYear} callback={this.promptCallback.bind(this)} ref="prompt" title={"请输入年份"}></Prompt>
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                    rightContent={[
                        <div onClick={() => this.props.history.push('/calendar')} style={{ padding: '10px', paddingRight: '0' }} key="1">搅珠日期</div>
                    ]}
                >开奖记录</NavBar>
                <div className="w100" style={{ height: "91%" }}>
                    <div className="w100 flex align-item-center" style={{ height: "30px", background: "white" }}>
                        <div className="h100 flex align-item-center"
                            style={{ width: "45%", paddingLeft: "6%", fontSize: "13px", color: "#ff7344" }}>
                            {this.state.currentYear}
                            年历史推荐
                         </div>
                        <div className="flex-center" style={btnStyle} onClick={() => { this.order() }}>{this.state.orderState == 0 ? "升序" : "降序"}</div>
                        <div className="flex-center" style={btn2Style} onClick={() => { this.selectedFive() }}>五行</div>
                        <div className="flex-center" style={btn3Style} onClick={() => { this.refs.prompt.setState({ isShow: true }) }}>{this.state.currentYear}</div>
                    </div>
                    <div className="w100" style={{ height: "calc(100% - 30px)" }}>
                        <div className="w100 flex" style={{ height: "30px", fontSize: "12px" }}>
                            <div className="h100 flex-center" style={{ width: "55px" }}>期数</div>
                            <ul className="h100 flex" style={{ width: "calc(100% - 55px)" }}>
                                <li className="flex-center" style={itemWidth}>一</li>
                                <li className="flex-center" style={itemWidth}>二</li>
                                <li className="flex-center" style={itemWidth}>三</li>
                                <li className="flex-center" style={itemWidth}>四</li>
                                <li className="flex-center" style={itemWidth}>五</li>
                                <li className="flex-center" style={itemWidth}>六</li>
                                <li className="flex-center" style={{ width: "10%" }}></li>
                                <li className="flex-center" style={itemWidth}>特</li>
                            </ul>
                        </div>
                        <div className="w100" style={{ height: "calc(100% - 30px)", overflow: "auto" }}>
                            {this.renderMarkSixLotteryList()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MarkSixLotteryRecord
