import React from 'react';
import { browserHistory, Redirect } from 'react-router'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import store from '../redux/store.js'
import { Provider } from 'react-redux'
import Home from '../containers/home/home'
import Register from '../containers/user/register'
import ForgetPassword from '../containers/user/forgetPassword'
import PersonalCneter from '../containers/personal/personalCenter'
import ModifyPassword from '../containers/personal/modifyPassword'
import MyPosts from '../containers/personal/myPosts'
import UpdatePhoto from '../containers/personal/updatePhoto'
import Attention from '../containers/personal/attention'
import About from '../containers/more/about'
import Contact_us from '../containers/more/contact_us'
import Introduce from '../containers/more/introduce'
import About_us from '../containers/more/about_us'
import Statement from '../containers/more/statement'
import Suggest from '../containers/more/suggest'
import Message from '../containers/personal/message'
import OtherProduction from '../containers/home/otherProduction'
//六合专区
import MarkSixLotteryVideo from '../containers/mark_six/markSixLotteryVideo/markSixLotteryVideo'
import MarkSixLotteryHistory from '../containers/mark_six/markSixLotteryHistory/markSixLotteryHistory'
import MarkSixLotteryRecord from '../containers/mark_six//markSixLotteryRecord/markSixLotteryRecord'
import MarkSixlotteryDetail from '../containers/mark_six//markSixLotteryRecord/markSixlotteryDetail'
import LotteryQueryAssistant from '../containers/mark_six/queryAssistant/lotteryQueryAssistant'
import LotteryStatistics from '../containers/mark_six/lotteryStatistics/lotteryStatistics'
import PicturesLibraryMenu from '../containers/mark_six/sixPicturesLibrary/picturesLibraryMenu'
import PicturesLibrary from '../containers/mark_six/sixPicturesLibrary/picturesLibrary'
import SixMasterHand from '../containers/mark_six/sixMasterHand/sixMasterHand'
import SixMasterHandList from '../containers/mark_six/sixMasterHand/sixMasterHandList'
import SixMasterHandDetail from '../containers/mark_six/sixMasterHand/sixMasterHandDetail'
import SixMasterHandHistory from '../containers/mark_six/sixMasterHand/sixMasterHandHistory'
import SourceBookMenu from '../containers/mark_six/sourceBook/sourceBookMenu'
import SourceBookList from '../containers/mark_six/sourceBook/sourceBookList'
import PeachMeetingMenu from '../containers/mark_six/peachMeeting/peachMeetingMenu'
import PeachMeetingList from '../containers/mark_six/peachMeeting/peachMeetingList'
//被引入U3D的页面
import TmHistory from '../containers/mark_six/lotteryStatistics/tmHistory'
import ZmHistory from '../containers/mark_six/lotteryStatistics/zmHistory'
import TmShengXiao from '../containers/mark_six/lotteryStatistics/tmShengXiao'
import ZmShengXiao from '../containers/mark_six/lotteryStatistics/zmShengXiao'
import TmWeiShu from '../containers/mark_six/lotteryStatistics/tmWeiShu'
import ZmWeiShu from '../containers/mark_six/lotteryStatistics/zmWeiShu'
import TmBoSe from '../containers/mark_six/lotteryStatistics/tmBoSe'
import ZmBoSe from '../containers/mark_six/lotteryStatistics/zmBoSe'
import NumberOfWaveband from '../containers/mark_six/lotteryStatistics/numberOfWaveband'
import TmTwoSides from '../containers/mark_six/lotteryStatistics/tmTwoSides'
import ZmSum from '../containers/mark_six/lotteryStatistics/zmSum'
//工具箱
import LoversCode from '../containers/toolbox/loversCode'
import AnimalsCard from '../containers/toolbox/animalsCard'
import Shake from '../containers/toolbox/shake'
import MysteriousBag from '../containers/toolbox/mysteriousBag'
import LuckyLottery from '../containers/toolbox/luckyLottery'
import ShengxiaoTurntable from '../containers/toolbox/shengxiaoTurntable'
import Forecast from '../containers/toolbox/forecast'
import SelectCodeAssistant from '../containers/toolbox/selectCodeAssistant'
import Calendar from '../containers/toolbox/CalendarDate'

//彩票专区
import LotteryCenter from '../containers/lottery/lotteryCenter'
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
                <Router path="/forgetPassword" component={ForgetPassword} ></Router>
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
                <Router path="/peachMeetingMenu" component={PeachMeetingMenu} ></Router>
                <Router path="/peachMeetingList" component={PeachMeetingList} ></Router>
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
