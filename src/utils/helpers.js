import clamp from 'lodash/clamp'

export function getElementOffsetX(element) {
  const { left } = element.getBoundingClientRect() // länge zum linken bildschirmrand
  const { scrollLeft } = document.documentElement // Links-scrollWerte ermitteln

  // eslint-disable-next-line no-console
  console.log('left   : ', left)
  // eslint-disable-next-line no-console
  console.log('scrollLeft   : ', scrollLeft)
  // this function will return the element ::: relative to our document
  return left + scrollLeft // werte zusammenführen
}

export function getRelativeXPosition(e, targetElement) {
  const elementOffsetX = getElementOffsetX(targetElement)

  const elementWidth = targetElement.offsetWidth
  const value = e.pageX - elementOffsetX

  // clamp begrentzt den gültigen bereich- ensure that value is not smaller or bigger than the width of the chosen element
  return clamp(value, 0, elementWidth)
}
