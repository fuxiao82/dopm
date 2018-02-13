require('normalize.css/normalize.css')
require('styles/App.css')
require('styles/antd.css')

import React, {Component} from 'react'
import {Layout, Menu, Icon} from 'antd'
import {Router, Route, Switch} from 'react-router'
import {Link} from 'react-router-dom'
import {createHashHistory} from 'history'

import {List} from './List'
import Detail from './Detail'
import Chart from './Chart'

const {Footer, Sider} = Layout


class AppComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout style={{height: '100%'}}>
        <Sider
          breakpoint="1280"
          collapsedWidth="0"
        >
          <Router history={createHashHistory()}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/list">
                  <Icon type="user"/>
                  <span className="nav-text"> list </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/chart">
                  <Icon type="video-camera"/>
                  <span className="nav-text">
                   chart
                  </span>
                </Link>
              </Menu.Item>
            </Menu>
          </Router>

        </Sider>


        <Layout>
          <Layout style={{margin: '24px 16px 0', height: '100%', overflow: 'hidden'}}>
            <Router history={createHashHistory()}>
              <Switch>
                <Route exact path='/' component={List}></Route>
                <Route path="/list" component={List}></Route>
                <Route path="/detail/:id" component={Detail}></Route>
                <Route path="/chart" component={Chart}></Route>

              </Switch>
            </Router>
          </Layout>

          <Footer style={{textAlign: 'center'}}>
            This is Designed ©2017 Created by TanHaiYuan && Fx
          </Footer>
        </Layout>

      </Layout>
    )
  }
}

AppComponent.defaultProps = {}

export default AppComponent
