import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import { ActivityIndicator } from 'antd-mobile';
export default class VoteListDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            loading: false,
            selected: ""
        };
    }

    close() {
        this.setState({ isShow: false });
    }

    select(id) {
        this.setState({ selected: id });
    }

    getVote() {
        this.setState({ loading: true });
        post('/api/vote/vote.html', { id: this.state.selected }).then(data => {
            console.log(data);
            this.setState({ loading: false }); //关闭loading
            //如果已登录，则继续执行。
            if (data.code == null) {
                this.props.callback();
                this.close();
            }
        });
    }

    renderVoteListView() {
        return this.props.voteList.map((item, index) => {
            return (
                <div onClick={() => { this.select(item.id) }} key={index} className="flex-center fl" style={{
                    width: "28%", height: "28px", border: item.id != this.state.selected ? "1px solid #999" : "1px solid #FE623F",
                    color: item.id == this.state.selected ? "white" : "black",
                    borderRadius: "2px", marginLeft: "3%", marginTop: "10px", background: item.id == this.state.selected ? "#FE623F" : "none"
                }}>
                    {item.title}({item.num})票
                </div>
            )
        })
    }

    render() {
        const style = {
            width: "300px", height: "280px", position: "fixed", top: "50%",
            left: "50%", zIndex: "201", marginLeft: "-150px", marginTop: "-140px", borderRadius: "3px"
        };
        const props = this.props;
        return (
            <div className="wh100" style={{
                position: "fixed", top: "0", left: "0", zIndex: "200",
                background: "rgba(0, 0, 0, 0.3)", display: this.state.isShow ? "block" : "none"
            }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="bgWhite" style={style}>
                    <div className="w100 flex-center" style={{
                        borderRadius: "3px 3px 0 0", height: "53px",
                        background: "#FE623F", color: "white", fontSize: "15px", letterSpacing: "1px"
                    }}>
                        <div className="h100 flex-center" style={{ width: "240px" }}>{props.title}</div>
                        <div onClick={() => { this.close() }} style={{ width: "25px", height: "25px" }}>
                            <img className="w100" src={require("../../../assets/img/mark_six/icon_close.png")} />
                        </div>

                    </div>
                    <div className="w100 " style={{ height: "180px" }}>
                        {this.renderVoteListView()}
                    </div>
                    <div className="w100 bgwhite flex-center" style={{ height: "35px" }}>
                        <div className="flex-center" onClick={() => { this.getVote() }} style={{
                            width: "100px", height: "35px", color: "white",
                            background: `url(${require('../../../assets/img/mark_six/btn_vote_start.png')})`, backgroundSize: "100% 100%"
                        }}>
                            投票
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
