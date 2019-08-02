// 高阶函数：1、变量是函数   2、返回是函数

// 高阶组件--本质是一个函数, 参数接收组件, 返回一个新组件, 
//  两个参的:
//        Form.create()(ComponentName)                    // 表单验证三部曲: 1、创建路由组件四大属性form
//        {getFieldDecorator( 'password', {rules:[]} )( <input type="password" onChange={this.handleChange('password')}/> )}
//        react-reudx的connect、用来合并创建action和dispatch通过属性传给要用的组件：export default connect((state) => ({num: state}),{ increment, decrement, incrementAsync, error })(Counter) // 这里是直接传,而不是组件的方式来传
// 

// |##1、谈谈虚拟DOM的diff算法
// *作用：减少重排重绘次数，最小化页面重排重绘
// *tree diff
// *只针对同级/同层节点进行比较。
// *如果父节点不一样，就直接移除父节点和所有子节点，替换成新的*问题：如果有跨层级的节点移动，性能较差。不建议开发者这样做
// *component diff
// *如果是相同类型的组件，在对里面的结构进行tree diff，
// *如果不同类型，就不进行比较，直接替换成新的
// *element diff
// *同一层级遍历的元秦添加一个唯一的key属性，发生位置变化时比较key来增删节点 
// 
// *总结：不建议往开头添加元素、尽量保持稳定DOM结构


/**
 * 脚手架:
 *      ● npm install -g create-react-app : 全局下载工具
 *      ● create-react-app react-admin :下载模板项目
 * 
 *      ● 写好index.js和App.jsx、引入reset.css (assets/less)
 *      
 *      ● 下包
 *            ▁react配置使用stylus
 *                      yarn add stylus stylus-loader
 * 
 *                      1. run eject(最好是刚安装好脚手架就运行，一旦里面任何文件发生修改，运行程序就会报错)
 *                                  报错解决办法：git add .  、  git commit -m "neirong"
 *                      2. 找到config文件下的webpack.config.js，搜索file-loader，在后面加上stylus
 *                                  exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/,/\.styl$/,/\.less$/],
 *                      3. 然后再在oneOf的最后面加上
 *                                  {
 *                                     test: /\.styl$/,
 *                                     use: [
 *                                       require.resolve('style-loader'),
 *                                       require.resolve('css-loader'),
 *                                       require.resolve('stylus-loader')
 *                                     ]
 *                                  }
 *                      4. 运行报错没有xxx module，把包都删了，用npm install重下一遍
 * 
 *            ▁引入antd, 按需加载
 *                      yarn add antd
 *                      yarn add react-app-rewired customize-cra babel-plugin-import –dev
 *                      yarn add less less-loader
 * 
 *                      配置:
 *                            package.json
 *                                          "scripts": {
 *                                            "start": "react-app-rewired start",
 *                                            "build": "react-app-rewired build",
 *                                            "test": "react-app-rewired test"
 *                                          }
 *
 *                            根目录新建config-overrides.js
 *                                          const { override, fixBabelImports, addLessLoader } = require('customize-cra');
 *                                          
 *                                          // 按需配置css
 *                                          module.exports = override(
 *                                           fixBabelImports('import', {
 *                                             libraryName: 'antd',
 *                                             libraryDirectory: 'es',
 *                                             style: true,
 *                                           }),
 *                                            // 解析less（自定义是主题）
 *                                            addLessLoader({
 *                                              javascriptEnabled: true,
 *                                              modifyVars: { '@primary-color': '#abc123' },
 *                                            }),
 *                                          );
 * 
 *                      检测: App.jsx
 *                            import { Button } from 'antd'
 *                            render(){ return <div> <Button type="primary">按钮</Button> </div> }
 * 
 * 
 *            ▁引入路由
 *                      yarn add react-router-dom
 * 
 *                      配置: 
 *                          index.js
 *                                  import { BrowserRouter } from 'react-router-dom'
 *                                  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
 * 
 * 
 */



/**
 * 普通组件： export default function App(){return <div> </div>} 不使用state和prop用工厂函数 ( 没有render(){})
 * 类组件: class Login extends Component{ render(){return xxx} }
 * 
 * 
 *                                                             ***1)props---父子组件通信***
 * // webStorm简写: imp                                         ***2)消息订阅---兄弟组件，祖孙组件***
 *                                                                    PubSub.subscribe('ADD_COMMENT', function(msg，data){ }); //订阅，注意大写，msg是'ADD_COMMENT'
 * import React,{Component} from 'react';                             PubSub.publish(' ADD_COMMENT ', data) //发布消息
 * import { publish, subscribe } from 'pubsub-js';    ------    ***3)redux***
 * import PropTypes from 'prop-types'; 
 * 
 * 
 *                                                                                                              | ***react-router-dom 路由传参[query--明文，state--密文]***
 *                                                                                                              | <Link to={{ pathname: ' /user' , query : { day: 'Friday' }}}>             // query可换state
 *                                                                                                              | this.props.history.push({ pathname : '/user' ,query : { day: 'Friday'} }) // query可换state
 *                                                                                                              | this.props.location.query.day                                             // query可换state
 *                                                                                                              | 
 *                                                                                                              | this.props.history.replace/push() 也能更改url路径(多用在回调函数中)
 * import { BrowserRouter, Link, NavLink, Route, Redirect, Switch, withRouter } from 'react-router-dom';  //  Link		      ---	改变url，不刷新页面（单页面）（a标签多页面）                        -- <Link to="/xxx">xxx</Link>
 *	                                                                                                          NavLink	      ---	改变url ***能改变选中样式：activeClassName="my-active"***         -- <NavLink to="/xxx" className="navItem" activeClassName="on" > **(样式给不上考虑是否是里面嵌套了标签，这个标签导致样式没有给上)**
 *	                                                                                                          Route	        --- 注册路由，根据路径改变component                                    -- <Route path="/xxx" component={yyy}/> (路径为"/"的放最后,不然会一直匹配上)
 *	                                                                                                          Redirect      --- 重定向（用于设置默认组件）                                          -- <Redirect to='/xxx'/>
 *	                                                                                                          Switch        --- 用来包住Route、 Redirect，值运行其中一个
 *                                                                                                            withRouter    --- 高阶组件，给非路由组件传递路由组件的三大属性                           -- export default withRouter(componentName)
 *                                                                                                            BrowserRouter --- index.js里 包裹<App />
 * import logo from './logo.png'      // 图片要引入才会打包                                                  
 * import './index.less'              // 引入自己的less                                                                           
 * 
 * 
 * class ComponentName extends Component{
 * 
 *    static propTypes = {                                          // ***接收属性***       --this.props.xxx读取属性 (不可修改)(string、func、object)
 *       xxx: PropTypes.bool.isRequired,                                                    
 *     };
 * 
 *    createRef = React.createRef()                                 // ***ref***          --1.创建creatRef 2.html加上 3.使用this.createRef.current ***[this.createRef.current.value能拿表单数据，e.target.value也能, 但e.target.value有限制条件,事件必须在input上才可以]***
 *                                                                                        --受控组件代替ref  state+onChange=handleChange()、用到e.target.value
 * 
 *    state={};                                                     // ***状态数据***       --this.state.xxx读取状态  --this.setState(xxx:yyy)修改状态
 *    
 * 
 *    handleChange = (option) => {                                  // ***事件***          --注意写法是 等于 一个回调函数 ，接受参数且要用event, 就用这种return的方法  
 *        return (e) => {
 *            this.setState({                                       // ***更新数据***       --异步
 *              [option]: e.target.value
 *            })
 *        }
 *    }
 * 
 *    
 *    constructor(){}             componentWillReceiveProps(){}     // ***生命周期*** ( componentDidMount-发请求、componentWillUnmount-删定时器、ajax请求)
 *    componentWillMount(){}      shouldComponentUpdate(){}                                                     | **1 // 卸载异步操作设置状态**
 *    componentDidMount(){}       componentWillUpdate(){}                                                       | componentWillUnmount(){    
 *                                componentDidUpdate(){}                                                        |     this.setState = (state, callback) => {
 *    componentWillUnmount(){}                                                                                  |         return;
 *                                                                                                              |     }
 *                                                                                                              | }
 *    
 * 
 * ***\\\\\\\\\\\\\\\\\\\\\表单验证套路代码\\\\\\\\\\\\\\\\\\\\\\\\\\\\***
 * 
 *   handleSubmit = (e) => {
 *      e.preventDefault();
 * 
 *      this.props.form.validateFields(async (errors, value) => { // 如果rules验证规则空着，这里会直接跳过不运行！！
 *        if(!errors) {
 *          const { username, password } = value;                 // 拿数据
 *          const result = await reqLogin(username, password);    // 发请求
*   
 *          if(result) {
 *            this.props.history.replace('/')
 *          }else {
 *            this.props.form.resetFields(['password']);          // 清空内容~
 *          }
 *        }else {
 *          console.log('表单校验失败' + errors)
 *        }
 *      })
 *    };
 * 
 *    
 *    validator = (rule, value, callback) => {
 *        // 增强复用性**rule是一个对象，存了getFieldDecorator里面的名字**
 *        const name = rule.fullfield === 'username' ? '用户名' : '密码'
 *  
 *       if(!value) {
 *         callback(`${name}必须输入`)
 *       }else if (!/^\w+$/.test(value)) {
 *         callback(`${name}只能包含字母、数字、下划线`)
 *       }else if (value.length < 4) {
 *         callback(`${name}最小长度4位`)
 *       }else if (value.length > 15) {
 *         callback(`${name}最大长度15位`)
 *       }else {
 *         callback()
 *       }
 *     };
 * ***\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\***
 * 
 * **======================  render()  ================================**
 * 
 *    render() { 
 *        **⒉** 
 *        const { getFieldDecorator } = this.props.form;
 * 
 * 
 *                ***Fragment不会生成DOM 节点, 仅有包裹作用***
 *        return <React.Fragment> 
 *  
 *            // ***基础语法***[大括号包裹js代码]
 *            <div clssName="box1 on" style={{fontSize: '16px'}}></div>               // 设置class、style[小驼峰]
 *            <div clssName={this.state.xxx?'box1 on':'box1'} > {this.state.hellow} </React.Fragment>     // 使用状态数据
 *            <div xxx=xxx yyy={...obj}></div>  // 传props
 *            <div xxx={this.abc}></div>        // props属性使用  -- this.abc
 *            <div ref={this.createRef}></div>  // ref使用
 * 
 *            ***路由的使用***
 *            // 一级路由   -------------------------------------------------------------   二级路由：
 *            <Link to="/login"></Link>
 * 
 *            <Switch>
 *                <Route path="/login" component={Login} />   --------------------------    在Login组件里面写 <Link to="/login/phone"/>
 *                <Redirect to="/home/messages"/>                                                            <Route path="/login/phone" component={Phone} />
 *            </Switch>                                                                                      <Redirect to="/login/phone" />  自动选中phone
 * 
 *            ***事件的使用***
 *            // 事件的使用
 *            <form onSubmit = { this.handleSubmit }>
 *                <input type="text" onChange={this.handleChange('userName')}/>>
 *                **⒊**
 *                {
 *                    getFieldDecorator( 
 *                        'password', {
 *                            initialValue: '0' ***1 // 设置组件默认值, 组件放到第二个参数后, 组件的默认选中属性会失效(删掉) 如:antd的 Slect组件 defaultvalue="0"、inputNumber的defaultValue***
 *                            rules:[{ validator: this.validator }]
 *                        } 
 *                    )( <input type="password" onChange={this.handleChange('password')}/> )
 *                }
 *            </form>
 * 
 *            ***图片的使用***
 *            // 图片必须引入才会打包
 *            <img src={logo} />
 * 
 *            ***动态遍历生成结构***
 *            {
 *              // 用map的原因, 生成一个数组，数组里面存的是虚拟DOM对象，数组放在这里会自动展开  **( 虚拟DOM对象 {$$typeof:Symbol(react.element),type:"div",key:"0",ref:null,props:{},.…})**
 *                  ★ 这里有一个比较特别的, 用forEach手动返回 不会生成虚拟DOM对象，会变成undefined
 *              // 记得写key, { 另一种方法: 遍历生成写在componentWillMount(){},并用this.xx保存起来,html直接{this.xx}使用 用于值初始化渲染一次的结构}
 *              this.state.arr===0?'':this.state.arr.map((item, index) => { return <div key={index}> item.keyname <React.Fragment> })  // **数据改变，结构增加/减少 ，但不会整个页面重新渲染，（因为有虚拟DOM算法）**
 *            }
 * 
 *            ***动态使用组件***
 *            {
 *              this.props.location.pathname === '/u/login'?'': <Nav />
 *            }
 *        </React.Fragment> 
 *    }
 * }
 * 
 * **⒈** 
 * export default Form.create()(ComponentName)                // **表单验证三部曲**: 1、创建路由组件四大属性form (import { Form } from 'antd';)
 *                                                                                  2、render(){}内拿出第四大属性里的getFieldDecorator    
 *                                                                                                 ***this.props.form的值***                         [https://ant.design/components/form-cn/]
 *                                                                                                 --const { getFieldDecorator } = this.props.form;  // 验证表单的
 *                                                                                                 --const { resetFields } = this.props.form         // 重置表单值 -- this.props.form.resetFields(['password'])
 * 
 *                                                                                  3、躁起来：{ getFieldDecorator( 'password', {rules:[]} )( <input type="password" onChange={this.handleChange('password')}/> ) }
 *                                                                                     第一个参数的    
 *                                                                                                    | password --- 响亮亮的名字
 *                                                                                                    | rules写法 --- { validator: this.validator }
 *            
 *                                                                                                                 // {required: true, message: '用户名必须输入'},
 *                                                                                                                 // {min: 4,message: '用户名最小长度4位'},
 *                                                                                                                 // {max: 15,message: '用户名最大长度15位'},
 *                                                                                                                 // {pattern: /^\w+$/, message: '用户名只能包含字母、数字、下划线'}
 *                                                                                                    | initialValue："0",  设置默认值，下拉框默认选中项<Option value="0">
 *            
 *                                                                                      第二个参数的
 *                                                                                                    | getFieldDecorator也是高阶就不说了, 第二个参数传 组件/input
 *
 *                                                           // **表单提交轻音乐**: 
 *                                                                                  提交事件里, this.props.form.validateFields((errors, value) => { 判断error、拿value、发请求、根据返回值更新数据状态 }
 *                                                                                                    | 用过getFieldDecorator的input的error和value都能拿到
 *                                                                                                    | 什么发请求的小儿科都在这里
 *                  
 *                                                                                  把子组件的form传给父组件(form其实就是子组件实例对象):
 *                                                                                    父组件:
 *                                                                                          传递: <子组件 wrappedComponentRef={(form) => **this.xxxForm** = form} />
 *                                                                                          使用: **this.xxxForm**.props.form
 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------
 *    脚手架的文件夹
 *      react-admin
 *        | public文件就爱
 *                | index.html
 * 
 *        | src文件夹
 *                | assets文件夹        ---   公共css、img
 *                | components文件夹    ---   普通组件
 *                | pages文件夹         ---   路由组件
 *                        | home文件夹
 *                                | images文件夹
 *                                | index.jsx       *** // 引入路径写到文件夹(会自动引入index.jsx)**
 *                                | home.css
 *                | App.jsx
 *                | index.js
 * 
 *        | package.json      ---☆发送请求会遇到**跨域问题**，用代理服务器解决：
 *                                 代码先发到本地代理服务器3000，然后转发到服务器5000
 *                                 在package.json里面加"proxy": "http://localhost:5000"
 *
 * 
 * 
 * index.js：
 *        import React from 'react';
 *        import ReactDOM from 'react-dom';
 *        import { BrowserRouter as Router } from 'react-router-dom'
 *        
 *        import App from './App.jsx';
 *        import './assets/css/reset.css'
 *        
 *        ReactDOM.render(
 *          <Router>
 *            <App />
 *          </Router>,
 *          document.getElementById('root'));
 * 
 * 
 * App.jsx：
 *        import React from 'react';
 *        import { Route, Switch } from 'react-router-dom'
 *        
 *        import Login from './pages/login'
 *        import Admin from './pages/admin'
 *        import './App.less'
 *        
 *        export default function App() {
 *          return <div className="App">
 *            <Switch>
 *              <Route path="/login" component={Login} />
 *              <Route path="/" component={Admin} />
 *            </Switch>
 *          </div>
 *        }
 * 
 * 
 * index.html (PC端 和 移动端):
 *        <!DOCTYPE html>
 *        <html lang="en">
 *        <head>
 *          <meta charset="UTF-8">
 *          <link rel="shortcut icon" href="./favicon.ico" />
 *          <title>Title</title>
 *        </head>
 *        <body>
 *        <div id="root"></div>
 *        </body>
 *        </html>
 * 
 * 
 *        <!DOCTYPE html>
 *        <html lang="en">
 *        <head>
 *          <meta charset="UTF-8">
 *          <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
 *          <link rel="shortcut icon" href="./favicon.ico" />
 *          <title>Title</title>
 *        </head>
 *        <body>
 *        <div id="root"></div>
 *        <script>
 *          (function () {
 *            var  styleN = document.createElement("style");
 *            var width = document.documentElement.clientWidth/10;
 *            styleN.innerHTML = 'html{font-size:'+width+'px!important}';
 *            document.head.appendChild(styleN);
 *          })();
 *        </script>
 *        </body>
 *        </html>
 * 
 */

 /**
  * 
  * antd使用过(https://ant.design/components/icon-cn/)
  * 
  * import { Button, Form, Icon, Layout } from 'antd';
  * 
  *                 使用                                                  其他
  *   Upload  ---  上传图片(具体看文件)
  *   Tree    ---  Tree树形控件                                 ---  defaultExpandA11 默认展开所有树节点(使用时要注释的配置)  --- // onExpand={this.onExpand}
  *                                                                                                                           // expandedkeys={this.state.expandedkeys}
  *                                                                                                                           // autoExpandParent={this.state.autoExpandParent}
  *   Form    ---  复制删改                                     ---  往下拉有this.props.form的方法(具体看上面的三部曲)
  * 
  *                                                                 ●设置Form里面Item的大小 (使用:  设置给Form/Form.Item ---  <Form {...formItemLayout}></Form>            )
  *                                                                                                                         <Form.Item {...formItemLayout}></Form.Item>
  *                                                                                                                         <Form.Item wrapperCol={{span: 5}}></Form.Item>
  *                                                                     const formItemLayout = {                            
  *                                                                       labelCol: {             // 设置Form.Item的大小
  *                                                                         xs: { span: 24 }, // 移动端(栅栏布局--分成了24份)
  *                                                                         sm: { span: 5 },  // 平板
  *                                                                       },
  *                                                                       wrapperCol: {           // 设置Form.Item里面元素的大小
  *                                                                         xs: { span: 24 },
  *                                                                         sm: { span: 12 },
  *                                                                       },
  *                                                                     };
  * 
  *   Layout  ---  复制删改                                     ---  defaultSelectedKeys默认选中的key
  *   Icon    ---  <Icon type="star" />
  *   Button  ---  <Button type="primary">Primary</Button>
  *   Message ---  复制                                         ---  全局提示
  *   Select  ---  复制                                         ---  选择器(下拉框等)
  *   级联选择 ---  /                                           ---   一层一层的选    ---  onchang删了，使用loadData就可以了
  *   Modal   ---  复制删改                                     ---  对话框(确认取消)(弹窗填数据)
  *                                                                       <Modal title="添加分类”
  *                                                                           visible={isshowAddcategory}
  *                                                                           onok={this.addcategory}
  *                                                                           oncancel={this.toggleDisplay}
  *                                                                           okText="确认"
  *                                                                           cancelText="取消”
  *                                                                           width={300}                   // 加width属性修改大小
  *                                                                       />
  *   
  * 
  *   Pagination --- 复制删改                                   ---  API:   showSizeChanger     是否可以改变 pageSize     true/ false
  *                                                                        pageSizeOptions     每页多少条                [10, 20, 30, 40]
  *                                                                        defaultPageSize     默认的每页条数             10
  *                                                                        showQuickJumper     快速跳转至某页             true/false
  *                                                                        total               设置数据总量               number                    ***用在后台分页***
  *                                                                        onChange            页码改变的回调             function(page, pageSize)  ***用在后台分页***                
  *                                                                        onShowSizeChange    一页显示数量改变的回调      function(page, pageSize)  ***用在后台分页***                
  *   Table   ---  复制删改                                     ---  (选带边框的) **最后的api里面有pagination这个属性，分页**
  * 
  * render(){
  *   // 表头内容
  *   const columns = [
  *             {
  *               title: 'Name',
  *               dataIndex: **'dataName'**,  // 名字要对应上才会显示，尤其data数动态的,像显示就必须dataName对上
  *               className: 'col',           // (可不加, 改样式的)
  *               // ***改变列显示***
  *                 ***text是当前行的对象[使用的时候需要把dataIndex注释掉,不然获取的是dataName的值]***
  *               render: text => { return <a href="javascript:;">{text}</a> },
  *             },
  *             {...}，{...}
  *         ]
  * 
  *   // 数据
  *   const data = [
  *             {
  *               key: '1',
  *               **dataName**: 'John Brown',
  *               money: '￥300,000.00',
  *               address: 'New York No. 1 Lake Park',
  *             },{..}{..}
  *         ]
  * 
  *   return <Table
  *            columns={columns}
  *            dataSource={data}
  *            bordered
  * 
  *            pagination={{}}    ---    分页
  *            rowkey="_id"       ---    报错时加key
  *            loading="true"     ---    加载时转圈
  *          />
  * 
  * }
  * 
  * 
  * // **webpack会在index.html加入打包好的js文件和css文件**
  * 
  * // React有一个fiber算法，将多次请求合并成一次来优化
  * // 移除DOM节点下的组件：ReactDOM.unmountComponentAtNode(document.getElementById('example'))
  * // 包 间接 引用会有波浪线, package.json的依赖手动加入就可以有提示且没有波浪线
  * // 在constructor里使用用props，构造方法里传形参props,   constructor( props ){ super(props); ....... }
  * // React 没有Vue的 keep-alive
  * 
  * 
  *   项目打包：
  *         1）	npm run build或yarn build打包
  *         2）	通过命令serve -s build -p 3003 开启一个端口号为3003的服务器，打开build里的项目，默认打开index.html
  *         要在服务器运行的原因是:  webpack导入的script和css文件的路径都是网络路径/xxx/yyy，所以要用serve
  *         3）	解决跨域问题：1.放在服务器的public暴露文件夹下，直接url访问
  *                          2. 请求前都写绝对地址，通过定义const prefix = process.env.NODE_ENV === ‘development’ ？ ‘’ ： ‘http://localhost:5000’
  *         4）	process.env.NODE_ENV:运行yarn start 是development ，运行yarn build是production
  *         5）打包后可删除
  *               static/asset-mainifest.json       --PWA相关
  *                     /precache-mainfestxxxx.js
  *                     /service-worker.js
  *               css/xxxxxxxxx.css.map             --调试问题的
  * 
  */