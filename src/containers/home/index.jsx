import React, { Component } from "react";
import { NavBar, Icon, ActionSheet, WingBlank, Carousel } from 'antd-mobile';
import Banner from '../../components/index/banner.jsx'
import Notice from '../../components/index/notice.jsx'
import LotteryIndex from '../../components/lottery/lotteryIndex'
import { withRouter } from 'react-router-dom';
import Tab from '../../containers/home/tab'
import { post } from '../../fetch/post.js'
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}
import { connect } from 'react-redux'
import { setSelectedTab } from '../../redux/action'
@connect(
    state => ({ selectedTab: state.selectedTab }),
    { setSelectedTab }
)
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerList: [],
            lotteryList: [],
            noticeList: [],
            cp_menu: [],
            app_menu: [],
        };
    }

    componentDidMount() {
        this.getRunLotteryList();
        this.getSixLotteryData();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    //获取六合彩菜单
    getSixLotteryData() {
        post('/v1/api/lottery/index').then(data => {
            if (data.code == 200) {
                let d = data.data;
                this.setState({ app_menu: d.app_menu, cp_menu: d.cp_menu, noticeList: d.gg, bannerList: d.ad_list });
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
                this.setState({
                    lotteryList: data.data
                });
            }
        });
    }

    LotteryResultsView() {
        return (
            <WingBlank>
                <Carousel
                    autoplay={false}
                    infinite
                    dots={false}
                >
                    {this.state.lotteryList.map((val, index) => (
                        <div key={index} className="w100" style={{ height: '100px' }}>
                            <LotteryIndex data={val}></LotteryIndex>
                        </div>
                    ))}
                </Carousel>
            </WingBlank>
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
                <Banner bannerList={this.state.bannerList}></Banner>
                <Notice list={this.state.noticeList}></Notice>
                {this.LotteryResultsView()}
                <Tab cp_menu={this.state.cp_menu} app_menu={this.state.app_menu}></Tab>
            </div>
        );
    }
}
export default withRouter(Index)