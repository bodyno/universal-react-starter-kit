import React, {Component} from 'react'
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

export default class CheckboxList extends Component {
  constructor() {
    super()
  }

  render() {

    let { bookList } = this.props

    return (
      <div style={{overflow:'hidden'}}>
        <div style={{ float: 'left' }}>
          <Checkbox onChange={this.onCheckAllChange.bind(this)} checked={bookList.ageCheckAll}>
            全部
          </Checkbox>
        </div>
        <div style={{ float: 'left' ,marginLeft: '10px' }}>
          <CheckboxGroup options={bookList.ageOptions} value={bookList.ageCheckValue} onChange={this.onChange.bind(this)} />
        </div>
      </div>
    );
  }

  onChange(checkedList) {

    const data = {
      ageCheckValue : checkedList,
      ageCheckAll: checkedList.length === this.props.bookList.ageOptions.length,
    }

    this.props.checkChange(data)
  }

  onCheckAllChange(e) {

    const data = {
      ageCheckValue: e.target.checked ? this.props.bookList.ageOptions : [],
      ageCheckAll: e.target.checked
    }

    this.props.checkChange(data)
  }
}
