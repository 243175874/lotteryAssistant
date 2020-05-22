import React, { Component } from "react";
import { NavBar, Icon, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import icon_interduction from '../../assets/img/more/icon_interduction.png'
import icon_about_us from '../../assets/img/more/icon_about_us.png'
class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { src: icon_interduction, label: "应用简介", pageRouter: "/introduce" },
                { src: icon_about_us, label: "关于我们", pageRouter: "/about_us" },
                // { src: '../../assets/img/more/icon_message.png', label: "短信分享", pageRouter: "/about" },
                // { src: '../../assets/img/more/icon_software_share.png', label: "软件分享", pageRouter: "/about" }
            ]
        };
    }

    go(pageRouter) {
        //console.log(pageRouter);
        this.props.history.push(pageRouter);
    }

    renderItem() {
        return this.state.data.map((item, index) => (
            <List.Item
                key={index}
                style={{ minHeight: '55px' }}
                thumb={item.src}
                arrow="horizontal"
                onClick={this.go.bind(this, item.pageRouter)}
            >{item.label}</List.Item>
        ));
    }


    render() {
        return (
            <div className="wh100 bgWhite">
                <NavBar className="navbar_bg"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}>关于应用</NavBar>
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
export default withRouter(About)