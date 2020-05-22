import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { post } from '../../fetch/post.js';
import { Toast, ActivityIndicator, ListView } from 'antd-mobile'
import CommonJS from '../../assets/js/common'
import { NavBar, Icon } from 'antd-mobile';

class Message extends Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.page = 1;
        this.isHasMore = true;
        this.state = {
            list: [],
            loading: true,
            dataSource
        }
    }
    
    componentDidMount() {
        this.getMessage(this.page);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    //获取站内消息
    getMessage(page) {
        post(`/v1/api/user/message`, { page }).then(data => {
            //console.log(data);
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

    renderRow(item, index) {
        return (
            <div key={index} className="bgWhite" style={{ width: "90%", margin: "0 auto", height: "120px", marginTop: "10px", borderRadius: "5px", padding: "10px" }}>
                <div className="w100 flex align-item-center" style={{ borderBottom: "1px solid #E1E1E1", height: "30%", paddingBottom: "10px" }}>
                    <div style={{ width: "12px", height: "12px", marginLeft: "10px" }}>
                        <img className="w100 h100" src={require("../../assets/img/home/used_icon_feedback.png")} />
                    </div>
                    <div className="h100 flex-center" style={{ marginLeft: "10px" }}>{item.title}</div>
                </div>
                <div className="w100" style={{ height: "70%", paddingLeft: "10px", paddingTop: "10px", color: "#666666" }}>
                    <p className="h50 flex align-item-center">{item.content}</p>
                    <p className="h50 flex align-item-center">{item.time}</p>
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
                pageSize={10}
                style={{
                    height: "91%",
                    backgroundColor: "#f5f5f9"
                }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }

    //上拉加载更多
    onEndReached = (event) => {
        //console.log();
        // load new data
        if (this.isHasMore) {
            return;
        }
        this.getMessage(++this.page);
    }


    render() {
        return (
            <div className="wh100 messagePage">
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <NavBar className="navbar_bg"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}>站内消息</NavBar>
                {this.renderListView()}
            </div>
        );
    }
}
export default withRouter(Message)