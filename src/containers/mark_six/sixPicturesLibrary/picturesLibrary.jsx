import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import { NavBar, Icon, Grid, ActivityIndicator } from 'antd-mobile';
import Bar from '../../../components/common/bar'
import VoteListDialog from './voteListDialog'

export default class PicturesLibrary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},//详细信息
            voteList: [],//投票结果列表
            loading: true
        };
    }

    componentWillMount() {
        this.getList(this.props.location.query.id);
    }

    //获取数据
    getList(id) {
        post('/api/forum/thread', { id: id }).then(data => {
            if (data.code == 200) {
                this.setState({ detail: data.data });
                //获取投票结果列表
                this.getVoteList(id);
            }
        });
    }

    //获取投票结果列表
    getVoteList(id) {
        post('/api/vote/index', { id: id }).then(data => {
            if (data.code == 200) {
                this.setState({ voteList: data.data });//关闭loading
            }
            this.setState({ loading: false });//关闭loading
        });
    }

    renderVoteListView() {
        return this.state.voteList.map((item, index) => {
            return (
                <div key={index} className="w50 fl" style={{ height: "20px", marginTop: "10px" }}>
                    <div className="fl flex-center" style={{ width: "30px", height: "20px" }}>{item.title}</div>
                    <Bar width={'75%'} height={'20px'} redWidth={`${item.rate}%`} text={`${item.num}票（${item.rate}%）`}></Bar>
                </div>
            )
        });
    }

    render() {
        // const btnStyle = {
        //     boxSizing: "border-box", width: "25%", height: "80%", fontSize: "11px", marginRight: "15px",

        //     borderRadius: "15px", color: "#999999", border: "1px solid #999999"
        // }
        let data = JSON.stringify(this.state.detail) == "{}" ? {} : this.state.detail.t;
        return (
            <div className="wh100">
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <VoteListDialog ref="voteDialog" title={data.time} callback={this.getVoteList.bind(this)} voteList={this.state.voteList}></VoteListDialog>
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}>{data.name}</NavBar>

                <div className="w100 flex align-item-center bgwhite" style={{ height: "50px", padding: "10px 0 " }}>
                    <div className="h100" style={{ width: "70%", paddingLeft: "5%", boxSizing: "border-box" }}>
                        <div style={{ fontSize: "15px", fontWeight: "bold", letterSpacing: "1px" }}>{data.name}</div>
                        <div style={{ fontSize: "10px", color: "#999999" }}>{data.time}</div>
                    </div>
                    {/* <div className="flex-center" style={btnStyle} onClick={() => { }}>期</div> */}
                </div>
                <main className="w100 clearfix">
                    {/* 开奖信息 */}
                    {/* <div className="w100 bgwhite" style={{ height: "80px" }}></div> */}
                    {/* 图片 */}
                    {/* <div className="w100 clearfix bgwhite" style={{ padding: "0 5%", boxSizing: "border-box" }}>
                        <img src={data.pic} className="w100" />
                    </div> */}
                    <div className="w100 bgWhite" style={{ padding: "15px" }} dangerouslySetInnerHTML={{ __html: data.content }}></div>
                    {/* 票数 */}
                    <div className="w100 clearfix bgwhite" style={{ padding: "0 5%", boxSizing: "border-box" }}>
                        {this.renderVoteListView()}
                    </div>
                    <div className="w100 bgwhite flex-center" style={{ height: "70px" }}>
                        <div className="flex-center" onClick={() => { this.refs.voteDialog.setState({ isShow: true }) }} style={{
                            width: "100px", height: "40px", color: "white",
                            background: "url(../../../assets/img/mark_six/btn_vote_start.png)", backgroundSize: "100% 100%"
                        }}>
                            投票
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
