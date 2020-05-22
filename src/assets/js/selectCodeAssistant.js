const codes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49"
]
const red = ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'];
const blue = ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48'];
const green = ['05', '06', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49'];

const typeList = [{ value: "单", type: "oddOrEven" }, { value: "双", type: "oddOrEven" }, { value: "大", type: "bigOrSmall" }, { value: "小", type: "bigOrSmall" },
    { value: "大单", type: "bigAndSmallAndOddAndEven" }, { value: "大双", type: "bigAndSmallAndOddAndEven" },
    { value: "小单", type: "bigAndSmallAndOddAndEven" }, { value: "小双", type: "bigAndSmallAndOddAndEven" },
    { value: "金", type: "five" }, { value: "木", type: "five" }, { value: "水", type: "five" }, { value: "火", type: "five" }, { value: "土", type: "five" },
    { value: "红波", type: "color" }, { value: "蓝波", type: "color" }, { value: "绿波", type: "color" },
    { value: "家禽", type: "animalType" }, { value: "野兽", type: "animalType" },
    { value: "红单", type: "colorOddEven" }, { value: "红双", type: "colorOddEven" }, { value: "蓝单", type: "colorOddEven" },
    { value: "蓝双", type: "colorOddEven" }, { value: "绿单", type: "colorOddEven" }, { value: "绿双", type: "colorOddEven" },
    { value: "鼠", type: "animals" }, { value: "牛", type: "animals" }, { value: "虎", type: "animals" }, { value: "兔", type: "animals" },
    { value: "龙", type: "animals" }, { value: "蛇", type: "animals" }, { value: "马", type: "animals" }, { value: "羊", type: "animals" },
    { value: "猴", type: "animals" }, { value: "鸡", type: "animals" }, { value: "狗", type: "animals" }, { value: "猪", type: "animals" },
    { value: "0尾", type: "lastNumber" }, { value: "1尾", type: "lastNumber" }, { value: "2尾", type: "lastNumber" }, { value: "3尾", type: "lastNumber" },
    { value: "4尾", type: "lastNumber" }, { value: "5尾", type: "lastNumber" }, { value: "6尾", type: "lastNumber" }, { value: "7尾", type: "lastNumber" },
    { value: "8尾", type: "lastNumber" }, { value: "9尾", type: "lastNumber" },
    { value: "0头", type: "firstNumber" }, { value: "1头", type: "firstNumber" }, { value: "2头", type: "firstNumber" },
    { value: "3头", type: "firstNumber" }, { value: "4头", type: "firstNumber" },
];
export default class SelectCodeAssistant {
    constructor(data) {
        this.data = data;
    }

    //单双
    getOddOrEven(type) {
        let oddList = [];
        let evenList = [];
        codes.forEach(item => {
            let number = Number(item);
            if (number % 2 === 0) {
                evenList.push(item);
            } else {
                oddList.push(item);
            }
        });
        if (type == '双') {
            return evenList;
        } else {
            return oddList;
        }
    }

    //大小
    getBigOrSmall(type) {
        let bigList = [];
        let smallList = [];
        codes.forEach(item => {
            let number = Number(item);
            if (number >= 25) {
                bigList.push(item);
            } else {
                smallList.push(item);
            }
        });
        if (type == '大') {
            return bigList;
        } else {
            return smallList;
        }
    }

    //大小单双
    getBigSmallOrOddEven(type) {
        let bigOddList = [];
        let bigEvenList = [];
        let smallOddList = [];
        let smallEvenList = [];
        codes.forEach(item => {
            let number = Number(item);
            if (number >= 25 && number % 2 !== 0) {
                bigOddList.push(item);
            } else if (number >= 25 && number % 2 === 0) {
                bigEvenList.push(item);
            } else if (number < 25 && number % 2 !== 0) {
                smallOddList.push(item);
            } else if (number < 25 && number % 2 === 0) {
                smallEvenList.push(item);
            }
        });

        if (type == '大单') {
            return bigOddList;
        } else if (type == '大双') {
            return bigEvenList;
        } else if (type == '小单') {
            return smallOddList;
        } else if (type == '小双') {
            return smallEvenList;
        }

    }

    //五行
    getFive(type) {
        if (type == "金") {
            return this.data.wx.find(item => item.title == "金").val;
        } else if (type == "木") {
            return this.data.wx.find(item => item.title == "木").val;
        } else if (type == "水") {
            return this.data.wx.find(item => item.title == "水").val;
        } else if (type == "火") {
            return this.data.wx.find(item => item.title == "火").val;
        } else if (type == "土") {
            return this.data.wx.find(item => item.title == "土").val;
        }
    }

    //波色
    getColor(type) {
        if (type == "红波") {
            return red;
        } else if (type == "蓝波") {
            return blue;
        } else if (type == "绿波") {
            return green;
        }
    }

    //家野
    getAnimalType(type) {
        if (type == "家禽") {
            return this.data.jy.find(item => item.title == "家").val;
        } else {
            return this.data.jy.find(item => item.title == "野").val;
        }
    }

    //单双波色
    getColorOddOrEven(type) {
        let list = [];
        if (type == "红单") {
            list = this.getListOddOrEven(red, "单");
        } else if (type == "红双") {
            list = this.getListOddOrEven(red, "双");
        } else if (type == "蓝单") {
            list = this.getListOddOrEven(blue, "单");
        } else if (type == "蓝双") {
            list = this.getListOddOrEven(blue, "双");
        } else if (type == "绿单") {
            list = this.getListOddOrEven(green, "单");
        } else if (type == "绿双") {
            list = this.getListOddOrEven(green, "双");
        }
        return list;
    }

    getListOddOrEven(colorList, type) {
        let list = [];
        if (type == '双') {
            colorList.forEach(item => {
                let number = Number(item);
                if (number % 2 == 0) {
                    list.push(item);
                }
            });
        } else {
            colorList.forEach(item => {
                let number = Number(item);
                if (number % 2 !== 0) {
                    list.push(item);
                }
            });
        }
        return list;
    }

    //属相
    getAnimal(type) {
        let list = []
        if (type == "鼠") {
            list = this.data.sx.find(item => item.title == "鼠").val;
        } else if (type == "牛") {
            list = this.data.sx.find(item => item.title == "牛").val;
        } else if (type == "虎") {
            list = this.data.sx.find(item => item.title == "虎").val;
        } else if (type == "兔") {
            list = this.data.sx.find(item => item.title == "兔").val;
        } else if (type == "龙") {
            list = this.data.sx.find(item => item.title == "龙").val;
        } else if (type == "蛇") {
            list = this.data.sx.find(item => item.title == "蛇").val;
        } else if (type == "马") {
            list = this.data.sx.find(item => item.title == "马").val;
        } else if (type == "羊") {
            list = this.data.sx.find(item => item.title == "羊").val;
        } else if (type == "猴") {
            list = this.data.sx.find(item => item.title == "猴").val;
        } else if (type == "鸡") {
            list = this.data.sx.find(item => item.title == "鸡").val;
        } else if (type == "狗") {
            list = this.data.sx.find(item => item.title == "狗").val;
        } else if (type == "猪") {
            list = this.data.sx.find(item => item.title == "猪").val;
        }
        return list;
    }

    //尾数 
    getLastNumber(type) {
        let list = [];
        let num = type.substr(0, 1).toString();
        codes.forEach(item => {
            let number = item.substr(1, 1).toString();
            if (num == number) {
                list.push(item);
            }
        });
        return list;
    }

    //头数
    getFirstNumber(type) {
        let list = [];
        let num = type.substr(0, 1).toString();
        codes.forEach(item => {
            let number = item.substr(0, 1).toString();
            if (num == number) {
                list.push(item);
            }
        });
        return list;
    }

    getNumberList(types) {
        let oddOrEven = [];
        let bigOrSmall = [];
        let bigAndSmallAndOddAndEven = [];
        let five = [];
        let color = [];
        let animalType = [];
        let colorOddEven = [];
        let animals = [];
        let lastNumber = [];
        let firstNumber = [];

        types.forEach(item => {
            let itemObj = typeList.filter(element => (element.value == item))[0];
            if (itemObj.type == "oddOrEven") {
                oddOrEven = oddOrEven.concat(this.getOddOrEven(item));
            } else if (itemObj.type == "bigOrSmall") {
                bigOrSmall = bigOrSmall.concat(this.getBigOrSmall(item));
            } else if (itemObj.type == "bigAndSmallAndOddAndEven") {
                bigAndSmallAndOddAndEven = bigAndSmallAndOddAndEven.concat(this.getBigSmallOrOddEven(item));
            } else if (itemObj.type == "five") {
                five = five.concat(this.getFive(item));
            } else if (itemObj.type == "color") {
                color = color.concat(this.getColor(item));
            } else if (itemObj.type == "animalType") {
                animalType = animalType.concat(this.getAnimalType(item));
            } else if (itemObj.type == "colorOddEven") {
                colorOddEven = colorOddEven.concat(this.getColorOddOrEven(item));
            } else if (itemObj.type == "animals") {
                animals = animals.concat(this.getAnimal(item));
            } else if (itemObj.type == "lastNumber") {
                lastNumber = lastNumber.concat(this.getLastNumber(item));
            } else if (itemObj.type == "firstNumber") {
                firstNumber = firstNumber.concat(this.getFirstNumber(item));
            }
        });


        let allList = [oddOrEven, bigOrSmall, bigAndSmallAndOddAndEven, five, color, animalType, colorOddEven, animals, lastNumber, firstNumber];
        let NumberList = [];
        if (types.length <= 1) {
            allList.forEach(item => {
                NumberList = NumberList.concat(item);
            });
        } else {

            NumberList = allList.reduce((prev, cur) => {
                let arr = prev.length == 0 ? cur : prev;
                if (prev.length > 0 && cur.length > 0) {
                    arr = prev.filter(item => {
                        return cur.indexOf(item) !== -1 // 利用filter方法来遍历是否有相同的元素
                    })
                }
                return arr;
            });
        }
        return NumberList;
    }
}