

import React, {Component} from 'react'
import Tag from './Tag'
import API from '../interface/webpage'
import { List, Avatar, Rate } from 'antd'
import {createHashHistory} from 'history'


class ListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: [],
      score: 0
    }
  }

  componentDidMount = () => {
    this.setState({
      tags: this.props.item.tags
    })
  }

  updateTags = () => {
    API.getWebPageDetail(this.props.item.id).then((data) => {
      this.setState({
        tags: data.tags
      })
    })
  }


  afterAddTag = (name) => {
    API.addTag({id: this.props.item.id, name: name}).then(() => {
      this.updateTags()
    })
  }

  afterDeleteTag = (tagId) => {
    API.deleteTag({id: this.props.item.id, tagId: tagId}).then(() => {
      this.updateTags()
    })
  }

  clickListItem = () => {
    createHashHistory().push('/detail/'+this.props.item.id)
  }

  changeScore = (score) => {
    console.log(score)


    API.saveScore({
      id: this.props.item.id,
      score: score * 2
    }).then(() => {
      this.setState({
        score: score
      })
    })
  }

  render() {
    return (
      <List.Item.Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={<a onClick={this.clickListItem}>{this.props.item.title}</a>}
        description={<div className="tag-rate">
                        <Rate allowHalf defaultValue={0} value={this.state.score} onChange={this.changeScore}/>
                        <Tag tags={this.state.tags} afterAdd={this.afterAddTag} afterDelete={this.afterDeleteTag}></Tag>
                    </div>}
      />
    )
  }
}

export default ListItem
// export default withRouter(ListItem)
