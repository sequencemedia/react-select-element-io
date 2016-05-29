import React from 'react'
import { SelectElement } from 'react-select-element'

export default () => (
  <section>
    <h1>Select Element (Index Page)</h1>
    <SelectElement options={[
      { value: 0, text: 0 },
      { value: 1, text: 1 },
      { value: 2, text: 2 },
      { value: undefined, text: undefined }]}
    />
  </section>
)
