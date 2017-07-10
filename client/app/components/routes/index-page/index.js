import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select-element'

const index = 0
const value = 'A'
const options = [
  { value: 'A', text: 'A' },
  { value: 'AA', text: 'AA' },
  { value: 'AAA', text: 'AAA' },
  { value: 'AAAA', text: 'AAAA' },
  { value: 'AAAAA', text: 'AAAAA' },
  { value: 'B', text: 'B' },
  { value: 'BB', text: 'BB' },
  { value: 'BBB', text: 'BBB' },
  { value: 'BBBB', text: 'BBBB' },
  { value: 'BBBBB', text: 'BBBBB' },
  { value: 'C', text: 'C' },
  { value: 'CC', text: 'CC' },
  { value: 'CCC', text: 'CCC' },
  { value: 'CCCC', text: 'CCCC' },
  { value: 'CCCCC', text: 'CCCCC' },
  { value: 0, text: 1 },
  { value: 1, text: 2 },
  { value: 2, text: 3 },
  { value: 3, text: 4 },
  { value: 4, text: 5 }
]

class SelectWithScrollIntoViewA extends Select {
  componentDidUpdate () {
    const { activeOption } = this
    if (activeOption) this.scrollOptionIntoView(activeOption)
  }
}

class SelectWithScrollIntoViewB extends Select {
  handleKeyArrowUp (event) {
    super.handleKeyArrowUp()

    const sibling = this.getActiveOptionPreviousSibling()

    if (sibling) this.scrollOptionIntoView(sibling)
  }

  handleKeyArrowDown (event) {
    super.handleKeyArrowDown()

    const sibling = this.getActiveOptionNextSibling()

    if (sibling) this.scrollOptionIntoView(sibling)
  }
}

class InfiniteSelect extends Select {
  incrementActiveIndex () {
    const { activeIndex } = this.state
    const incremented = activeIndex + 1

    this.activeIndex(
      (incremented > this.upperBound) ? this.lowerBound : incremented
    )
  }

  decrementActiveIndex () {
    const { activeIndex } = this.state
    const decremented = activeIndex - 1

    this.activeIndex(
      (decremented < this.lowerBound) ? this.upperBound : decremented
    )
  }
}

class InfiniteSelectWithScrollIntoView extends InfiniteSelect {
  handleKeyArrowUp () {
    super.handleKeyArrowUp()

    const sibling = this.getActiveOptionPreviousSibling()

    if (sibling) this.scrollOptionIntoView(sibling)
    else {
      const sibling = this.getOptionsLastChild()

      if (sibling) this.scrollOptionIntoView(sibling)
    }
  }

  handleKeyArrowDown () {
    super.handleKeyArrowDown()

    const sibling = this.getActiveOptionNextSibling()

    if (sibling) this.scrollOptionIntoView(sibling)
    else {
      const sibling = this.getOptionsFirstChild()

      if (sibling) this.scrollOptionIntoView(sibling)
    }
  }
}

class SelectSelect extends Select {
  incrementActiveIndex () {
    super.incrementActiveIndex()

    const { activeIndex } = this.state

    this.selectIndex(
      Math.min(activeIndex + 1, this.upperBound)
    )
  }

  decrementActiveIndex () {
    super.decrementActiveIndex()

    const { activeIndex } = this.state

    this.selectIndex(
      Math.max(activeIndex - 1, this.lowerBound)
    )
  }
}

class HiddenSelect extends Component {
  state = {}

  handleIndexChange = (index) => {
    const { options, onChange } = this.props
    const { value } = options[index]

    this.setState({ value })
    onChange(index)
  }

  render () {
    const { value } = this.state

    return (
      <div className='hidden-select'>
        <Select
          {...this.props}
          onChange={this.handleIndexChange}
        />
        <input name='hidden-select' type='hidden' value={value} />
      </div>
    )
  }
}

HiddenSelect.propTypes = {
  ...Select.propTypes,
  onChange: PropTypes.func
}

HiddenSelect.defaultProps = {
  ...Select.defaultProps,
  onChange: () => {}
}

export default class IndexPage extends Component {
  state = {
    index: this.props.index,
    value: this.props.value
  }

  handleIndexChange = (index) => {
    this.setState({ index })
  }

  render () {
    const {
      options
    } = this.props

    const {
      index
    } = this.state

    return (
      <section>
        <h1>React Select Element</h1>

        <div className='select'>
          <h2>Select Component</h2>
          <Select
            tabIndex={0}
            accessKey='p'
            index={index}
            onChange={this.handleIndexChange}
            options={options}
          />
        </div>

        <div className='select-with-scroll-into-view'>
          <h2>Select Component with Scroll Into View (A)</h2>
          <p><em>Extends Select Component</em>.</p>
          <SelectWithScrollIntoViewA
            tabIndex={0}
            accessKey='p'
            index={index}
            onChange={this.handleIndexChange}
            options={options}
          />
        </div>

        <div className='select-with-scroll-into-view'>
          <h2>Select Component with Scroll Into View (B)</h2>
          <p><em>Extends Select Component</em>.</p>
          <SelectWithScrollIntoViewB
            tabIndex={0}
            accessKey='p'
            index={index}
            onChange={this.handleIndexChange}
            options={options}
          />
        </div>

        <div className='infinite-select'>
          <h2>Infinite Select Component</h2>
          <p><em>Extends Select Component</em>.</p>
          <InfiniteSelect
            tabIndex={0}
            accessKey='p'
            index={index}
            onChange={this.handleIndexChange}
            options={options}
          />
        </div>

        <div className='select-with-scroll-into-view'>
          <h2>Infinite Select Component with Scroll Into View</h2>
          <p><em>Extends Infinite Select Component</em>.</p>
          <InfiniteSelectWithScrollIntoView
            tabIndex={0}
            accessKey='p'
            index={index}
            onChange={this.handleIndexChange}
            options={options}
          />
        </div>

        <div className='select-select'>
          <h2>Select Select Component</h2>
          <p><em>Extends Select Component</em>.</p>
          <SelectSelect
            tabIndex={0}
            accessKey='p'
            index={index}
            onChange={this.handleIndexChange}
            options={options}
          />
        </div>

        <div className='hidden-select'>
          <h2>Hidden Select Component</h2>
          <p><em>Composes Select Component</em>.</p>
          <HiddenSelect
            tabIndex={0}
            accessKey='p'
            index={index}
            onChange={this.handleIndexChange}
            options={options}
          />
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  index: PropTypes.number,
  value: PropTypes.string,
  options: PropTypes.array
}

IndexPage.defaultProps = {
  index,
  value,
  options
}
