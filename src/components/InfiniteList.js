require('styles/InfiniteList.css')

import React, {Component} from 'react'
import { List, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import ListItem from './ListItem'

class InfiniteListExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      page: 1
    }
  }

  getRemoteData = (callback) => {
    if(this.props.getData && typeof this.props.getData === 'function'){
      this.props.getData({page: this.state.page, callback})
    }
  }

  componentWillMount() {
    this.getRemoteData(() => {
      this.setState({
        page: this.state.page + 1
      })
    })
  }

  handleInfiniteOnLoad = () => {
    console.log('handleInfiniteOnLoad')
    this.setState({
      loading: true
    });

    if(!this.props.hasMore) {
      this.setState({
        loading: false
      });
      return;
    }

    this.getRemoteData(() => {
      this.setState({
        loading: false,
        page: this.state.page + 1
      });
    });
  }

  render() {
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.props.hasMore}
          useWindow={false}
        >
          <List
            size="large"
            bordered={true}
            dataSource={this.props.data}
            renderItem={item => (
              <List.Item key={item.id}>
                <ListItem item={item}></ListItem>
              </List.Item>
            )}
          >
            {this.state.loading && this.props.hasMore && <Spin className="demo-loading" />}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}
export default InfiniteListExample
