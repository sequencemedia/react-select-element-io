import React from 'react'

export class SelectElement extends React.Component {
  state = {
    tabIndex: this.props.tabIndex,
    options: this.props.options,
    selectedIndex: this.props.selectedIndex
  }

  handleFocus = () => {
    this.setState({ hoverIndex: this.state.selectedIndex })
  }

  handleBlur = () => {
    this.setState({ hasOptionsActive: false })
  }

  handleClick = () => this.setState({ hasOptionsActive: true })

  handleOptionsKeyCode = (keyCode, charCode) => {
    switch (keyCode) {
      case 13:
      case 32:
        return this.selectHoverIndex()
      case 38: // arrow up
        return this.decrementHoverIndex()
      case 40: // arrow down
        return this.incrementHoverIndex()
    }
  }

  handleKeyChar = (keyChar) => {
    const char = String.fromCharCode(keyChar)
    const options = this.state.options
    let i = 0
    const j = options.length
    for (i, j; i < j; i = i + 1) {
      let option = options[i]
      let optionText = this.createOptionText(option.text)
      if (optionText.charAt(0) === char) {
        this.setState({ hoverIndex: i })
        break
      }
    }
  }

  handleKeyCode = (keyCode) => {
    if (keyCode === 40) {
      return this.setState({ hasOptionsActive: true })
    }
  }

  selectHoverIndex = (index) => {
    this.setState({ selectedIndex: this.state.hoverIndex })
    this.setState({ hasOptionsActive: false })
  }

  decrementHoverIndex () {
    const hoverIndex = Math.max(this.state.hoverIndex - 1, 0)
    this.setState({ hoverIndex: hoverIndex })
  }

  incrementHoverIndex () {
    const hoverIndex = Math.min(this.state.hoverIndex + 1, this.state.options.length - 1)
    this.setState({ hoverIndex: hoverIndex })
  }

  selectIndex = (index) => this.setState({ selectedIndex: index })

  createOptionText (text) {
    return (text !== undefined) ? text.toString() : '\uFEFF'
  }

  createSelectedValue = () => {
    const {
      options,
      selectedIndex,
      tabIndex
    } = this.state

    const selectedOptionText = (options[selectedIndex] || {}).text

    return (
      <div
        tabIndex={tabIndex}
        className='selectedOption'
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onKeyPress={(event) => this.handleKeyChar(event.charCode)}
        onKeyUp={(this.state.hasOptionsActive)
          ? (event) => this.handleOptionsKeyCode(event.keyCode)
          : (event) => this.handleKeyCode(event.keyCode)}>
        {this.createOptionText(selectedOptionText)}
      </div>
    )
  }

  createOptionClassName (index) {
    return (index === this.state.hoverIndex)
      ? 'option hoverIndex'
      : 'option'
  }

  createOption = (option, index) => {
    return (
      <li className={this.createOptionClassName(index)} onMouseDown={() => this.selectIndex(index)}>
        {this.createOptionText(option.text)}
      </li>
    )
  }

  createOptions () {
    const {
      options
    } = this.state

    if (options.length) {
      return (
        <ul className='options'>
          {options.map(this.createOption)}
        </ul>
      )
    }
  }

  render () {
    return (
      <div className='selectElement'>
        {this.createSelectedValue()}
        {(() => {
          if (this.state.hasOptionsActive) {
            return this.createOptions()
          }
        })()}
      </div>
    )
  }
}

SelectElement.defaultProps = {
  selectedIndex: 0,
  tabIndex: 0,
  options: [
    { value: 0, text: 0 },
    { value: 1, text: 1 },
    { value: 2, text: 2 },
    { value: undefined, text: undefined }
  ]
}
