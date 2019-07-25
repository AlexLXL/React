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
 * import { BrowserRouter, Link, NavLink, Route, Redirect, Switch, withRouter } from 'react-router-dom';  //  Link		    ---	改变url，不刷新页面（单页面）（a标签多页面）
 *	                                                                                                          NavLink	    ---	改变url（能改变class自定义样式：activeClassName="my-active"）
 *	                                                                                                          Route	      --- 注册路由，根据路径改变component
 *	                                                                                                          Redirect    --- 重定向（用于设置默认组件）
 *	                                                                                                          Switch      --- 用来包住Route、 Redirect，值运行其中一个
 *                                                                                                            withRouter  --- 高阶组件，给非路由组件传递路由组件的三个属性
 * 
 * 
 * import logo from './logo.png'      // 图片要引入才会打包
 * import './index.less'              // 引入自己的less
 * 
 * 
 * class ComponentName extends Component{
 * 
 *    static propTypes = {                                          // 接收属性       --this.props.xxx读取属性 (不可修改)(string、func、object)
 *       xxx: PropTypes.bool.isRequired,
 *     };
 * 
 * 
 *    state={};                                                     // 状态数据       --this.state.xxx读取状态  --this.setState(xxx:yyy)修改状态
 *    
 * 
 *    handleChange = (option) => {                                  // 事件          --接受参数且要用event, 就用这种return的方法  
 *        return (e) => {
 *            this.setState({ [option]: e.target.value})
 *        }
 *    }
 * 
 * 
 *    constructor(){}             componentWillReceiveProps(){}     // 生命周期 ( componentDidMount-发请求、componentWillUnmount-删定时器、ajax请求)
 *    componentWillMount(){}      shouldComponentUpdate(){}
 *    componentDidMount(){}       componentWillUpdate(){}
 *                                componentDidUpdate(){}
 *    componentWillUnmount(){}
 * 
 * 
 * **======================表单验证套路代码=============================**
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
 * **=================================================================**
 * 
 *    render() { 
 *        **⒉** 
 *        const { getFieldDecorator } = this.props.form;
 * 
 *        return <div>
 *            // 路由的使用
 *            <Switch>
 *                <Route path="/login" component={Login} />
 *                <Redirect to="/home/messages"/>
 *            </Switch>
 * 
 * 
 *            // 事件的使用
 *            <form onSubmit = { this.handleSubmit }>
 *                <input type="text" onChange={this.handleChange('userName')}/>>
 *                **⒊**
 *                {
 *                    getFieldDecorator( 'password', {rules:[]} )( <input type="password" onChange={this.handleChange('password')}/> )
 *                }
 *            </form>
 * 
 * 
 *            // 图片必须引入才会打包
 *            <img src={logo} />
 *            
 *        </div> 
 *    }
 * }
 * 
 * **⒈** 
 * export default Form.create()(ComponentName)                // **表单验证三部曲**: 1、创建路由组件四大属性form
 *                                                                                  2、render(){}内拿出第四大属性里的getFieldDecorator    --const { getFieldDecorator } = this.props.form;
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
 *                                                                                                    | getFieldDecorator也是高阶就不说了, 第二个参数传 input标签
 *
 *                                                           // **表单提交轻音乐**: 
 *                                                                                  提交事件里, this.props.form.validateFields((errors, value) => { 判断error、拿value、发请求、根据返回值更新数据状态 }
 *                                                                                                    | 用过getFieldDecorator的input的error和value都能拿到
 *                                                                                                    | 什么发请求的小儿科都在这里
 *                  
 * 
 */