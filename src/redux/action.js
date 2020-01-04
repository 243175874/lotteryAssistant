import { SetSelectedTab, SetCurrentLotteryName, SetCurrentLotteryId, SetCurrentLotteryPageIndex, SetCurrentPeriods, SetSixTitle, SetSixTypeId, SetSixUserId, SetIsShowSendMessagePage } from './actionType'
//当前菜单索引
export const setSelectedTab = (value) => ({ type: SetSelectedTab, value: value });
//当前进入彩种名称
export const setCurrentLotteryName = (value) => ({ type: SetCurrentLotteryName, value: value });
//当前进入彩种ID
export const setCurrentLotteryId = (value) => ({ type: SetCurrentLotteryId, value: value });
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
//是否显示发帖页面
export const setIsShowSendMessagePage = (value) => ({ type: SetIsShowSendMessagePage, value: value });