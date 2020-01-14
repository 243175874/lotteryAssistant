import React, { Component } from "react";
import { Toast } from 'antd-mobile';
export default class ChooesDialog extends Component {
    constructor(props) {
        super(props);

        this.list = {
            "号码": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
                "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
                "41", "42", "43", "44", "45", "46", "47", "48", "49"],
            "生肖": ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
            "五行": ["金", "木", "水", "火", "土"],
            "波色": ["红波", "蓝波", "绿波"],
            "家野": ["家禽", "野兽"],
            "尾数": ["1尾", "2尾", "3尾", "4尾", "5尾", "6尾", "7尾", "8尾", "9尾", "0尾"],
        }

        this.selectData = this.list["号码"];
        this.state = {
            isShow: false,
            selected: "号码",
            selectedValues: []
        };
    }

    open() {
        this.setState({ isShow: true });
        this.setState({ selectedValues: [] });  //置空
    }

    selectMenu(item) {
        this.setState({ selected: item });
        this.selectData = this.list[item];
        this.setState({ selectedValues: [] });  //置空
    }

    select(item) {
        let val = this.state.selectedValues;
        if (this.state.selected == "号码" || this.state.selected == "生肖") {

            let length = val.indexOf(item);
            if (length == -1) {
                //不能超过3个。
                if (val.length == 3) {
                    Toast.info('最多选择三个选项', 2, null, false);
                    return;
                }
                val.push(item);
            } else {
                val.splice(length, 1);
            }
        }

        if (this.state.selected == "五行" || this.state.selected == "波色" ||
            this.state.selected == "家野" || this.state.selected == "尾数") {
            val = [item];//单选
        }
        this.setState({ selectedValues: val });
    }

    save() {
        this.props.submit(this.state.selected, this.state.selectedValues);
        //关闭当前dialog
        this.setState({ isShow: false })
    }

    renderMenuListView() {
        const menu = ["号码", "生肖", "五行", "波色", "家野", "尾数"];
        return menu.map((item, index) => {
            return (
                <li key={index} className="flex align-item-center"
                    onClick={() => { this.selectMenu(item) }}
                    style={{
                        height: '41px', borderBottom: "1px solid #D6D6D6", fontSize: "13px",
                        borderRight: this.state.selected == item ? "0" : "1px solid #D6D6D6", boxSizing: "border-box",
                        background: this.state.selected == item ? "#F5F5F5" : "none"
                    }}>
                    <div style={{ marginLeft: "20px" }}>{item}</div>
                    <img style={{ width: "7px", marginLeft: "80px" }} src={require("../../../assets/img/common/icon_choose_conditions.png")} />
                </li>
            );
        });
    }

    renderSelectListView() {
        return this.selectData.map((item, index) => {
            return (
                <li key={index} className="flex align-item-center"
                    onClick={() => { this.select(item) }}
                    style={{
                        height: '41px', borderBottom: "1px solid #D6D6D6", fontSize: "13px",
                        borderRight: "1px solid #D6D6D6", boxSizing: "border-box"
                    }}>
                    <div style={{ marginLeft: "20px" }}>{item}</div>
                    <img style={{
                        width: "12px", marginLeft: "80px",
                        display: this.state.selectedValues.indexOf(item) == -1 ? "none" : "block"
                    }} src={require("../../../assets/img/common/icon_choose.png")} />
                </li>
            )
        });
    }

    render() {
        const dialogStyle = {
            position: "fixed", top: "0", left: "0", background: "rgba(0, 0, 0, 0.3)",
            display: this.state.isShow ? "block" : "none"
        };

        const contentStyle = {
            width: "300px", height: "360px", position: "fixed", top: "50%",
            left: "50%", marginLeft: "-150px", marginTop: "-180px", borderRadius: "3px", background: "white"
        }
        return (
            <div className="wh100" style={dialogStyle}>
                <div style={contentStyle}>
                    <div className="w100 flex-center"
                        style={{
                            height: "53px", background: "#FE623F", color: "white",
                            borderRadius: "3px 3px 0 0", letterSpacing: "2px"
                        }}>
                        请选择条件筛选
                    </div>

                    <div className="w100 flex" style={{ height: "246px" }}>
                        <div className="w50 h100">
                            <ul className="wh100">
                                {this.renderMenuListView()}
                            </ul>
                        </div>
                        <div className="w50 h100" style={{ background: "#F5F5F5", overflow: "auto" }}>
                            <ul className="wh100">
                                {this.renderSelectListView()}
                            </ul>
                        </div>
                    </div>

                    <div className="w100 flex" style={{ height: "60px" }}>
                        <div className="w50 h100 flex-center">
                            <div onClick={() => { this.setState({ isShow: false }) }} className="flex-center"
                                style={{
                                    width: "120px", height: "30px", border: "1px solid #FE623F",
                                    color: "#FE623F", borderRadius: "2px", boxSizing: "border-box"
                                }}>
                                清除
                            </div>
                        </div>
                        <div className="w50 h100 flex-center">
                            <div onClick={() => { this.save() }} className="flex-center"
                                style={{ width: "120px", height: "30px", background: "#FE623F", color: "white", borderRadius: "2px" }}>
                                确定
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
