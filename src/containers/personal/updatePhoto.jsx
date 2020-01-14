import React, { Component } from "react";
import { NavBar, Icon, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { post } from '../../fetch/post';
import { api } from '../../fetch/api';
import { Toast } from 'antd-mobile'
class UpdatePhoto extends Component {

    state = {
        imgList: [],
        currentHeadImgUrl: ""
    }

    componentDidMount() {
        this.getUserDefault();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    /**
    *  获取用户默认可选头像
    */
    getUserDefault() {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let headImgUrl = userInfo && userInfo.userhead;
        this.setState({ currentHeadImgUrl: headImgUrl });
        post('/v1/api/user/avatar_list').then(data => {
            let ls = data.data;
            ls.map(item => {
                item.active = false;
                if (headImgUrl.substr(headImgUrl.length-10) == item.avatar_url.substr(item.avatar_url.length-10)) {
              
                    item.active = true;
                }
            })
            this.setState({ imgList: ls })
        });
    }

    /**
    *  设置用户头像选中状态
    */
    setUserPhoto = (index, url) => {
        if (this.state.imgList[index].active) return;
        this.state.imgList.forEach(n => {
            n.active = false;
        })
        this.state.imgList[index].active = true;
        this.setState({ imgList: this.state.imgList });
        //保存当前选中得头像得链接。
        this.setState({ currentHeadImgUrl: url });
    }

    /**
    *  确定选中头像
    *  @url /api/user/headedit
    *  @method post
    *  @return {promise}
    */
    confirmUserPhoto() {
        let params = {
            userhead: this.state.currentHeadImgUrl
        }
        post('/v1/api/user/headedit', params).then(data => {
            if (data.code == 200) {
                Toast.info('修改成功', 3, null, false);
                //手动更新到LocalStorage
                let userInfo = JSON.parse(localStorage.getItem("userInfo"));
                userInfo.userhead = this.state.currentHeadImgUrl;
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                this.props.history.go(-1);
            }
        });
    }


    render() {
        return (
            <div className="wh100">
                <NavBar className="navbar_bg"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                        <div onClick={() => this.confirmUserPhoto()} style={{ padding: '10px', paddingRight: '0' }} key="1">确定</div>
                    ]}>更换头像</NavBar>
                <div>
                    {this.state.imgList.map((n, i) => (
                        <div onClick={() => this.setUserPhoto(i, n.avatar_url)} style={{ width: '20%', float: 'left', margin: '10px 8px 10px 8px', borderRadius: '50%', overflow: 'hidden', boxSizing: 'border-box', border: n.active ? '2px solid #108ee9' : 'none' }} key={i}><img width="100%" src={n.avatar_url} alt="" /></div>
                    ))}
                    <div style={{ clear: 'both' }}></div>
                </div>
            </div>
        );
    }
}
export default withRouter(UpdatePhoto)