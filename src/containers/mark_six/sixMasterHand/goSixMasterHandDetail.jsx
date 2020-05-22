
import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import { NavBar, Icon, ActivityIndicator, SearchBar, ListView, PullToRefresh, Button, Toast } from 'antd-mobile';
export default class goSixMasterHandDetail extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.page = 1;
        this.currentCommentIndex = 0; //当前评论索引
        this.commentType = ""; //评论种类
        this.isHasMore = true;
        this.detail_id = 0;
        this.uid = 0;
        this.state = {
            detail: {},
            isShowReplyDialog: false,
            hotList: [],//热门评论
            newList: [],//最新评论
            extendid: "",
            loading: false,
            dataSource,
            page: 1,
            contentHtml: "",
            userhead: "",
            username: "",
            fansNumber: 0,
            commentId: "",//评论id
            replyContent: "",
            commentContent: "",//回复内容
            commentzan: "",//点赞的id
            extenduid: 0,
            isCollect: "",//是否已关注
        };
    }

    componentDidMount() {
        let url = this.props.history.location.search;
        this.setParams(url.substring(1));
        this.getDetail();

        let dom = document.getElementById("scroll-box");
        let mainDom = document.getElementById("main");
        dom.addEventListener("scroll", (event) => {
            if (dom.scrollTop + dom.offsetHeight > mainDom.offsetHeight - 300) {
                document.getElementsByClassName("am-list-view-scrollview")[0].style = `position: relative;overflow:auto;height:${this.state.newList.length * 103 + 30}px`;
            }
        }, false);
    }

    setParams(param)
    {
        var vars = param.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == "id")
            {
                this.detail_id = pair[1];
            }
            else if (pair[0] == "uid")
            {
                this.uid = pair[1];
            }
            else
            {
                localStorage.setItem(pair[0], pair[1]);
            }
        }
    }

    //关注
    getAttention() {
        this.setState({ loading: true });
        post(`/v1/api/article/add-collect?uid=` + this.state.extenduid).then(data => {
            this.setState({ loading: false });
            if (data.code == 1002) {
                window.location.href = "uniwebview://loginOut?code=1002";
            } else {
                this.getDetail();
            }
        });
    }

    //点赞
    click_zan(id) {
        this.setState({ loading: true });
        post('/v1/api/article/add-comment-give?id=' + id).then(data => {
            this.setState({ loading: false });
            if (data.code == 1002) {
                window.location.href = "uniwebview://loginOut?code=1002";
            } else {
                //this.page = 1;
                this.getDetail();
            }
        });
    }


    //最新评论列表点赞
    newCommentList_zan(item) {
        this.setState({ loading: true });
        post('/v1/api/article/add-comment-give?id=' + item.id).then(data => {
            this.setState({ loading: false });
            //console.log(item);
            if (data.code == 1002) {
                this.props.setSelectedTab('personal');
                this.props.history.push('/');
            } else if (data.code == 200) {
                item.extendgood++;
                this.setState({ "newList": this.state.newList });
            }
        });
    }

    //获取详情页面信息
    getDetail() {
        this.setState({ loading: true });
        let cate = this.detail_id;
        let uid = this.uid;
        post(`/v1/api/article/info?uid=${uid}&cate=${cate}`).then(data => {
            if (data.code == 200) {
                //console.log(data);
                let d = data.data.article;
                let contentHtml = "<div id='contentHtml'>";
                contentHtml += d.content;
                contentHtml += "</div>";
                // if (d.content.indexOf('<img') > -1) {
                //     let contentIndex = d.content.indexOf('<img') + 4;
                //     contentHtml = d.content.slice(0, contentIndex) + " width='100%'" + d.content.slice(contentIndex);
                // } else {
                //     contentHtml = d.content;
                // }
                this.setState({
                    username: d.name, userhead: d.avatar, contentHtml: contentHtml, extendid: d.extendid,
                    hotList: data.data.comment, extenduid: d.extenduid, isCollect: d.isCollect, detail: d
                });
                this.getNewComment(d.extendid, this.page);
            }
            this.setState({ loading: false });
        });
    }

    //评论
    // comment(content, id, pid = 0) {
    //     if (content == "") {
    //         return;
    //     }
    //     this.setState({ loading: true });
    //     post('/v1/api/article/add-comment', { id, content, pid }).then(data => {
    //         this.setState({ loading: false });
    //         if (data.code == 1002) {
    //             this.props.setSelectedTab('personal');
    //             this.props.history.push('/');
    //         } else {
    //             //this.page = 1;
    //             this.getDetail(this.props.sixMasterHandTid, this.props.sixMasterHandUid);
    //             this.setState({ replyContent: "", commentContent: "" });
    //         }
    //     });
    // }


    //评论
    comment(content, id, pid = null) {
        if (this.commentType == 'hot') {
            this.hotCommentList_comment(content, id, pid);
        } else {
            this.newCommentList_comment(content, id, pid);
        }
    }

    //文章评论
    article_comment(content, id) {
        if (content == "") {
            return;
        }

        this.setState({ loading: true });
        post('/v1/api/article/add-comment', { id, content }).then(data => {
            this.setState({ loading: false });
            if (data.code == 1002) {
                window.location.href = "uniwebview://loginOut?code=1002";
            } else {
                let userInfo = JSON.parse(localStorage.userInfo) || {};
                let username = userInfo.username || "";
                let userhead = userInfo.userhead || "";
                let date = new Date();
                let month = date.getMonth() + 1;
                month = month < 10 ? `0${month}` : month;
                let dateline = `${date.getFullYear()}-${month}-${date.getDate() > 10 ? date.getDate() : '0' + date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
                //console.log(userInfo);
                let obj = { username, content, avatar: userhead, dateline, extendgood: 0, extendnum: 0 };
                this.state.newList.unshift(obj)
                //console.log(this.state.newList);
                this.setState({ commentContent: "" });
            }
        });
    }


    //热门评论
    hotCommentList_comment(content, id, pid = 0) {
        if (content == "") {
            return;
        }
        this.setState({ loading: true });
        post('/v1/api/article/add-comment', { id, content, pid }).then(data => {
            this.setState({ loading: false });
            if (data.code == 1002) {
                window.location.href = "uniwebview://loginOut?code=1002";
            } else {
                this.getDetail();
                this.setState({ replyContent: "", commentContent: "" });
            }
        });
    }
    //最新评论
    newCommentList_comment(content, id, pid = 0) {
        if (content == "") {
            return;
        }
        this.setState({ loading: true });
        post('/v1/api/article/add-comment', { id, content, pid }).then(data => {
            this.setState({ loading: false });
            if (data.code == 1002) {
                window.location.href = "uniwebview://loginOut?code=1002";
            } else if (data.code == 200) {
                let newList = this.state.newList;
                if (newList[this.currentCommentIndex].list == undefined) {
                    newList[this.currentCommentIndex]['list'] = []
                }
                let username = JSON.parse(localStorage.userInfo).username || "";
                newList[this.currentCommentIndex].list.push({ content, username });
                //console.log(newList[this.currentCommentIndex]);
                this.setState({ newList: newList });
                this.setState({ replyContent: "", commentContent: "" });
            }
        });
    }


    getNewComment(id, page) {
        this.setState({ loading: true });
        post('/v1/api/article/comment?id=' + id, { page: page }).then(data => {
            if (data.code == 200) {
                if (data.data.data.length > 0) {
                    this.isHasMore = false;
                } else {
                    this.isHasMore = true;
                }
                //this.setState({ list: data.data, loading: false });//关闭loading
                if (this.page == 1) {
                    this.setState({ newList: data.data.data });
                } else {
                    let datas = this.state.newList.concat(data.data.data);
                    this.setState({ newList: datas });
                }
            }
            document.getElementsByClassName("am-list-view-scrollview")[0].style = `position: relative;height:${this.state.newList.length * 103 + 30}px`;
            this.setState({ loading: false });
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
        this.getNewComment(this.state.extendid, this.page);
    }

    renderRow(item, index) {
        return (
            <div key={index} className="w100 flex" style={{ padding: "10px" }}>
                <div className="flex justify-content-center" style={{ width: "50px" }}>
                    <img src={item.avatar} style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                </div>
                <div className="clearfix" style={{ width: "calc(100% - 50px)" }}>
                    <div style={{ fontSize: "16px", color: "#FF7344", fontWeight: "500" }}>{item.username}</div>
                    <div className="clearfix w100" style={{ lineHeight: "20px", marginTop: "10px" }}>{item.content}</div>
                    <div className="w100 flex" style={{ marginTop: "5px", height: "30px", fontSize: "12px" }}>
                        <div className="flex align-item-center" style={{ width: "calc(100% - 90px)", color: "#BDBDBD" }}>{item.dateline} </div>
                        <div onClick={() => { this.newCommentList_zan(item) }} className="flex align-item-center" style={{ width: "40px", marginRight: "10px" }}>
                            <div style={{ width: "14px", height: "14px" }}>
                                <img className="w100 h100" src={require('../../../assets/img/common/icon_praise.png')} />
                                {/* <img style={{ display: this.state.commentzan.indexOf(item.id) == -1 ? "none" : "block" }} className="w100 h100" src={require("../../../assets/img/common/icon_praise_p.png")} /> */}
                            </div>
                            <div className="flex-center" style={{ width: "16px", height: "16px", color: "#BDBDBD" }}>{item.extendgood}</div>
                        </div>
                        <div onClick={() => { this.setState({ isShowReplyDialog: true, commentId: item.extentid }); this.currentCommentIndex = index; this.commentType = "new"; }} className="flex align-item-center" style={{ width: "40px" }}>
                            <div style={{ width: "14px", height: "14px" }}>
                                <img className="w100 h100" src={require('../../../assets/img/common/icon_comments.png')} />
                            </div>
                            <div className="flex-center" style={{ width: "16px", height: "16px", color: "#BDBDBD" }}>{item.extendnum}</div>
                        </div>
                    </div>
                    <div className="w100" style={{ padding: "10px", background: "#F9F9F9", display: item.list ? "block" : "none" }}>
                        {this.renderCommentReplyList(item.list)}
                    </div>
                </div>
            </div>
        )
    }

    renderCommentReplyList(list) {
        if (!list) {
            list = [];
        }
        return list.map((item, index) => (
            <div key={index} style={{ padding: "5px 0", fontSize: "13px" }}><span style={{ color: "#FF7344" }}>{item.username}：</span>{item.content}</div>
        ));
    }

    renderHotCommentListView() {
        return this.state.hotList.map(((item, index) => (
            <div key={index} className="w100 flex" style={{ padding: "10px" }}>
                <div className="flex justify-content-center" style={{ width: "50px" }}>
                    <img src={item.avatar} style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                </div>
                <div className="clearfix" style={{ width: "calc(100% - 50px)" }}>
                    <div style={{ fontSize: "16px", color: "#FF7344", fontWeight: "500" }}>{item.username}</div>
                    <div className="clearfix w100" style={{ lineHeight: "20px", marginTop: "10px" }}>{item.content}</div>
                    <div className="w100 flex" style={{ marginTop: "5px", height: "30px", fontSize: "12px" }}>
                        <div className="flex align-item-center" style={{ width: "calc(100% - 90px)", color: "#BDBDBD" }}>{item.dateline} </div>
                        <div onClick={() => { this.click_zan(item.id) }} className="flex align-item-center" style={{ width: "40px", marginRight: "10px" }}>
                            <div style={{ width: "14px", height: "14px" }}>
                                <img className="w100 h100" src={require('../../../assets/img/common/icon_praise.png')} />
                                {/* <img style={{ display: this.state.commentzan.indexOf(item.id) == -1 ? "none" : "block" }} className="w100 h100" src={require("../../../assets/img/common/icon_praise_p.png")} /> */}
                            </div>
                            <div className="flex-center" style={{ width: "16px", height: "16px", color: "#BDBDBD" }}>{item.goods}</div>
                        </div>

                        <div onClick={() => { this.setState({ isShowReplyDialog: true, commentId: item.extentid }); this.commentType = "hot"; }} className="flex align-item-center" style={{ width: "40px" }}>
                            <div style={{ width: "14px", height: "14px" }}>
                                <img className="w100 h100" src={require('../../../assets/img/common/icon_comments.png')} />
                            </div>
                            <div className="flex-center" style={{ width: "16px", height: "16px", color: "#BDBDBD" }}>{item.extendnum}</div>
                        </div>
                    </div>

                    <div className="w100" style={{ padding: "10px", background: "#F9F9F9", display: item.list ? "block" : "none" }}>
                        {this.renderCommentReplyList(item.list)}
                    </div>

                </div>
            </div>
        )));
    }

    renderNewCommentListView() {
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource.cloneWithRows(this.state.newList)}
                renderFooter={() => (<div style={{ paddingTop: "10px", textAlign: 'center' }}>
                    {this.state.loading ? '加载中...' : '加载完成'}
                </div>)}
                renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, rowID)}
                pageSize={20}
                style={{
                    height: this.state.newList.length * 103 + "px",
                    overflow: ""
                }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }


    render() {
        //console.log(localStorage.getItem("cs_token"));
        const attentionStyle = { width: "70%", height: "30px", borderRadius: "20px" };
        return (
            <div className="w100 bgwhite clearfix">
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div onClick={() => { this.setState({ isShowReplyDialog: false }); }} className="wh100" style={{ display: this.state.isShowReplyDialog ? "block" : "none", background: "rgba(0, 0, 0, 0.7)", position: "fixed", zIndex: "10" }}>
                    <div onClick={(e) => e.stopPropagation()} className="w100 bgWhite" style={{ height: "180px", borderRadius: "10px", marginTop: "-100px", position: "fixed", top: "50%", zIndex: "1000" }}>
                        <div className="w100 flex" style={{ height: "40px", borderRadius: "10px 10px 0 0" }}>
                            <div className="h100 w50">
                                <div className="h100 flex-center" style={{ width: "60px" }}>评论</div>
                            </div>
                            <div onClick={() => { this.setState({ isShowReplyDialog: false }); this.comment(this.state.replyContent, this.state.extendid, this.state.commentId) }} className="h100 w50 flex" style={{ justifyContent: "flex-end" }}>
                                <div className="h100 flex-center" style={{ width: "60px", color: "#108ee9" }}>发布</div>
                            </div>
                        </div>
                        <div className="w100" style={{ height: "140px" }}>
                            <textarea onChange={(e) => { this.handleChange(e, "replyContent") }} value={this.state.replyContent} className="wh100" placeholder="友善发言的人运气不会太差哦~" style={{ padding: "0 10px 10px 10px", border: "0", borderRadius: " 0 0 10px 10px" }}></textarea>
                        </div>
                    </div>
                </div>
                <div id="scroll-box" className="w100" style={{ height: "100%", overflow: "auto" }}>
                    <main id="main" className="w100 clearfix">
                        <div className="w100 flex" style={{ height: "50px", paddingTop: "10px" }}>
                            <div className="flex-center" style={{ width: "70px" }}>
                                <img src={this.state.userhead} style={{ width: "45px", height: "45px", borderRadius: "50%", display: this.state.userhead ? "block" : "none" }} />
                            </div>
                            <div style={{ width: "calc(100% - 170px)" }}>
                                <div className="w100 flex align-item-center" style={{ height: "60%", fontSize: "15px" }}>{this.state.username}</div>
                                <div className="w100 flex align-item-center" style={{ height: "40%", fontSize: "12px" }}>粉丝：<span style={{ color: "#FE623F" }}></span></div>
                            </div>
                            <div className="flex-center" style={{ width: "100px", display: !this.state.loading ? "block" : "none" }}>
                                <div onClick={() => { this.getAttention() }} className="flex-center"
                                     style={{ ...attentionStyle, background: "#FE623F", color: "white", display: this.state.isCollect == 0 ? "flex" : "none" }}>关注</div>
                                <div className="flex-center"
                                     style={{ ...attentionStyle, background: "#EDEDED", color: "#999999", display: this.state.isCollect == 1 ? "flex" : "none" }}>已关注</div>
                            </div>
                        </div>
                        <div className="w100" style={{ padding: "10px" }} dangerouslySetInnerHTML={{ __html: this.state.contentHtml }}></div>
                        <div className="w100" style={{ background: "#F9F9F9", height: "15px" }}></div>
                        <div className="w100 flex align-item-center" style={{ height: "36px", paddingLeft: "20px", borderBottom: "1px solid rgb(230, 230, 230)" }}>热门评论</div>
                        {this.renderHotCommentListView()}
                        <div className="w100" style={{ height: `${this.state.newList.length * 103 + 50}px` }}>
                            <div className="w100 flex align-item-center" style={{ height: "36px", paddingLeft: "20px", borderBottom: "1px solid rgb(230, 230, 230)" }}>最新评论</div>
                            {this.renderNewCommentListView()}
                        </div>
                    </main>
                    <div className="w100" style={{ height: "45px" }}></div>
                    {/* <div className="w100 bgWhite flex" style={{ height: "45px", position: "fixed", zIndex: "9", bottom: "0", borderTop: "1px solid rgb(230, 230, 230)" }}>
                        <div className="flex-center" style={{ width: "80px" }}>发表评论</div>
                        <div style={{ width: "calc(100% - 160px)" }}>
                            <input className="w100 h100" onChange={(e) => { this.handleChange(e, "commentContent") }} value={this.state.commentContent} type="text" />
                        </div>
                        <div style={{ width: "80px" }} className="flex-center">
                            <Button onClick={() => { this.commentType = 'article'; this.comment(this.state.commentContent, this.state.extendid) }} type="primary" size="small">发送</Button>
                        </div>
                    </div> */}
                    <div className="w100 bgWhite flex" style={{ height: "45px", position: "fixed", zIndex: "9", bottom: "0", borderTop: "1px solid rgb(230, 230, 230)" }}>
                        <div className="flex">
                            <div className="h100 flex-center" style={{ paddingLeft: "10px" }}><img src={require('../../../assets/img/common/ic_write_outline_white.png')} /></div>
                            <div className="h100 flex-center" style={{ padding: "0 5px", fontSize: "12px", color: "#777777" }}>发表评论</div>
                        </div>
                        <div style={{ width: "calc(100% - 150px)" }}>
                            <input onKeyDown={(e) => { e.keyCode == 13 ? this.article_comment(this.state.commentContent, this.state.extendid) : "" }} className="w100 h100" onChange={(e) => { this.handleChange(e, "commentContent") }} value={this.state.commentContent} type="text" />
                        </div>
                        <div onClick={() => { this.article_comment(this.state.commentContent, this.state.extendid) }} className="h100 flex" style={{ paddingLeft: "10px" }}>
                            <div className="flex-center" style={{ width: "17px" }}> <img className="w100" src={require('../../../assets/img/common/icon_comments.png')} /> </div>
                            <div className="small-font" style={{ marginTop: "10px", marginLeft: "5px", fontSize: "12px", color: "#757575" }}>{this.state.detail.extendnum}</div>
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
