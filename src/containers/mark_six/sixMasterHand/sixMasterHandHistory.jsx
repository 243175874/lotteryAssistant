
import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import { NavBar, Icon, ActivityIndicator, SearchBar, ListView, PullToRefresh } from 'antd-mobile';
import { connect } from 'react-redux'
import { setArticleId } from '../../../redux/action'
@connect(
    state => ({ articleId: state.articleId, sixMasterHandTid: state.sixTypeId, sixMasterHandUid: state.sixUserId, }),
    { setArticleId }
)
export default class SixMasterHandList extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.page = 1;
        this.isHasMore = true;
        this.state = {
            list: [],
            loading: false,
            dataSource,
        };
    }

    componentDidMount() {
        let sixMasterHandTid = this.props.sixMasterHandTid;
        let sixMasterHandUid = this.props.sixMasterHandUid;
        if (this.props.sixMasterHandTid == "") {
            sixMasterHandTid = localStorage.getItem("sixMasterHandTid");
        } else {
            localStorage.setItem("sixMasterHandTid", this.props.sixMasterHandTid);
        }

        if (this.props.sixMasterHandUid == "") {
            sixMasterHandUid = localStorage.getItem("sixMasterHandUid");
        } else {
            localStorage.setItem("sixMasterHandUid", this.props.sixMasterHandUid);
        }

        this.getList(sixMasterHandTid, sixMasterHandUid, this.page);
    }

    //获取六合图库数据列表
    getList(id, uid, page) {
        this.setState({ loading: true });
        post(`/v1/api/article/list?cate=${id}&uid=${uid}`, { page }).then(data => {
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
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.isHasMore) {
            return;
        }
        this.page++;
        this.getList(this.props.sixMasterHandTid, this.props.sixMasterHandUid, this.page);
    }

    //跳转详情
    goDetail(item) {
        this.props.setArticleId(item.id);
        this.props.history.push({ pathname: '/sourceBookDetail' });
    }

    //点赞
    click_zan(item) {
        this.setState({ loading: true });
        post('/v1/api/article/add-article-give?id=' + item.id).then(data => {
            this.setState({ loading: false });
            if (data.code == 1002) {
                this.props.setSelectedTab('personal');
                this.props.history.push('/');
            } else if (data.code == 200) {
                item.extendgood++;
                //console.log(item);
                this.setState({ "list": this.state.list });
            }
        });
    }

    renderRow(item, index) {
        return (
            <div key={index} className="w100  bgWhite" style={{ height: "125px", padding: "10px 10px 0 10px" }}>
                <div className="w100 h100" style={{ borderBottom: "1px solid #ededed" }}>
                    <div onClick={() => { this.goDetail(item) }} className="w100 h100 flex  align-item-center" style={{ height: "60px" }}>
                        <div style={{ width: "40px", height: "40px" }}>
                            <img src={item.avatar} className="w100 h100" style={{ borderRadius: "50%" }} />
                        </div>
                        <div style={{ width: "calc(100% - 140px)", height: "100%", marginLeft: "20px" }}>
                            <div className="w100 flex align-item-center" style={{ height: "60%", fontSize: "14px" }}>{item.name}</div>
                            <div className="w100 flex" style={{ height: "40%", fontSize: "12px", color: "#999", alignItems: "start" }}>{item.dateline}</div>
                        </div>
                        <div className="flex align-item-center" style={{ width: "80px", height: "20px", color: "#999999", fontSize: "12px", justifyContent: "flex-end" }}>{item.extendnum}个评论</div>
                    </div>
                    <div onClick={() => { this.goDetail(item) }} style={{ width: "calc(100% - 40px)" }}>{item.title}</div>
                    <div onClick={() => { this.click_zan(item) }} className="fr flex align-item-center">
                        <div style={{ width: "16px", height: "16px" }}><img className="w100 h100" src={require("../../../assets/img/common/icon_praise.png")} /></div>
                        <div className="flex-center" style={{ marginLeft: "6px", height: "18px", color: "#BDBDBD" }}>{item.extendgood}</div>
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
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                >往期历史</NavBar>

                <div className="w100" style={{ height: "91%" }}>
                    {this.renderListView()}
                </div>

            </div>
        );
    }
}
