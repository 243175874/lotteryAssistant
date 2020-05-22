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
//当前菜单索引
export const setSelectedTab = (value) => ({ type: SetSelectedTab, value: value });
//当前进入彩种名称
export const setCurrentLotteryName = (value) => ({ type: SetCurrentLotteryName, value: value });
//当前进入彩种ID
export const setCurrentLotteryId = (value) => ({ type: SetCurrentLotteryId, value: value });
//当前进入彩种种类
export const setCurrentLotteryType = (value) => ({ type: SetCurrentLotteryType, value: value });
//当前彩种功能页面
export const setCurrentLotteryPageIndex = (value) => ({ type: SetCurrentLotteryPageIndex, value: value });
//当前查询期数
export const setCurrentPeriods = (value) => ({ type: SetCurrentPeriods, value: value });
//六合高手列表页面标题
export const setSixTitle = (value) => ({ type: SetSixTitle, value: value });
//六合高手分类id
export const setSixTypeId = (value) => ({ type: SetSixTypeId, value: value });
//六合高手用户id
export const setSixUserId = (value) => ({ type: SetSixUserId, value: value });
//文章id
export const setArticleId = (value) => ({ type: SetArticleId, value: value });
//是否显示发帖页面
export const setIsShowSendMessagePage = (value) => ({ type: SetIsShowSendMessagePage, value: value });
//banner列表
export const setBannerList = (value) => ({ type: SetBannerList, value: value });
//彩票开奖列表
export const setLotteryList = (value) => ({ type: SetLotteryList, value: value });
//公告信息列表
export const setNoticeList = (value) => ({ type: SetNoticeList, value: value });
//彩票专区
export const setCpMenu = (value) => ({ type: SetCpMenu, value: value });
//六合专区
export const setAppMenu = (value) => ({ type: SetAppMenu, value: value });
//首页选项卡
export const setTabSelected = (value) => ({ type: SetTabSelected, value: value });
//是否显示详情页头部信息
export const setIsShowDetailHead = (value) => ({ type: SetIsShowDetailHead, value: value });