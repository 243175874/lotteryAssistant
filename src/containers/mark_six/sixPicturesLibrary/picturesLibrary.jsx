import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import { NavBar, Icon, Grid, ActivityIndicator, Picker, List, ListView, Button } from 'antd-mobile';
import Bar from '../../../components/common/bar'
import VoteListDialog from './voteListDialog'
import { connect } from 'react-redux'
import { setSelectedTab, setSixTitle, setSixTypeId } from '../../../redux/action'
const PickerContent = ({ extra, onClick, children }) => {
    return (
        <div onClick={onClick} className="wh100 flex-center">
            {children} {extra}
        </div >
    )
};

@connect(
    state => ({ sixTitle: state.sixTitle, sixTypeId: state.sixTypeId, isShowDetailHead: state.isShowDetailHead }),
    { setSelectedTab, setSixTitle, setSixTypeId }
)

export default class PicturesLibrary extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.currentCommentIndex = 0; //当前评论索引
        this.commentType = ""; //评论种类
        this.page = 1;
        this.isHasMore = true;
        this.state = {
            detail: {},//详细信息
            currentPeriod: "",//当前期数
            periodList: [],  //期数列表
            voteList: [],   //投票结果列表
            loading: false,
            hotList: [],//热门评论
            newList: [],//最新评论
            extendid: "",
            commentId: "",//评论id
            replyContent: "",
            commentContent: "",//回复内容  
            isShowReplyDialog: false,
            dataSource
        };
    }

    componentDidMount() {
        let id = this.props.sixTypeId;
        if (this.props.sixTypeId == "") {
            id = localStorage.getItem("sixTypeId");
            this.props.setSixTypeId(id);
        } else {
            localStorage.setItem("sixTypeId", this.props.sixTypeId);
        }


        let title = this.props.sixTitle;
        if (this.props.sixTypeId == "") {
            title = localStorage.getItem("sixTitle");
        } else {
            localStorage.setItem("sixTitle", this.props.sixTitle);
        }
        this.props.setSixTitle(title);

        this.getInitializeData(id);
        let dom = document.getElementById("scroll-box");
        let mainDom = document.getElementById("main");
        dom.addEventListener("scroll", (event) => {
            if (dom.scrollTop + dom.offsetHeight > mainDom.offsetHeight - 300) {
                document.getElementsByClassName("am-list-view-scrollview")[0].style = `position: relative;overflow:auto;height:${this.state.newList.length * 103 + 30}px`;
            }
        }, false);
    }

    //首次进入页面获取数据
    getInitializeData(id) {
        this.setState({ loading: true });
        post(`/v1/api/article/info-tk?cate=` + id).then(data => {
            //console.log(data);
            this.setState({ loading: false });
            if (data.code == 200) {
                let d = data.data;
                this.setState({
                    detail: d.article, currentPeriod: [d.period[0].value], hotList: d.comment, extendid: d.article.extendid,
                    periodList: d.period, voteList: d.poll, extenduid: d.article.extenduid
                });
                this.getNewComment(d.article.extendid, this.page);
            }
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
    //             this.getInitializeData(this.props.sixTypeId);
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
                this.props.setSelectedTab('personal');
                this.props.history.push('/');
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
                console.log(this.state.newList);
                this.setState({ commentContent: "" });
            }
        });
    }

    //热门评论
    hotCommentList_comment(content, id, pid) {
        if (content == "") {
            return;
        }
        this.setState({ loading: true });
        post('/v1/api/article/add-comment', { id, content, pid }).then(data => {
            this.setState({ loading: false });
            if (data.code == 1002) {
                this.props.setSelectedTab('personal');
                this.props.history.push('/');
            } else {
                this.getInitializeData(this.props.sixTypeId);
                this.setState({ replyContent: "" });
            }
        });
    }

    //最新评论
    newCommentList_comment(content, id, pid) {
        if (content == "") {
            return;
        }
        this.setState({ loading: true });
        post('/v1/api/article/add-comment', { id, content, pid }).then(data => {
            this.setState({ loading: false });
            if (data.code == 1002) {
                this.props.setSelectedTab('personal');
                this.props.history.push('/');
            } else if (data.code == 200) {
                let newList = this.state.newList;
                if (newList[this.currentCommentIndex].list == undefined) {
                    newList[this.currentCommentIndex]['list'] = []
                }
                let username = JSON.parse(localStorage.userInfo).username || "";
                newList[this.currentCommentIndex].list.push({ content, username });
                console.log(newList[this.currentCommentIndex]);
                this.setState({ newList: newList, replyContent: "" });
            }
        });
    }


    //根据id和期数查询当前页面所有数据
    getPageAllDateByIdAndPeriod(id, period) {
        this.setState({ loading: true });
        post(`/v1/api/article/info-tk?cate=${id}&period=${period}`).then(data => {
            this.setState({ loading: false });
            if (data.code == 200) {
                let d = data.data;
                this.setState({
                    detail: d.article, periodList: d.period, voteList: d.poll,
                    hotList: data.data.comment, extenduid: d.extenduid
                });
            }
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

    //上拉加载更多
    onEndReached = (event) => {
        // load new data
        if (this.isHasMore) {
            return;
        }
        this.page++;
        this.getNewComment(this.state.extendid, this.page);
    }

    //点赞
    click_zan(id) {
        this.setState({ loading: true });
        post('/v1/api/article/add-comment-give?id=' + id).then(data => {
            this.setState({ loading: false });
            if (data.code == 1002) {
                this.props.setSelectedTab('personal');
                this.props.history.push('/');
            } else {
                this.getInitializeData(this.props.sixTypeId);
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

    renderRow(item, index) {

        return (
            <div key={index} className="w100 flex" style={{ padding: "10px" }}>
                <div className="flex justify-content-center" style={{ width: "50px" }}>
                    <img src={item.avatar} style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
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
            <div key={index} className="w100 flex clearfix" style={{ padding: "10px" }}>
                <div className="flex justify-content-center" style={{ width: "50px" }}>
                    <img src={item.avatar} style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
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
        //console.log(this.state.newList.length);
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
                    height: this.state.newList.length * 103 + 30 + "px",
                    overflow: ""
                }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }


    changePeriod(period) {
        this.setState({ currentPeriod: period });
        this.getPageAllDateByIdAndPeriod(this.props.sixTypeId, period[0]);
    }

    renderVoteListView() {
        let sum = 0;
        this.state.voteList.forEach(item => {
            sum += Number(item.value);
        });

        return this.state.voteList.map((item, index) => {
            let percent = item.value / sum * 100;
            percent = percent.toFixed(2)
            //console.log(percent);
            return (
                <div key={index} className="w50 fl" style={{ height: "20px", marginTop: "10px" }}>
                    <div className="fl flex-center" style={{ width: "30px", height: "20px" }}>{item.label}</div>
                    <Bar width={'75%'} height={'20px'} redWidth={`${percent}%`} text={`${item.value}票（${percent}%）`}></Bar>
                </div>
            )
        });
    }

    render() {
        const btnStyle = {
            boxSizing: "border-box", width: "100px", height: "80%", fontSize: "11px",
            borderRadius: "15px", color: "#999999", border: "1px solid #999999"
        }
        let data = JSON.stringify(this.state.detail) == "{}" ? {} : this.state.detail;
        let contentHtml = "";
        if (data.content && data.content.indexOf('<img') > -1) {
            let contentIndex = data.content.indexOf('<img') + 4;
            contentHtml = data.content.slice(0, contentIndex) + " width='100%'" + data.content.slice(contentIndex);
        }

        return (
            <div className="wh100 bgWhite">
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <VoteListDialog ref="voteDialog" title={this.state.currentPeriod} voteList={this.state.voteList}></VoteListDialog>
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
                <NavBar
                    style={{ display: this.props.isShowDetailHead ? "none" : "flex" }}
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}>{this.props.sixTitle}</NavBar>
                <div id="scroll-box" className="w100" style={{ height: this.props.isShowDetailHead ? "100%" : "91%", overflow: "auto" }}>
                    <div className="flex align-item-center bgwhite" style={{ height: "50px", padding: "10px 0 ", width: "calc(100% - 20px)" }}>
                        <div className="h100" style={{ width: "70%", paddingLeft: "5%", boxSizing: "border-box" }}>
                            <div style={{ fontSize: "15px", fontWeight: "bold", letterSpacing: "1px" }}>{data.name}</div>
                            <div style={{ fontSize: "10px", color: "#999999" }}>{data.dateline}</div>
                        </div>
                        <div className="flex-center" style={btnStyle}>
                            <Picker data={this.state.periodList} cols={1} value={this.state.currentPeriod} extra={this.state.currentPeriod} onChange={v => { this.changePeriod(v) }}>
                                <PickerContent></PickerContent>
                            </Picker>
                        </div>
                    </div>
                    <main id="main" className="w100 clearfix">
                        {/* 开奖信息 */}
                        {/* <div className="w100 bgwhite" style={{ height: "80px" }}></div> */}
                        {/* 图片 */}
                        {/* <div className="w100 clearfix bgwhite" style={{ padding: "0 5%", boxSizing: "border-box" }}>
                            <img src={data.pic} className="w100" />
                        </div> */}
                        <div className="w100 bgWhite" style={{ padding: "15px" }} dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
                        {/* 票数 */}
                        <div className="w100 clearfix bgwhite" style={{ padding: "0 5%", boxSizing: "border-box" }}>
                            {this.renderVoteListView()}
                        </div>
                        <div className="w100 bgwhite flex-center" style={{ height: "70px" }}>
                            <div className="flex-center" onClick={() => { this.refs.voteDialog.setState({ isShow: true }) }} style={{
                                width: "100px", height: "40px", color: "white",
                                background: `url(${require('../../../assets/img/mark_six/btn_vote_start.png')})`, backgroundSize: "100% 100%"
                            }}>
                                投票
                            </div>
                        </div>
                        <div className="w100 flex align-item-center" style={{ height: "36px", paddingLeft: "20px", borderBottom: "1px solid rgb(230, 230, 230)" }}>热门评论</div>
                        {this.renderHotCommentListView()}
                        <div className="w100" style={{ height: `${this.state.newList.length * 103 + 66}px` }}>
                            <div className="w100 flex align-item-center" style={{ height: "36px", paddingLeft: "20px", borderBottom: "1px solid rgb(230, 230, 230)" }}>最新评论</div>
                            {this.renderNewCommentListView()}
                        </div>
                    </main>
                    <div className="w100" style={{ height: "45px" }}></div>
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
            </div>
        );
    }
}
