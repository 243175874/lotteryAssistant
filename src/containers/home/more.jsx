import React, { Component } from "react";
import { NavBar, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
class More extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { src: '../../assets/img/home/more_icon_account_default.png', label: "关于应用", pageRouter: "/about" },
                { src: '../../assets/img/home/more_icon_liability_default.png', label: "免责声明", pageRouter: "/statement" },
                { src: '../../assets/img/home/more_icon_feedback_default.png', label: "意见反馈", pageRouter: "/suggest" },
                { src: '../../assets/img/home/more_icon_contact_default.png', label: "联系我们", pageRouter: "/contact_us" },
                // { src: '../../assets/img/home/more_icon_note_default .png', label: "短信分享", pageRouter: "messageShare" },
                // { src: '../../assets/img/home/more_icon_software_default.png', label: "软件分享", pageRouter: "softwareShare" },
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
                <NavBar className="navbar_bg_level-one">更多</NavBar>
                <List>
                    {this.renderItem()}
                </List>
            </div>
        );
    }
}
export default withRouter(More)