// 高阶组件--本质是一个函数, 参数接收组件, 返回一个新组件, 有传两个参的有传一个参的--常见的有:
//Form.create()(ComponentName)                    // 表单验证三部曲: 1、创建路由组件四大属性form
// {getFieldDecorator( 'password', {rules:[]} )( <input type="password" onChange={this.handleChange('password')}/> )}

/**
 * 脚手架:
 *      ● npm install -g create-react-app : 全局下载工具
 *      ● create-react-app react-admin :下载模板项目
 * 
 *      ● 写好index.js和App.jsx、引入reset.css (assets/less)
 *      
 *      ● 下包
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
 * 
 * // webStorm简写: imp
 * 
 * import React,{Component} from 'react';
 * import PropTypes from 'prop-types';
 * import { BrowserRouter, Link, NavLink, Route, Redirect, Switch, withRouter } from 'react-router-dom';  //  Link		      ---	改变url，不刷新页面（单页面）（a标签多页面）                        -- <Link to="/xxx">xxx</Link>
 *	                                                                                                          NavLink	      ---	改变url ***能改变class自定义样式：activeClassName="my-active"***   -- <NavLink to="/xxx" className="navItem" activeClassName="on" >
 *	                                                                                                          Route	        --- 注册路由，根据路径改变component                                    -- <Route path="/xxx" component={yyy}/>
 *	                                                                                                          Redirect      --- 重定向（用于设置默认组件）                                          -- <Redirect to='/xxx'/>
 *	                                                                                                          Switch        --- 用来包住Route、 Redirect，值运行其中一个
 *                                                                                                            withRouter    --- 高阶组件，给非路由组件传递路由组件的三大属性                           -- export default withRouter(componentName)
 *                                                                                                            BrowserRouter --- index.js里 包裹<App />
 * import logo from './logo.png'      // 图片要引入才会打包                                                     this.props.history.replace/push() 也能更改url路径(多用在回调函数中)
 * import './index.less'              // 引入自己的less
 * 
 * 
 * class ComponentName extends Component{
 * 
 *    static propTypes = {                                          // ***接收属性***       --this.props.xxx读取属性 (不可修改)(string、func、object)
 *       xxx: PropTypes.bool.isRequired,
 *     };
 * 
 * 
 *    state={};                                                     // ***状态数据***       --this.state.xxx读取状态  --this.setState(xxx:yyy)修改状态
 *    
 * 
 *    handleChange = (option) => {                                  // ***事件***          --注意写法是等于一个函调函数，接受参数且要用event, 就用这种return的方法  
 *        return (e) => {
 *            this.setState({                                       // ***修改数据***
 *              [option]: e.target.value
 *            })
 *        }
 *    }
 * 
 *    
 *    constructor(){}             componentWillReceiveProps(){}     // ***生命周期*** ( componentDidMount-发请求、componentWillUnmount-删定时器、ajax请求)
 *    componentWillMount(){}      shouldComponentUpdate(){}
 *    componentDidMount(){}       componentWillUpdate(){}
 *                                componentDidUpdate(){}
 *    componentWillUnmount(){}
 * 
 * ***\\\\\\\\\\\\\\\\\\\\\表单验证套路代码\\\\\\\\\\\\\\\\\\\\\\\\\\\\***
 * 
 *   handleSubmit = (e) => {
 *      e.preventDefault();
 * 
 *      this.props.form.validateFields(async (errors, value) => { 
 *        if(!errors) {
 *          const { username, password } = value;                 // 拿数据
 *          const result = await reqLogin(username, password);    // 发请求
*   
 *          if(result) {
 *            this.props.history.replace('/')
 *          }else {
 *            this.props.form.resetFields(['password']);        // 清空内容~
 *          }
 *        }else {
 *          console.log('表单校验失败' + errors)
 *        }
 *      })
 *    };
 * 
 *    
 *    validator = (rule, value, callback) => {
 *        // 增强复用性
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
 *        return <div>
 *  
 *            // ***基础语法***
 *            <div clssName="box1 on"></div>
 *            <div clssName={this.state.xxx?'on':''} style={{fontSize: '16px'}}> {this.state.hellow} </div> // 样式-小驼峰
 * 
 *            ***路由的使用***
 *            // 一级路由   -------------------------------------------------------------   二级路由：
 *            <Link to="/login"></Link>
 * 
 *            <Switch>
 *                <Route path="/login" component={Login} />   --------------------------    在Login组件里面写 <Link to="/login/phone"/>
 *                <Redirect to="/home/messages"/>                                                            <Route path="/login/phone" component={Phone} />
 *            </Switch>
 * 
 *            ***事件的使用***
 *            // 事件的使用
 *            <form onSubmit = { this.handleSubmit }>
 *                <input type="text" onChange={this.handleChange('userName')}/>>
 *                **⒊**
 *                {
 *                    getFieldDecorator( 
 *                        'password', {
 *                            initialValue: '0' ***1 // 设置组件默认值, 组件放到第二个参数后, 组件的默认选中属性会失效(删掉) 如:antd的 Slect组件 defaultvalue="0"***
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
 *        </div> 
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
 *                | components文件夹
 *                | pages文件夹
 *                        | home文件夹
 *                                | images文件夹
 *                                | index.jsx       *** // 引入路径写到文件夹(会自动引入index.jsx)**
 *                                | home.css
 *                | App.jsx
 *                | index.js
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
  *   Form    ---  复制删改                                     ---  往下拉有this.props.form的方法(具体看上面的三部曲)
  *   Layout  ---  复制删改                                     ---  defaultSelectedKeys默认选中的key
  *   Icon    ---  <Icon type="star" />
  *   Button  ---  <Button type="primary">Primary</Button>
  *   Message ---  复制                                         ---  全局提示
  *   Select  ---  复制                                         ---  选择器(下拉框等)
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
  * 
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
  *                 ***text是当前行的对象[使用的时候需要把dataIndex注释掉]***
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
  * 
  * }
  * 
  * 
  */