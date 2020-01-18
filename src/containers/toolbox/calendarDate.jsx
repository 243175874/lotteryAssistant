import React, { Component } from "react";
import { NavBar, Icon, ActivityIndicator } from 'antd-mobile';
import { asyncComponent } from 'react-async-component';
const Introduction = asyncComponent({ name: "Introduction", resolve: () => import('../../components/common/introduction') });
import { post } from '../../fetch/post.js';
import { Calendar, Tag, Select, Radio, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default class CalendarDate extends Component {
    constructor(props) {
        super(props);
        this.dayList = [];
        this.state = {
            loading: false,
            isShowCalender: false
        };
    }

    componentDidMount() {
        this.getDate();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    getDate() {
        post("/v1/api/hunt/kj_date").then(data => {
            if (data.code == 200) {
                this.dayList = data.data;
                this.setState({ isShowCalender: true });
            }
        });
    }

    getIsSelected(day) {
        return this.dayList.findIndex(item => Number(item.day.substr(item.day.length - 2)) == day) != -1;
    }

    dateFullCellRender = (value) => {
        let date = value.date();
        let month = value.month();
        let currentMonth = new Date().getMonth();
        let isSelected = month == currentMonth && this.getIsSelected(date);
        let currentDate = new Date().getDate();
        let isCurrentDay = month == currentMonth && date == currentDate;//判断是否是当天
        const style = { width: "60%", height: "60%", border: isSelected ? "1px solid #1890ff" : "0", borderRadius: "3px", background: isCurrentDay ? "#d9d9d9" : "white" };
        return (
            <div className="w100 h100 flex-center" style={{ color: month != currentMonth ? "#d9d9d9" : "black" }}>
                <div className="flex-center " style={style}>{date}</div>
            </div>
        );
    }

    renderCalenderView() {
        if (this.state.isShowCalender) {
            return (
                <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4, margin: "0 auto", marginTop: "20px" }}>
                    <Calendar
                        dateFullCellRender={this.dateFullCellRender}
                        fullscreen={false}
                        headerRender={({ value, type, onChange, onTypeChange }) => {
                            const start = 0;
                            const end = 12;
                            const monthOptions = [];
                            const current = value.clone();
                            const localeData = value.localeData();
                            const months = [];
                            for (let i = 0; i < 12; i++) {
                                current.month(i);
                                months.push(localeData.monthsShort(current));
                            }

                            for (let index = start; index < end; index++) {
                                monthOptions.push(
                                    <Select.Option className="month-item" key={`${index}`}>
                                        {months[index]}
                                    </Select.Option>,
                                );
                            }
                            const month = value.month();

                            const year = value.year();
                            const options = [];
                            for (let i = year - 10; i < year + 10; i += 1) {
                                options.push(
                                    <Select.Option key={i} value={i} className="year-item">
                                        {i}
                                    </Select.Option>,
                                );
                            }
                            return (
                                <div style={{ padding: 10 }}>
                                    <Row type="flex" justify="space-between">
                                        <Col>
                                            <Select
                                                size="small"
                                                dropdownMatchSelectWidth={false}
                                                className="my-year-select"
                                                onChange={newYear => {
                                                    const now = value.clone().year(newYear);
                                                    onChange(now);
                                                }}
                                                value={String(year)}
                                            >
                                                {options}
                                            </Select>
                                        </Col>
                                        <Col>
                                            <Select
                                                size="small"
                                                dropdownMatchSelectWidth={false}
                                                value={String(month)}
                                                onChange={selectedMonth => {
                                                    const newValue = value.clone();
                                                    newValue.month(parseInt(selectedMonth, 10));
                                                    onChange(newValue);
                                                }}
                                            >
                                                {monthOptions}
                                            </Select>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        }}
                    />
                </div>
            )
        }
    }

    render() {
        return (
            <div className="wh100 bgwhite">
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                >搅珠日期</NavBar>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <Introduction content={'搅珠日期对照表，可查看当月及下一个月的搅珠开奖日期'}></Introduction>
                {this.renderCalenderView()}
            </div>
        );
    }
}
