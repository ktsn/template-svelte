import Component from '../src/Component.html'

describe('Component', () => {
  it('should render', () => {
    const el = document.createElement('div')
    new Component({ target: el })
    expect(el.textContent).toBe('Hello World!')
  })
})
