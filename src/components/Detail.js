require('styles/Detail.css')

import API from '../interface/webpage'
import React, {Component} from 'react'
import { Rate, Button} from 'antd';
import {createHashHistory} from 'history'
import Tag from './Tag'


class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      html: '',
      score: 0,
      tags: []
    }
  }

  componentDidMount() {
    // 上面的步骤2，在此初始化数据
    this.getDetail()
  }

  getDetail = () => {
    API.getWebPageDetail(this.state.id).then((data) => {
      this.setState({
        html: data.htmlContent,
        score: data.score/2,
        title: data.title,
        tags: data.tags
      })
    })
  }

  onBack = () => {
    createHashHistory().push('/list')
  }

  changeScore = (score) => {
    console.log(score)


    API.saveScore({
      id: this.state.id,
      score: score * 2
    }).then(() => {
      this.setState({
        score: score
      })
    })
  }

  updateTags = () => {
    API.getWebPageDetail(this.state.id).then((data) => {
      this.setState({
        tags: data.tags
      })
    })
  }

  afterAddTag = (name) => {
    API.addTag({id: this.state.id, name: name}).then(() => {
      this.updateTags()
    })
  }

  afterDeleteTag = (tagId) => {
    API.deleteTag({id: this.state.id, tagId: tagId}).then(() => {
      this.updateTags()
    })
  }

  render() {
    return (
      <div className="detail">
        <div className="title">
          <Button onClick={this.onBack}>返回</Button>
          <h3>{this.state.title}</h3>
          <div className="rate-tag">
            <Rate allowHalf defaultValue={0} value={this.state.score} onChange={this.changeScore}/>
            <Tag tags={this.state.tags} afterAdd={this.afterAddTag} afterDelete={this.afterDeleteTag}></Tag>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{__html: this.state.html}} className="content"></div>
      </div>
      )
  }
}

export default Detail
