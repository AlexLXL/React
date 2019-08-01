/**
 * 
 * rem适配
 *    index.html:
 *          <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
 * 
 *          <script>
 *            (function () {
 *              var  styleN = document.createElement("style");
 *              var width = document.documentElement.clientWidth/16;      // 1rem = 屏幕宽度的1/16
 *              styleN.innerHTML = 'html{font-size:'+width+'px!important}';
 *              document.head.appendChild(styleN);
 *            })();
 *          </script>
 * 
 * 
 * 
 *    **使用**:
 *          如果设计师给的图是750px;那么1rem 就是 750/16=46.875px
 * 
 *          css中:
 *                                                  @rem:46.875rem;
 *                .box{                             .box{
 *                  width:60px;                         width: 60/@rem; // 单位rem
 *                }                                 }
 * 
 * 
 * 
 * 功能: 滚动到底部
 *          window.addEventListener('scroll', () => {} )                            // 添加滚动事件
 *          
 *          // 回调里获取(正常: scrollHeight = clientHeight + scrollTop)
 *          let clientHeight = document.documentElement.clientHeight;               // 视口的高度
 *          let scrollTop = Math.round(document.documentElement.scrollTop);         // 滚动后, div在视口上面的高度(存在误差(小数)，所以加上了四拾伍入)
 *          let scrollHeight = document.documentElement.scrollHeight;               // 整个页面的高度
 *          
 *          if(scrollHeight - clientHeight - scrollTop <= 1){ console.log("滚动到底部了") }   // 判断是否到底部
 * 
 * 
 * 
 */