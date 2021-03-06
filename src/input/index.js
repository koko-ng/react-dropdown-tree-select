import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames/bind'
import debounce from 'lodash.debounce'
import Tag from '../tag'
import styles from './index.css'
import { getDataset } from '../utils'

const cx = cn.bind(styles)

const getTags = (tags = [], onDelete) =>
  tags.map(tag => {
    const { _id, label, tagClassName, dataset } = tag
    return (
      <li className={cx('tag-item', tagClassName)} key={`tag-item-${_id}`} {...getDataset(dataset)}>
        <Tag label={label} id={_id} onDelete={onDelete} />
      </li>
    )
  })

class Input extends PureComponent {
  static propTypes = {
    tags: PropTypes.array,
    placeholderText: PropTypes.string,
    onInputChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onTagRemove: PropTypes.func,
    inputRef: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.delayedCallback = debounce(
      e => {
        this.props.onInputChange(e.target.value)
      },
      50,
      { leading: true }
    )
  }

  handleInputChange = e => {
    e.persist()
    this.delayedCallback(e)
  }

  render() {
    const { tags, onTagRemove, inputRef, placeholderText = 'Choose...', onFocus, onBlur } = this.props

    return (
      <ul className={cx('tag-list')}>
        {getTags(tags, onTagRemove)}
        <li className={cx('tag-item')}>
          <input
            type="text"
            ref={inputRef}
            className={cx('search')}
            placeholder={placeholderText}
            onChange={this.handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </li>
      </ul>
    )
  }
}

export default Input
