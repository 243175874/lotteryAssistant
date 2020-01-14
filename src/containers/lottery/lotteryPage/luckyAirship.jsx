// import React, { Component } from "react";
// import FunctionMenu from '../../../components/lotteryArea/functionMenu'
// const path = "../../assets/img/lottery/menu/";
// // 免费参考
// import icon_mftj from '../../assets/img/lottery/menu/icon_mftj.png'
// import icon_mftj_press from '../../assets/img/lottery/menu/icon_mftj_press.png'
// // 历史开奖
// import icon_lskj from '../../assets/img/lottery/menu/icon_lskj.png'
// import icon_lskj_press from '../../assets/img/lottery/menu/icon_lskj_press.png'
// // 路珠分析
// import icon_lzfx from '../../assets/img/lottery/menu/icon_lzfx.png'
// import icon_lzfx_press from '../../assets/img/lottery/menu/icon_lzfx_press.png'
// // 冷热分析
// import icon_lrfx from '../../assets/img/lottery/menu/icon_lrfx.png'
// import icon_lrfx_press from '../../assets/img/lottery/menu/icon_lrfx_press.png'
// // 横板走势
// import icon_hbzs from '../../assets/img/lottery/menu/icon_hbzs.png'
// import icon_hbzs_press from '../../assets/img/lottery/menu/icon_hbzs_press.png'
// //大小遗漏
// import icon_dxyl from '../../assets/img/lottery/menu/icon_dxyl.png'
// import icon_dxyl_press from '../../assets/img/lottery/menu/icon_dxyl_press.png'
// //单双遗漏
// import icon_dsyl from '../../assets/img/lottery/menu/icon_dsyl.png'
// import icon_dsyl_press from '../../assets/img/lottery/menu/icon_dsyl_press.png'
// //两面长龙
// import icon_lmtj from '../../assets/img/lottery/menu/icon_lmtj.png'
// import icon_lmtj_press from '../../assets/img/lottery/menu/icon_lmtj_press.png'
// //冠亚统计
// import icon_gytj from '../../assets/img/lottery/menu/icon_gytj.png'
// import icon_gytj_press from '../../assets/img/lottery/menu/icon_gytj_press.png'
// //大小历史
// import icon_dxls from '../../assets/img/lottery/menu/icon_dxls.png'
// import icon_dxls_press from '../../assets/img/lottery/menu/icon_dxls_press.png'
// //单双历史
// import icon_dsls from '../../assets/img/lottery/menu/icon_dsls.png'
// import icon_dsls_press from '../../assets/img/lottery/menu/icon_dsls_press.png'
// //龙虎历史
// import icon_lhls from '../../assets/img/lottery/menu/icon_lhls.png'
// import icon_lhls_press from '../../assets/img/lottery/menu/icon_lhls_press.png'

// //幸运飞艇
// export default class LuckyAirship extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             menuList: [
//                 { icon: icon_mftj, icon_press: icon_mftj_press, name: "免费参考", type: "预测", place: "menu" },
//                 { icon: icon_lskj, icon_press: icon_lskj_press, name: "历史开奖", type: "综合", place: "menu" },
//                 { icon: icon_lzfx, icon_press: icon_lzfx_press, name: "路珠分析", type: "综合", place: "menu" },
//                 { icon: icon_lrfx, icon_press: icon_lrfx_press, name: "冷热分析", type: "综合", place: "menu" },
//                 { icon: icon_hbzs, icon_press: icon_hbzs_press, name: "横板走势", type: "综合", place: "list" },
//                 { icon: icon_dxyl, icon_press: icon_dxyl_press, name: "大小遗漏", type: "遗漏", place: "list" },
//                 { icon: icon_dsyl, icon_press: icon_dsyl_press, name: "单双遗漏", type: "遗漏", place: "list" },
//                 { icon: icon_lmtj, icon_press: icon_lmtj_press, name: "两面长龙", type: "遗漏", place: "list" },
//                 { icon: icon_gytj, icon_press: icon_gytj_press, name: "冠亚统计", type: "遗漏", place: "list" },
//                 { icon: icon_dxls, icon_press: icon_dxls_press, name: "大小历史", type: "历史", place: "list" },
//                 { icon: icon_dsls, icon_press: icon_dsls_press, name: "单双历史", type: "历史", place: "list" },
//                 { icon: icon_lhls, icon_press: icon_lhls_press, name: "龙虎历史", type: "历史", place: "list" }],
//         };
//     }

//     render() {
//         return (
//             <div className="wh100">
//                 <div className="w100" style={{ height: "calc(100% - 55px)" }}>
//                 </div>

//                 <div className="w100" style={{ height: "55px", borderTop: "1px solid #BCBCBC", position: "fixed", bottom: "0", left: "0", zIndex: "20" }}>
//                     <FunctionMenu menuList={this.state.menuList}></FunctionMenu>
//                 </div>
//             </div>
//         );
//     }
// }
