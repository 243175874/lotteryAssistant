
import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import { NavBar, Icon, ActivityIndicator, SearchBar, ListView, PullToRefresh, Button, Toast } from 'antd-mobile';
import { connect } from 'react-redux'
@connect(
    state => ({ sixMasterHandUid: state.sixUserId, sixMasterHandTid: state.sixTypeId }),
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
            id: 0,
            loading: false,
            dataSource,
            page: 1,
            contentHtml: "",
            userhead: "",
            username: "",
            fansNumber: 0,
            commentId: "",//评论id
            replyContent: "",//回复内容
            commentzan: "",//点赞的id
            postId: 0,
        };
    }

    componentWillMount() {
        this.setState({ id: this.props.sixMasterHandUid });
        this.getDetail(this.props.sixMasterHandUid);
    }

    getAttention() {
        this.setState({ loading: true });
        post('/api/api/zan_collect', { id: this.props.sixMasterHandUid, type: 0, zan_collect: "collect" }).then(data => {
            if (!isNaN(data)) {
                Toast.info('关注成功！', 2, null, false);
            }
            this.setState({ loading: false });
        });
    }

    click_zan(id) {
        this.setState({ loading: true });
        post('/api/api/zan_collect', { id: id, type: 2, zan_collect: "zan" }).then(data => {
            this.setState({ loading: false });
            this.getDetail(this.props.sixMasterHandUid);
        });
    }

    getDetail(id) {
        this.setState({ loading: true });
        post('/api/forum/thread', { id }).then(data => {
            if (data.code == 200) {
                let d = data.data.t;
                this.setState({
                    username: d.username, userhead: d.userhead, contentHtml: d.content,
                    list: data.data.comment_list.data, commentzan: data.data.commentzan, postId: d.id
                });
            }
            this.setState({ loading: false });

        });
    }

    replyComment() {
        this.setState({ loading: true });
        post('/api/comment/add', { id: this.state.postId, tid: 0, content: this.state.replyContent }).then(data => {
            this.setState({ loading: false });
            this.getDetail(this.props.sixMasterHandUid);
        });
    }

    /**
     *  动态绑定input value
     */
    handleChange = (e, str) => {
        let params = {};
        params[str] = e.target.value;
        this.setState(params)
    }


    //上拉加载更多
    onEndReached = (event) => {
        // load new data
        if (this.isHasMore) {
            return;
        }
        this.page++;
        this.getList(this.props.sixMasterHandUid, this.page);
    }

    renderRow(item, index) {
        return (
            <div key={index} className="w100 flex" style={{ padding: "10px" }}>
                <div className="flex justify-content-center" style={{ width: "50px" }}>
                    <img src={item.userhead} style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                </div>
                <div className="clearfix" style={{ width: "calc(100% - 50px)" }}>
                    <div style={{ fontSize: "16px", color: "#FF7344", fontWeight: "500" }}>{item.username}</div>
                    <div className="clearfix w100" style={{ lineHeight: "20px", marginTop: "10px" }}>{item.content}</div>
                    <div className="w100 flex" style={{ marginTop: "5px", height: "30px" }}>
                        <div className="flex align-item-center" style={{ width: "calc(100% - 100px)" }}>{item.time} </div>
                        <div onClick={() => { this.click_zan(item.id) }} className="flex align-item-center" style={{ width: "50px" }}>
                            <div style={{ width: "18px", height: "18px" }}>
                                <img style={{ display: this.state.commentzan.indexOf(item.id) !== -1 ? "none" : "block" }} className="w100 h100" src={require('../../../assets/img/common/icon_praise.png')} />
                                <img style={{ display: this.state.commentzan.indexOf(item.id) == -1 ? "none" : "block" }} className="w100 h100" src={require("../../../assets/img/common/icon_praise_p.png")} />
                            </div>
                            <div className="flex-center" style={{ width: "25px", height: "25px", color: this.state.commentzan.indexOf(item.id) !== -1 ? "#FF7344" : "#BDBDBD" }}>62</div>
                        </div>
                        <div onClick={() => { this.setState({ commentId: item.id }) }} className="flex align-item-center" style={{ width: "50px" }}>
                            <div style={{ width: "18px", height: "18px" }}>
                                <img className="w100 h100" src={require("../../../assets/img/common/icon_comments.png")} />
                            </div>
                            <div className="flex-center" style={{ width: "25px", height: "25px", color: "#BDBDBD" }}>{item.reply}</div>
                        </div>
                    </div>
                    <div className="w100" style={{ padding: "10px", background: "#F9F9F9" }}>
                        <div style={{ padding: "5px 0", fontSize: "13px" }}><span style={{ color: "#FF7344" }}>Gureas：</span>五肖中，六码没中</div>
                        <div style={{ padding: "5px 0", fontSize: "13px" }}><span style={{ color: "#FF7344" }}>Gureas：</span>五肖中，六码没中</div>
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
                    height: this.state.list.length * 153 + 50,
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
                        <div style={{ padding: '10px', paddingRight: '0' }} onClick={() => this.props.history.push('/sixMasterHandHistory')} key="1">往期历史</div>
                    ]}
                >详情</NavBar>
                <div className="w100" style={{ height: "91%", overflow: "auto" }}>
                    <div className="w100 flex" style={{ height: "50px" }}>
                        <div className="flex-center" style={{ width: "70px" }}>
                            <img src={this.state.userhead} style={{ width: "45px", height: "45px", borderRadius: "50%", display: this.state.userhead ? "block" : "none" }} />
                        </div>
                        <div style={{ width: "calc(100% - 170px)" }}>
                            <div className="w100 flex align-item-center" style={{ height: "60%", fontSize: "15px" }}>{this.state.username}</div>
                            <div className="w100 flex align-item-center" style={{ height: "40%", fontSize: "12px" }}>粉丝：<span style={{ color: "#FE623F" }}></span></div>
                        </div>
                        <div className="flex-center" style={{ width: "100px" }}>
                            <div onClick={() => { this.getAttention() }} className="flex-center" style={{ width: "70%", height: "30px", background: "#FE623F", borderRadius: "20px", color: "white" }}>关注</div>
                        </div>
                    </div>
                    <div className="w100" style={{ padding: "15px" }} dangerouslySetInnerHTML={{ __html: this.state.contentHtml }}></div>
                    <div className="w100" style={{ background: "#F9F9F9", height: "15px" }}></div>
                    <div className="w100 flex align-item-center" style={{ height: "36px", paddingLeft: "20px", borderBottom: "1px solid rgb(230, 230, 230)" }}>最新评论</div>
                    {this.renderListView()}
                    <div className="w100" style={{ height: "45px" }}></div>
                    <div className="w100 bgWhite flex" style={{ height: "45px", position: "fixed", bottom: "0", borderTop: "1px solid rgb(230, 230, 230)" }}>
                        <div className="flex-center" style={{ width: "80px" }}>发表评论</div>
                        <div style={{ width: "calc(100% - 160px)" }}>
                            <input className="w100 h100" onChange={(e) => { this.handleChange(e, "replyContent") }} value={this.state.replyContent} type="text" />
                        </div>
                        <div style={{ width: "80px" }} className="flex-center">
                            <Button onClick={() => { this.replyComment() }} type="primary" size="small">发送</Button>
                        </div>
                    </div>
                </div>

                {/* <div className="w100" style={{ height: "calc(91% - 44px)" }}>
                    {this.renderListView()}
                </div> */}

            </div>
        );
    }
}
