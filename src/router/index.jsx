import React from 'react';
import { browserHistory, Redirect } from 'react-router'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import store from '../redux/store.js'
import { Provider } from 'react-redux'
import { asyncComponent } from 'react-async-component';
const Home = asyncComponent({ name: "Home", resolve: () => import("../containers/home/home") });
import Register from '../containers/user/register'
const PersonalCneter = asyncComponent({ name: "PersonalCneter", resolve: () => import("../containers/personal/personalCenter") });
const ModifyPassword = asyncComponent({ name: "ModifyPassword", resolve: () => import("../containers/personal/modifyPassword") });
const MyPosts = asyncComponent({ name: "MyPosts", resolve: () => import("../containers/personal/myPosts") });
const UpdatePhoto = asyncComponent({ name: "UpdatePhoto", resolve: () => import("../containers/personal/updatePhoto") });
const Attention = asyncComponent({ name: "Attention", resolve: () => import("../containers/personal/attention") });
const About = asyncComponent({ name: "About", resolve: () => import('../containers/more/about') });
const Contact_us = asyncComponent({ name: "Contact_us", resolve: () => import('../containers/more/contact_us') });
const Introduce = asyncComponent({ name: "Introduce", resolve: () => import('../containers/more/introduce') });
const About_us = asyncComponent({ name: "About_us", resolve: () => import('../containers/more/about_us') });
const Statement = asyncComponent({ name: "Statement", resolve: () => import('../containers/more/statement') });
const Suggest = asyncComponent({ name: "Suggest", resolve: () => import('../containers/more/suggest') });
const Message = asyncComponent({ name: "Message", resolve: () => import('../containers/personal/message') });
const OtherProduction = asyncComponent({ name: "OtherProduction", resolve: () => import('../containers/home/otherProduction') });
//六合专区
const MarkSixLotteryVideo = asyncComponent({ name: "MarkSixLotteryVideo", resolve: () => import('../containers/mark_six/markSixLotteryVideo/markSixLotteryVideo') });
const MarkSixLotteryHistory = asyncComponent({ name: "MarkSixLotteryHistory", resolve: () => import('../containers/mark_six/markSixLotteryHistory/markSixLotteryHistory') });
const MarkSixLotteryRecord = asyncComponent({ name: "MarkSixLotteryRecord", resolve: () => import('../containers/mark_six//markSixLotteryRecord/markSixLotteryRecord') });
const MarkSixlotteryDetail = asyncComponent({ name: "MarkSixlotteryDetail", resolve: () => import('../containers/mark_six//markSixLotteryRecord/markSixlotteryDetail') });
const LotteryQueryAssistant = asyncComponent({ name: "LotteryQueryAssistant", resolve: () => import('../containers/mark_six/queryAssistant/lotteryQueryAssistant') });
const LotteryStatistics = asyncComponent({ name: "LotteryStatistics", resolve: () => import('../containers/mark_six/lotteryStatistics/lotteryStatistics') });
const PicturesLibraryMenu = asyncComponent({ name: "PicturesLibraryMenu", resolve: () => import('../containers/mark_six/sixPicturesLibrary/picturesLibraryMenu') });
const PicturesLibrary = asyncComponent({ name: "PicturesLibrary", resolve: () => import('../containers/mark_six/sixPicturesLibrary/picturesLibrary') });
const SixMasterHand = asyncComponent({ name: "SixMasterHand", resolve: () => import('../containers/mark_six/sixMasterHand/sixMasterHand') });
const SixMasterHandList = asyncComponent({ name: "SixMasterHandList", resolve: () => import('../containers/mark_six/sixMasterHand/sixMasterHandList') });
const SixMasterHandDetail = asyncComponent({ name: "SixMasterHandDetail", resolve: () => import('../containers/mark_six/sixMasterHand/sixMasterHandDetail') });
const SixMasterHandHistory = asyncComponent({ name: "SixMasterHandHistory", resolve: () => import('../containers/mark_six/sixMasterHand/sixMasterHandHistory') });
const SourceBookMenu = asyncComponent({ name: "SourceBookMenu", resolve: () => import('../containers/mark_six/sourceBook/sourceBookMenu') });
const SourceBookList = asyncComponent({ name: "SourceBookList", resolve: () => import('../containers/mark_six/sourceBook/sourceBookList') });
const SourceBookListSearch = asyncComponent({ name: "SourceBookListSearch", resolve: () => import('../containers/mark_six/sourceBook/sourceBookListSearch') });
const SourceBookDetail = asyncComponent({ name: "SourceBookDetail", resolve: () => import('../containers/mark_six/sourceBook/sourceBookDetail') });
const PeachMeetingMenu = asyncComponent({ name: "PeachMeetingMenu", resolve: () => import('../containers/mark_six/peachMeeting/peachMeetingMenu') });
const PeachMeetingList = asyncComponent({ name: "PeachMeetingList", resolve: () => import('../containers/mark_six/peachMeeting/peachMeetingList') });
const PeachMeetingListSearch = asyncComponent({ name: "PeachMeetingListSearch", resolve: () => import('../containers/mark_six/peachMeeting/peachMeetingListSearch') });



//被引入U3D的页面
const TmHistory = asyncComponent({ name: "TmHistory", resolve: () => import('../containers/mark_six/lotteryStatistics/tmHistory') });
const ZmHistory = asyncComponent({ name: "ZmHistory", resolve: () => import('../containers/mark_six/lotteryStatistics/zmHistory') });
const TmShengXiao = asyncComponent({ name: "TmShengXiao", resolve: () => import('../containers/mark_six/lotteryStatistics/tmShengXiao') });
const ZmShengXiao = asyncComponent({ name: "ZmShengXiao", resolve: () => import('../containers/mark_six/lotteryStatistics/zmShengXiao') });
const TmWeiShu = asyncComponent({ name: "TmWeiShu", resolve: () => import('../containers/mark_six/lotteryStatistics/tmWeiShu') });
const ZmWeiShu = asyncComponent({ name: "ZmWeiShu", resolve: () => import('../containers/mark_six/lotteryStatistics/zmWeiShu') });
const TmBoSe = asyncComponent({ name: "TmBoSe", resolve: () => import('../containers/mark_six/lotteryStatistics/tmBoSe') });
const ZmBoSe = asyncComponent({ name: "ZmBoSe", resolve: () => import('../containers/mark_six/lotteryStatistics/zmBoSe') });
const NumberOfWaveband = asyncComponent({ name: "NumberOfWaveband", resolve: () => import('../containers/mark_six/lotteryStatistics/numberOfWaveband') });
const TmTwoSides = asyncComponent({ name: "TmTwoSides", resolve: () => import('../containers/mark_six/lotteryStatistics/tmTwoSides') });
const ZmSum = asyncComponent({ name: "ZmSum", resolve: () => import('../containers/mark_six/lotteryStatistics/zmSum') });
const GoSourceBookDetail = asyncComponent({ name: "GoSourceBookDetail", resolve: () => import('../containers/mark_six/sourceBook/goSourceBookDetail') });
const GoPicturesLibrary = asyncComponent({ name: "GoPicturesLibrary", resolve: () => import('../containers/mark_six/sixPicturesLibrary/goPicturesLibrary') });
const GoSixMasterHandDetail = asyncComponent({ name: "GoSixMasterHandDetail", resolve: () => import('../containers/mark_six/sixMasterHand/goSixMasterHandDetail') });

//工具箱
const LoversCode = asyncComponent({ name: "LoversCode", resolve: () => import('../containers/toolbox/loversCode') });
const AnimalsCard = asyncComponent({ name: "AnimalsCard", resolve: () => import('../containers/toolbox/animalsCard') });
const Shake = asyncComponent({ name: "Shake", resolve: () => import('../containers/toolbox/shake') });
const MysteriousBag = asyncComponent({ name: "MysteriousBag", resolve: () => import('../containers/toolbox/mysteriousBag') });
const LuckyLottery = asyncComponent({ name: "LuckyLottery", resolve: () => import('../containers/toolbox/luckyLottery') });
const ShengxiaoTurntable = asyncComponent({ name: "ShengxiaoTurntable", resolve: () => import('../containers/toolbox/shengxiaoTurntable') });
const Forecast = asyncComponent({ name: "Forecast", resolve: () => import('../containers/toolbox/forecast') });
const SelectCodeAssistant = asyncComponent({ name: "SelectCodeAssistant", resolve: () => import('../containers/toolbox/selectCodeAssistant') });
import Calendar from '../containers/toolbox/CalendarDate'

//彩票专区
const LotteryCenter = asyncComponent({ name: "LotteryCenter", resolve: () => import('../containers/lottery/lotteryCenter') });
//路由守卫
const Router = ({ component: Component, children, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            <Component {...props} ><Switch>{children}</Switch></Component>
        )}
    />
);

const Root = () => (
    <BrowserRouter history={browserHistory}>
        <Provider store={store}>
            <Switch>
                <Router exact path="/" component={Home} ></Router>
                <Router path="/register" component={Register} ></Router>
                {/* <Router path="/forgetPassword" component={ForgetPassword} ></Router> */}
                <Router path="/personalCenter" component={PersonalCneter} ></Router>
                <Router path="/modifyPassword" component={ModifyPassword} ></Router>
                <Router path="/myPosts" component={MyPosts} ></Router>
                <Router path="/updatePhoto" component={UpdatePhoto} ></Router>
                <Router path="/attention" component={Attention} ></Router>
                <Router path="/about" component={About} ></Router>
                <Router path="/contact_us" component={Contact_us} ></Router>
                <Router path="/introduce" component={Introduce} ></Router>
                <Router path="/about_us" component={About_us} ></Router>
                <Router path="/statement" component={Statement} ></Router>
                <Router path="/suggest" component={Suggest} ></Router>
                <Router path="/message" component={Message} ></Router>
                <Router path="/otherProduction" component={OtherProduction} ></Router>

                {/* 六合专区 */}
                <Router path="/markSixLotteryVideo" component={MarkSixLotteryVideo} ></Router>
                <Router path="/markSixLotteryHistory" component={MarkSixLotteryHistory} ></Router>
                <Router path="/markSixLotteryRecord" component={MarkSixLotteryRecord} ></Router>
                <Router path="/markSixlotteryDetail" component={MarkSixlotteryDetail} ></Router>
                <Router path="/lotteryQueryAssistant" component={LotteryQueryAssistant} ></Router>
                <Router path="/lotteryStatistics" component={LotteryStatistics} ></Router>
                <Router path="/picturesLibraryMenu" component={PicturesLibraryMenu} ></Router>
                <Router path="/picturesLibrary" component={PicturesLibrary} ></Router>
                <Router path="/sixMasterHand" component={SixMasterHand} ></Router>
                <Router path="/sixMasterHandList" component={SixMasterHandList} ></Router>
                <Router path="/sixMasterHandDetail" component={SixMasterHandDetail} ></Router>
                <Router path="/sixMasterHandHistory" component={SixMasterHandHistory} ></Router>
                <Router path="/sourceBookMenu" component={SourceBookMenu} ></Router>
                <Router path="/sourceBookList" component={SourceBookList} ></Router>
                <Router path="/sourceBookListSearch" component={SourceBookListSearch} ></Router>
                <Router path="/sourceBookDetail" component={SourceBookDetail} ></Router>
                <Router path="/peachMeetingMenu" component={PeachMeetingMenu} ></Router>
                <Router path="/peachMeetingList" component={PeachMeetingList} ></Router>
                <Router path="/peachMeetingListSearch" component={PeachMeetingListSearch} ></Router>
                
                {/* 被引入U3D的页面 */}
                <Router path="/tmHistory" component={TmHistory} ></Router>
                <Router path="/zmHistory" component={ZmHistory} ></Router>
                <Router path="/tmShengXiao" component={TmShengXiao} ></Router>
                <Router path="/zmShengXiao" component={ZmShengXiao} ></Router>
                <Router path="/tmWeiShu" component={TmWeiShu} ></Router>
                <Router path="/zmWeiShu" component={ZmWeiShu} ></Router>
                <Router path="/tmBoSe" component={TmBoSe} ></Router>
                <Router path="/zmBoSe" component={ZmBoSe} ></Router>
                <Router path="/numberOfWaveband" component={NumberOfWaveband} ></Router>
                <Router path="/tmTwoSides" component={TmTwoSides} ></Router>
                <Router path="/zmSum" component={ZmSum} ></Router>
                <Router path="/goSourceBookDetail" component={GoSourceBookDetail} ></Router>
                <Router path="/goPicturesLibrary" component={GoPicturesLibrary} ></Router>
                <Router path="/goSixMasterHandDetail" component={GoSixMasterHandDetail} ></Router>
          
                
                {/* 工具箱 */}
                <Router path="/loversCode" component={LoversCode} ></Router>
                <Router path="/animalsCard" component={AnimalsCard} ></Router>
                <Router path="/shake" component={Shake} ></Router>
                <Router path="/mysteriousBag" component={MysteriousBag} ></Router>
                <Router path="/luckyLottery" component={LuckyLottery} ></Router>
                <Router path="/shengxiaoTurntable" component={ShengxiaoTurntable} ></Router>
                <Router path="/forecast" component={Forecast} ></Router>
                <Router path="/selectCodeAssistant" component={SelectCodeAssistant} ></Router>
                <Router path="/calendar" component={Calendar} ></Router>
                {/* 彩票专区 */}
                <Router path="/lotteryCenter" component={LotteryCenter} ></Router>
                <Redirect from="/*" to="/" />
            </Switch>
        </Provider>
    </BrowserRouter>
);

export default hot(module)(Root);
