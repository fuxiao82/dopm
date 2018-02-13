import React, {Component} from 'react'
import { Tag, Input, Tooltip, Icon } from 'antd';

class EditableTagGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputVisible: false,
      inputValue: ''
    };
  }

  handleClose = (removedTag) => {
    const tags = this.props.tags.filter(tag => tag.id !== removedTag.id);
    console.log(tags);
    // 增加tag变动回调调用
    if(this.props.afterDelete && typeof this.props.afterDelete === 'function') {
      this.props.afterDelete(removedTag.id)
    }
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = this.props.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, {name: inputValue, type: '', id: ''}];
    }
    // 增加tag变动回调调用
    if(this.props.afterAdd && typeof this.props.afterAdd === 'function') {
      this.props.afterAdd(inputValue)
    }
    console.log(tags);
    this.setState({
      inputVisible: false,
      inputValue: ''
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const { inputVisible, inputValue } = this.state;
    return (
      <div>
        {this.props.tags.map((tag, index) => {
          const isLongTag = tag.name.length > 20;
          const tagElem = (
            <Tag key={tag.id} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag.name} key={tag.id}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}

export default EditableTagGroup
