import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import icon_ball_red from "../../../assets/img/lotteryResult/icon_ball_red.png"
import icon_ball_blue from "../../../assets/img/lotteryResult/icon_ball_blue.png"
import icon_ball_green from "../../../assets/img/lotteryResult/icon_ball_green.png"

const red = ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'];
const blue = ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48'];
const green = ['05', '06', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49'];
export default class AttributeReference extends Component {
    constructor(props) {
        super(props);
        this.tabs = ["波色", "生肖", "五行", "家野"];
        this.state = {
            tab: "波色",
            data: {}
        };
    }

    componentWillMount() {
        this.getAttribute()
    }

    //获取开奖记录
    getAttribute() {
        this.setState({ loading: true });
        post('/v1/api/lottery/attribute').then(data => {
            if (data.code == 200) {
                this.setState({ data: data.data });
            }
            this.setState({ loading: false });
        });
    }

    //渲染彩球背景
    renderBallIcon(num) {
        let redball = red.find(item => item == num);
        let blueball = blue.find(item => item == num);
        let greenball = green.find(item => item == num);
        if (redball != null) {
            return (<img style={{ width: '90%' }} src={icon_ball_red} />);
        }
        if (blueball != null) {
            return (<img style={{ width: '90%' }} src={icon_ball_blue} />);
        }
        if (greenball != null) {
            return (<img style={{ width: '90%' }} src={icon_ball_green}/>);
        }
    }

    //渲染彩球
    renderItemBall(list) {
        return (
            <div className="wh100 flex">
                {list.map((item, index) => {
                    return (
                        <div key={index} className="h100 flex-center pr" style={{ width: '9%', marginLeft: '3.2%' }}>
                            <div className="pa flex-center w50" style={{ top: '32%', left: '20%', fontSize: '11px' }}>{item}</div>
                            {this.renderBallIcon(item)}
                        </div>
                    )
                })}
            </div>
        )
    }

    //渲染选项卡
    renderTabView() {
        return this.tabs.map((item, index) => {
            return (
                <div key={index} className="h100 w25 flex-center" onClick={() => { this.setState({ tab: item }) }}>
                    <div className="w50 h100 flex flex-column align-item-center" >
                        <div className="flex-center"
                            style={{
                                width: "35px", height: "32px", fontSize: "13px",
                                letterSpacing: "1px", color: this.state.tab == item ? "#ff7344" : "#333333"
                            }}>
                            {item}
                        </div>
                        <div style={{ width: "35px", height: "3px", background: "#ff7344", display: this.state.tab == item ? "block" : "none" }}></div>
                    </div>
                </div >
            )
        });
    }

    //渲染波色彩球
    renderBall(list, color) {
        let ball = <div></div>;
        if (color == "红波") {
            ball = <img style={{ width: '90%' }} src={icon_ball_red} />
        } else if (color == '蓝波') {
            ball = <img style={{ width: '90%' }} src={icon_ball_blue} />
        } else if (color == '绿波') {
            ball = <img style={{ width: '90%' }} src={icon_ball_green} />
        }

        return list.map((item, index) => {
            return (
                <div key={index} className="h100 flex-center pr" style={{ width: '10%', marginLeft: '1%' }}>
                    <div className="pa flex-center w50" style={{ top: '10px', left: '5px', fontSize: '11px' }}>
                        {item}
                    </div>
                    {ball}
                </div>
            )
        })
    }

    //波色 红波
    renderListView(singulr, even, color) {
        let listLength = singulr.concat(even).length;
        let colorValue = <div></div>;
        if (color == "红波") {
            colorValue = "#FF3344"
        } else if (color == '蓝波') {
            colorValue = "#0068B7"
        } else if (color == '绿波') {
            colorValue = "#097c25"
        }
        return (
            <div className="w100 bgWhite flex align-item-center" style={{ height: "80px", marginTop: "10px" }}>
                <div className="flex flex-column align-item-center justify-content-center" style={{
                    width: "60px", height: "60px", marginLeft: "10px",
                    background: colorValue, borderRadius: "50%"
                }}>
                    <div className="clearfix flex-center" style={{ width: "38px", fontSize: "12px", color: "white" }}>
                        {color}
                    </div>
                    <div className="clearfix flex-center" style={{ width: "38px", fontSize: "12px", color: "white" }}>
                        ({listLength}只)
                        </div>
                </div>
                <div className="flex flex-column" style={{ width: "20px", height: "50px", color: colorValue }}>
                    <div className="w100 flex-center" style={{ fontSize: "12px", height: "15px" }}>单</div>
                    <div className="w100 flex-center" style={{ fontSize: "12px", height: "15px", marginTop: "20px" }}>双</div>
                </div>
                <div style={{ width: "calc(100% - 90px)", height: "70px" }}>
                    <div className="w100 h50 flex">
                        {this.renderBall(singulr, color)}
                    </div>
                    <div className="w100 h50 flex">
                        {this.renderBall(even, color)}
                    </div>
                </div>
            </div>
        )
    }

    //波色
    renderBoSeView() {
        if (JSON.stringify(this.state.data) !== "{}") {
            return (
                <div className="wh100 boxBeforeContent">
                    {this.renderListView(this.state.data.sb[0].d_numbers, this.state.data.sb[0].s_numbers, '红波')}
                    {this.renderListView(this.state.data.sb[1].d_numbers, this.state.data.sb[1].s_numbers, '蓝波')}
                    {this.renderListView(this.state.data.sb[2].d_numbers, this.state.data.sb[2].s_numbers, '绿波')}
                </div>
            )
        }
    }

    //生肖
    renderShengXiaoView() {
        let list = [
            { name: "鼠", value: ["12", "24", "36", "48"] },
            { name: "牛", value: ["11", "23", "35", "47"] },
            { name: "虎", value: ["10", "22", "34", "46"] },
            { name: "兔", value: ["09", "21", "33", "45"] },
            { name: "龙", value: ["08", "20", "32", "44"] },
            { name: "蛇", value: ["07", "19", "31", "43"] },
            { name: "马", value: ["06", "18", "30", "42"] },
            { name: "羊", value: ["05", "17", "29", "41"] },
            { name: "猴", value: ["04", "16", "28", "40"] },
            { name: "鸡", value: ["03", "15", "27", "39"] },
            { name: "狗", value: ["02", "14", "26", "38"] },
            { name: "猪", value: ["01", "13", "25", "37", "49"] }
        ];
        if (JSON.stringify(this.state.data) !== "{}") {
            return (
                <div className="wh100 boxBeforeContent">
                    {this.state.data.sx.map((item, index) => {
                        return (
                            <div key={index} className="w100 bgWhite flex" style={{
                                height: "40px", fontSize: "13px",
                                marginTop: index == 0 ? "10px" : "0"
                            }}>
                                <div className="h100 flex-center" style={{ width: "50px" }}>{item.title}</div>
                                <div className="h100" style={{ width: "calc(100% - 50px)" }}>{this.renderItemBall(item.numbers)}</div>
                            </div>
                        )
                    })}
                </div>
            )
        }

    }

    //五行
    renderWuXingView() {
        let list = [
            { name: "金", value: ["05", "06", "19", "20", "27", "28", "35", "36", "49"] },
            { name: "木", value: ["01", "02", "09", "10", "17", "18", "32", "32", "39", "40", "47", "48"] },
            { name: "水", value: ["07", "08", "15", "16", "23", "24", "37", "38", "45", "46"] },
            { name: "火", value: ["03", "04", "11", "12", "25", "26", "33", "34", "41", "42"] },
            { name: "土", value: ["13", "14", "21", "22", "29", "30", "43", "44"] },
        ];
        if (JSON.stringify(this.state.data) !== "{}") {
            return (
                <div className="wh100 boxBeforeContent">
                    {this.state.data.wx.map((item, index) => {
                        return (
                            <div key={index} className="w100 bgWhite flex clearfix" style={{
                                fontSize: "13px",
                                marginTop: "10px"
                            }}>
                                <div className="flex-center" style={{ height: "40px", width: "50px" }}>{item.title}</div>
                                <div className="h100" style={{ width: "calc(100% - 50px)" }}>
                                    <div className="wh100">
                                        {item.numbers.map((element, i) => {
                                            return (
                                                <div key={i} className="flex-center pr fl"
                                                    style={{ height: "40px", width: '10%', marginLeft: '1%' }}>
                                                    <div className="pa flex-center w50" style={{ top: '32%', left: '20%', fontSize: '11px' }}>{element}</div>
                                                    {this.renderBallIcon(element)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }

    }

    //家野
    renderJiaYeView() {
        if (JSON.stringify(this.state.data) !== "{}") {
            return (
                <div className="wh100 boxBeforeContent">
                    <div className="w100 bgWhite flex align-item-center" style={{ height: "50px", marginTop: "10px", color: "#DB3D3D", fontWeight: "600" }}>
                        <span style={{ color: "black", margin: "0 20px" }}>{this.state.data.jy[0].title}</span>{this.state.data.jy[0].numbers.toString()}
                    </div>
                    <div className="w100 bgWhite flex align-item-center" style={{ height: "50px", marginTop: "10px", color: "#DB3D3D", fontWeight: "600" }}>
                        <span style={{ color: "black", margin: "0 20px" }}>{this.state.data.jy[1].title}</span>{this.state.data.jy[1].numbers.toString()}
                    </div>
                </div>
            )
        }
    }

    //根据选项卡渲染内容
    renderContentView() {
        if (this.state.tab == "波色") {
            return this.renderBoSeView()
        } else if (this.state.tab == "生肖") {
            return this.renderShengXiaoView()
        } else if (this.state.tab == "五行") {
            return this.renderWuXingView()
        } else {
            //家野
            return this.renderJiaYeView()
        }
    }

    render() {
        return (
            <div className="wh100">
                <div className="flex-center bgWhite" style={{ height: "35px" }}>
                    <div className="flex h100" style={{ width: "90%" }}>
                        {this.renderTabView()}
                    </div>
                </div>
                <div className="w100" style={{ height: "calc(100% - 35px)" }}>
                    {this.renderContentView()}
                </div>
            </div>
        );
    }
}
