
import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import { NavBar, Icon, ActivityIndicator, SearchBar } from 'antd-mobile';
import { connect } from 'react-redux'
import { setIsShowSendMessagePage } from '../../../redux/action'
@connect(
    state => ({ sixTypeId: state.sixTypeId, isShowSendMessagePage: state.isShowSendMessagePage }),
    { setIsShowSendMessagePage }
)
export default class PostMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            title: "",
            content: ""
        };
    }

    getSendMessage(tid, title, content) {
        this.setState({ loading: true });
        post('/api/forum/add', { tid, title, content }).then(data => {
            this.setState({ loading: false });//关闭loading
            if (data == null) {
                this.props.setIsShowSendMessagePage(false);
                this.setState({ title: "", content: "" });
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

    render() {
        return (
            <div className="wh100 bgwhite" style={{ display: this.props.isShowSendMessagePage ? "block" : "none", position: "fixed", top: "0", left: "0", zIndex: "200" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.setIsShowSendMessagePage(false)} type="left" />
                    ]}
                >发帖</NavBar>
                <div className="w100 clearfix flex flex-column align-item-center">
                    <input value={this.state.title} onChange={(e) => this.handleChange(e, 'title')} style={{ width: "90%", height: "35px", borderBottom: "1px solid #FE623F", marginTop: "10px" }} placeholder="请输入标题（32字以内）" maxLength="32" />
                    <textarea value={this.state.content} onChange={(e) => this.handleChange(e, 'content')} maxLength="1000" placeholder="请输入帖子内容（1000字以内）" style={{ width: "90%", height: "120px", marginTop: "20px", border: "0" }} ></textarea>
                    <div className="flex-center"
                        onClick={() => { this.getSendMessage(this.props.sixTypeId, this.state.title, this.state.content) }}
                        style={{
                            width: "75%", height: "39px", background: "url(../../../../../assets/img/mark_six/bg_post_release.png)",
                            backgroundSize: "100% 100%", marginTop: "20px", color: "white"
                        }}>
                        发布帖子
                    </div>
                </div>
            </div>
        );
    }
}