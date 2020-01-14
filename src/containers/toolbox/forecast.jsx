import React, { Component } from "react";
import { NavBar, Icon, ActivityIndicator } from 'antd-mobile';
import { post } from '../../fetch/post.js';
import Introduction from '../../components/common/introduction'
import CommonJS from '../../assets/js/common'
const Animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
export default class Forecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnimals: false,
            showNumbers: false,
            animalList: [],
            numberList: [],
            loading: true,
        };
    }


    componentWillMount() {
        this.getAnimalData();
        this.getNumberData();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }


    //获取生肖服务器数据
    getAnimalData() {
        post("/v1/api/hunt/get_rand?type=5").then(data => {
            this.setState({ loading: false });
            if (data.code == 200 && data.data.content != "") {
                let animalList = data.data.content.split(' ');
                this.setState({ animalList, showAnimals: true });
            }
        });
    }

    //获取尾数服务器数据
    getNumberData() {
        post("/v1/api/hunt/get_rand?type=6").then(data => {
            this.setState({ loading: false });
            if (data.code == 200 && data.data.content != "") {
                let numberList = data.data.content.split(' ');
                this.setState({ numberList, showNumbers: true });
            }
        });
    }


    //向服务器存储生肖数据
    setAnimalData(content) {
        post("/v1/api/hunt/save_rand", { type: 5, content }).then(data => {
            if (data.code == 200) {
            }
        });
    }


    //向服务器存储尾数数据
    setNumberData(content) {
        post("/v1/api/hunt/save_rand", { type: 6, content }).then(data => {
            if (data.code == 200) {
            }
        });
    }

    //随机获取生肖
    getAnimalList() {
        let list = [];
        while (list.length < 3) {
            let index = CommonJS.getRandom(0, 11);
            let animal = Animals[index];
            if (list.indexOf(animal) == -1) {
                list.push(animal);
            }
        }
        return list;
    }

    //随机获取尾数
    getNumberList() {
        let list = [];
        while (list.length < 3) {
            let number = CommonJS.getRandom(0, 9);
            if (list.indexOf(number) == -1) {
                list.push(number);
            }
        }
        return list;
    }

    //点击求生肖触发获取结果
    getAnimalResult() {
        this.setState({ loading: true });
        setTimeout(() => {
            let animalList = this.getAnimalList();
            this.setState({ animalList: animalList, showAnimals: true, loading: false });
            //向服务器存储测算结果
            this.setAnimalData(animalList.toString().replace(new RegExp(",", "gm"), ' '));
        }, 2000);

    }

    //点击求尾数触发获取结果
    getNumberResult() {
        this.setState({ loading: true });
        setTimeout(() => {
            let numberList = this.getNumberList();
            this.setState({ numberList: numberList, showNumbers: true, loading: false });
            //向服务器存储测算结果
            //参数中吧所有的逗号替换成空格
            this.setNumberData(numberList.toString().replace(new RegExp(",", "gm"), ' '));
        }, 2000);
    }

    renderForecastResultView(list) {
        return list.map((item, index) => (<div className="flex-center" style={{ width: "20px" }} key={index}>{item}</div>));
    }

    render() {
        return (
            <div className="wh100 bgwhite">
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                >天机测算</NavBar>
                <ActivityIndicator toast text="测算中..." animating={this.state.loading} />
                <Introduction content={'天机泄露啦！所求何事，让诸葛丞相为您卜一卦，祝您六合彩顺风顺水。'}></Introduction>
                <div className="w100 flex" style={{ height: "100px", marginTop: "20px" }}>
                    <div className="w50 h100 flex flex-column align-item-center">
                        <div className="flex-center" style={{ width: "100px", height: "50px" }}>求生肖</div>
                        <div className="flex-center"
                            onClick={() => { this.getAnimalResult() }} style={{
                                width: "100px", height: "35px", color: "white",
                                background: `url(${require('../../assets/img/toolbox/btn_star_n.png')})`, backgroundSize: "100% 100%"
                            }}>
                            {!this.state.showAnimals ? (<div className="wh100 flex-center">开始</div>) : (<div className="wh100 flex-center">{this.renderForecastResultView(this.state.animalList)}</div>)}
                        </div>
                    </div>

                    <div className="w50 h100 flex flex-column align-item-center">
                        <div className="flex-center" style={{ width: "100px", height: "50px" }}>求尾数</div>
                        <div className="flex-center"
                            onClick={() => { this.getNumberResult() }}
                            style={{
                                width: "100px", height: "35px", color: "white",
                                background: `url(${require('../../assets/img/toolbox/btn_star_n.png')})`, backgroundSize: "100% 100%"
                            }}>
                            {!this.state.showNumbers ? (<div className="wh100 flex-center">开始</div>) : (<div className="wh100 flex-center">{this.renderForecastResultView(this.state.numberList)}</div>)}
                        </div>
                    </div>
                </div>

                <div className="w100 flex" style={{ height: "280px", marginTop: "20px" }}>
                    <div className="w50 h100 flex-center">
                        <img className="w70" src={require('../../assets/img/toolbox/img_zgs_tjcs_n.png')} />
                    </div>
                    <div className="w50 h100 flex-center">
                        <img className="w100" src={require("../../assets/img/toolbox/img_zgl_tjcs_n.png")} />
                    </div>
                </div>
            </div>
        );
    }
}
