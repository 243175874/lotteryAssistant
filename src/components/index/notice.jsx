import React, { Component } from "react";
import { NoticeBar } from 'antd-mobile';
export default class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeStr: ""
        };
    }
    componentDidMount() {
        this.bindNoticeInfo();
    }
    componentWillReceiveProps(nextProps) {
        this.bindNoticeInfo(nextProps.list);
    }
    bindNoticeInfo(list = []) {
        list = list.length == 0 ? this.props.list : list;
        let blank = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
        let str = blank;
        if (list && list.length > 0) {
            list.forEach(item => {
                str += item.title + blank;
            });
            this.setState({ noticeStr: str });
        }

    }

    render() {
        return (
            <NoticeBar style={{ fontSize: '12px', height: '24px', lineHeight: '24px', marginTop: '3px' }} marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                <p dangerouslySetInnerHTML={{ __html: this.state.noticeStr }}></p>
            </NoticeBar>
        );
    }
}
