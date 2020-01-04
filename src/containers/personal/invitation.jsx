import React, { Component } from "react";
import { NavBar, Icon, ListView, PullToRefresh } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { post } from '../../fetch/post';

function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}
class MyPosts extends Component {
    constructor(props) {
        super(props);
        const datasource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: datasource,
            list: [1, 2, 3, 4],
            upLoading: false,
            pullLoading: false
        }
    }

    componentWillMount() {
        this.getMyPosts();
    }

    //获取我的帖子
    getMyPosts() {
        post('/api/api/get_my_item').then(data => {
            console.log(data);
        });
    }

    //上拉加载
    onEndReached = (page, lastPage) => {
        //当前页小于总页数继续请求下一页数据，否则停止请求数据
        if (Number(page) < Number(lastPage)) {
            this.setState({ upLoading: true })
            //接口请求下一页数据,完成后将upLoading设为false
        }
    }
    //下拉刷新
    onRefresh = () => {
        this.setState({ pullLoading: true })
        //接口请求第一页数据,完成后将pullLoading设为false
    }

    //获取item进行展示
    renderRow = (item, i) => {
        return (
            <div>itemview
            </div>
        )
    }


    render() {
        const { list, dataSource, upLoading, pullLoading } = this.state;
        return (
            <div className="wh100">
                <NavBar className="navbar_bg navbar_top"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}>我的帖子</NavBar>
                {
                    list && list.rows && list.rows.length ?
                        <ListView
                            dataSource={dataSource.cloneWithRows(list.rows)}
                            renderRow={(rowData, id1, i) => this.renderRow(rowData, i)}
                            initialListSize={10}
                            pageSize={10}
                            renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                                {(list.pageNum < list.totalPage) && upLoading ? <Icon type="loading" /> : null}
                            </div>)}
                            onEndReached={() => this.onEndReached(list.pageNum, list.totalPage)}
                            onEndReachedThreshold={20}
                            useBodyScroll={true}
                            style={{ width: '100vw' }}
                            pullToRefresh={<PullToRefresh
                                refreshing={pullLoading}
                                onRefresh={this.onRefresh}
                            />}
                        />
                        :
                        list && list.rows && !list.rows.length ?
                            <div>
                                <p>暂无数据</p>
                            </div> : null
                }
            </div>
        );
    }
}
export default withRouter(MyPosts)