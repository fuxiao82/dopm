require('styles/List.css')

import React, {Component} from 'react'
// import ListItem from './ListItem'
// import {createHashHistory} from 'history'
import API from '../interface/webpage'
import {Layout, Input, Icon, Spin, message } from 'antd';
import InfiniteList from './InfiniteList'


const {Header, Content} = Layout;
const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;


// function ListItems(props) {
//   // console.log(props.items)
//   let items = props.items.map(item => {
//     return <ListItem item={item} key={item.id} history={createHashHistory()}></ListItem>
//   })
//   // console.log(items.length)
//   return (
//     <ul>
//       {items}
//     </ul>
//   )
// }

export class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultValue: '',
      webPageList: [],
      loading: false,
      totalItemsCount: 0,
      totalGetCount: 0,
      hasMore: true,
      lastPage: 1
    }
  }

  onPressEnter = () => {
    this.startLoading()
    API.addWebPage(this.state.value).then((res) => {
      console.log(res)
      this.updateList({page: this.state.lastPage, addItem: res})
      //清空输入框
      this.clearInput()
    })
  }

  clearInput = () => {
    this.setState({
      value: ''
    })
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  startLoading = () => {
    this.setState({
      loading: true
    })
  }

  stopLoading = () => {
    this.setState({
      loading: false
    })
  }

  updateList = ({page = 1, callback, addItem}) => {
    // console.log(page)
    API.getWebPageList({page: page}).then(list => {
      // console.log('test')
      // console.log(this.state.webPageList)
      // console.log(list.items)
      // console.log(addItem)
      console.log(list.hasNextPage)
      this.setState({
        totalCount: list.totalItemsCount,
        totalGetCount: this.state.totalGetCount + list.items.length,
        hasMore: list.hasNextPage,
        webPageList: !addItem ? this.state.webPageList.concat(list.items) : this.state.webPageList.concat(addItem),
        lastPage: list.pageCount
      })
      if(!this.state.hasMore) {
        message.warning('Infinite List loaded all');
      }
      this.stopLoading()
      if(typeof callback === 'function'){
        callback(list.items);
      }

    })
  }

  // onChangePage = (page) => {
  //   this.startLoading()
  //   this.updateList({page: page})
  // }

  render() {
    return (
      <Layout>
        <Spin indicator={antIcon} spinning={this.state.loading}>
          <Header style={{background: '#fff', padding: 0, flex: '0 0 64px'}}>
            <Input onPressEnter={this.onPressEnter} onChange={this.onChange} value={this.state.value}/>
          </Header>

          <Content className="content-wrapper">
            <InfiniteList data={this.state.webPageList}
                          total={this.state.totalCount}
                          getData={this.updateList}
                          hasMore={this.state.hasMore}
            ></InfiniteList>
            {/*<ListItems items={this.state.webPageList}></ListItems>*/}
            <p className="infinite-footer">Total: {this.state.totalGetCount}/{this.state.totalCount} items.</p>
          </Content>

          {/*<Pagination showQuickJumper defaultCurrent={1} total={this.state.totalCount} onChange={this.onChangePage} />*/}
        </Spin>
      </Layout>
    )
  }
}
