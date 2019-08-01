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
 * 
 */