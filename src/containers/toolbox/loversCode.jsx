
import React, { Component } from "react";
import { NavBar, Icon, DatePicker, Toast, ActivityIndicator } from 'antd-mobile';
import { post } from '../../fetch/post.js';
import LotteryBall from '../../components/common/lotteryBall'
import { asyncComponent } from 'react-async-component';
const Introduction = asyncComponent({ name: "Introduction", resolve: () => import('../../components/common/introduction') });
import CommonJS from '../../assets/js/common'

const DatePickerContent = ({ extra, onClick, children }) => (
    <div onClick={onClick} className="h100 flex-center" style={{ width: "182px" }} >
        {children} {extra}
    </div >
);

export default class SourceBookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: "男",
            loading: true,
            myBirthday: "",
            loversBirthday: "",
            lotteryList: []
        };
    }

    componentWillMount() {
        this.getLoversDate();
    }


    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    //获取服务器恋人特码数据
    getLoversDate() {
        post("/v1/api/hunt/get_rand?type=1").then(data => {
            this.setState({ loading: false });
            if (data.code == 200 && data.data.content != "") {
                let lotteryList = data.data.content.split(',').map(item => Number(item));
                this.setState({ lotteryList });
            }
        });
    }

    //向服务器存储恋人特码数据
    setLoversDate(content) {
        post("/v1/api/hunt/save_rand", { type: 1, content }).then(data => {
            if (data.code == 200) {
                //给号码单数前加0
                let codeList = content.map(item => item.length == 1 ? "0" + item : item);
                this.setState({ lotteryList: codeList });
            }
        });
    }

    //获取6个随机得号码
    getRandomList() {
        let list = [];
        for (let i = 0; i < 6; i++) {
            list.push(CommonJS.getRandom(1, 49).toString());
        }
        return list;
    }

    //匹配号码
    matchingCode() {
        if (this.state.myBirthday == "" || this.state.loversBirthday == "") {
            Toast.info('请选择生日', 3, null, false);
            return;
        }
        let codeList = this.getRandomList();
        //调用接口把结果存入数据库
        this.setLoversDate(codeList);

    }

    renderLotteryListView() {
        return this.state.lotteryList.map((item, index) => (
            <div key={index} style={{ width: "30px", height: "30px", marginLeft: "10px" }}>
                <LotteryBall width={'30px'} height={'30px'} number={item}></LotteryBall>
            </div>
        ));
    }


    render() {
        return (
            <div className="wh100 bgwhite">
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                >恋人特码</NavBar>

                <Introduction content={'请输入您和他/她的生日。计算本期特码，赶紧来试试！'}></Introduction>

                <div className="w100 clearfix" style={{
                    display: this.state.lotteryList.length == 0 ? "block" : "none"
                }} >
                    <div style={{ margin: "0 auto", width: "170px", height: "30px", marginTop: "20px" }}>
                        <img className="wh100" src={require("../../assets/img/toolbox/icon_lovers_lottery_n.png")} />
                    </div>
                    <div style={{ margin: "0 auto", width: "170px", height: "30px", marginTop: "20px", fontSize: "12px" }}>来测试一下你们的恋人特码吧</div>

                    <div className="flex" style={{ margin: "0 auto", marginTop: "20px", width: "260px", height: "15px", fontSize: '12px', color: '#666666' }}>
                        <div style={{ width: "100px" }}>请选择您的性别：</div>
                        <div className="flex" style={{ marginLeft: "10px", width: "50px" }} onClick={() => { this.setState({ sex: "男" }) }}>
                            {this.state.sex == '男' ? <img style={{ width: "15px", marginRight: "15px" }} src={require('../../assets/img/toolbox/icon_choose_lovers_n.png')} /> :
                                <img style={{ width: "15px", marginRight: "15px" }} src={require('../../assets/img/toolbox/icon_uncheck_lovers_n.png')} />
                            }
                            <span>男</span>
                        </div>
                        <div className="flex" style={{ marginLeft: "20px", width: "50px" }} onClick={() => { this.setState({ sex: "女" }) }}>
                            {this.state.sex == '女' ? <img style={{ width: "15px", marginRight: "15px" }} src={require('../../assets/img/toolbox/icon_choose_lovers_n.png')} /> :
                                <img style={{ width: "15px", marginRight: "15px" }} src={require('../../assets/img/toolbox/icon_uncheck_lovers_n.png')} />
                            }
                            <span>女</span>
                        </div>
                    </div>

                    <div className="flex" style={{ width: "260px", height: "30px", margin: "0 auto", marginTop: '20px', fontSize: "12px", color: '#666666' }}>
                        <div className="h100 flex align-item-center" style={{ width: '30%' }}>您的生日:</div>
                        <div className="h100 flex-center date-picker-list" style={{ width: '70%', background: '#F6F7FB', border: "1px solid #E3E3E4", borderRadius: '3px' }}>
                            <DatePicker
                                mode="date"
                                format="YYYY-MM-DD"
                                title="选择日期"
                                value={this.state.myBirthday}
                                onChange={v => this.setState({ myBirthday: v })}
                                extra={"请选择日期"}
                            ><DatePickerContent></DatePickerContent></DatePicker>
                        </div>
                    </div>
                    <div className="flex" style={{ width: "260px", height: "30px", margin: "0 auto", marginTop: '20px', fontSize: "12px", color: '#666666' }}>
                        <div className="h100 flex align-item-center" style={{ width: '30%' }}>对象生日:</div>
                        <div className="h100 flex-center date-picker-list" style={{ width: '70%', background: '#F6F7FB', border: "1px solid #E3E3E4", borderRadius: '3px' }}>
                            <DatePicker
                                mode="date"
                                format="YYYY-MM-DD"
                                title="选择日期"
                                value={this.state.loversBirthday}
                                onChange={v => this.setState({ loversBirthday: v })}
                                extra={"请选择日期"}
                            ><DatePickerContent></DatePickerContent></DatePicker>
                        </div>
                    </div>
                    <div
                        onClick={() => { this.matchingCode() }}
                        className="flex-center" style={{
                            width: '180px', height: "38px", background: `url(${require('../../assets/img/toolbox/btn_matching_n.png')})`,
                            backgroundSize: "100% 100%", color: "white", margin: "0 auto", marginTop: "30px",
                        }}>匹配一下</div>
                </div>

                <div className="flex" style={{ width: "260px", height: "40px", margin: "0 auto", marginTop: "50px", display: this.state.lotteryList.length > 0 ? "flex" : "none" }}>
                    {this.renderLotteryListView()}
                </div>
            </div>
        );
    }
}
