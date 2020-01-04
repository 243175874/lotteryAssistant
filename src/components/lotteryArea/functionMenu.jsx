import React, { Component } from "react";

import { Toast } from 'antd-mobile'
const path = "../../assets/img/lottery/menu/";

import { connect } from 'react-redux'
import { setCurrentLotteryPageIndex } from '../../redux/action'
@connect(
    state => ({ currentLotteryPageIndex: state.currentLotteryPageIndex, currentLotteryName: state.currentLotteryName }),
    { setCurrentLotteryPageIndex }
)
export default class FunctionMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [
                { icon: `${path}icon_mftj.png`, icon_press: `${path}icon_mftj_press.png`, name: "免费参考", type: "预测", place: "menu" },
                { icon: `${path}icon_lskj.png`, icon_press: `${path}icon_lskj_press.png`, name: "历史开奖", type: "综合", place: "menu" },
                { icon: `${path}icon_lzfx.png`, icon_press: `${path}icon_lzfx_press.png`, name: "路珠分析", type: "综合", place: "menu" },
                { icon: `${path}icon_lrfx.png`, icon_press: `${path}icon_lrfx_press.png`, name: "冷热分析", type: "综合", place: "menu" },
                { icon: `${path}icon_lrfx.png`, icon_press: `${path}icon_lrfx_press.png`, name: "横板走势", type: "综合", place: "list" },
                { icon: `${path}icon_lrfx.png`, icon_press: `${path}icon_lrfx_press.png`, name: "大小遗漏", type: "遗漏", place: "list" },
                { icon: `${path}icon_lrfx.png`, icon_press: `${path}icon_lrfx_press.png`, name: "单双遗漏", type: "遗漏", place: "list" },
                { icon: `${path}icon_lrfx.png`, icon_press: `${path}icon_lrfx_press.png`, name: "两面长龙", type: "遗漏", place: "list" },
                { icon: `${path}icon_lrfx.png`, icon_press: `${path}icon_lrfx_press.png`, name: "冠亚统计", type: "遗漏", place: "list" },
                { icon: `${path}icon_lrfx.png`, icon_press: `${path}icon_lrfx_press.png`, name: "大小历史", type: "历史", place: "list" },
                { icon: `${path}icon_lrfx.png`, icon_press: `${path}icon_lrfx_press.png`, name: "单双历史", type: "历史", place: "list" },
                { icon: `${path}icon_lrfx.png`, icon_press: `${path}icon_lrfx_press.png`, name: "龙虎历史", type: "历史", place: "list" },
                { icon: `${path}icon_lrfx.png`, icon_press: `${path}icon_lrfx_press.png`, name: "两面统计", type: "历史", place: "list" },
                { icon: `${path}icon_lrfx.png`, icon_press: `${path}icon_lrfx_press.png`, name: "号码统计", type: "历史", place: "list" },],
            selected: "免费参考", //选中当前菜单
            isOpenFunction: false, //是否显示按钮列表弹出框
            isEditButton: false, //是否是编辑按钮状态
        };
    }

    componentWillMount() {
        console.log(this.props.currentLotteryPageIndex);
        if (localStorage.getItem(this.props.currentLotteryName) == null) {
            localStorage.setItem(this.props.currentLotteryName, JSON.stringify(this.props.menuList));
        }
        let menuList = JSON.parse(localStorage.getItem(this.props.currentLotteryName));
        console.log(menuList);

        if (menuList != null) {
            this.setState({ menuList });
            this.setState({ selected: this.props.currentLotteryPageIndex });//吧redux中得值更新到当前页面
        }
    }

    //选中
    setSelected(name) {
        if (this.state.isEditButton) {
            return;
        }
        this.setState({ selected: name, isOpenFunction: false });
        this.props.setCurrentLotteryPageIndex(name);//吧当前选中项存入redux
    }

    removeMenuList(index) {
        //改变菜单列表的位置状态   place = menu 在下方菜单栏    place = list, 在按钮列表
        let menuList = [...this.state.menuList];
        menuList[index].place = "list";
        localStorage.setItem(this.props.currentLotteryName, JSON.stringify(menuList));
        this.setState({ menuList });
    }

    //设置菜单按钮
    setMenuList(index) {
        if (!this.state.isEditButton) {
            return;
        }
        if (this.state.menuList.filter(item => item.place == "menu").length >= 4) {
            Toast.info('最多只能添加4个', 3, null, false);
            return;
        }
        //改变菜单列表的位置状态   place = menu 在下方菜单栏    place = list, 在按钮列表
        let menuList = [...this.state.menuList];
        menuList[index].place = "menu";
        localStorage.setItem(this.props.currentLotteryName, JSON.stringify(menuList));
        this.setState({ menuList });
    }

    //渲染底部菜单
    renderMenuListView() {
        return this.state.menuList.map((item, index) => {
            if (item.place == "menu") {
                return (
                    <div onClick={() => { this.setSelected(item.name) }} key={index} className="h100 flex flex-column" style={{ width: "25%" }}>
                        <div className="w100 flex-center pr" style={{ height: "65%" }}>
                            <img style={{ width: "24px" }} src={this.state.selected == item.name ? item.icon_press : item.icon} />
                            <img
                                onClick={() => { this.removeMenuList(index) }}
                                className="pa" style={{ top: "3px", right: "8px", width: "15px", display: this.state.isEditButton ? "block" : "none" }}
                                src="../../assets/img/lottery/menu/icon_edit_delete.png" />
                        </div>
                        <div className="w100 flex-center" style={{ height: "35%", color: this.state.selected == item.name ? "#BD3D3D" : "#666666", fontSize: "12px" }}>{item.name}</div>
                    </div>
                )
            }
        });
    }

    //渲染按钮
    renderBottonListView(type) {
        return this.state.menuList.map((item, index) => {
            if (item.type == type && item.place == "list") {
                return (
                    <div
                        onClick={() => { this.setSelected(item.name); this.setMenuList(index) }}
                        key={index} className="fl flex-center pr" style={{
                            width: "20%", height: "35px", marginRight: "4%", marginTop: "10px",
                            border: this.state.selected == item.name ? "1px solid #FF7344" : "1px solid #BCBCBC", borderRadius: "3px",
                            color: this.state.selected == item.name ? "#FF7344" : "#666666"
                        }}>
                        {item.name}
                        <img className="pa" src="../../assets/img/lottery/menu/icon_edit_add_press.png" style={{ width: "16px", top: "-8px", right: "-8px", display: this.state.isEditButton ? "block" : "none" }} />
                    </div>
                )
            }
        });
    }

    //渲染按钮分类和按钮
    renderHeaderAndBottonListView(type) {
        let list = this.state.menuList.filter(item => type == item.type);
        //当前分类有数据时，渲染出来，当前分类没有数据的时候，不渲染页面
        if (list.filter(item => item.place == "list").length > 0) {
            return (
                <div className="w100 clearfix" style={{ paddingBottom: "10px" }}>
                    <header className="w100 flex" style={{ height: "30px", padding: "10px 10px 0 10px" }}>
                        <div className="h100" style={{ width: "3px", marginRight: "10px" }}>
                            <img className="wh100" src="../../assets/img/lottery/menu/icon_classify.png" />
                        </div>
                        <div className="h100 flex align-item-center" style={{ color: "#FF7344" }}>{type}</div>
                    </header>
                    <main className="w100 clearfix" style={{ padding: "0 10px" }}>
                        {this.renderBottonListView(type)}
                    </main>
                </div>
            )
        }
    }

    render() {
        const dialogBgStyle = {
            display: this.state.isOpenFunction ? "block" : "none", height: "calc(100% - 55px)",
            position: "fixed", top: "0", left: "0", zIndex: "100", background: 'rgba(0, 0, 0, 0.3)'
        };
        return (
            <div className="wh100 flex">
                <div className="w100" style={dialogBgStyle} onClick={() => { this.setState({ isOpenFunction: false }) }} >
                </div>

                <div className="w100 bgWhite clearfix" style={{ display: this.state.isOpenFunction ? "block" : "none", position: "fixed", bottom: "55px", left: "0", zIndex: "110" }}>
                    <header className="w100 flex" style={{ height: "55px", borderBottom: "1px solid #BCBCBC" }}>
                        <div className="h100 flex align-item-center" style={{ width: "40px", justifyContent: "flex-end" }}>
                            <img style={{ width: "16px" }} src="../../assets/img/lottery/menu/icon_gy.png" />
                        </div>
                        <div className="flex align-item-center" style={{ width: "calc(100% - 150px)", boxSizing: "border-box", paddingLeft: "10px" }}>可点击自定义进行底部排序</div>
                        <div className="h100 flex align-item-center" style={{ width: "110px" }}>
                            <div
                                onClick={() => { this.setState({ isEditButton: false }) }}
                                className="flex-center" style={{
                                    width: "90px", height: "40px", color: "white", display: this.state.isEditButton ? "flex" : "none",
                                    background: "url(../../../../assets/img/lottery/menu/icon_custom.png)", backgroundSize: "100% 100%"
                                }}>
                                完成
                                </div>

                            <div
                                onClick={() => { this.setState({ isEditButton: true }) }}
                                className="flex-center" style={{
                                    width: "90px", height: "40px", border: "1px solid #BCBCBC", borderRadius: "3px",
                                    display: !this.state.isEditButton ? "flex" : "none"
                                }}>
                                自定义
                                </div>
                        </div>
                    </header>

                    <main className="w100 clearfix">
                        {this.renderHeaderAndBottonListView("综合")}
                        {this.renderHeaderAndBottonListView("预测")}
                        {this.renderHeaderAndBottonListView("遗漏")}
                        {this.renderHeaderAndBottonListView("历史")}
                    </main>
                </div>

                <div className="h100 flex" style={{ width: "80%" }}>
                    {this.renderMenuListView()}
                </div>

                <div onClick={() => { this.setState({ isOpenFunction: !this.state.isOpenFunction, isEditButton: false }) }} className="h100 flex flex-column" style={{ width: "20%" }}>
                    <div className="w100 flex-center" style={{ height: "65%" }}>
                        <img style={{ width: "24px" }} src={this.state.isOpenFunction ? `${path}icon_all_press.png` : `${path}icon_all.png`} />
                    </div>
                    <div className="w100 flex-center" style={{ height: "35%", color: this.state.isOpenFunction ? "#BD3D3D" : "#666666", fontSize: "12px" }}>更多功能</div>
                </div>
            </div>
        );
    }
}
