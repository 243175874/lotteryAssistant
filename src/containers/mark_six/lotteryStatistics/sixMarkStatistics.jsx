import React, { Component } from "react";
import { Toast, ActivityIndicator } from 'antd-mobile'
import { post } from '../../../fetch/post.js';
import Alert from '../../../components/dialog/alert'
import Prompt from '../../../components/dialog/prompt'
//数据字典
const red = ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'];
const blue = ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48'];
const green = ['05', '06', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49'];
const number = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49"];
const color = ["红波", "蓝波", "绿波"];
const shuxiang = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
const weishu = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
//六合统计
export default class SixMarkStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            alertTitle: "",
            alertMessage: "",
            periods: 100,//期数
            recordList: [],//开奖记录
            //出现期数最多的号码
            kj_tm: [],//开奖特码号码
            kj_zm: [],//开奖正码号码
            bs_tm: [],//开奖特码波色
            bs_zm: [],//开奖正码波色
            sx_tm: [],//开奖特码属相
            sx_zm: [],//开奖正码属相
            wh_tm: [],//开奖特码尾数
            //当前遗漏期数最多的号码
            kj_tm_omit: [],//开奖特码号码
            kj_zm_omit: [],//开奖正码号码
            bs_tm_omit: [],//开奖特码波色
            bs_zm_omit: [],//开奖正码波色
            sx_tm_omit: [],//开奖特码属相
            sx_zm_omit: [],//开奖正码属相
            wh_tm_omit: [],//开奖特码尾数
        };
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    componentWillMount() {
        this.getLotteryStatistics(this.state.periods);
    }

    ActionAlert(title, message) {
        this.refs.alert.setState({ isShow: true });
        this.setState({ alertTitle: title, alertMessage: message });
    }


    //获取六合统计
    getLotteryStatistics(period) {
        this.setState({ loading: true });
        post('/v1/api/lottery/statistics', { period }).then(data => {
            if (data.code == 200) {
                this.setState({ recordList: data.data });
                let { kj_tm, kj_zm, bs_tm, bs_zm, sx_tm, sx_zm, ws_tm } = this.handleRecordList(data.data);
                //出现期数最多的号码
                //开奖特码号码
                let kj_tm_statistics = this.statisticsRecordList(kj_tm, number);
                this.setState({ kj_tm: kj_tm_statistics });
                //开奖正码号码
                let kj_zm_statistics = this.statisticsRecordList(kj_zm, number);
                this.setState({ kj_zm: kj_zm_statistics });
                //开奖特码波色
                let bs_tm_statistics = this.statisticsRecordList(bs_tm, color);
                this.setState({ bs_tm: bs_tm_statistics });
                //开奖正码波色
                let bs_zm_statistics = this.statisticsRecordList(bs_zm, color);
                this.setState({ bs_zm: bs_zm_statistics });
                //开奖特码属相
                let sx_tm_statistics = this.statisticsRecordList(sx_tm, shuxiang);
                this.setState({ sx_tm: sx_tm_statistics });
                //开奖正码属相
                let sx_zm_statistics = this.statisticsRecordList(sx_zm, shuxiang);
                this.setState({ sx_zm: sx_zm_statistics });
                //开奖尾号特码
                let wh_tm_statistics = this.statisticsRecordList(ws_tm, weishu);
                this.setState({ wh_tm: wh_tm_statistics });


                //当前遗漏期数最多的号码
                //开奖特码号码
                let kj_tm_omit = this.statisticsOmitRecordList(kj_tm, number);
                this.setState({ kj_tm_omit: kj_tm_omit });
                //开奖正码号码
                let kj_zm_omit = this.statisticsOmitRecordList(kj_zm, number);
                this.setState({ kj_zm_omit: kj_zm_omit });
                //开奖特码波色
                let bs_tm_omit = this.statisticsOmitRecordList(bs_tm, color);
                this.setState({ bs_tm_omit: bs_tm_omit });
                //开奖正码波色
                let bs_zm_omit = this.statisticsOmitRecordList(bs_zm, color);
                this.setState({ bs_zm_omit: bs_zm_omit });
                //开奖特码属相
                let sx_tm_omit = this.statisticsOmitRecordList(sx_tm, shuxiang);
                this.setState({ sx_tm_omit: sx_tm_omit });
                //开奖正码属相
                let sx_zm_omit = this.statisticsOmitRecordList(sx_zm, shuxiang);
                this.setState({ sx_zm_omit: sx_zm_omit });
                //开奖尾号特码
                let wh_tm_omit = this.statisticsOmitRecordList(ws_tm, weishu);
                this.setState({ wh_tm_omit: wh_tm_omit });
            }
            this.setState({ loading: false });
        });
    }


    //处理记录数据
    handleRecordList(data) {
        let kj_tm = [];
        let kj_zm = [];
        let bs_tm = [];
        let bs_zm = [];
        let sx_tm = [];
        let sx_zm = [];
        let ws_tm = [];

        data.forEach(item => {
            kj_tm.push(item.numbers.slice(6, 7));//开奖特码号码
            kj_zm.push(item.numbers.slice(0, 6));//开奖正码号码

            bs_tm.push(item.bs.slice(6, 7));//开奖正码波色
            bs_zm.push(item.bs.slice(0, 6));//开奖正码波色

            sx_tm.push(item.sx.slice(6, 7));//开奖正码属相
            sx_zm.push(item.sx.slice(0, 6));//开奖正码属相

            ws_tm.push(item.ws.slice(6, 7));//开奖正码尾数
        });
        return { kj_tm, kj_zm, bs_tm, bs_zm, sx_tm, sx_zm, ws_tm }
    }

    //计算出现的次数
    statisticsItem(item, number) {
        let num = 0;
        item.forEach(Element => {
            if (Element == number) {
                num++;
            }
        })
        return num;
    }

    //循环统计并且排序
    statisticsRecordList(recordList, dataDictionary) {
        let list = [];
        dataDictionary.forEach((item) => {
            let amount = 0;
            recordList.forEach(Element => {
                amount += this.statisticsItem(Element, item);
            })
            list.push({ "attribute": item, "amount": amount });
        })
        return list.sort((a, b) => b.amount - a.amount);
    }

    //循环统计当前遗漏最多的
    statisticsOmitRecordList(recordList, dataDictionary) {
        let list = [];
        dataDictionary.forEach(item => {
            let flag = false;
            for (let index = 0; index < recordList.length; index++) {
                const element = recordList[index];
                if (element.indexOf(item) != -1) {
                    flag = true;
                    list.push({ "attribute": item, "amount": index });
                    break;
                }
            }
            if (!flag) {
                list.push({ "attribute": item, "amount": recordList.length });
            }
        });
        return list.sort((a, b) => b.amount - a.amount);
    }

    renderBallIcon(num) {
        let redball = red.find(item => item == num);
        let blueball = blue.find(item => item == num);
        let greenball = green.find(item => item == num);
        if (redball != null) {
            return (<img style={{ width: '90%' }} src="../../assets/img/lotteryResult/icon_ball_red.png" />);
        }
        if (blueball != null) {
            return (<img style={{ width: '90%' }} src="../../assets/img/lotteryResult/icon_ball_blue.png" />);
        }
        if (greenball != null) {
            return (<img style={{ width: '90%' }} src="../../assets/img/lotteryResult/icon_ball_green.png" />);
        }
    }

    //渲染号码
    renderBallList(data, title, str) {
        let list = data.slice(0, 10);
        let messageType = title.substring(0, 2);
        return list.map((item, index) => {
            return (
                <div onClick={() => { this.ActionAlert(title, `${messageType}：${item.attribute}号${str}出现了${item.amount}次`) }} key={index} className="h100 flex-center pr" style={{ width: '8%', marginLeft: index != 0 ? '2%' : '0' }}>
                    <div className="pa flex-center w50" style={{ top: '18%', left: '20%', fontSize: '12px' }}>{item.attribute}</div>
                    {this.renderBallIcon(item.attribute)}
                </div>
            )
        });
    }

    //渲染属性
    renderShuXiangList(data, title, str) {
        let list = data.slice(0, 6);
        let messageType = title.substring(0, 2);
        return list.map((item, index) => {
            return (
                <div key={index} onClick={() => { this.ActionAlert(title, `${messageType}:${item.attribute}${str}出现了${item.amount}次`) }} className="flex-center" style={{ width: "16.6%" }}>{item.attribute}</div>
            )
        });
    }

    //渲染波色
    renderBoSeList(data, title, str) {
        return data.map((item, index) => {
            let div = null;
            let messageType = title.substring(0, 2);
            if (item.attribute == "红波") {
                div = <div key={index} onClick={() => { this.ActionAlert(title, `${messageType}:${item.attribute}${str}出现了${item.amount}次`) }} className="w33 flex-center" style={{ color: "red" }}>{item.attribute}</div>;
            } else if (item.attribute == "蓝波") {
                div = <div key={index} onClick={() => { this.ActionAlert(title, `${messageType}:${item.attribute}${str}出现了${item.amount}次`) }} className="w33 flex-center" style={{ color: "blue" }}>{item.attribute}</div>;
            } else {
                div = <div key={index} onClick={() => { this.ActionAlert(title, `${messageType}:${item.attribute}${str}出现了${item.amount}次`) }} className="w33 flex-center" style={{ color: "green" }}>{item.attribute}</div>;
            }
            return div;
        });
    }

    //渲染尾号
    renderLastNumberList(data, title, str) {
        let list = data.slice(0, 5);
        let messageType = title.substring(0, 2);
        return list.map((item, index) => {
            return (
                <div key={index} className="flex-center" onClick={() => { this.ActionAlert(title, `${messageType}:${item.attribute}尾${str}出现了${item.amount}次`) }} style={{ width: "20%" }}>{item.attribute}尾</div>
            )
        });
    }




    //选择期数
    promptCallback(value) {
        if (value >= 10) {
            this.setState({ periods: value });
            this.getLotteryRecordList(value);
        } else {
            Toast.info('期数必须大于10', 3, null, false);
        }
    }

    render() {
        const btnStyle = {
            boxSizing: "border-box", width: "18%", height: "75%", fontSize: "11px", marginRight: "15px",
            borderRadius: "15px", color: "#999999", border: "1px solid #999999"
        }
        const boxStyle = { height: "40px", padding: "5px 15px", boxSizing: "border-box", borderBottom: "1px solid #EDEDED" };
        const contentBoxStyle = { width: "calc(100% - 170px)", color: "#BD3D3D", fontSize: "13px", fontWeight: "600" }
        return (
            <div className="wh100" style={{ overflow: "auto" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <Alert ref="alert" title={this.state.alertTitle} message={this.state.alertMessage} ></Alert>
                <Prompt value={this.state.periods} callback={this.promptCallback.bind(this)} ref="prompt" title={"请输入期数"}></Prompt>
                <div className="w100 flex align-item-center" style={{ height: "34px", background: "white" }}>
                    <div className="h100 flex align-item-center"
                        style={{ width: "80%", paddingLeft: "5%", boxSizing: "border-box", fontSize: "13px" }}>
                        请输入期数
                    </div>
                    <div className="flex-center" style={btnStyle} onClick={() => { this.refs.prompt.setState({ isShow: true }) }}>{this.state.periods}期</div>
                </div>

                <div className="w100 bgWhite  clearfix" style={{ marginTop: "10px" }}>

                    <div className="clearfix" style={{ paddingLeft: "15px", width: "calc(100% - 15px)", borderBottom: "1px solid #EDEDED" }}>
                        <div className="w100 flex align-item-center"
                            style={{ height: "25px", fontSize: "12px", color: "#666666", letterSpacing: "1px" }}>
                            特码出现期数最多的号码
                        </div>
                        <div className="clearfix flex w100" style={{ paddingBottom: "5px" }}>
                            {this.renderBallList(this.state.kj_tm, "特码出现期数最多的号码", "")}
                        </div>
                    </div>

                    <div className="clearfix" style={{ paddingLeft: "15px", width: "calc(100% - 15px)" }}>
                        <div className="w100 flex align-item-center"
                            style={{ height: "25px", fontSize: "12px", color: "#666666", letterSpacing: "1px" }}>
                            特码当前遗漏期数最多的号码
                        </div>
                        <div className="clearfix flex w100" style={{ paddingBottom: "5px" }}>
                            {this.renderBallList(this.state.kj_tm_omit, "特码当前遗漏期数最多的号码", "未")}
                        </div>
                    </div>
                </div>


                <div className="w100 bgWhite  clearfix" style={{ marginTop: "10px" }}>

                    <div className="clearfix" style={{ paddingLeft: "15px", width: "calc(100% - 15px)", borderBottom: "1px solid #EDEDED" }}>
                        <div className="w100 flex align-item-center"
                            style={{ height: "25px", fontSize: "12px", color: "#666666", letterSpacing: "1px" }}>
                            正码出现期数最多的号码
                        </div>
                        <div className="clearfix flex w100" style={{ paddingBottom: "5px" }}>
                            {this.renderBallList(this.state.kj_zm, "正码出现期数最多的号码", "")}
                        </div>
                    </div>

                    <div className="clearfix" style={{ paddingLeft: "15px", width: "calc(100% - 15px)" }}>
                        <div className="w100 flex align-item-center"
                            style={{ height: "25px", fontSize: "12px", color: "#666666", letterSpacing: "1px" }}>
                            正码当前遗漏期数最多的号码
                        </div>
                        <div className="clearfix flex w100" style={{ paddingBottom: "5px" }}>
                            {this.renderBallList(this.state.kj_zm_omit, "正码当前遗漏期数最多的号码", "未")}
                        </div>
                    </div>

                </div>

                <div className="w100 bgWhite clearfix" style={{ marginTop: "10px" }}>
                    <div className="w100 flex" style={boxStyle}>
                        <div className="flex align-item-center" style={{ width: "170px", fontSize: "12px", color: "#666666" }}>
                            特码出现期数最多的生肖:
                        </div>
                        <div className="flex align-item-center" style={contentBoxStyle}>
                            {this.renderShuXiangList(this.state.sx_tm, "特码出现期数最多的生肖", "")}
                        </div>
                    </div>
                    <div className="w100 flex" style={boxStyle}>
                        <div className="flex align-item-center" style={{ width: "170px", fontSize: "12px", color: "#666666" }}>
                            特码当前遗漏期数最多的生肖:
                        </div>
                        <div className="flex align-item-center" style={contentBoxStyle}>
                            {this.renderShuXiangList(this.state.sx_tm_omit, "特码当前遗漏期数最多的生肖", "未")}
                        </div>
                    </div>
                    <div className="w100 flex" style={boxStyle} >
                        <div className="flex align-item-center" style={{ width: "170px", fontSize: "12px", color: "#666666" }}>
                            正码出现期数最多的生肖:
                        </div>
                        <div className="flex align-item-center" style={contentBoxStyle}>
                            {this.renderShuXiangList(this.state.sx_zm, "正码出现期数最多的生肖", "")}
                        </div>
                    </div>
                    <div className="w100 flex" style={{ height: "40px", padding: "5px 15px", boxSizing: "border-box" }}>
                        <div className="flex align-item-center" style={{ width: "170px", fontSize: "12px", color: "#666666" }}>
                            正码当前遗漏期数最多的生肖:
                        </div>
                        <div className="flex align-item-center" style={contentBoxStyle}>
                            {this.renderShuXiangList(this.state.sx_zm_omit, "正码当前遗漏期数最多的生肖", "未")}
                        </div>
                    </div>
                </div>


                <div className="w100 bgWhite clearfix" style={{ marginTop: "10px" }}>
                    <div className="w100 flex" style={boxStyle}>
                        <div className="flex align-item-center" style={{ width: "170px", fontSize: "12px", color: "#666666" }}>
                            特码出现期数最多的波色:
                        </div>
                        <div className="flex align-item-center" style={contentBoxStyle}>
                            {this.renderBoSeList(this.state.bs_tm, "特码出现期数最多的波色", "")}
                        </div>
                    </div>


                    <div className="w100 flex" style={boxStyle}>
                        <div className="flex align-item-center" style={{ width: "170px", fontSize: "12px", color: "#666666" }}>
                            特码当前遗漏期数最多的波色:
                        </div>
                        <div className="flex align-item-center" style={contentBoxStyle}>
                            {this.renderBoSeList(this.state.bs_tm_omit, "特码当前遗漏期数最多的波色", "未")}
                        </div>
                    </div>

                    <div className="w100 flex" style={boxStyle}>
                        <div className="flex align-item-center" style={{ width: "170px", fontSize: "12px", color: "#666666" }}>
                            正码出现期数最多的波色:
                        </div>
                        <div className="flex align-item-center" style={contentBoxStyle}>
                            {this.renderBoSeList(this.state.bs_zm, "正码出现期数最多的波色", "")}
                        </div>
                    </div>

                    <div className="w100 flex" style={boxStyle}>
                        <div className="flex align-item-center" style={{ width: "170px", fontSize: "12px", color: "#666666" }}>
                            正码当前遗漏期数最多的波色:
                        </div>
                        <div className="flex align-item-center" style={contentBoxStyle}>
                            {this.renderBoSeList(this.state.bs_zm_omit, "正码当前遗漏期数最多的波色", "未")}
                        </div>
                    </div>
                </div>


                <div className="w100 bgWhite clearfix" style={{ marginTop: "10px" }}>
                    <div className="w100 flex" style={boxStyle}>
                        <div className="flex align-item-center" style={{ width: "170px", fontSize: "12px", color: "#666666" }}>
                            特码出现期数最多的尾数:
                        </div>
                        <div className="flex align-item-center" style={contentBoxStyle}>
                            {this.renderLastNumberList(this.state.wh_tm, "特码出现期数最多的尾数", "")}
                        </div>
                    </div>

                    <div className="w100 flex" style={boxStyle}>
                        <div className="flex align-item-center" style={{ width: "170px", fontSize: "12px", color: "#666666" }}>
                            特码当前遗漏期数最多的尾数:
                        </div>
                        <div className="flex align-item-center" style={contentBoxStyle}>
                            {this.renderLastNumberList(this.state.wh_tm_omit, "特码当前遗漏期数最多的尾数", "未")}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
