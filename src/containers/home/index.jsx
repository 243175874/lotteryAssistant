import React, { Component } from "react";
import { NavBar, Icon, ActionSheet, WingBlank, Carousel } from 'antd-mobile';
import Banner from '../../components/index/banner.jsx'
import Notice from '../../components/index/notice.jsx'
import LotteryIndex from '../../components/lottery/lotteryIndex'
import { withRouter } from 'react-router-dom';
import Tab from '../../containers/home/tab'
import { post } from '../../fetch/post.js'
import CommonJS from '../../assets/js/common'
import icon_win_more_n from "../../assets/img/lotteryResult/icon_win_more_n.png"
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

import { connect } from 'react-redux'
import { setSelectedTab, setBannerList, setLotteryList, setNoticeList, setAppMenu, setCpMenu } from '../../redux/action'
@connect(
    state => ({
        selectedTab: state.selectedTab, bannerList: state.bannerList, noticeList: state.noticeList,
        lotteryList: state.lotteryList, appMenu: state.appMenu, cpMenu: state.cpMenu
    }),
    { setSelectedTab, setBannerList, setLotteryList, setNoticeList, setAppMenu, setCpMenu }
)
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            web_url: '',//彩票链接
            is_open_cp: '',//是否开启切换彩票按钮
        };
    }


    componentDidMount() {
        this.getRunLotteryList();
        this.getSixLotteryData();
        //获取url参数，如果是从购彩版跳转过来的，则吧登录状态同步
        this.syncLoginInfo();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    //获取url参数，如果是从购彩版跳转过来的，则吧登录状态同步
    syncLoginInfo() {
        let url = window.location.href;
        let querys = url.split("?");
        if (querys.length > 1) {
            let params = querys[1].split("&");
            let uid = params[0].split("=")[1];
            let session_key = params[1].split("=")[1];
            let token = params[2].split("=")[1];
            if (uid != null && session_key != null && token != null && localStorage.getItem("cs_token") == null) {
                localStorage.setItem('cs_token', token);
                localStorage.setItem('cp_uid', uid);
                localStorage.setItem('session_key', session_key);
                //设置用户信息
                CommonJS.setUserInfo();
            }
        }
    }

    //获取六合彩菜单
    getSixLotteryData() {
        post('/v1/api/lottery/index').then(data => {
            if (data.code == 200) {
                let d = data.data;
                this.setState({ web_url: d.site_config.web_url, is_open_cp: d.site_config.is_open_cp });
                this.props.setBannerList(d.ad_list);
                this.props.setNoticeList(d.gg)
                this.props.setAppMenu(d.app_menu);
                this.props.setCpMenu(d.cp_menu);
                //把请求出的彩种数据拿出来放入sessionStorage
                sessionStorage.setItem("lotteryMenuList", JSON.stringify(d.cp_menu));
                //把所有彩种拿出放入sessionStorage
                this.setLotteryToStorage(d.cp_menu);
            }
        });
    }

    //把所有彩种拿出放入sessionStorage
    setLotteryToStorage(menu) {
        let list = [];
        menu.forEach(element => {
            list = list.concat(element.son);
        });
        sessionStorage.setItem("lotteryList", JSON.stringify(list));
    }

    getRunLotteryList() {
        post('/v1/api/lottery/banner').then(data => {
            if (data.code == 200) {
                this.props.setLotteryList(data.data);
            }
        });
    }

    lotteryBannerGoRightStep() {
        if (this.state.slideIndex >= 30) {
            this.setState({ slideIndex: 0 });
        } else {
            this.setState({ slideIndex: ++this.state.slideIndex });
        }
    }

    lotteryBannerGoLeftStep() {
        if (this.state.slideIndex == 0) {
            this.setState({ slideIndex: 30 });
        } else {
            this.setState({ slideIndex: --this.state.slideIndex });
        }
    }

    go_lottery() {
        let cp_uid = localStorage.getItem('cp_uid');
        let session_key = localStorage.getItem('session_key');
        if (cp_uid != null && session_key != null) {
            //存储cookie
            window.location.href = `${this.state.web_url}/#/home?cp_uid=${cp_uid}&session_key=${session_key}`;
        } else {
            window.location.href = this.state.web_url;
        }
    }

    LotteryResultsView() {
        return (
            <div className="w100 flex" style={{ height: '100px' }}>
                <div onClick={() => { this.lotteryBannerGoLeftStep() }} className="icon flex h100 align-item-center" style={{ width: '6%', justifyContent: 'flex-end', paddingTop: "30px" }}>
                    <img style={{ transform: ' rotate(180deg)', width: "70%", height: "25px" }} src={icon_win_more_n} />
                </div>
                <div style={{ width: "88%" }}>
                    <Carousel
                        autoplay={false}
                        infinite
                        dots={false}
                        selectedIndex={this.state.slideIndex}
                    >
                        {this.props.lotteryList.map((val, index) => (
                            <div key={index} className="w100" style={{ height: '100px' }}>
                                <LotteryIndex data={val}></LotteryIndex>
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div onClick={() => { this.lotteryBannerGoRightStep() }} style={{ width: '6%', justifyContent: 'flex-start', paddingTop: "30px" }} className="flex align-item-center">
                    <img style={{ width: "70%", height: "25px" }} src={icon_win_more_n} />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="clearfix bgWhite">
                <NavBar
                    className="navbar_bg_level-one"
                    // leftContent={[
                    //     <Icon key="0" onClick={() => { this.props.history.push('/otherProduction') }} type="ellipsis" />
                    // ]}
                    rightContent={[
                        <div style={{ padding: '10px', paddingRight: '0' }} key="1" onClick={() => { this.props.setSelectedTab('promotion') }}>推广</div>
                    ]}
                >彩助手</NavBar>
                <Banner bannerList={this.props.bannerList}></Banner>
                <Notice list={this.props.noticeList}></Notice>
                {this.LotteryResultsView()}
                <Tab cp_menu={this.props.cpMenu} app_menu={this.props.appMenu}></Tab>
                <div onClick={() => { this.go_lottery() }} style={{ width: "57px", height: "50px", position: "fixed", bottom: "70px", right: "20px" }}>
                    <img className="w100 h100" src={require("../../assets/img/common/tab_lottery.png")} />
                </div>
            </div >
        );
    }
}
export default withRouter(Index)