import Component from '../'

describe('Component', () => {
  it('should have object', () => {
    expect(() => {
      new Component({})
    }).not.toThrow()
  })
})
