import {
    SetSelectedTab,
    SetCurrentLotteryName,
    SetCurrentLotteryId,
    SetCurrentLotteryType,
    SetCurrentLotteryPageIndex,
    SetCurrentPeriods,
    SetSixTitle,
    SetSixTypeId,
    SetSixUserId,
    SetArticleId,
    SetIsShowSendMessagePage,
    SetBannerList,
    SetLotteryList,
    SetNoticeList,
    SetCpMenu,
    SetAppMenu,
    SetTabSelected,
    SetIsShowDetailHead
} from './actionType'
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

//当前进入彩种 种类
const currentLotteryType = (state = '', action) => {
    switch (action.type) {
        case SetCurrentLotteryType:
            return action.value;
        default:
            return state
    }
}

//当前采种功能页面
const currentLotteryPageIndex = (state = '参考计划', action) => {
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

//文章id
const articleId = (state = '', action) => {
    switch (action.type) {
        case SetArticleId:
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


//banner列表
const bannerList = (state = [], action) => {
    switch (action.type) {
        case SetBannerList:
            return action.value;
        default:
            return state
    }
}

//彩票开奖列表
const lotteryList = (state = [], action) => {
    switch (action.type) {
        case SetLotteryList:
            return action.value;
        default:
            return state
    }
}

//公告信息列表
const noticeList = (state = [], action) => {
    switch (action.type) {
        case SetNoticeList:
            return action.value;
        default:
            return state
    }
}

//彩票专区
const cpMenu = (state = [], action) => {
    switch (action.type) {
        case SetCpMenu:
            return action.value;
        default:
            return state
    }
}

//六合专区
const appMenu = (state = [], action) => {
    switch (action.type) {
        case SetAppMenu:
            return action.value;
        default:
            return state
    }
}

//六合专区
const tabSelected = (state = '彩票专区', action) => {
    switch (action.type) {
        case SetTabSelected:
            return action.value;
        default:
            return state
    }
}

//是否显示详情页头部信息
const isShowDetailHead = (state = false, action) => {
    switch (action.type) {
        case SetIsShowDetailHead:
            return action.value;
        default:
            return state
    }
}


export const finalReducer = combineReducers({
    selectedTab,
    currentLotteryName,
    currentLotteryId,
    currentLotteryType,
    currentLotteryPageIndex,
    currentPeriods,
    sixTitle,
    sixTypeId,
    sixUserId,
    articleId,
    isShowSendMessagePage,
    bannerList,
    lotteryList,
    noticeList,
    cpMenu,
    appMenu,
    tabSelected,
    isShowDetailHead
})