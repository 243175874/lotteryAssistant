import React, { Component } from "react";
import { NavBar, Icon, ActionSheet, WingBlank, Carousel } from 'antd-mobile';
import Banner from '../../components/index/banner.jsx'
import Notice from '../../components/index/notice.jsx'
import LotteryIndex from '../../components/lottery/lotteryIndex'
import Tab from '../../containers/home/tab'
import { post } from '../../fetch/post.js'
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerList: [],
            lotteryList: [],
            noticeList: []
        };
    }

    componentWillMount() {
        this.getBannerData();
        this.getRunLotteryList();
        this.getNoticeData();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    getBannerData() {
        post('/api/index/ad_list?type_id=0').then(data => {
            if (data.code == 200) {
                this.setState({
                    bannerList: data.data
                });
            }
        });
    }

    getNoticeData() {
        post('/api/index/gg_list').then(data => {
            if (data.code == 200) {
                this.setState({
                    noticeList: data.data
                });
            }

        });
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
                    leftContent={[
                        <Icon key="0" onClick={() => console.log('onLeftClick')} type="ellipsis" />
                    ]}
                    rightContent={[
                        <div style={{ padding: '10px', paddingRight: '0' }} key="1">分享</div>
                    ]}
                >彩助手</NavBar>
                <Banner bannerList={this.state.bannerList}></Banner>
                <Notice list={this.state.noticeList}></Notice>

                {this.LotteryResultsView()}
                <Tab></Tab>
            </div>
        );
    }
}
