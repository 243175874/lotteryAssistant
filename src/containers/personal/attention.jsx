import React, { Component } from "react";
import { NavBar, Icon, List, ListView, ActivityIndicator } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { post } from '../../fetch/post';
class Invitation extends Component {

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
        this.getAttention(this.page);
    }

    //根据id删除关注列表项数据
    deleteItemById(id, list) {
        let index = list.findIndex(item => id == item.id);
        list.splice(index, 1);
        this.setState({ list: list });
    }

    //获取我的关注
    getAttention(page) {
        post('/v1/api/user/collect', { page }).then(data => {
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

    //取消关注
    cancelAttention(id) {
        post(`/v1/api/user/collect_del?id=` + id).then(data => {
            if (data.code == 200) {
                this.deleteItemById(id, this.state.list);
                this.getAttention(++this.page);
            }
        });
    }

    renderRow(item, index) {
        return (
            <div key={index} className="w100 flex  align-item-center bgWhite" style={{ height: "70px", padding: "10px 10px 0 10px" }}>
                <div className="w100 h100 flex  align-item-center" style={{ borderBottom: "1px solid #ededed" }}>
                    <div style={{ width: "45px", height: "45px" }}>
                        <img src={item.userhead} className="w100 h100" />
                    </div>
                    <div style={{ width: "calc(100% - 160px)", height: "100%", marginLeft: "20px" }}>
                        <div className="w100 flex align-item-center" style={{ height: "50%", fontSize: "14px" }}>{item.id}</div>
                        <div className="w100 flex align-item-center" style={{ height: "50%", fontSize: "12px" }}>粉丝：<span>{item.extendfans}</span></div>
                    </div>
                    <div onClick={() => { this.cancelAttention(item.id) }} className="flex-center" style={{ width: "100px", height: "30px", color: "#999999", background: "#ededed", borderRadius: "20px" }}>取消关注</div>
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
                    height: "100%"
                }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }

    //上拉加载更多
    onEndReached = (event) => {
        console.log();
        // load new data
        if (this.isHasMore) {
            return;
        }
        this.getAttention(++this.page);
    }

    render() {
        return (
            <div className="wh100">
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <NavBar className="navbar_bg"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}>我的关注</NavBar>
                <div style={{ height: "91%" }}>
                    {this.renderListView()}
                </div>
            </div>
        );
    }
}
export default withRouter(Invitation)