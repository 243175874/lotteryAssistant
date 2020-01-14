import React, { Component } from "react";
import { NavBar, Icon } from 'antd-mobile';
import { post } from '../../fetch/post.js';
import Introduction from '../../components/common/introduction'
import Animal from '../../components/common/animal'
import CommonJS from '../../assets/js/common'
import icon_rat_turntable_n from "../../assets/img/toolbox/icon_rat_turntable_n.png"
import icon_cow_turntable_n from "../../assets/img/toolbox/icon_cow_turntable_n.png"
import icon_tiger_turntable_n from "../../assets/img/toolbox/icon_tiger_turntable_n.png"
import icon_rabbit_turntable_n from "../../assets/img/toolbox/icon_rabbit_turntable_n.png"
import icon_dragon_turntable_n from "../../assets/img/toolbox/icon_dragon_turntable_n.png"
import icon_snake_turntable_n from "../../assets/img/toolbox/icon_snake_turntable_n.png"
import icon_horse_turntable_n from "../../assets/img/toolbox/icon_horse_turntable_n.png"
import icon_sheep_turntable_n from "../../assets/img/toolbox/icon_sheep_turntable_n.png"
import icon_monkey_turntable_n from "../../assets/img/toolbox/icon_monkey_turntable_n.png"
import icon_chicken_turntable_n from "../../assets/img/toolbox/icon_chicken_turntable_n.png"
import icon_dog_turntable_n from "../../assets/img/toolbox/icon_dog_turntable_n.png"
import icon_pig_turntable_n from "../../assets/img/toolbox/icon_pig_turntable_n.png"

const color = ["红波", "蓝波", "绿波"];
export default class ShengxiaoTurntable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temporaryStorageAnimal: "",//临时存储生肖背景
            animalList: [
                {
                    animal: "鼠", src: icon_rat_turntable_n, style: {
                        width: "60px", height: "60px", background: "#4B89DC", borderRadius: "5px", top: "15px", left: "15px"
                    },
                    animalStyle: { width: "28px", height: "32px", top: "20px", left: "22px" }
                },
                {
                    animal: "牛", src: icon_cow_turntable_n, style: {
                        width: "60px", height: "60px", background: "#E67D00", borderRadius: "5px", top: "15px", left: "90px"
                    },
                    animalStyle: { width: "35px", height: "32px", top: "18px", left: "18px" }
                },
                {
                    animal: "虎", src: icon_tiger_turntable_n, style: {
                        width: "60px", height: "60px", background: "#4B89DC", borderRadius: "5px", top: "15px", left: "165px"
                    },
                    animalStyle: { width: "40px", height: "30px", top: "22px", left: "15px" }
                },
                {
                    animal: "兔", src: icon_rabbit_turntable_n, style: {
                        width: "60px", height: "60px", background: "#4B89DC", borderRadius: "5px", top: "15px", left: "240px"
                    },
                    animalStyle: { width: "30px", height: "36px", top: "18px", left: "20px" }
                },
                {
                    animal: "龙", src: icon_dragon_turntable_n, style: {
                        width: "60px", height: "60px", background: "#E62856", borderRadius: "5px", top: "90px", left: "240px"
                    },
                    animalStyle: { width: "28px", height: "46px", top: "10px", left: "23px" }
                },
                {
                    animal: "蛇", src: icon_snake_turntable_n, style: {
                        width: "60px", height: "60px", background: "#4B89DC", borderRadius: "5px", top: "165px", left: "240px"
                    },
                    animalStyle: { width: "28px", height: "35px", top: "18px", left: "23px" }
                },
                {
                    animal: "马", src: icon_horse_turntable_n, style: {
                        width: "60px", height: "60px", background: "#18980F", borderRadius: "5px", top: "240px", left: "240px"
                    },
                    animalStyle: { width: "40px", height: "32px", top: "20px", left: "12px" }
                },
                {
                    animal: "羊", src: icon_sheep_turntable_n, style: {
                        width: "60px", height: "60px", background: "#4B89DC", borderRadius: "5px", top: "240px", left: "165px"
                    },
                    animalStyle: { width: "35px", height: "35px", top: "20px", left: "18px" }
                },
                {
                    animal: "猴", src: icon_monkey_turntable_n, style: {
                        width: "60px", height: "60px", background: "#E62856", borderRadius: "5px", top: "240px", left: "90px"
                    },
                    animalStyle: { width: "35px", height: "35px", top: "20px", left: "18px" }
                },
                {
                    animal: "鸡", src: icon_chicken_turntable_n, style: {
                        width: "60px", height: "60px", background: "#E67D00", borderRadius: "5px", top: "240px", left: "15px"
                    },
                    animalStyle: { width: "35px", height: "35px", top: "20px", left: "18px" }
                },
                {
                    animal: "狗", src: icon_dog_turntable_n, style: {
                        width: "60px", height: "60px", background: "#18980F", borderRadius: "5px", top: "165px", left: "15px"
                    },
                    animalStyle: { width: "35px", height: "35px", top: "20px", left: "16px" }
                },
                {
                    animal: "猪", src: icon_pig_turntable_n, style: {
                        width: "60px", height: "60px", background: "#4B89DC", borderRadius: "5px", top: "90px", left: "15px"
                    },
                    animalStyle: { width: "40px", height: "23px", top: "26px", left: "12px" }
                },

            ],
            boseListStyle: [
                { color: "#FF5846", top: "95px", left: "155px" },
                { color: "#31B663", top: "110px", left: "195px" },
                { color: "#3A8AEF", top: "145px", left: "215px" },
                { color: "#FF5846", top: "185px", left: "210px" },
                { color: "#31B663", top: "210px", left: "180px" },
                { color: "#3A8AEF", top: "210px", left: "130px" },
                { color: "#FF5846", top: "185px", left: "105px" },
                { color: "#31B663", top: "145px", left: "95px" },
                { color: "#3A8AEF", top: "110px", left: "115px" },],
            animalResult: [],
            colorResult: "",
            turnTime: 0,//循环得圈数
        };
        this.btnDown = false;
    }

    componentWillMount() {
        this.getData();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    //获取服务器数据
    getData() {
        post("/v1/api/hunt/get_rand?type=4").then(data => {
            this.setState({ loading: false });
            if (data.code == 200 && data.data.content != "") {
                let animalResult = data.data.content.split(',').slice(0, 3).map(item => this.state.animalList[Number(item) - 1].animal);
                let colorResult = data.data.content.split(',').slice(3, 4);
                this.setState({ animalResult, colorResult });
            }
        });
    }

    //向服务器存储数据
    setData(content) {
        post("/v1/api/hunt/save_rand", { type: 4, content }).then(data => {
            if (data.code == 200) {
            }
        });
    }

    //随机获取生肖
    getAnimalList() {
        let animalResult = [];
        let indexList = [];
        while (animalResult.length < 3) {
            let index = CommonJS.getRandom(0, 11);
            let animal = this.state.animalList[index].animal;
            if (animalResult.indexOf(animal) == -1) {
                animalResult.push(animal);
                indexList.push(index + 1);
            }
        }
        return { animalResult, indexList };
    }

    //随机获取波色
    getColorList() {
        let index = CommonJS.getRandom(0, 2);
        return color[index];
    }

    //开始转动
    startLuckyTurn() {
        //当开始按钮点击后，不可重复开启转动功能
        if (this.btnDown) {
            return;
        }
        this.btnDown = true;
        this.turnAnimal();
    }

    //获取转动结果
    getTurnResult() {
        let { animalResult, indexList } = this.getAnimalList();//生肖
        let colorResult = this.getColorList();//波色
        this.setState({ animalResult: animalResult, colorResult: colorResult });
        //存储转动结果
        let result = indexList.toString() + "," + colorResult;
        this.setData(result);
    }

    turnAnimal() {
        let list = this.state.animalList;
        let index = 0;
        let interval = setInterval(() => {
            const element = list[index];
            //临时存储当前生肖背景，以便于到转到下一个时删除
            this.setState({ temporaryStorageAnimal: element.style.background });
            element.style.background = `url(${require('../../assets/img/toolbox/bg_zodiac_turntable_r_p.png')})`;
            element.style['backgroundSize'] = "100% 100%";
            if (index >= 1) {
                list[index - 1].style.background = this.state.temporaryStorageAnimal;
                delete list[index - 1].style.backgroundSize;
            } else {
                list[11].style.background = this.state.temporaryStorageAnimal;
                delete list[11].style.backgroundSize;
            }
            this.setState({ animalList: list });
            index++;
            if (index == 12) {
                window.clearInterval(interval);
                this.setState({ turnTime: ++this.state.turnTime });
                if (this.state.turnTime < 4) {
                    this.turnAnimal();
                } else {
                    list[11].style.background = this.state.temporaryStorageAnimal;
                    this.getTurnResult();
                }
            }
        }, 100);
    }

    renderAnimalView() {
        return this.state.animalList.map((item, index) => (
            <Animal key={index} animal={item.animal} src={item.src} style={item.style} animalStyle={item.animalStyle}></Animal>
        ));
    }

    renderPoint(item, index) {
        return (
            <div key={index} className="pa" style={{ width: "12px", height: "12px", background: item.color, borderRadius: "50%", top: item.top, left: item.left }}></div>
        )
    }

    renderBoSe() {
        return this.state.boseListStyle.map((item, index) => {
            return this.renderPoint(item, index);
        });
    }

    renderAnimalResultView() {
        return this.state.animalResult.map((item, index) => {
            return (<div key={index} style={{ width: "20px", height: "20px" }}>{item}</div>)
        });
    }

    render() {
        return (
            <div className="wh100 bgwhite">
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                >波肖转盘</NavBar>
                <Introduction content={'转转转！转出本期的生肖和波色，激动不如行动，赶紧来转出您心目中的生肖和波色！'}></Introduction>

                <div className="pr" style={{ width: "315px", height: "315px", margin: "0 auto", marginTop: "30px", background: "#00214C" }}>
                    {this.renderAnimalView()}
                    {this.renderBoSe()}
                    <div
                        onClick={() => { this.startLuckyTurn() }}
                        className="pa flex-center" style={{
                            display: this.state.animalResult.length != 3 ? "-webkit-flex " : "none",
                            width: "70px", height: "30px", top: "50%", left: "50%", marginLeft: "-30px", marginTop: "-10px",
                            background: `url(${require('../../assets/img/toolbox/btn_star_n.png')})`, backgroundSize: "100% 100%", color: "white"
                        }}>开始</div>
                    <div className="pa text-center" style={{
                        width: "80px", height: "35px", top: "50%", left: "50%", display: this.state.animalResult.length == 3 ? "block" : "none",
                        marginLeft: "-35px", marginTop: "-15px", fontSize: "12px", color: "#FFE610"
                    }}>
                        <div className="flex-center">{this.renderAnimalResultView()}</div>
                        <div>{this.state.colorResult}</div>
                    </div>
                </div>

                <div className="w100 text-center" style={{ marginTop: "30px", fontSize: "12px", color: "#E06E4F" }}>
                    小提示：每期只能进行一次波肖转盘
                </div>
            </div >
        );
    }
}