import React, { Component } from "react";
import { NavBar, Icon, ListView, PullToRefresh } from 'antd-mobile';
import { post } from '../../fetch/post.js';
import Common from '../../assets/js/common'
import { Toast } from 'antd-mobile'

class Promotion extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            page: 1,
            list: [],
            memberTypeList: ["会员总计", "一级会员", "二级会员", "积分明细"],
            memberTypeSelected: "",
            dataSource,
            isLoading: true,
            height: "100%",
            isShowDialog: false,
            isSHowQrCodeImg: false,
            data: {
                user: {
                    uid: "",//user id
                    grades: "", //vIP
                    grade_need_point: "", //距离下级差的积分
                },
                point_level: "",//积分
                qrcode_url: "", //推广二维码
                invite_url: "", //邀请链接
                recommond_level1: 0,   //一级会员总和
                recommond_level2: 0,   //二级会员总和
                recommond_month_level1: 0, //本月一级会员总和
                recommond_month_level2: 0, //本月二级会员总和
                point_level1: 0, //一级积分
                point_level2: 0, //二级积分
            },
        };
    }

    componentDidMount() {
        //初始化会员类型选项
        this.setState({ memberTypeSelected: this.state.memberTypeList[0] });
        //获取会员信息
        this.getMemberData();
        //获取会员总计
        this.getMemberTotalList();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    //请求会员数据
    getMemberData() {
        post('/v1/api/user/index').then(data => {
            if (data.code == 200) {
                this.setState({ data: data.data });
            }
        });
    }

    //请求会员总列表
    getMemberTotalList() {
        this.setState({ isLoading: true });
        post('/v1/api/user/inviter_all', { "page": this.state.page, "limit": 4 }).then(data => {
            if (data.code == 200) {
                if (this.state.page == 1) {
                    this.setState({ list: data.data.list });
                } else {
                    let datas = this.state.list.concat(data.data.list);
                    this.setState({ list: datas });
                }
            }
            this.setState({ isLoading: false });
        });
    }

    //一级会员列表
    getMemberLevelOneList() {
        this.setState({ isLoading: true });
        post('/v1/api/user/inviter_first', { "page": this.state.page, "limit": 4 }).then(data => {
            if (data.code == 200) {
                if (this.state.page == 1) {
                    this.setState({ list: data.data.list });
                } else {
                    let datas = this.state.list.concat(data.data.list);
                    this.setState({ list: datas });
                }
            }
            this.setState({ isLoading: false });
        });
    }

    //二级会员列表
    getMemberLevelTwoList() {
        this.setState({ isLoading: true });
        post('/v1/api/user/inviter_two', { "page": this.state.page, "limit": 4 }).then(data => {
            if (data.code == 200) {
                if (this.state.page == 1) {
                    this.setState({ list: data.data.list });
                } else {
                    let datas = this.state.list.concat(data.data.list);
                    this.setState({ list: datas });
                }
            }

            this.setState({ isLoading: false });
        });
    }

    //积分记录明细
    getMyPointList() {
        this.setState({ isLoading: true });
        post('/v1/api/user/getmypoint', { "page": this.state.page, "limit": 4 }).then(data => {
            if (data.code == 200) {
                if (this.state.page == 1) {
                    this.setState({ list: data.data.list });
                } else {
                    let datas = this.state.list.concat(data.data.list);
                    this.setState({ list: datas });
                }
            }
            this.setState({ isLoading: false });
        });
    }

    //上拉加载更多
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.page++;
        this.getMemberTotalList();
    }

    //渲染会员列表模板（一级会员，二级会员，会员总计）
    renderMemberListTemplate(item) {
        return (
            <div className="w100 flex" style={{ height: "80px", background: "#ffffff", border: "1px solid #f7f7f7" }}>
                <div style={{ width: "80px", height: "79px", padding: "10px", background: "white" }}>
                    <img className="w100" src={item.userhead_url} />
                </div>
                <div style={{ width: "calc(100% - 190px)", padding: "10px" }}>
                    <div className="w100 flex align-item-center" style={{ height: "calc(50% - 10px)" }}>{item.username}</div>
                    <div className="w100 flex align-item-center" style={{ color: "#999", height: "calc(50% - 10px)" }}>注册：{item.regtime}</div>
                </div>
                <div style={{ width: '110px', padding: "10px" }}>
                    <div className="w100 flex align-item-center" style={{ height: "calc(50% - 10px)" }}>
                        <div style={{ color: "#FDC12A" }}>财富指数</div>
                        <div style={{ marginLeft: "10px" }}><img style={{ width: "16px" }} src={require("../../assets/img/promotion/list-money-icon.png")} /></div>
                    </div>
                    <div className="w100 flex align-item-center" style={{ justifyContent: "flex-end", height: "calc(50% - 10px)" }}>
                        <div className="flex-center colorWhite"
                            style={{
                                marginRight: "8px",
                                width: "40px",
                                height: "20px",
                                backgroundImage: item.is_online == "在线" ? `url(${require('../../assets/img/promotion/online-icon.png')})` : `url(${require('../../assets/img/promotion/offline-icon.png')})`,
                                backgroundSize: "100% 100%",
                                fontSize: "10px"
                            }}>
                            {item.is_online}
                        </div>
                    </div>
                </div>
            </div >
        )
    }


    //渲染积分明细
    renderPointDetailTemplate(item) {
        return (
            <div className="w100 flex" style={{ height: "80px", background: "#ffffff", border: "1px solid #f7f7f7" }}>
                <div className="flex-center" style={{ width: "80px", height: "79px", padding: "10px", background: "white" }}>
                    <img className="w70" src={item.controller_pic} />
                </div>
                <div style={{ width: "calc(100% - 100px)", padding: "10px" }}>
                    <div className="w100 flex align-item-center" style={{ height: "calc(50% - 10px)", fontSize: "14px" }}>
                        {item.title}
                    </div>
                    <div className="w100 flex align-item-center" style={{ color: "#999", height: "calc(50% - 10px)", fontSize: "12px" }}>
                        {item.remark}&nbsp;&nbsp;
                        {item.add_time}
                    </div>
                </div>
                <div className="flex align-item-center" style={{ width: '100px', padding: "10px", justifyContent: "flex-end" }}>
                    <p style={{ display: item.score < 0 ? "none" : "inline" }}>+{item.score}</p>
                    <p style={{ display: item.score > 0 ? "none" : "inline" }}>-{item.score}</p>
                </div>
            </div >
        )
    }

    //渲染对会员和积分的统计
    renderTotalOfMemberAndPoint() {
        if (this.state.memberTypeSelected == "会员总计") {
            return (<p>一级会员总计{this.state.data.recommond_level1}人，二级会员总计{this.state.data.recommond_level2}人</p>)
        } else if (this.state.memberTypeSelected == "一级会员") {
            return (<p>一级会员总计{this.state.data.recommond_level1}人，本月推荐{this.state.data.recommond_month_level1}人</p>)
        } else if (this.state.memberTypeSelected == "二级会员") {
            return (<p>二级会员总计{this.state.data.recommond_level2}人，本月推荐{this.state.data.recommond_month_level2}人</p>)
        } else if (this.state.memberTypeSelected == "积分明细") {
            return (<p>推广一级会员奖励{this.state.data.point_level1}分，二级会员奖励{this.state.data.point_level2}分</p>)
        } else {
            return (<div></div>)
        }
    }

    //获取item进行展示
    renderRow(item, index) {
        if (this.state.memberTypeSelected == "积分明细" && item.score != null) {
            return this.renderPointDetailTemplate(item) //列表展示积分明细
        } else if (this.state.memberTypeSelected != "积分明细" && item.score == null) {
            return this.renderMemberListTemplate(item) //列表展示会员总计、一级会员、二级会员
        } else {
            return (<div></div>)
        }
    }

    //会员列表分页
    renderMemberListView() {
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
                renderFooter={() => (<div style={{ paddingTop: "10px", textAlign: 'center' }}>
                    {this.state.isLoading ? '加载中...' : '加载完成'}
                </div>)}
                //renderBodyComponent={() => <MyBody />}
                renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, rowID)}
                //renderSeparator={separator}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                pageSize={2}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }

    selectMemberType(value) {
        this.setState({ memberTypeSelected: value });
        //console.log(value);
        this.page = 1;//初始化分页
        if (value == "会员总计") {
            //获取会员总计
            this.getMemberTotalList();
        } else if (value == "一级会员") {
            //获取一级会员
            this.getMemberLevelOneList();
        } else if (value == "二级会员") {
            //获取二级会员
            this.getMemberLevelTwoList();
        } else if (value == "积分明细") {
            //获取积分明细
            this.getMyPointList();
        }
    }

    memberTypeListView() {
        return this.state.memberTypeList.map((item, index) => {
            return (
                <div onClick={() => this.selectMemberType(item)}
                    className="h100 text-center pr"
                    style={{
                        width: "25%", paddingTop: "10px", color: this.state.memberTypeSelected == item ? "#BEA273" : "black",
                        fontWeight: this.state.memberTypeSelected == item ? "bold" : "normal",
                    }}
                    key={index}>
                    {item}
                    <div className="pa" style={{ width: "80%", marginLeft: "10%", height: "8%", bottom: "0", background: this.state.memberTypeSelected == item ? "#BEA273" : "white" }}></div>
                </div>
            )
        });
    }


    renderMemberTypeListView() {
        return (
            <div className="w100 flex" style={{ height: '6%' }}>
                {this.memberTypeListView()}
            </div>
        );
    }

    copy() {
        Common.copyText(document.getElementById("invite_url"));
        Toast.info('复制连接成功！', 2, null, false);
    }

    renderShareView() {
        return (
            <div className="w100" style={{ height: "160px", borderTop: "1px solid white" }}>
                <div style={{ marginTop: "15%", marginLeft: "8%" }}>我要分享</div>
                <div style={{ width: "80%", height: "55%", margin: "0 auto", padding: "2%" }}>
                    <ul className="w100 h100 flex" style={{ fontSize: "10px" }}>
                        <li onClick={() => { this.copy() }} className="w50 flex flex-column align-item-center">
                            <img style={{ width: "30%" }} src={require("../../assets/img/promotion/link_icon.png")} />
                            <p style={{ marginTop: "3%" }}>复制链接</p>
                            <div style={{ position: "fixed", left: "-100%" }} id="invite_url">{this.state.data.invite_url}</div>
                        </li>
                        <li onClick={() => { this.setState({ isSHowQrCodeImg: true }) }} className="w50 flex flex-column align-item-center">
                            <img style={{ width: "30%" }} src={require("../../assets/img/promotion/QRcode_icon.png")} />
                            <p style={{ marginTop: "3%" }}>二维码推广</p>
                        </li>
                        {/* <li className="w33 flex flex-column align-item-center">
                            <img style={{ width: "40%" }} src="../../assets/img/promotion/wechat_qq_icon.png" />
                            <p style={{ marginTop: "3%" }}>微信，QQ分享</p>
                        </li> */}
                    </ul>
                </div>
            </div>
        )
    }

    render() {
        const dialogBgStyle = {
            display: this.state.isShowDialog ? "block" : "none",
            position: "fixed", top: "0", left: "0", zIndex: "150", background: 'rgba(0, 0, 0, 0.3)'
        };

        const dialogStyle = {
            position: "fixed", width: "306px", height: "395px",
            top: "10%", left: "50%", marginLeft: "-145px",
            background: `url(${require('../../assets/img/promotion/img_rules_integral.png')})`,
            backgroundSize: "100% 100%"
        };

        const closeBtnStyle = {
            position: "fixed", width: "38px",
            top: "calc(10% + 395px)", left: "50%", marginLeft: "-19px",
        };

        return (
            <div className="wh100 bgWhite pr">
                <div className="wh100" style={{ position: "fixed", top: "0", left: "0", zIndex: "200", display: this.state.isSHowQrCodeImg ? "block" : "none" }}>
                    <img className="wh100" src={require("../../assets/img/promotion/share_bg_qr.png")} />
                    <img style={{ width: "30px", height: "30px", position: "fixed", top: "20px", right: "20px", zIndex: "201" }}
                        onClick={() => { this.setState({ isSHowQrCodeImg: false }) }}
                        src={require("../../assets/img/promotion/icon_close_share_n.png")} />
                    <img style={{ width: "26%", position: "fixed", top: "45%", left: "50%", marginLeft: "-13%", zIndex: "202" }} src={this.state.data.qrcode} />
                </div>
                {/* 积分规则说明弹出框  start*/}
                <div className="wh100" style={dialogBgStyle}>
                    <div style={dialogStyle}>
                    </div>
                    <img onClick={() => { this.setState({ isShowDialog: false }) }} style={closeBtnStyle} src={require("../../assets/img/promotion/icon_close.png")} />
                </div>
                {/* 积分规则说明弹出框  end*/}
                <header className="w100" style={{ background: `url(${require('../../assets/img/promotion/headerBg.png')})`, backgroundSize: "100% 100%", height: "26%" }}></header>
                <NavBar
                    style={{ top: "0" }}
                    className="navbar_bg pa w100"
                    // leftContent={[
                    //     <Icon key="0" onClick={() => console.log('onLeftClick')} type="left" />
                    // ]}
                    rightContent={[
                        <img src={require("../../assets/img/promotion/clientService.png")} key="1" style={{ width: "20px" }} />
                    ]}
                >分享赚钱</NavBar>

                <div className="pa" style={{
                    width: "90%",
                    height: "22%",
                    top: "11.5%",
                    left: "50%",
                    marginLeft: "-45%",
                    backgroundImage: `url(${require('../../assets/img/promotion/boxBg.png')})`,
                    backgroundSize: "100% 100%"
                }}>
                    <div className="w100 flex" style={{ height: "18%", marginTop: "5%" }}>
                        <div className="w50 flex align-item-center" style={{ fontSize: "12px", paddingLeft: "8%" }}>推荐信息</div>
                        <div className="w50 flex" style={{ paddingRight: "9px", justifyContent: "flex-end" }}>
                            <div className="flex" style={{
                                width: "60%",
                                backgroundImage: `url(${require('../../assets/img/promotion/bg_integral_how.png')})`,
                                backgroundSize: "100% 100%"
                            }}>
                                <div className="h100  flex-center" style={{ width: "18px", marginLeft: "8%" }}>
                                    <img className="w100" src={require("../../assets/img/promotion/icon_integral.png")}/>
                                </div>
                                <div onClick={() => { this.setState({ isShowDialog: true }) }} className="colorWhite flex-center" style={{ fontSize: "10px", marginLeft: "5px" }}>如何赚积分</div>
                            </div>
                        </div>
                    </div>
                    <div className="w100 flex" style={{ height: "50%" }}>
                        <div style={{ height: "80%", marginTop: "5%", width: "30%" }}>
                            <div className="w100 h50 flex-center">{this.state.data.user.uid}</div>
                            <div className="w100 h50 flex-center" style={{ color: "#ADADAD", fontSize: "10px" }}>推荐ID</div>
                        </div>
                        <div className="w33 h100">
                            <div className="w100 flex-center" style={{ height: "55%", fontSize: "35px", color: "#FA7951" }}>{this.state.data.point_level}</div>
                            <div className="w100 flex-center" style={{ height: "22%", color: "#ADADAD", fontSize: "10px" }}>兑换请联系我们</div>
                            <div className="w100 flex-center" style={{ height: "22%", color: "#ADADAD", fontSize: "10px" }}>推荐积分</div>
                        </div>
                        <div className="w33 h100" style={{ height: "80%", marginTop: "5%" }}>
                            <div className="w100 h33 flex-center">VIP{this.state.data.user.grades}</div>
                            <div className="w100 h33 flex-center" style={{ color: "#ADADAD", fontSize: "10px" }}>距离下级还差{this.state.data.user.grade_need_point}分</div>
                            <div className="w100 h33 flex-center" style={{ color: "#ADADAD", fontSize: "10px" }}>推荐等级</div>
                        </div>
                    </div>
                </div>

                {this.renderShareView()}
                <div className="w100" style={{ height: '2%', background: "#f7f7f7" }}></div>
                {/* 会员列表页面virtual-dom渲染 */}
                <div className="clearfix" style={{ width: "90%", margin: "0 auto" }}>
                    {this.renderMemberTypeListView()}
                </div>
                <div className="w100 flex" style={{ height: '30px', lineHeight: "30px", background: "#f7f7f7", fontSize: "12px", paddingLeft: "10%" }}>
                    {this.renderTotalOfMemberAndPoint()}
                </div>
                <div className="w100" style={{ height: "35%", overflow: "auto" }}>
                    {this.renderMemberListView()}
                </div>
            </div >
        );
    }
}
export default Promotion