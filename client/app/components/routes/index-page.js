import React from 'react'
import { SelectElement } from 'react-select-element'

export default () => (
  <section>
    <h1>Select Element (Index Page)</h1>
    <SelectElement
      selectedIndex={4}
      options={[
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
        { value: 4, text: 5 }]}
    />
  </section>
)
