
import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import PostMessage from './postMessage'
import { NavBar, Icon, ActivityIndicator, SearchBar, ListView, PullToRefresh } from 'antd-mobile';

import { connect } from 'react-redux'
import { setSixUserId, setIsShowSendMessagePage } from '../../../redux/action'
@connect(
    state => ({ sixTitle: state.sixTitle, sixTypeId: state.sixTypeId }),
    { setSixUserId, setIsShowSendMessagePage }
)

export default class PeachMeetingList extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.page = 1;
        this.isHasMore = true;
        this.state = {
            list: [],
            id: 0,
            loading: false,
            dataSource,
        };
    }

    componentWillMount() {
        this.getList(this.props.sixTypeId, 1);
    }

    //获取六合图库数据列表
    getList(tid, page) {
        this.setState({ loading: true });
        post('/api/index/ptdh_list', { tid, page }).then(data => {
            if (data.code == 200) {
                if (data.data.data.length > 0) {
                    this.isHasMore = false;
                } else {
                    this.isHasMore = true;
                }
                //this.setState({ list: data.data, loading: false });//关闭loading
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

    //上拉加载更多
    onEndReached = (event) => {
        // load new data
        if (this.isHasMore) {
            return;
        }
        this.page++;
        this.getList(this.props.sixTypeId, this.page);
    }

    renderRow(item, index) {
        return (
            <div key={index} className="w100  bgWhite" style={{ height: "125px", padding: "10px 10px 0 10px" }}
                onClick={() => { this.props.setSixUserId(item.id); this.props.history.push({ pathname: '/sixMasterHandDetail' }) }}>
                <div className="w100 h100" style={{ borderBottom: "1px solid #ededed" }}>
                    <div className="w100 h100 flex  align-item-center" style={{ height: "60px" }}>
                        <div style={{ width: "40px", height: "40px" }}>
                            <img src={item.userhead} className="w100 h100" style={{ borderRadius: "50%" }} />
                        </div>
                        <div style={{ width: "calc(100% - 140px)", height: "100%", marginLeft: "20px" }}>
                            <div className="w100 flex align-item-center" style={{ height: "60%", fontSize: "14px" }}>{item.username}</div>
                            <div className="w100 flex" style={{ height: "40%", fontSize: "12px", color: "#999", alignItems: "start" }}>{item.add_time}</div>
                        </div>
                        <div className="flex align-item-center" style={{ width: "80px", height: "20px", color: "#999999", fontSize: "12px", justifyContent: "flex-end" }}>{item.reply}个评论</div>
                    </div>
                    <div className="w100">{item.title}</div>
                    <div className="fr flex align-item-center" style={{ width: "80px", height: "20px", justifyContent: "flex-end" }}>
                        <div style={{ width: "16px", height: "16px" }}><img className="w100 h100" src="../../assets/img/common/icon_praise.png" /></div>
                        <div className="flex-center" style={{ marginLeft: "10px", height: "18px", color: "#BDBDBD" }}>{item.zan}</div>
                    </div>
                </div>
            </div>
        )
    }

    renderListView() {
        return (
            <ListView
                ref={el => this.lv = el}
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
                <PostMessage></PostMessage>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                    rightContent={[
                        <div onClick={() => { this.props.setIsShowSendMessagePage(true) }} style={{ padding: '10px', paddingRight: '0' }} key="1">发帖</div>
                    ]}
                >{this.props.sixTitle}</NavBar>
                <div className="w100" style={{ height: "91%" }}>
                    {this.renderListView()}
                </div>
            </div>
        );
    }
}
