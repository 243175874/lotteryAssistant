import { post } from '../../fetch/post'
class CommonJS {
    constructor() {
            this.allLotteryMenu = this.getAllLotteryMenu();
            //this.allLotteryType = this.getAllLotteryType();
        }
        /**
         *  设置个人信息
         */
    setUserInfo = async() => {
        let userInfo = await this.requestUserInfo();
        localStorage.setItem("userInfo", JSON.stringify(userInfo.data))
    }

    /**
     *  获取个人信息
     *  @url /api/user/index
     *  @method post
     *  @return {promise}
     */
    requestUserInfo = async() => {
        return await post(`/v1/api/user/info`);
    }


    //获取随机数
    getRandom(start, end) {
        return parseInt(Math.random() * (end - start + 1) + start);
    }

    //获取当前所有彩种菜单
    getAllLotteryMenu() {
        return JSON.parse(sessionStorage.getItem("lotteryList"));
    }

    //获取当前所有彩种类型
    // getAllLotteryType() {
    //     return JSON.parse(sessionStorage.getItem("lotteryListType"));
    // }

    //获取当前彩种图标
    // getCurrentLotteryIconByName(name) {
    //     this.allLotteryMenu = this.getAllLotteryMenu();
    //     return this.allLotteryMenu.find(item => name == item.title).icon;
    // }

    //获取当前所有彩种
    // getCurrentLotteryIdByName(name) {
    //     this.allLotteryType = this.getAllLotteryType();
    //     return this.allLotteryType.find(item => name == item.title).id;
    // }

    //数组删除一项
    removeArrayItem(list, item) {
        list.splice(list.indexOf(item), 1);
    }


    //统计
    statisticsList(list, reutrnValue, index = 0, index2 = 0) {
        let last = "";
        let arr = [];
        list.forEach(item => {
            let current = reutrnValue(item.kj_data, index, index2);
            if (last == "") {
                arr.push([current]);
            } else if (last == current) {
                arr[arr.length - 1].push(current);
            } else {
                arr.push([current]);
            }
            last = current;
        });
        return arr;
    }

    //统计数量
    statistics(list, str) {
        let sum = 0;
        list.forEach(item => {
            item.forEach(element => {
                if (element == str) {
                    sum++;
                }
            });
        });
        return sum;
    }

    //把统计结果放入长龙
    setLongDragon(data) {
        let list = [];
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.list.length > 0 && element.list[0].length > 1) {
                list.push({ index: element.index, value: element.list[0][0], periods: element.list[0].length });
            }
        }
        return list;
    }

    /**
     * 循环统计出连续遗漏出现次数
     * @param {统计后的大小数组} list 
     * @param {传“大小单双”} name 
     */
    statisticsOmitTime(list, name) {
        let indexList = [];
        //找到大小单双的索引
        list.forEach((item, index) => {
            if (item == name) {
                indexList.push(index);
            }
        });
        let omitList = [];
        //根据索引计算遗漏
        indexList.forEach((item, index, array) => {
            if (index > 0) {
                let time = item - array[index - 1] - 1;
                if (time > 0) {
                    let i = omitList.findIndex(item => item.omit == time);
                    if (i != -1) {
                        omitList[i].time += 1;
                    } else {
                        omitList.push({ omit: time, time: 1 });
                    }
                }
            } else if (item > 0) {
                omitList.push({ omit: item, time: 1 });
            }
        });

        return omitList.sort((a, b) => Number(a.omit) - Number(b.omit));;
    }

    /**
     * 使两个数组长度一样。
     * @param {遗漏数组1} omitList1 
     * @param {遗漏数组2} omitList2 
     */
    dealWithTwoList(omitList1, omitList2) {
        if (omitList1.length > omitList2.length) {
            for (let index = omitList1.length - omitList2.length; index > 0; index--) {
                omitList2.push({ omit: "", time: "" });
            }
        } else if (omitList1.length < omitList2.length) {
            for (let index = omitList2.length - omitList1.length; index > 0; index--) {
                omitList1.push({ omit: "", time: "" });
            }

        }
        return { omitList1, omitList2 }
    }

    dealWithData(data) {
        let list = [];
        for (let item in data) {
            list.push({ day: item, data: data[item] });
        }

        return list.sort((a, b) => new Date(a.day) - new Date(b.day));
    }

    copyText(dom) {
        let range = document.createRange();
        range.selectNodeContents(dom);
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
    }

}

export default new CommonJS()