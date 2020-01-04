import { post } from '../../fetch/post'
class LotteryAPI {

    /**
     *  获取倒计时
     */
    getCountService(id) {
        return new Promise(resolve => {
            post('/v1/api/arrondi/next_time', { id: id }).then(data => {
                resolve(data)
            });
        });
    }

    /**
     *  获取免费参考信息
     */
    getRecommendService(id) {
        return new Promise(resolve => {
            post('/v1/api/arrondi/refer', { id: id }).then(data => {
                resolve(data)
            });
        });
    }

    /**
     *  获取历史开奖信息
     *  id  彩种Id
     *  num 期数
     */
    getHistoryService(id, num) {
        return new Promise(resolve => {
            post('/v1/api/arrondi/history', { id, num }).then(data => {
                resolve(data)
            });
        });
    }

    /**
     *  获取号码统计
     *  id  彩种Id
     */
    getNumberStatistics(id, num) {
        return new Promise(resolve => {
            post('/v1/api/arrondi/history_hm', { id }).then(data => {
                resolve(data)
            });
        });
    }

}

export default new LotteryAPI();