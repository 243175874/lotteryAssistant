import React, { Component } from "react";
import { NavBar, Icon, Modal } from 'antd-mobile';
import LotteryBall from '../../components/common/lotteryBall'
import SelectAssistant from '../../assets/js/selectCodeAssistant'
import CommonJS from '../../assets/js/common'
import { post } from '../../fetch/post.js';
const oddOrEven = ["单", "双"];
const bigOrSmall = ["大", "小"];
const bigAndSmallAndOddAndEven = ["大单", "大双", "小单", "小双"];
const five = ["金", "木", "水", "火", "土"];
const color = ["红波", "蓝波", "绿波"];
const animalType = ["家禽", "野兽"];
const colorOddEven = ["红单", "红双", "蓝单", "蓝双", "绿单", "绿双"];
const animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
const lastNumber = ["0尾", "1尾", "2尾", "3尾", "4尾", "5尾", "6尾", "7尾", "8尾", "9尾"];
const firstNumber = ["0头", "1头", "2头", "3头", "4头"];
export default class SelectCodeAssistant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectList: [],
            numberList: [],
            numberStr: "",
            modal: false,
        };
        this.selectList = new Set();
    }


    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    //获取尾数服务器数据
    getData() {
        post("/v1/api/app/lhc_conf").then(data => {
            console.log(data);
        });
    }



    returnButtonListView(list, width) {
        return list.map((item, index) => (
            <div
                onClick={() => { this.select(item) }}
                key={index} className="flex-center fl" style={{
                    width: width, height: "22px", marginLeft: "8px", fontWeight: "550", marginTop: "6px", color: this.state.selectList.indexOf(item) == -1 ? "black" : "white",
                    border: this.state.selectList.indexOf(item) == -1 ? "1px solid #D8D8D8" : "1px solid #FF7344", borderRadius: "5px", fontSize: "12px",
                    background: this.state.selectList.indexOf(item) == -1 ? "white" : "#FF7344"
                }}>{item}</div>
        ));
    }

    renderLotteryListView() {
        return this.state.numberList.map((item, index) => (
            <div key={index} className="fl" style={{ width: "30px", height: "30px", marginLeft: "2px" }}>
                <LotteryBall width={'30px'} height={'30px'} number={item}></LotteryBall>
            </div>
        ));
    }

    clear() {
        this.setState({ selectList: [], numberList: [] });
        this.selectList.clear();
    }

    select(item) {
        //单选 start
        if (item == '单') {
            this.selectList.delete('双');
        }

        if (item == '双') {
            this.selectList.delete('单');
        }

        if (item == '大') {
            this.selectList.delete('小');
        }

        if (item == '小') {
            this.selectList.delete('大');
        }

        if (item == '家禽') {
            this.selectList.delete('野兽');
        }

        if (item == '野兽') {
            this.selectList.delete('家禽');
        }
        //单选 end

        if (!this.selectList.has(item)) {
            this.selectList.add(item);
        } else {
            this.selectList.delete(item);
        }

        let list = Array.from(this.selectList);
        this.setState({ selectList: list });
        //实例化挑码助手对象，调用方法
        let Assistant = new SelectAssistant();
        let numberArr = Assistant.getNumberList(list);
        this.setState({ numberList: numberArr, numberStr: numberArr.toString() });
    }
    copy(id) {
        let dom = document.getElementById(id);
        CommonJS.copyText(dom);
        this.setState({ modal: true })
    }
    render() {
        return (
            <div className="wh100 bgwhite">
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                >挑码助手</NavBar>

                <Modal
                    style={{ top: "40%", left: "15%", width: "70%" }}
                    popup
                    visible={this.state.modal}
                    transparent
                    maskClosable={false}
                    footer={[{ text: 'Ok', onPress: () => { this.setState({ modal: false }) } }]}
                    title="结果已复制："
                >
                    <div className="w100 clearfix" style={{ wordWrap: "break-word", textAlign: "left" }}>
                        {this.state.numberStr}
                    </div>
                </Modal>

                <div className="w100" style={{ height: "180px", padding: "10px", boxSizing: "border-box" }}>
                    <div className="wh100" style={{ border: "1px solid #D5810F", borderRadius: "2px" }}>
                        {this.renderLotteryListView()}
                    </div>
                </div>
                <div style={{ position: "fixed", top: "-100px" }}><span id="numberStr">{this.state.numberStr}</span></div>
                <div className="w100 clearfix flex" style={{ color: "#C5312D", fontSize: "12px", boxSizing: "border-box" }}>
                    <div className="flex-center" onClick={() => { this.clear() }} style={{ width: "22%", height: "30px", border: "1px solid #C5312D", borderRadius: "3px", marginLeft: "6%" }}>清空</div>
                    <div className="flex-center" onClick={() => { this.copy("numberStr") }} style={{ width: "22%", height: "30px", border: "1px solid #C5312D", borderRadius: "3px", marginLeft: "10%" }}>复制结果</div>
                    <div className="flex-center" style={{ width: "22%", height: "30px", border: "1px solid #C5312D", borderRadius: "3px", marginLeft: "10%" }}>分享结果</div>
                </div>

                <div className="w100 clearfix flex" style={{ marginTop: "10px", background: "#f6f6f6", boxSizing: "border-box" }}>
                    <div className="w50" style={{ height: "35px", border: "1px solid #D8D8D8", boxSizing: "border-box" }}>{this.returnButtonListView(oddOrEven, "26%")}</div>
                    <div className="w50" style={{ height: "35px", border: "1px solid #D8D8D8", boxSizing: "border-box" }}>{this.returnButtonListView(bigOrSmall, "26%")}</div>
                </div>

                <div className="w100 clearfix flex" style={{ background: "#f6f6f6", boxSizing: "border-box" }}>
                    <div className="w50" style={{ height: "70px", border: "1px solid #D8D8D8", boxSizing: "border-box" }}>{this.returnButtonListView(bigAndSmallAndOddAndEven, "26%")}</div>
                    <div className="w50" style={{ height: "70px", border: "1px solid #D8D8D8", boxSizing: "border-box" }}>{this.returnButtonListView(five, "26%")}</div>
                </div>

                <div className="w100 clearfix flex" style={{ background: "#f6f6f6", boxSizing: "border-box" }}>
                    <div className="w50" style={{ height: "35px", border: "1px solid #D8D8D8", boxSizing: "border-box" }}>{this.returnButtonListView(color, "26%")}</div>
                    <div className="w50" style={{ height: "35px", border: "1px solid #D8D8D8", boxSizing: "border-box" }}>{this.returnButtonListView(animalType, "26%")}</div>
                </div>

                <div className="w100 clearfix flex" style={{ background: "#f6f6f6", height: "35px", border: "1px solid #D8D8D8", boxSizing: "border-box" }}>
                    {this.returnButtonListView(colorOddEven, "13.5%")}
                </div>

                <div className="w100 clearfix" style={{ background: "#f6f6f6", height: "70px", border: "1px solid #D8D8D8", boxSizing: "border-box" }}>
                    {this.returnButtonListView(animals, "13.5%")}
                </div>

                <div className="w100 clearfix" style={{ background: "#f6f6f6", height: "70px", border: "1px solid #D8D8D8", boxSizing: "border-box" }}>
                    {this.returnButtonListView(lastNumber, "13.5%")}
                </div>

                <div className="w100 clearfix" style={{ background: "#f6f6f6", height: "35px", border: "1px solid #D8D8D8", boxSizing: "border-box" }}>
                    {this.returnButtonListView(firstNumber, "13.5%")}
                </div>
            </div>
        );
    }
}
