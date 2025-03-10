const createArrow = () => {
  const ns = 'http://www.w3.org/2000/svg'
  const arrow = document.createElementNS(ns, 'svg')
  const path = document.createElementNS(ns, 'path')

  // Set attributes for svg
  arrow.setAttribute('width', '46')
  arrow.setAttribute('height', '73')
  arrow.setAttribute('viewBox', '0 0 46 73')

  // Set attributes for path
  path.setAttribute('d', 'M20.8133 71.2765C21.9848 72.4481 23.8843 72.4481 25.0559 71.2765L44.1478 52.1846C45.3193 51.013 45.3193 49.1135 44.1478 47.942C42.9762 46.7704 41.0767 46.7704 39.9051 47.942L22.9346 64.9125L5.96401 47.942C4.79244 46.7704 2.89294 46.7704 1.72137 47.942C0.549797 49.1135 0.549797 51.013 1.72137 52.1846L20.8133 71.2765ZM19.9346 0.25V3.12105H25.9346V0.25L19.9346 0.25ZM19.9346 8.86315V14.6052H25.9346V8.86315H19.9346ZM19.9346 20.3473V26.0894H25.9346V20.3473H19.9346ZM19.9346 31.8315V37.5736H25.9346V31.8315H19.9346ZM19.9346 43.3157V49.0578H25.9346V43.3157H19.9346ZM19.9346 54.7999V60.542H25.9346V54.7999H19.9346ZM19.9346 66.2841V69.1552H25.9346V66.2841H19.9346Z')
  path.setAttribute('fill', '#11D9ED')

  arrow.classList.add('arrow')
  arrow.appendChild(path)

  return arrow
}

const createArrows = qty => {
  const arrows = []

  for (let i = 0; i < qty; i++) {
    arrows.push(createArrow())
  }

  return arrows
}

const handleSteps = () => {
  const steps = document.querySelectorAll('.steps')

  steps.forEach(step => {
    const stepQty = step.children.length
    const arrowsQty = stepQty - 1

    const arrows = createArrows(arrowsQty)

    Array.from(step.children).forEach((child, index) => {
      const arrow = arrows[index]

      if (!arrow) return

      child.insertAdjacentElement('afterend', arrow)
    })
  })
}

const createDescriptionAnchor = () => {
  const anchor = document.createElement('a')
  anchor.classList.add('display-description-btn')
  anchor.setAttribute('href', '#')
  anchor.addEventListener('click', event => event.preventDefault())

  anchor.textContent = 'Más información sobre la protección de datos.'

  return anchor
}

const handleFormConsent = () => {
  const formDescriptions = document.querySelectorAll('.gfield_consent_description, .comment-form-policy-top-copy')

  formDescriptions.forEach(description => {
    const form = description.closest('form')

    const checkbox = form.querySelector('.gfield--type-consent input[type="checkbox"]')
    const displayDescriptionAnchor = createDescriptionAnchor()

    if (!checkbox) return

    // Show/hide description
    displayDescriptionAnchor.addEventListener('click', () => {
      const isOpen = description.classList.contains('is-open')

      if (!isOpen) {
        description.style.maxHeight = `${description.scrollHeight}px`
        description.classList.add('is-open')

        return
      }

      description.style.maxHeight = '0px'
      description.classList.remove('is-open')
    })

    // Insert anchor after checkbox
    checkbox.parentElement?.insertAdjacentElement('afterend', displayDescriptionAnchor)
  })
}

const handleNavigation = () => {
  const navigation = document.querySelector('header .wp-block-navigation')
  const logo = navigation.querySelector('.wp-block-site-logo')
  const anchor = logo.querySelector('a')

  if (navigation && anchor && logo) {
    const newLogo = anchor.cloneNode(Infinity)
    const newLogoImg = newLogo.querySelector('img')
    newLogoImg.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='156' height='150' fill='none'%3E%3Cpath fill='%23fff' d='M17.3 34.9c9.444 0 17.1-7.656 17.1-17.1C34.4 8.356 26.744.7 17.3.7 7.856.7.2 8.356.2 17.8c0 9.444 7.656 17.1 17.1 17.1ZM138.7 34.9c9.444 0 17.1-7.656 17.1-17.1 0-9.444-7.656-17.1-17.1-17.1-9.444 0-17.1 7.656-17.1 17.1 0 9.444 7.656 17.1 17.1 17.1ZM40.2 91.5l-5.9-5.9.1-35.2 23.4 23.5-17.6 17.6ZM116.4 91.5l5.7-5.8.1-35.3-23.5 23.5 17.7 17.6ZM78.142 94.256l-17.607 17.606 17.607 17.607 17.607-17.607-17.607-17.606ZM97.363 75.468 79.757 93.075l17.606 17.607 17.607-17.607-17.607-17.607ZM58.954 75.42 41.347 93.027l17.607 17.607 17.607-17.607L58.954 75.42ZM153.6 50.4h-29.8v98.9h29.8V50.4ZM32.6 50.4H2.8v98.9h29.8V50.4Z'/%3E%3C/svg%3E"

    navigation.prepend(newLogo)
    logo.parentElement?.classList?.add('site-logo-container')
  } else {
    console.error('Elements not found', { logo, anchor, navigation })
  }
}

const fixSocialLinkBlocks = () => {
  const socialLinkBlocks = Array.from(document.querySelectorAll('.wp-block-social-links'))

  for (const block of socialLinkBlocks) {
    const links = Array.from(block.querySelectorAll('.wp-block-social-link-anchor'))

    for (const link of links) {
      const title = link.textContent

      if (!title) continue
      link.setAttribute('title', title)
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  handleSteps()
  handleFormConsent()
  handleNavigation()
  fixSocialLinkBlocks()
})
