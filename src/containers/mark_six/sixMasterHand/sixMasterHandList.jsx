
import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import { NavBar, Icon, ActivityIndicator, SearchBar, ListView, PullToRefresh } from 'antd-mobile';
import { connect } from 'react-redux'
import { setSixUserId, setArticleId, setSixTitle, setSixTypeId } from '../../../redux/action'
@connect(
    state => ({ sixTitle: state.sixTitle, sixMasterHandTid: state.sixTypeId }),
    { setSixUserId, setArticleId, setSixTitle, setSixTypeId }
)

export default class SixMasterHandList extends Component {
    constructor(props) {
        super(props);

        this.page = 1;
        this.isHasMore = true;
        this.state = {
            list: [],
            id: 0,
            keyword: "",
            loading: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    componentDidMount() {
        let id = this.props.sixMasterHandTid;
        if (this.props.sixMasterHandTid == "") {
            id = localStorage.getItem("sixMasterHandTid");
                      this.props.setSixTypeId(id);
        } else {
            localStorage.setItem("sixMasterHandTid", this.props.sixMasterHandTid);
        }

        let title = this.props.sixTitle;
        if (this.props.sixTitle == "") {
            title = localStorage.getItem("sixTitle");
            this.props.setSixTitle(title);
        } else {
            localStorage.setItem("sixTitle", this.props.sixTitle);
        }

        this.setState({ id: id });
        this.getList(id, this.page);
    }

    //获取六合高手数据列表
    getList(id, page) {
        this.setState({ loading: true });
        post(`/v1/api/article/gs-user?cate=${id}&keyword=${this.state.keyword}`, { page }).then(data => {
            if (data.code == 200) {
                if (data.data.data.length > 0) {
                    this.isHasMore = false;
                } else {
                    this.isHasMore = true;
                }

                if (this.page == 1) {
                    this.setState({ list: data.data.data });
                } else {
                    let datas = this.state.list.concat(data.data.data);
                    this.setState({ list: datas });
                }
            }
            this.setState({ loading: false });
        });
    }

    search() {
        this.getList(this.state.id, 1);
    }

    //上拉加载更多
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.isHasMore) {
            return;
        }
        this.page++;
        this.getList(this.props.sixMasterHandTid, this.page);
    }

    renderNumber(index) {
        if (index == 0) {
            return <img style={{ width: "70%" }} src={require("../../../assets/img/mark_six/icon_medal_gold_1.png")} />
        } else if (index == 1) {
            return <img style={{ width: "70%" }} src={require("../../../assets/img/mark_six/icon_medal_silve_2.png")} />
        } else if (index == 2) {
            return <img style={{ width: "70%" }} src={require("../../../assets/img/mark_six/icon_medal_bronze_3.png")} />
        } else {
            return Number(index) + 1;
        }
    }

    renderRow(item, index) {
        //console.log(item);
        return (
            <div key={index} className="w100 bgWhite flex" style={{ height: "125px", padding: "10px 10px 0 10px" }}
                onClick={() => { this.props.setSixUserId(item.uid); this.props.history.push({ pathname: '/sixMasterHandDetail' }) }}>
                <div className="flex-center" style={{ width: "10%", height: "50%" }}>
                    {this.renderNumber(index)}
                </div>
                <div style={{ width: "90%" }}>
                    <div className="w100 h50 flex">
                        <div className="flex-center" style={{ width: "60px" }}>
                            <img src={item.avatar} style={{ width: "45px", height: "45px", borderRadius: "50%" }} />
                        </div>
                        <div style={{ width: "120px" }}>
                            <div className="w100 flex align-item-center" style={{ height: "60%", fontSize: "15px" }}>{item.name}</div>
                            <div className="w100 flex align-item-center" style={{ height: "40%", fontSize: "12px" }}>粉丝：<span style={{ color: "#FE623F" }}>{item.extendfans}</span></div>
                        </div>
                        <div style={{ width: "80px" }}>
                            <div className="w100 flex align-item-center" style={{ height: "60%", fontSize: "15px", color: "#FE623F" }}>{item.period}中{item.period_win}</div>
                            <div className="w100 flex align-item-center" style={{ height: "40%", fontSize: "12px", color: "#653D55" }}>最大连中{item.period_wins}期</div>
                        </div>
                        <div style={{ width: "calc(100% - 260px)" }}>
                            <div className="w100 flex align-item-center" style={{ height: "60%", fontSize: "15px", color: "#FE623F", justifyContent: "flex-end" }}>{item.ord.toFixed(2)}%</div>
                            <div className="w100 flex align-item-center" style={{ height: "40%", fontSize: "12px", color: "#653D55", justifyContent: "flex-end" }}>胜率</div>
                        </div>
                    </div>
                    <div className="w100 h50" style={{ padding: "5px 0", color: "#999" }}>{item.description}</div>
                </div>
            </div>
        )
    }

    renderListView() {
        return (
            <ListView
                dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
                renderFooter={() => (<div style={{ paddingTop: "10px", textAlign: 'center' }}>
                    {this.state.loading ? '加载中...' : '加载完成'}
                </div>)}
                renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, rowID)}
                pageSize={15}
                style={{
                    height: "100%",
                    overflow: 'auto',
                }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }


    render() {
        return (
            <div className="w100 bgwhite clearfix">
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                    rightContent={[
                        <div style={{ padding: '10px', paddingRight: '0' }} onClick={() => this.props.history.push('/')} key="1">回到首页</div>
                    ]}
                >{this.props.sixTitle}</NavBar>
                <div className="w100 clearfix">
                    <SearchBar placeholder="搜索" onSubmit={() => { this.search() }} onChange={(value) => { this.setState({ keyword: value }); }} value={this.state.keyword} maxLength={12} />
                </div>

                <div className="w100" style={{ height: "calc(91% - 44px)" }}>
                    {this.renderListView()}
                </div>

            </div>
        );
    }
}
