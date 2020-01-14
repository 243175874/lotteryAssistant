import React, { Component } from "react";
import { NavBar, Icon, Accordion, List, DatePicker } from 'antd-mobile';
import { post } from '../../fetch/post.js';

const DatePickerContent = ({ extra, onClick, children }) => (
    <div onClick={onClick} className="h100 flex-center" style={{ width: "50px" }} >
        年份
    </div >
);

export default class MysteriousHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            year: "",
        };
    }

    componentDidMount() {
        //初始化时间
        let year = (new Date()).getFullYear().toString();
        this.updateYearAndGetHistory();
    }

    getHistory(year) {
        post("/v1/api/hunt/mysterious_history", { year }).then(data => {
            if (data.code == 200) {
                this.setState({ list: data.data });
            }
        });
    }

    /**
     * 更新年份并且根据年份调用历史数据
     * @param {*初始化时间} year 
     */
    updateYearAndGetHistory(year = (new Date()).getFullYear().toString()) {
        this.setState({ year });
        this.getHistory(year);
    }

    renderListView() {
        return this.state.list.map((item, index) => {
            let headerStr = `${item.year}年第${item.number}期六合锦囊`
            return (
                <Accordion.Panel key={index} header={headerStr}>
                    <div style={{ width: "220px", lineHeight: "25px", margin: "0 auto" }}>
                        {item.content}
                    </div>
                </Accordion.Panel>
            )
        });
    }

    render() {
        return (
            <div className="wh100 bgwhite">
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.back()} type="left" />
                    ]}
                    rightContent={[
                        <div key="1">
                            <DatePicker
                                mode="year"
                                format="YYYY"
                                title="选择年份"
                                value={new Date(this.state.year)}
                                onChange={v => { this.updateYearAndGetHistory(new Date(v).getFullYear().toString()) }}
                            ><DatePickerContent></DatePickerContent>
                            </DatePicker>
                        </div>
                    ]}
                >往期历史</NavBar>
                <div className="w100" style={{ height: "91%", overflow: "auto" }}>
                    <Accordion>
                        {this.renderListView()}
                    </Accordion>
                </div>

            </div>
        );
    }
}

