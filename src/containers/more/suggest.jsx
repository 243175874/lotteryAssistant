import React, { Component } from "react";
import { NavBar, Icon, List, TextareaItem, InputItem, ImagePicker, ActivityIndicator, Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import { post } from '../../fetch/post'
import { upload } from '../../fetch/upload'
class Suggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            files: [],  //上传的文件信息
            content: "",//意见内容
            email: "",//邮件
            other: "" //其他
        };
        //this.handleChange = this.handleChange.bind(this);
    }

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }

    setSuggest() {
        const { files, content, email, other } = this.state;
        let pic = "";
        if (files.length > 0) {
            pic = files[0].file.name;
        }
        if (content == "") {
            Toast.info('请输入遇到的问题！', 2, null, false);
            return;
        }
        this.setState({ loading: true });
        post('/api/feedback/add', { pic, content, email, other }).then(data => {
            this.setState({ loading: false });
            if (files.length > 0) {
                this.uploadFile();
            }
            Toast.info('反馈成功', 2, null, false);
        });
    }

    uploadFile() {
        var form = new FormData();
        form.append("uploadFile", this.state.files[0].url); //uploadFile为后台给的参数名
        console.log(this.state.files[0].url);
        upload('/api/upload/upimage', form).then(data => {
            console.log(data);
            // this.setState({ loading: false });
            Toast.info(data.msg, 3, null, false);
        });
    }

    /**
    *  动态绑定input value
    */
    handleChange = (e, str) => {
        let params = {};
        params[str] = e;
        this.setState(params)
    }

    render() {
        let style = { marginTop: "10px", letterSpacing: "1px", textIndent: "28px" };
        const { loading, files, content, email, other } = this.state;
        return (
            <div className="wh100 bgWhite">
                <ActivityIndicator toast text="加载中..." animating={loading} />
                <NavBar className="navbar_bg"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                        <div onClick={() => { this.setSuggest() }} style={{ padding: '10px', paddingRight: '0' }} key="1">提交</div>
                    ]}
                >意见反馈</NavBar>

                <List renderHeader={() => '反馈内容'}>
                    <TextareaItem
                        placeholder={"请输入遇到的问题或建议…"}
                        rows={5}
                        count={100}
                        value={content}
                        onChange={(e) => { this.handleChange(e, "content") }}
                    />
                </List>

                {/* <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    selectable={files.length < 1}
                    multiple={false}
                /> */}

                <List renderHeader={() => ''}>
                    <InputItem value={email} onChange={(e) => { this.handleChange(e, "email") }} placeholder={"选填，便于我们回复你"}>邮箱</InputItem>
                    <InputItem value={other} onChange={(e) => { this.handleChange(e, "other") }} placeholder={"选填，其他联系方式(QQ或手机号)"}>其他</InputItem>
                </List>
            </div>
        );
    }
}

export default withRouter(Suggest)