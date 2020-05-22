import React, { Component } from "react";
import { NavBar, Icon, ActivityIndicator } from 'antd-mobile';
import { asyncComponent } from 'react-async-component';
const Introduction = asyncComponent({ name: "Introduction", resolve: () => import('../../components/common/introduction') });
import { post } from '../../fetch/post.js';
import CommonJS from '../../assets/js/common'
import img_card_zodiac_n from "../../assets/img/toolbox/img_card_zodiac_n.png"
import icon_rat_zodiac_n1 from "../../assets/img/toolbox/icon_rat_zodiac_n(1).png"
import icon_rat_zodiac_n2 from "../../assets/img/toolbox/icon_rat_zodiac_n(2).png"
import icon_rat_zodiac_n3 from "../../assets/img/toolbox/icon_rat_zodiac_n(3).png"
import icon_rat_zodiac_n4 from "../../assets/img/toolbox/icon_rat_zodiac_n(4).png"
import icon_rat_zodiac_n5 from "../../assets/img/toolbox/icon_rat_zodiac_n(5).png"
import icon_rat_zodiac_n6 from "../../assets/img/toolbox/icon_rat_zodiac_n(6).png"
import icon_rat_zodiac_n7 from "../../assets/img/toolbox/icon_rat_zodiac_n(7).png"
import icon_rat_zodiac_n8 from "../../assets/img/toolbox/icon_rat_zodiac_n(8).png"
import icon_rat_zodiac_n9 from "../../assets/img/toolbox/icon_rat_zodiac_n(9).png"
import icon_rat_zodiac_n10 from "../../assets/img/toolbox/icon_rat_zodiac_n(10).png"
import icon_rat_zodiac_n11 from "../../assets/img/toolbox/icon_rat_zodiac_n(11).png"
import icon_rat_zodiac_n12 from "../../assets/img/toolbox/icon_rat_zodiac_n(12).png"
export default class AnimalsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardList: [{ src: img_card_zodiac_n }],
            loading: true,
            animalList: [
                { src: icon_rat_zodiac_n1 },
                { src: icon_rat_zodiac_n2 },
                { src: icon_rat_zodiac_n3 },
                { src: icon_rat_zodiac_n4 },
                { src: icon_rat_zodiac_n5 },
                { src: icon_rat_zodiac_n6 },
                { src: icon_rat_zodiac_n7 },
                { src: icon_rat_zodiac_n8 },
                { src: icon_rat_zodiac_n9 },
                { src: icon_rat_zodiac_n10 },
                { src: icon_rat_zodiac_n11 },
                { src: icon_rat_zodiac_n12 }],
            selectedAnimalList: [],
        };
        this.selectedAnimalIndex = [];
    }

    componentWillMount() {
        this.setCardList();
        this.getCardList();
    }


    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    //获取服务器生肖卡牌数据
    getCardList() {
        post("/v1/api/hunt/get_rand?type=2").then(data => {
            this.setState({ loading: false });
            if (data.code == 200 && data.data.content != "") {
                //获取的索引数据是根据u3d那边，每个索引+1，所以在这里要-1
                let list = data.data.content.split(',').map(item => Number(item) - 1);
                list = list.map(item => this.state.animalList[item]);
                this.setState({ selectedAnimalList: list });
            }
        });
    }

    //向服务器存储生肖卡牌数据
    saveCardList(content) {
        //console.log(content);
        post("/v1/api/hunt/save_rand", { type: 2, content }).then(data => {
            if (data.code == 200) {
            }
        });
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
            this.saveCardList(this.selectedAnimalIndex);//调用接口把结果存入数据库
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
            this.selectedAnimalIndex.push(i + 1); //为了和u3d的存储同步，这里存储索引+1 。
            this.setState({ cardList: list, selectedAnimalList: selectedAnimalList });
            if (selectedAnimalList.length == 3) {
                this.saveCardList(this.selectedAnimalIndex);//调用接口把结果存入数据库
            }
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
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
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
