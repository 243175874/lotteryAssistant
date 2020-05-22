import React, { Component } from "react";
import { NavBar, Icon, ActivityIndicator } from 'antd-mobile';
import { post } from '../../../fetch/post.js';
import Prompt from '../../../components/dialog/prompt'
import ChooesDialog from './chooesDialog'
export default class LotteryQueryAssistant extends Component {
    constructor(props) {
        super(props);
        this.recordOriginalList = [];//开奖记录原始数组，备份
        this.lineData = [];//连线坐标数组
        this.state = {
            loading: true,
            isShowDialog: false,//显示使用方法弹出框
            isChoose: false,//仅显示出现的期数
            dialogMenuSelected: "number",
            dialogSelectedValues: [],//弹出框的筛选条件
            currentYear: new Date().getFullYear(),
            recordList: null,//开奖记录数组
            list: [],//渲染数组
            redBgElement: [],//红色背景数据
            //recordListStatus: "number",//记录列表的状态
            isShowChooesDialog: false, // 是否显示筛选弹出框
        };
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    componentWillMount() {
        //获取开奖记录数据
        this.getLotteryRecordList(this.state.currentYear);
    }

    //选中（仅显示出现的期数）
    isShowAllList() {
        this.setState({ isChoose: this.state.isChoose ? false : true });
        //setState方法会延迟，用这个方法能够立即生效，但是没有页面绑定效果，页面绑定效果等上面的方法生效即可
        this.state.isChoose = this.state.isChoose ? false : true;
        this.switchShowList();
    }

    switchShowList() {
        if (this.state.dialogMenuSelected == "number") {
            this.onlyShowPartList(this.state.recordList, this.state.isChoose, this.state.redBgElement);
        } else if (this.state.dialogMenuSelected == "号码" || this.state.dialogMenuSelected == "生肖" ||
            this.state.dialogMenuSelected == "五行" || this.state.dialogMenuSelected == "波色" ||
            this.state.dialogMenuSelected == "家野" || this.state.dialogMenuSelected == "尾数") {
            this.onlyShowPartList(this.state.recordList, this.state.isChoose, this.state.dialogSelectedValues, this.state.dialogMenuSelected);
        }
    }

    //开奖数字列表 切换选中（仅显示出现的期数）
    onlyShowPartList(dataList, isChoose, selectedValue, selectedMenu = "number") {
        if (isChoose) {
            let data = dataList;
            // 筛选
            if ((selectedMenu == "number" || selectedMenu == "号码") && selectedValue.length > 0) {
                data = dataList.filter(item => item.numbers.indexOf(selectedValue[0]) != -1 ||
                    item.numbers.indexOf(selectedValue[1]) != -1 || item.numbers.indexOf(selectedValue[2]) != -1);
            } else if (selectedMenu == "生肖" && selectedValue.length > 0) {
                data = dataList.filter(item => item.sx.indexOf(selectedValue[0]) != -1 ||
                    item.sx.indexOf(selectedValue[1]) != -1 || item.sx.indexOf(selectedValue[2]) != -1);
            } else if (selectedMenu == "五行" && selectedValue.length > 0) {
                data = dataList.filter(item => item.wx.indexOf(selectedValue[0]) != -1);
            } else if (selectedMenu == "波色" && selectedValue.length > 0) {
                data = dataList.filter(item => item.bs.indexOf(selectedValue[0][0]) != -1);
            } else if (selectedMenu == "家野" && selectedValue.length > 0) {
                data = dataList.filter(item => item.jy.indexOf(selectedValue[0][0]) != -1);
            } else if (selectedMenu == "尾数" && selectedValue.length > 0) {
                data = dataList.filter(item => item.ws.indexOf(selectedValue[0][0]) != -1);
            }
            this.setState({ list: this.initRecordList(data) });
        } else {
            this.setState({ list: this.initRecordList(dataList) });
        }
    }

    //获取开奖记录数据
    getLotteryRecordList(year) {
        post('/v1/api/lottery/search', { year }).then(data => {
            if (data.code == 200) {
                let list = data.data;
                // data = data.data.sort((a, b) => b.action - a.action);
                this.setState({ redBgElement: [list.length > 0 ? list[0].numbers[6] : ''] }); //设置红色背景数据
                this.setState({ recordList: list });
                this.recordOriginalList = list;
                this.setState({ list: this.initRecordList(list) });
            }
            this.setState({ loading: false });//关闭loading

        });
    }

    //初始化记录列表
    initRecordList(data) {
        let list = [];
        data.forEach(item => {
            let data = [];
            if (this.state.dialogMenuSelected == 'number' || this.state.dialogMenuSelected == '号码' ||
                this.state.dialogMenuSelected == '尾数') {
                data = item.numbers;
            } else if (this.state.dialogMenuSelected == '生肖') {
                data = item.sx;
            } else if (this.state.dialogMenuSelected == '五行') {
                data = item.wx;
            } else if (this.state.dialogMenuSelected == '波色') {
                data = item.bs;
            } else if (this.state.dialogMenuSelected == '家野') {
                data = item.jy;
            }
            list.push({ 'date': item.year, 'action': item.period, 'kj_data': data });
        });
        return list;
    }

    //选择年份
    promptCallback(value) {
        let year = Number(value);
        if (year < 2050 && year > 2000) {
            this.setState({ currentYear: value });
            this.getLotteryRecordList(value);
        }
    }

    //根据年份查询
    // getRecordListByYear(year) {
    //     let data = this.recordOriginalList.filter(item => {
    //         return new Date(item.kj_time).getFullYear() == year;
    //     });
    //     this.state.redBgElement = data.length > 0 ? [data[0].kj_data[6]] : []; //设置红色背景数据
    //     this.state.recordList = data;
    //     this.switchShowList();
    // }

    dialogSubmit(selected, values) {
        //this.setState({ dialogMenuSelected: selected, dialogSelectedValues: values });
        this.state.dialogMenuSelected = selected;
        this.state.dialogSelectedValues = values;
        this.switchShowList();
    }

    renderRecordItemView(item, index) {
        const baseStyle = { width: "20px", height: "20px", borderRadius: "50%" }
        return item.kj_data.map((element, i) => {
            if (this.state.dialogMenuSelected == "number") {
                const b = this.state.redBgElement.indexOf(element) != -1;
                let redBgStyle = { background: b ? "#FF3344" : "none", color: b ? "white" : "black" };
                Object.assign(redBgStyle, baseStyle);
                if (b) {
                    this.lineData.push({ x: index, y: i });
                }
                return (
                    <li key={i} className="flex-center" style={{ width: "14.2%", borderLeft: "1px solid #D6D6D6" }}>
                        <div className="flex-center" style={redBgStyle}>{element}</div>
                    </li>
                )
            } else if (this.state.dialogMenuSelected == "号码" || this.state.dialogMenuSelected == "生肖") {
                if (this.state.dialogSelectedValues[0] == element) {
                    let redBgStyle = { background: "#FF3344", color: "white" };
                    Object.assign(redBgStyle, baseStyle);
                    return (
                        <li key={i} className="flex-center" style={{ width: "14.2%", borderLeft: "1px solid #D6D6D6" }}>
                            <div className="flex-center" style={redBgStyle}>{element}</div>
                        </li>
                    )
                } else if (this.state.dialogSelectedValues[1] == element) {
                    let greenBgStyle = { background: "green", color: "white" };
                    Object.assign(greenBgStyle, baseStyle);
                    return (
                        <li key={i} className="flex-center" style={{ width: "14.2%", borderLeft: "1px solid #D6D6D6" }}>
                            <div className="flex-center" style={greenBgStyle}>{element}</div>
                        </li>
                    )
                } else if (this.state.dialogSelectedValues[2] == element) {
                    let blueBgStyle = { background: "blue", color: "white" };
                    Object.assign(blueBgStyle, baseStyle);
                    return (
                        <li key={i} className="flex-center" style={{ width: "14.2%", borderLeft: "1px solid #D6D6D6" }}>
                            <div className="flex-center" style={blueBgStyle}>{element}</div>
                        </li>
                    )
                } else {
                    return (
                        <li key={i} className="flex-center" style={{ width: "14.2%", borderLeft: "1px solid #D6D6D6" }}>
                            <div className="flex-center" >{element}</div>
                        </li>
                    )
                }
            } else if (this.state.dialogMenuSelected == "五行") {
                const b = this.state.dialogSelectedValues[0] == element;
                let redBgStyle = { background: b ? "#FF3344" : "none", color: b ? "white" : "black" };
                Object.assign(redBgStyle, baseStyle);
                return (
                    <li key={i} className="flex-center" style={{ width: "14.2%", borderLeft: "1px solid #D6D6D6" }}>
                        <div className="flex-center" style={redBgStyle}>{element}</div>
                    </li>
                )
            } else if (this.state.dialogMenuSelected == "波色" || this.state.dialogMenuSelected == "家野") {
                const b = this.state.dialogSelectedValues[0][0] == element;
                let redBgStyle = { background: b ? "#FF3344" : "none", color: b ? "white" : "black", ...baseStyle };
                return (
                    <li key={i} className="flex-center" style={{ width: "14.2%", borderLeft: "1px solid #D6D6D6" }}>
                        <div className="flex-center" style={redBgStyle}>{element[0]}</div>
                    </li>
                )
            } else if (this.state.dialogMenuSelected == "尾数") {
                let val = this.state.dialogSelectedValues.length > 0 ? this.state.dialogSelectedValues[0][0] : ""
                const b = val == element[1];
                let redBgStyle = { background: b ? "#FF3344" : "none", color: b ? "white" : "black" };
                Object.assign(redBgStyle, baseStyle);
                return (
                    <li key={i} className="flex-center" style={{ width: "14.2%", borderLeft: "1px solid #D6D6D6" }}>
                        <div className="flex-center" style={redBgStyle}>{element}</div>
                    </li>
                )
            }
        })
    }

    //渲染记录列表
    renderRecordListView() {
        this.lineData = []; //每次开始渲染初始化划线坐标
        return this.state.list.map((item, index, array) => {
            //console.log(item);
            return (
                <div key={index} className="w100 flex" style={{
                    height: "30px", fontSize: "12px", background: index % 2 == 0 ? "white" : "#F6F7FB",
                    borderBottom: array.length - 1 == index ? "1px solid #D6D6D6" : "0"
                }}>
                    <div className="h100 flex-center" style={{ width: "90px" }}>{item.date}年/{item.action}期</div>
                    <ul className="h100 flex" style={{ width: "calc(100% - 90px)" }}>
                        {this.renderRecordItemView(item, index)}
                    </ul>
                </div>)
        });
    }

    render() {
        const dialogBgStyle = {
            display: this.state.isShowDialog ? "block" : "none",
            position: "fixed", top: "0", left: "0", background: 'rgba(0, 0, 0, 0.3)'
        };

        const dialogStyle = {
            position: "fixed", width: "289px", height: "385px",
            top: "20%", left: "50%", marginLeft: "-145px",
            background: `url(${require('../../../assets/img/mark_six/question.png')})`,
            backgroundSize: "100% 100%"
        };

        const dialogBtnStyle = {
            width: "250px", height: "42px", background:`url(${require('../../../assets/img/mark_six/question-btn.png')})`,
            backgroundSize: "100% 100%", margin: "0 auto", marginTop: "330px", color: "white"
        };

        //按钮通用样式
        let baseBtnStyle = { boxSizing: "border-box", width: "13.5%", height: "75%", fontSize: "11px", borderRadius: "15px", color: "#999999", border: "1px solid #999999" }
        let btnStyle = { marginLeft: "20%" }
        //合并样式对象
        Object.assign(btnStyle, baseBtnStyle);
        let btnStyle2 = { marginLeft: "3%" }
        //合并样式对象
        Object.assign(btnStyle2, baseBtnStyle);
        //头部彩球序号样式
        const itemWidth = { width: "14.2%", borderLeft: "1px solid #D6D6D6" };
        return (
            <div className="wh100">
                <div className="wh100" style={dialogBgStyle}>
                    <div style={dialogStyle}>
                        <div className="flex-center" onClick={() => { this.setState({ isShowDialog: false }) }} style={dialogBtnStyle}>我知道了</div>
                    </div>
                </div>
                <Prompt value={this.state.currentYear} callback={this.promptCallback.bind(this)} ref="prompt" title={"请输入年份"}></Prompt>

                <ChooesDialog submit={this.dialogSubmit.bind(this)} ref="ChooesDialog"></ChooesDialog>

                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />

                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                    rightContent={[
                        <div onClick={() => { this.setState({ isShowDialog: true }) }} style={{ width: "20px" }} key="1">
                            <img className="w100" src={require("../../../assets/img/common/icon_tip_query.png")} />
                        </div>
                    ]}
                >查询助手</NavBar>

                <div className="w100 flex align-item-center" style={{ height: "30px", background: "white" }}>
                    <div className="h100 flex align-item-center"
                        style={{ width: "40%", paddingLeft: "4%", fontSize: "13px", color: "#ff7344" }}
                        onClick={() => { this.isShowAllList() }}>
                        <div style={{ width: "18px", height: "18px" }}>
                            <img className="w100" style={{ display: !this.state.isChoose ? "block" : "none" }} src={require("../../../assets/img/mark_six/icon_uncheck_lovers.png")} />
                            <img className="w100" style={{ display: this.state.isChoose ? "block" : "none" }} src={require("../../../assets/img/mark_six/icon_choose_lovers.png")} />
                        </div>
                        <div style={{ marginLeft: "5%" }}>仅显示出现的期数</div>
                    </div>
                    <div className="flex-center" style={btnStyle} onClick={() => { this.refs.prompt.setState({ isShow: true }) }}>{this.state.currentYear}</div>
                    <div className="flex-center" style={btnStyle2} onClick={() => { this.refs.ChooesDialog.open() }}>筛选</div>
                </div>

                <div className="w100 bgWhite" style={{ height: "calc(91% - 30px)" }}>
                    <header className="w100 flex" style={{ height: "30px", fontSize: "12px", background: "#E6E6E6" }}>
                        <div className="h100 flex-center" style={{ width: "90px" }}>年份/期数</div>
                        <ul className="h100 flex" style={{ width: "calc(100% - 90px)" }}>
                            <li className="flex-center" style={itemWidth}>一</li>
                            <li className="flex-center" style={itemWidth}>二</li>
                            <li className="flex-center" style={itemWidth}>三</li>
                            <li className="flex-center" style={itemWidth}>四</li>
                            <li className="flex-center" style={itemWidth}>五</li>
                            <li className="flex-center" style={itemWidth}>六</li>
                            <li className="flex-center" style={itemWidth}>特码</li>
                        </ul>
                    </header>
                    <main className="w100" style={{ height: "calc(100% - 30px)", overflow: "auto" }}>
                        {this.renderRecordListView()}
                    </main>
                </div>

            </div >
        );
    }
}
