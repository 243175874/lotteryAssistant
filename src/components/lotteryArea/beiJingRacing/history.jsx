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
export default class History extends Component {
    constructor(props) {
        super(props);
        this.typeBtnList = ["号码", "大小", "单双", "对子"];
        this.numberBtnList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "单", "双", "大", "小"];
        this.emitter = null;
        this.state = {
            loading: false,
            list: [],
            isOpenFiltrate: false,//是否打开筛选
            selected: "号码",//筛选类型
            selectedNumberList: [],//
        };
    }

    componentWillReceiveProps(nextProps) {
        this.getHistoryService(nextProps.id, this.props.currentPeriods);
    }

    componentDidMount() {
        this.getHistoryService(this.props.id, this.props.currentPeriods);
        //根据改变的期数，加载相应的数据
        this.emitter = emitter.on("emitChangeNumber", this.listenerCallback);
    }

    listenerCallback = () => {
        setTimeout(() => {
            this.getHistoryService(this.props.id, this.props.currentPeriods);
        }, 500);
    }

    componentWillUnmount() {
        this.emitter.removeListener("emitChangeNumber", this.listenerCallback)
    }

    //获取历史开奖数据
    getHistoryService(id, number) {
        this.setState({ loading: true });
        LotteryAPI.getHistoryService(id, number).then(data => {
            this.setState({ loading: false });
            if (data.code == 200) {
                this.setState({ list: data.data });
            } else {
                this.setState({ list: [] });
            }
        })
    }

    //打开或者关闭筛选选项卡
    openFiltrate() {
        if (this.state.selected == "对子") {
            Toast.info("对子不能进行筛选", 2, null, false);
            return;
        }
        this.setState({ isOpenFiltrate: !this.state.isOpenFiltrate });
    }

    //类型选择
    selectType(value) {
        this.setState({ selected: value });
        if (value == "对子") {
            this.setState({ isOpenFiltrate: false });
        }
    }

    //选择号码
    selectNumberList(value) {
        let list = this.state.selectedNumberList.slice();
        if (list.indexOf(value) !== -1) {
            Common.removeArrayItem(list, value); //删除数组中一项
        } else {
            list.push(value);
        }

        if (value == "单" && list.indexOf("双") !== -1) {
            Common.removeArrayItem(list, "双"); //删除数组中一项
        }

        if (value == "双" && list.indexOf("单") !== -1) {
            Common.removeArrayItem(list, "单"); //删除数组中一项
        }

        if (value == "大" && list.indexOf("小") !== -1) {
            Common.removeArrayItem(list, "小"); //删除数组中一项
        }

        if (value == "小" && list.indexOf("大") !== -1) {
            Common.removeArrayItem(list, "大"); //删除数组中一项
        }

        this.setState({ selectedNumberList: list });
    }

    //数字背景色设置
    numberColor(number) {
        switch (number) {
            case "01":
                return "#F6C616";
            case "02":
                return "#0E89FB";
            case "03":
                return "#545454";
            case "04":
                return "#FE7C0D";
            case "05":
                return "#02CAD8";
            case "06":
                return "#453FD0";
            case "07":
                return "#BCBCBC";
            case "08":
                return "#E41F20";
            case "09":
                return "#A93B03";
            case "10":
                return "#2ABE13";
            default:
                return ""
        }
    }

    bigAndSmallColor(item) {
        switch (item) {
            case "小":
                return "#0E89FB";
            case "大":
                return "#E41F20";
            default:
                return ""
        }
    }

    oddAndEvenColor(item) {
        switch (item) {
            case "单":
                return "#0E89FB";
            case "双":
                return "#E41F20";
            default:
                return ""
        }
    }

    //号码背景色设置
    bgColorValue(key, value, listIndex, itemIndex) {
        let numberList = this.state.selectedNumberList;

        if (this.state.selected == "号码") {

            if (this.isSelectBigSmallAndOddEven(numberList)) {
                if (numberList.indexOf("单") !== -1 && Number(key) % 2 !== 0 && numberList.indexOf("大") !== -1 && Number(key) > 5) {
                    return this.numberColor(key);
                } else if (numberList.indexOf("单") !== -1 && Number(key) % 2 !== 0 && numberList.indexOf("小") !== -1 && Number(key) <= 5) {
                    return this.numberColor(key);
                } else if (numberList.indexOf("双") !== -1 && Number(key) % 2 == 0 && numberList.indexOf("大") !== -1 && Number(key) > 5) {
                    return this.numberColor(key);
                } else if (numberList.indexOf("双") !== -1 && Number(key) % 2 == 0 && numberList.indexOf("小") !== -1 && Number(key) <= 5) {
                    return this.numberColor(key);
                }
            } else {
                if (numberList.length == 0) {
                    return this.numberColor(key);
                } else if (numberList.indexOf("单") !== -1 && Number(key) % 2 !== 0) {
                    return this.numberColor(key);
                } else if (numberList.indexOf("双") !== -1 && Number(key) % 2 == 0) {
                    return this.numberColor(key);
                } else if (numberList.indexOf("大") !== -1 && Number(key) > 5) {
                    return this.numberColor(key);
                } else if (numberList.indexOf("小") !== -1 && Number(key) <= 5) {
                    return this.numberColor(key);
                }
            }

            if (numberList.indexOf(String(Number(key))) !== -1) {
                return this.numberColor(key);
            }

        } else if (this.state.selected == "大小") {
            if (this.isSelectBigSmallAndOddEven(numberList)) {
                if (numberList.indexOf("单") !== -1 && Number(value) % 2 !== 0 && numberList.indexOf("大") !== -1 && Number(value) > 5) {
                    return this.bigAndSmallColor(key);
                } else if (numberList.indexOf("单") !== -1 && Number(value) % 2 !== 0 && numberList.indexOf("小") !== -1 && Number(value) <= 5) {
                    return this.bigAndSmallColor(key);
                } else if (numberList.indexOf("双") !== -1 && Number(value) % 2 == 0 && numberList.indexOf("大") !== -1 && Number(value) > 5) {
                    return this.bigAndSmallColor(key);
                } else if (numberList.indexOf("双") !== -1 && Number(value) % 2 == 0 && numberList.indexOf("小") !== -1 && Number(value) <= 5) {
                    return this.bigAndSmallColor(key);
                }
            } else {
                if (numberList.length == 0) {
                    return this.bigAndSmallColor(key);
                } else if (numberList.indexOf("大") !== -1 && key == "大") {
                    return this.bigAndSmallColor(key);
                } else if (numberList.indexOf("小") !== -1 && key == "小") {
                    return this.bigAndSmallColor(key);
                } else if (numberList.indexOf("单") !== -1 && value % 2 !== 0) {
                    return this.bigAndSmallColor(key);
                } else if (numberList.indexOf("双") !== -1 && value % 2 == 0) {
                    return this.bigAndSmallColor(key);
                }
            }
            if (numberList.indexOf(String(Number(value))) !== -1) {
                return this.bigAndSmallColor(key);
            }

        } else if (this.state.selected == "单双") {
            if (this.isSelectBigSmallAndOddEven(numberList)) {
                if (numberList.indexOf("单") !== -1 && Number(value) % 2 !== 0 && numberList.indexOf("大") !== -1 && Number(value) > 5) {
                    return this.oddAndEvenColor(key);
                } else if (numberList.indexOf("单") !== -1 && Number(value) % 2 !== 0 && numberList.indexOf("小") !== -1 && Number(value) <= 5) {
                    return this.oddAndEvenColor(key);
                } else if (numberList.indexOf("双") !== -1 && Number(value) % 2 == 0 && numberList.indexOf("大") !== -1 && Number(value) > 5) {
                    return this.oddAndEvenColor(key);
                } else if (numberList.indexOf("双") !== -1 && Number(value) % 2 == 0 && numberList.indexOf("小") !== -1 && Number(value) <= 5) {
                    return this.oddAndEvenColor(key);
                }
            } else {
                if (numberList.length == 0) {
                    return this.oddAndEvenColor(key);
                } else if (numberList.indexOf("单") !== -1 && key == "单") {
                    return this.oddAndEvenColor(key);
                } else if (numberList.indexOf("双") !== -1 && key == "双") {
                    return this.oddAndEvenColor(key);
                } else if (numberList.indexOf("大") !== -1 && Number(value) > 5) {
                    return this.oddAndEvenColor(key);
                } else if (numberList.indexOf("小") !== -1 && Number(value) <= 5) {
                    return this.oddAndEvenColor(key);
                }
            }

            if (numberList.indexOf(String(Number(value))) !== -1) {
                return this.oddAndEvenColor(key);
            }
        } else if (this.state.selected == "对子") {
            if (listIndex != 0 && this.state.list[listIndex - 1].kj_data[itemIndex] == key) {
                return this.numberColor(key);
            }

            if (this.state.list.length - 1 > listIndex && this.state.list[listIndex + 1].kj_data[itemIndex] == key) {
                return this.numberColor(key);
            }
        }
    }

    fontColorValue(key, value) {
        let numberList = this.state.selectedNumberList;
        if (this.state.selected == "号码") {
            //是否同时选择了大小和单双
            if (this.isSelectBigSmallAndOddEven(numberList)) {
                if (numberList.indexOf("单") !== -1 && Number(key) % 2 !== 0 && numberList.indexOf("大") !== -1 && Number(key) > 5) {
                    return "white";
                } else if (numberList.indexOf("单") !== -1 && Number(key) % 2 !== 0 && numberList.indexOf("小") !== -1 && Number(key) <= 5) {
                    return "white";
                } else if (numberList.indexOf("双") !== -1 && Number(key) % 2 == 0 && numberList.indexOf("大") !== -1 && Number(key) > 5) {
                    return "white";
                } else if (numberList.indexOf("双") !== -1 && Number(key) % 2 == 0 && numberList.indexOf("小") !== -1 && Number(key) <= 5) {
                    return "white";
                } else if (numberList.indexOf(String(Number(key))) !== -1) {
                    return "white";
                }
            } else {
                if (numberList.length == 0) {
                    return "white";
                } else if (numberList.indexOf(String(Number(key))) !== -1) {
                    return "white";
                } else if (numberList.indexOf("单") !== -1 && Number(key) % 2 !== 0) {
                    return "white";
                } else if (numberList.indexOf("双") !== -1 && Number(key) % 2 == 0) {
                    return "white";
                } else if (numberList.indexOf("大") !== -1 && Number(key) > 5) {
                    return "white";
                } else if (numberList.indexOf("小") !== -1 && Number(key) <= 5) {
                    return "white";
                } else {
                    return "black";
                }
            }
        } else if (this.state.selected == "大小") {

            if (this.isSelectBigSmallAndOddEven(numberList)) {
                if (numberList.indexOf("单") !== -1 && Number(value) % 2 !== 0 && numberList.indexOf("大") !== -1 && Number(value) > 5) {
                    return "white";
                } else if (numberList.indexOf("单") !== -1 && Number(value) % 2 !== 0 && numberList.indexOf("小") !== -1 && Number(value) <= 5) {
                    return "white";
                } else if (numberList.indexOf("双") !== -1 && Number(value) % 2 == 0 && numberList.indexOf("大") !== -1 && Number(value) > 5) {
                    return "white";
                } else if (numberList.indexOf("双") !== -1 && Number(value) % 2 == 0 && numberList.indexOf("小") !== -1 && Number(value) <= 5) {
                    return "white";
                }
            } else {
                if (numberList.length == 0) {
                    return "white";
                } else if (numberList.indexOf("大") !== -1 && key == "大") {
                    return "white";
                } else if (numberList.indexOf("小") !== -1 && key == "小") {
                    return "white";
                } else if (numberList.indexOf("单") !== -1 && Number(value) % 2 !== 0) {
                    return "white";
                } else if (numberList.indexOf("双") !== -1 && Number(value) % 2 == 0) {
                    return "white";
                }
            }

            if (numberList.indexOf(String(Number(value))) !== -1) {
                return "white";
            }

        } else if (this.state.selected == "单双") {
            if (this.isSelectBigSmallAndOddEven(numberList)) {
                if (numberList.indexOf("单") !== -1 && Number(value) % 2 !== 0 && numberList.indexOf("大") !== -1 && Number(value) > 5) {
                    return "white";
                } else if (numberList.indexOf("单") !== -1 && Number(value) % 2 !== 0 && numberList.indexOf("小") !== -1 && Number(value) <= 5) {
                    return "white";
                } else if (numberList.indexOf("双") !== -1 && Number(value) % 2 == 0 && numberList.indexOf("大") !== -1 && Number(value) > 5) {
                    return "white";
                } else if (numberList.indexOf("双") !== -1 && Number(value) % 2 == 0 && numberList.indexOf("小") !== -1 && Number(value) <= 5) {
                    return "white";
                }
            } else {
                if (numberList.length == 0) {
                    return "white";
                } else if (numberList.indexOf("单") !== -1 && key == "单") {
                    return "white";
                } else if (numberList.indexOf("双") !== -1 && key == "双") {
                    return "white";
                } else if (numberList.indexOf("大") !== -1 && Number(value) > 5) {
                    return "white";
                } else if (numberList.indexOf("小") !== -1 && Number(value) <= 5) {
                    return "white";
                }
            }
            if (numberList.indexOf(String(Number(value))) !== -1) {
                return "white";
            }

        }
    }

    //判断是否同时选择了大小和单双
    isSelectBigSmallAndOddEven(list) {
        let i = 0;
        list.forEach((item) => {
            if (item == "大") {
                i++;
            } else if (item == "小") {
                i++;
            } else if (item == "单") {
                i++;
            } else if (item == "双") {
                i++;
            }
        });
        return i == 2;
    }

    //号码选择按钮
    renderNumberButtonListView() {
        let style = { width: "17%", marginLeft: "2.5%", height: "30px", border: "1px solid #DFDFDF", borderRadius: '3px', marginBottom: "5px" }
        return this.numberBtnList.map((item, index) => {
            return (<div onClick={() => { this.selectNumberList(item) }} className="h100 flex-center fl" key={index} style={{
                background: this.state.selectedNumberList.indexOf(item) !== -1 ? "#FF6600" : "white",
                color: this.state.selectedNumberList.indexOf(item) !== -1 ? "white" : "black", ...style
            }}>{item}</div>)
        });
    }

    //类型选择按钮
    renderTypeButtonListView() {
        let style = { width: "17%", marginLeft: "2.5%", height: "30px", border: "1px solid #DFDFDF", borderRadius: '3px' }
        return this.typeBtnList.map((item, index) => {
            return (<div className="h100 flex-center" key={index}
                onClick={() => { this.selectType(item) }}
                style={{
                    background: this.state.selected == item ? "#FF6600" : "white",
                    color: this.state.selected == item ? "white" : "black", ...style
                }}> {item}</div>)
        });
    }

    renderListItem(item, listIndex) {
        let list = [];
        if (this.state.selected == "号码" || this.state.selected == "对子") {
            list = item.kj_data;
            return list.map((item, index) => {
                let style = { width: "70%", height: "60%", background: this.bgColorValue(item, null, listIndex, index), color: this.fontColorValue(item, null, listIndex, index) };
                return (<div key={index} className="flex-center" style={{ width: "10%" }}>
                    <div className="flex-center" style={style}>{item}</div></div>)
            });
        } else if (this.state.selected == "大小") {
            list = this.getBigAndSmallByNunber(item.kj_data);
        } else if (this.state.selected == "单双") {
            list = this.getOddAndEvenByNunber(item.kj_data);
        }

        return list.map((item, index) => {
            return (<div key={index} className="flex-center" style={{ width: "10%" }}>
                <div className="flex-center" style={{ width: "70%", height: "60%", background: this.bgColorValue(item.key, item.value), color: this.fontColorValue(item.key, item.value) }}>{item.key}</div></div>)
        });
    }

    //根据开奖的号码获取该数值的大小
    getBigAndSmallByNunber(kj_data) {
        let list = [];
        kj_data.forEach(element => {
            if (element > 5) {
                list.push({ key: "大", value: element });
            } else {
                list.push({ key: "小", value: element })
            }
        });
        return list;
    }

    //根据开奖的号码获取该数值的单双
    getOddAndEvenByNunber(kj_data) {
        let list = [];
        kj_data.forEach(element => {
            if (Number(element) % 2 == 0) {
                list.push({ key: "双", value: element });
            } else {
                list.push({ key: "单", value: element });
            }
        });
        return list;
    }

    //渲染历史开奖列表
    renderListView() {
        return this.state.list.map((item, index) => {
            return (<div key={index} className="w100 flex" style={{ height: "30px", background: index % 2 !== 0 ? '#f5f5f9' : "white" }}>
                <div className="flex h100" style={{ width: "100px" }}>
                    <div className="w100 h100 flex-center">{item.number}</div>
                </div>
                <div className="flex h100" style={{ width: "calc(100% - 100px)" }}>
                    {this.renderListItem(item, index)}
                </div>
            </div>)
        });
    }

    render() {
        let styleBtn = { width: "17%", marginLeft: "2.5%", height: "30px", background: "white", border: "1px solid #DFDFDF", borderRadius: '3px' };
        return (
            <div className="wh100" style={{ overflow: "auto", fontSize: "12px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="w100 clearfix" style={{ display: this.state.isOpenFiltrate ? "block" : "none" }}>
                    {this.renderNumberButtonListView()}
                    <div onClick={() => { this.setState({ selectedNumberList: [] }) }} className="h100 flex-center fl" style={{ ...styleBtn, marginBottom: "5px", color: "#FF6600" }}>恢复</div>
                </div>
                <div className="w100 flex align-item-center" style={{ height: "38px", background: '#f5f5f9' }}>
                    {this.renderTypeButtonListView()}
                    <div onClick={() => { this.openFiltrate() }} className="h100 flex-center" style={{ ...styleBtn }}>筛选</div>
                </div>
                <div className="w100" style={{ height: this.state.isOpenFiltrate ? "calc(100% - 105px - 38px)" : "calc(100% - 38px)" }}>
                    <div className="w100 flex" style={{ height: "36px", background: "#DFDFDF" }}>
                        <div className="flex-center" style={{ width: "100px" }}>期数</div>
                        <div className="flex" style={{ width: "calc(100% - 100px)" }}>
                            <div className="flex-center" style={{ width: "10%" }}>冠</div>
                            <div className="flex-center" style={{ width: "10%" }}>亚</div>
                            <div className="flex-center" style={{ width: "10%" }}>三</div>
                            <div className="flex-center" style={{ width: "10%" }}>四</div>
                            <div className="flex-center" style={{ width: "10%" }}>五</div>
                            <div className="flex-center" style={{ width: "10%" }}>六</div>
                            <div className="flex-center" style={{ width: "10%" }}>七</div>
                            <div className="flex-center" style={{ width: "10%" }}>八</div>
                            <div className="flex-center" style={{ width: "10%" }}>九</div>
                            <div className="flex-center" style={{ width: "10%" }}>十</div>
                        </div>
                    </div>

                    <div className="w100" style={{ height: "calc(100% - 36px)", overflow: "auto" }}>
                        {this.renderListView()}
                    </div>

                </div>
            </div >
        );
    }
}
