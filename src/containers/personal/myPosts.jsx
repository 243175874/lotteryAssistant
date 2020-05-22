import React, { Component } from "react";
import { NavBar, Icon, ListView, PullToRefresh, ActivityIndicator } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { post } from '../../fetch/post';
import { connect } from 'react-redux'
import { setSixUserId, setArticleId } from '../../redux/action'
@connect(
    state => ({ sixTitle: state.sixTitle, sixTypeId: state.sixTypeId }),
    { setSixUserId, setArticleId }
)

class MyPosts extends Component {
    constructor(props) {
        super(props);
        const datasource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.page = 1;
        this.isHasMore = true;
        this.state = {
            dataSource: datasource,
            list: [],
            loading: false,
            upLoading: false,
            pullLoading: false,
        }
    }

    componentDidMount() {
        this.getMyPosts(this.page);
    }

    //获取我的帖子
    getMyPosts(page) {
        this.setState({ loading: true });
        post('/v1/api/user/article', { page }).then(data => {
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

    //上拉加载更多
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.isHasMore) {
            return;
        }
        this.getMyPosts(++this.page);
    }

    //跳转详情
    goDetail(item) {
        this.props.setSixUserId(item.extenduid);
        this.props.setArticleId(item.id);
        this.props.history.push({ pathname: '/sourceBookDetail' });
    }

    // renderRow(item, index) {
    //     let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    //     return (
    //         <div key={index} className="w100  bgWhite" onClick={() => { this.goDetail(item) }} style={{ height: "125px", padding: "10px 10px 0 10px" }}>
    //             <div className="w100 h100" style={{ borderBottom: "1px solid #ededed" }}>
    //                 <div className="w100 h100 flex  align-item-center" style={{ height: "60px" }}>
    //                     <div style={{ width: "40px", height: "40px" }}>
    //                         <img src={item.avatar} className="w100 h100" />
    //                     </div>
    //                     <div style={{ width: "calc(100% - 140px)", height: "100%", marginLeft: "20px" }}>
    //                         <div className="w100 flex align-item-center" style={{ height: "60%", fontSize: "14px" }}>{item.name}</div>
    //                         <div className="w100 flex" style={{ height: "40%", fontSize: "12px", color: "#999", alignItems: "start" }}>{item.dateline}</div>
    //                     </div>
    //                     <div className="flex" style={{ justifyContent: "flex-end", width: "80px", height: "20px", color: "#999999", fontSize: "12px", paddingRight: "10px" }}>{item.extendnum}个评论</div>
    //                 </div>
    //                 <div className="w100">{item.title}</div>
    //                 <div className="fr flex" style={{ width: "80px", height: "20px", justifyContent: "flex-end", paddingRight: "10px" }}>
    //                     <div style={{ width: "16px", height: "16px" }}><img className="w100 h100" src={require("../../assets/img/common/icon_praise.png")} /></div>
    //                     <div className="flex-center" style={{ marginLeft: "10px", height: "18px", color: "#BDBDBD" }}>{item.extendgood}</div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

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
                    <div onClick={() => { this.goDetail(item) }} onClick={() => { this.goDetail(item) }} style={{ width: "calc(100% - 40px)" }}>{item.title}</div>
                    <div onClick={() => { this.click_zan(item) }} className="fr flex align-item-center">
                        <div style={{ width: "16px", height: "16px" }}><img className="w100 h100" src={require("../../assets/img/common/icon_praise.png")} /></div>
                        <div className="flex-center" style={{ marginLeft: "6px", height: "18px", color: "#BDBDBD" }}>{item.extendgood}</div>
                    </div>
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
                    height: "91%",
                    overflow: 'auto',
                }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }


    render() {
        const { list, dataSource, upLoading, pullLoading } = this.state;
        return (
            <div className="wh100">
                <NavBar className="navbar_bg"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}>我的帖子</NavBar>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                {this.renderListView()}
            </div>
        );
    }
}
export default withRouter(MyPosts)