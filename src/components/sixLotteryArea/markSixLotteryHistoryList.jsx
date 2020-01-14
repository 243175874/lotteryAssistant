import React, { Component } from "react";
export default class MarkSixLotteryHistoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderRunLotteryResult(data) {
        let list = data.split("\n");
        //console.log(list);
        return list.map((item, index) => {
            let d = item.split('|');
            return (
                <div key={index} className="flex" style={{ borderLeft: "1px solid #EDEDED", width: "90%", padding: "3px 10px", marginLeft: "5px" }}>
                    <div className="flex-center" style={{ fontSize: "12px", letterSpacing: "1.5px" }}>{d[0]}</div>
                    <div className="flex-center"
                        style={{
                            width: "14px", background: "#FF3344", color: "white",
                            borderRadius: "4px", fontSize: "10px", padding: "3px", boxSizing: "border-box",
                            marginLeft: "10px", height: "15px", visibility: d[1] != "1" ? "hidden" : "visible"
                        }}>
                        中
                    </div>
                </div>
            )
        });
    }

    render() {
        return this.props.list.map((item, index) => {
            let date = new Date(item.dateline);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDay();
            return (
                <div key={index} className="w100 clearfix">
                    <div className="clearfix" style={{ width: "100%", padding: "5%", borderTop: "1px solid #EDEDED", fontSize: "13px" }}>
                        <header className="w100 flex" style={{ height: "20px" }}>
                            <div style={{ width: "16px", padding: "4px 0" }}>
                                <img style={{ width: "12px" }} src={require("../../assets/img/common/header-icon.png")} />
                            </div>
                            <div className="flex align-item-center" style={{ color: "#334C66" }}>{item.dateline}第{item.period}期推荐</div>
                        </header>
                        <main className="clearfix" style={{ color: "#BD3D3D", paddingTop: "10px" }}>
                            {this.renderRunLotteryResult(item.data)}
                        </main>
                    </div>
                </div>
            );
        });

    }
}
