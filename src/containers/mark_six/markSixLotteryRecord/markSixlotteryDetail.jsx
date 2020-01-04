import React, { Component } from "react";
import { NavBar, Icon } from 'antd-mobile';
import { post } from '../../../fetch/post.js';
import MarkSixLottery from '../../../components/sixLotteryArea/markSixLottery'
export default class MarkSixlotteryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommend: ""
        };
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    componentWillMount() {
        let detail = this.props.location.query;
        //获取当前期推荐数据
        this.getLotteryRecommend(detail.year, detail.period)
    }

    //获取当前期推荐数据
    getLotteryRecommend(year, period) {
        post('/v1/api/lottery/record_show', { 'year': year, 'period': period }).then(data => {
            this.setState({ recommend: data.data });
        });
    }

    renderRecommendList() {
        let list = this.state.recommend == "" ? [] : this.state.recommend.tj.data == "" ? [] : this.state.recommend.tj.data.split("|0");
        console.log(list);
        return list.map((item, index) => {
            let data = item.split('|');
            return (
                <div key={index} className="w100 flex" style={{ padding: "5px 0" }}>
                    <div>{data[0]}</div>
                    <div className="flex-center"
                        style={{
                            width: "16px", background: "#FF3344", color: "white",
                            borderRadius: "4px", fontSize: "10px", padding: "3px", boxSizing: "border-box",
                            marginLeft: "10px", height: "15px", visibility: data[1] != "1" ? "hidden" : "visible"
                        }}>
                        中
                    </div>
                </div >
            )
        });
    }

    render() {
        const contentStyle = {
            width: "88%", height: "500px", margin: "0 auto", background: "url(../../../assets/img/mark_six/lottery-detail-bg2.png)",
            backgroundSize: "100% 100%"
        };
        let detail = this.props.location.query;
        return (
            <div className="wh100" style={{ background: 'url(../../../assets/img/mark_six/lottery-detail-bg.png)' }}>
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                >本期开奖查询</NavBar>
                <div className="w100" style={{ height: "calc(90% - 61px)", paddingTop: "10%" }}>
                    <div style={contentStyle}>
                        <div className="w100 boxBeforeContent" style={{ height: "26%" }}>
                            <header className="w100 text-center" style={{ fontSize: "10px", color: "#999999", marginTop: "8%" }}>
                                <span style={{ fontSize: '13px', color: "black" }}>香港六合彩&nbsp;</span>
                                {detail.year}年{detail.period}期
                            </header>
                            <div style={{ width: "90%", height: "55px", marginLeft: "5%", marginTop: "2%" }}>
                                <MarkSixLottery number={detail.numbers.split(',')} attribute={detail.wx.split(',')} five={detail.sx.split(',')} fiveState={true}></MarkSixLottery>
                            </div>
                        </div>
                        <div className="w100" style={{ height: "18%", paddingTop: "5%" }}>
                            <div className="w100 text-center"
                                style={{ padding: "5px 0", fontSize: "13px", color: "black", fontWeight: "600" }}>特码总和</div>
                            <div className="w100 clearfix flex"
                                style={{ fontSize: "12px", padding: "5px 0", color: "BD3D3D", fontWeight: "600" }}>
                                <div className="w50 text-center">特码单双：{this.state.recommend.tm_ds}</div>
                                <div className="w50 text-center">特码大小：{this.state.recommend.tm_dx}</div>
                            </div>
                            <div className="w100 clearfix flex"
                                style={{ fontSize: "12px", padding: "5px 0", color: "BD3D3D", fontWeight: "600" }}>
                                <div className="w50 text-center">总和单双：{this.state.recommend.zh_ds}</div>
                                <div className="w50 text-center">总和大小：{this.state.recommend.zh_dx}</div>
                            </div>
                        </div>
                        <div className="w100 clearfix">
                            <header className="w100 text-center" style={{ fontSize: "13px", color: "black", fontWeight: "600" }}>
                                第{this.state.recommend == "" ? "" : this.state.recommend.tj.period}期推荐
                            </header>
                            <div className="clearfix"
                                style={{ width: "72%", margin: "0 auto", marginTop: "20px", fontSize: "12px", color: "BD3D3D", fontWeight: "600" }}>
                                {this.renderRecommendList()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
