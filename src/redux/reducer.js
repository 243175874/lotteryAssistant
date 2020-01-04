import { SetSelectedTab, SetCurrentLotteryName, SetCurrentLotteryId, SetCurrentLotteryPageIndex, SetCurrentPeriods, SetSixTitle, SetSixTypeId, SetSixUserId, SetIsShowSendMessagePage } from './actionType'
import { combineReducers } from 'redux'
//当前菜单索引
const selectedTab = (state = 'index', action) => {
    switch (action.type) {
        case SetSelectedTab:
            return action.value;
        default:
            return state
    }
}

//当前进入彩种名称
const currentLotteryName = (state = '', action) => {
    switch (action.type) {
        case SetCurrentLotteryName:
            return action.value;
        default:
            return state
    }
}

//当前进入彩种Id
const currentLotteryId = (state = '', action) => {
    switch (action.type) {
        case SetCurrentLotteryId:
            return action.value;
        default:
            return state
    }
}

//当前采种功能页面
const currentLotteryPageIndex = (state = '历史开奖', action) => {
    switch (action.type) {
        case SetCurrentLotteryPageIndex:
            return action.value;
        default:
            return state
    }
}

//当前查询期数
const currentPeriods = (state = '50', action) => {
    switch (action.type) {
        case SetCurrentPeriods:
            return action.value;
        default:
            return state
    }
}


//六合高手列表页面标题
const sixTitle = (state = '', action) => {
    switch (action.type) {
        case SetSixTitle:
            return action.value;
        default:
            return state
    }
}

//六合高手分类id
const sixTypeId = (state = '', action) => {
    switch (action.type) {
        case SetSixTypeId:
            return action.value;
        default:
            return state
    }
}

//六合高手用户id
const sixUserId = (state = '', action) => {
    switch (action.type) {
        case SetSixUserId:
            return action.value;
        default:
            return state
    }
}

//六合高手用户id
const isShowSendMessagePage = (state = false, action) => {
    switch (action.type) {
        case SetIsShowSendMessagePage:
            return action.value;
        default:
            return state
    }
}


export const finalReducer = combineReducers({
    selectedTab,
    currentLotteryName,
    currentLotteryId,
    currentLotteryPageIndex,
    currentPeriods,
    sixTitle,
    sixTypeId,
    sixUserId,
    isShowSendMessagePage,
})