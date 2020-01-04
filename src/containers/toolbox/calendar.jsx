import React, { Component } from "react";
import { NavBar, Icon  } from 'antd-mobile';
import Introduction from '../../components/common/introduction'
import { Calendar, Select, Radio, Col, Row} from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default class Date extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
                <Introduction content={'搅珠日期对照表，可查看当月及下一个月的搅珠开奖日期'}></Introduction>
                <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4,margin:"0 auto",marginTop:"20px" }}>
                <Calendar
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
            </div>
        );
    }
}
