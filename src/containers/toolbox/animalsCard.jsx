import React, { Component } from "react";
import { NavBar, Icon } from 'antd-mobile';
import Introduction from '../../components/common/introduction'
import CommonJS from '../../assets/js/common'
export default class AnimalsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardList: [{ src: "../../assets/img/toolbox/img_card_zodiac_n.png" }],
            animalList: [
                { src: "../../assets/img/toolbox/icon_rat_zodiac_n(1).png" },
                { src: "../../assets/img/toolbox/icon_rat_zodiac_n(2).png" },
                { src: "../../assets/img/toolbox/icon_rat_zodiac_n(3).png" },
                { src: "../../assets/img/toolbox/icon_rat_zodiac_n(4).png" },
                { src: "../../assets/img/toolbox/icon_rat_zodiac_n(5).png" },
                { src: "../../assets/img/toolbox/icon_rat_zodiac_n(6).png" },
                { src: "../../assets/img/toolbox/icon_rat_zodiac_n(7).png" },
                { src: "../../assets/img/toolbox/icon_rat_zodiac_n(8).png" },
                { src: "../../assets/img/toolbox/icon_rat_zodiac_n(9).png" },
                { src: "../../assets/img/toolbox/icon_rat_zodiac_n(10).png" },
                { src: "../../assets/img/toolbox/icon_rat_zodiac_n(11).png" },
                { src: "../../assets/img/toolbox/icon_rat_zodiac_n(12).png" }],
            selectedAnimalList: []
        };
    }

    componentWillMount() {
        this.setCardList();
    }

    //设置12个未知的卡牌
    setCardList() {
        let object = this.state.cardList[0];
        let list = [];

        for (let i = 0; i < 12; i++) {
            list.push(object);
        }
        this.setState({ cardList: list });
    }

    modifyCardList(index) {
        let i = CommonJS.getRandom(0, 11);
        let selectedAnimalList = this.state.selectedAnimalList;
        //查看生肖不能超过三个。
        if (selectedAnimalList.length >= 3) {
            return;
        }

        //已经查看生肖不能重复查看
        if (selectedAnimalList.findIndex(item => (item.src == this.state.cardList[index].src)) > -1) {
            return;
        }

        //使打开的生肖不重复
        if (selectedAnimalList.findIndex(item => (item.src == this.state.animalList[i].src)) == -1) {


            selectedAnimalList.push(this.state.animalList[i]);


            let list = Object.assign(this.state.cardList)
            list[index] = this.state.animalList[i];
            this.setState({ cardList: list, selectedAnimalList: selectedAnimalList });
        } else {
            //如果重复，再调用一次本函数
            this.modifyCardList(index);
        }

    }

    renderCardListView(list) {
        return list.map((item, index) => (
            <img onClick={() => { this.modifyCardList(index) }} style={{ width: "26%", marginLeft: "5.5%", marginTop: "5%" }} src={item.src} key={index} />
        ));
    }

    conditionalRenderingCardList() {
        return this.state.selectedAnimalList.length < 3 ? this.renderCardListView(this.state.cardList) : this.renderCardListView(this.state.selectedAnimalList);
    }

    render() {
        return (
            <div className="wh100 bgwhite">
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                >生肖卡牌</NavBar>
                <Introduction content={'每期开奖前通过该工具可以快捷的查看三个隐藏在卡牌中的生肖，来试试你的财运！'}></Introduction>
                <div className="w100 clearfix">
                    {this.conditionalRenderingCardList()}
                </div>
            </div>
        );
    }
}
