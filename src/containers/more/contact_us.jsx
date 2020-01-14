import React, { Component } from "react";
import { NavBar, Icon, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import icon_qq from '../../assets/img/more/icon_qq.png'
import icon_wetchat from '../../assets/img/more/icon_wetchat.png'
import icon_link from '../../assets/img/more/icon_link.png'
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { src: icon_qq, label: "qq" },
                { src: icon_wetchat, label: "微信公众号" },
                { src: icon_link, label: "访问图库" }
            ]
        };
    }

    renderItem() {
        return this.state.data.map((item, index) => (
            <List.Item
                key={index}
                style={{ minHeight: '55px' }}
                thumb={item.src}
                arrow="horizontal"
            >{item.label}</List.Item>
        ));
    }


    render() {
        return (
            <div className="wh100 bgWhite">
                <NavBar className="navbar_bg"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}>联系我们</NavBar>
                <div className="pr w100" style={{ padding: "4%" }}>
                    <img className="w100" src={require("../../assets/img/more/banner.png")} />
                    <div className="pa" style={{ width: "92%", height: '40%', bottom: "8%", background: 'rgba(0, 0, 0, 0.6)' }}>
                        <div style={{ fontSize: "13.5px", alignItems: "flex-end" }} className="w100 h50 colorWhite flex justify-content-center">版本号：1.2</div>
                        <div style={{ fontSize: "13px" }} className="w100 h50 flex-center colorWhite">如有任何疑问，记着联系我们</div>
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
export default withRouter(Contact)