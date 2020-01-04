import React, { Component } from "react";
import { NavBar, Icon, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { src: '../../assets/img/more/icon_qq.png', label: "qq" },
                { src: '../../assets/img/more/icon_wetchat.png', label: "微信公众号" },
                { src: '../../assets/img/more/icon_link.png', label: "访问图库" }
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
                    <img className="w100" src="../../assets/img/more/banner.png" />
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