import React, { Component } from "react";
import { NavBar, Icon, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { post } from '../../fetch/post.js';

class OtherProduction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { label: "PC版" },
                { label: "触屏版" }
            ],
            pcUrl: "",
            wapUrl: ""
        };
    }

    componentDidMount() {
        this.getOtherProduction();
    }

    //获取六合彩菜单
    getOtherProduction() {
        post('/v1/api/app/config').then(data => {
            if (data.code == 200) {
                let d = data.data;
                this.setState({ pcUrl: d.url, wapUrl: d.wap_url });
            }
        });
    }

    goWeb(index) {
        if (index == 0) {
            window.location.href = this.state.pcUrl;
        } else {
            window.location.href = this.state.wapUrl;
        }
    }

    renderItem() {
        return this.state.data.map((item, index) => (
            <div className="w100 flex" key={index} style={{ height: "50px", padding: "10px" }} onClick={() => { this.goWeb(index) }}>
                <div className="flex align-item-center" style={{ width: "70%" }}>{item.label}</div>
                <div className="flex-center" style={{ width: "30%" }}>
                    <div className="h100 flex-center" style={{ width: "80px", background: `url(${require("../../assets/img/common/btn_pc_88_n.png")})`, backgroundSize: "100% 100%", color: "white" }}>
                        88开奖
                    </div>
                </div>
            </div>
        ));
    }

    render() {
        return (
            <div className="wh100 bgWhite">
                <NavBar className="navbar_bg"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}>旗下产品</NavBar>
                <div className="pr w100" style={{ padding: "4%" }}>
                    <img className="w100" src={require("../../assets/img/more/banner.png")} />
                    <div className="pa" style={{ width: "92%", height: '40%', bottom: "8%", background: 'rgba(0, 0, 0, 0.6)' }}>
                        <div style={{ fontSize: "13px", alignItems: "flex-end" }} className="w100 h50 colorWhite flex justify-content-center">
                            尊敬的用户，您可以选择一下任何线路方位旗下网站
                        </div>
                        <div style={{ fontSize: "13px" }} className="w100 h50 flex-center colorWhite">
                            如果某个线路无法访问，您可以选择其他线路
                        </div>
                    </div>
                </div>
                <div className="w100" style={{ backgroundColor: '#f5f5f9', height: '20px' }}></div>
                <List>
                    {this.renderItem()}
                </List>
            </div>
        );
    }
}
export default withRouter(OtherProduction)