/* /blocks/teaser/teaser.js */

/**
 * Adds a zoom effect to image using event listeners.
 *
 * When the CTA button is hovered over, the image zooms in.
 *
 * @param {HTMLElement} block represents the block's DOM tree
 */
function addEventListeners(block) {
  const button = block.querySelector('.button');
  const image = block.querySelector('.image');

  if (!button || !image) return;

  button.addEventListener('mouseover', () => {
    image.classList.add('zoom');
  });

  button.addEventListener('mouseout', () => {
    image.classList.remove('zoom');
  });
}

/**
 * Entry point to block's JavaScript.
 * Must be exported as default and accept a block's DOM element.
 *
 * @param {HTMLElement} block represents the block's DOM element/tree
 */
export default function decorate(block) {
  // Tell UE which model to use for this block
  block.setAttribute('data-aue-model', 'teaser');

  // --- IMAGE + ALT ---------------------------------------------------------
  const picture = block.querySelector('picture');
  if (picture) {
    // Bind the image reference field
    picture.setAttribute('data-aue-prop', 'image');
    picture.classList.add('image-wrapper');

    const img = picture.querySelector('img');
    if (img) {
      img.classList.add('image');
      // Bind the alt text field
      img.setAttribute('data-aue-prop', 'imageAlt');
    }
  }

  // --- CONTENT AREA --------------------------------------------------------
  const content = block.querySelector(':scope > div:last-child');
  if (content) {
    content.classList.add('content');

    // TEXT: title + body
    const textContainer = content.querySelector('h1,h2,h3,h4,h5,h6, p');
    if (textContainer) {
      textContainer.setAttribute('data-aue-prop', 'textContent_text');

      // Mark the first heading as title for styling
      const heading = content.querySelector('h1,h2,h3,h4,h5,h6');
      if (heading) {
        heading.classList.add('title');
      }
    }

    // CTA LINK + LABEL
    const link = content.querySelector('a');
    if (link) {
      // Bind the CTA link URL
      link.setAttribute('data-aue-prop', 'textContent_cta');

      // Bind the CTA label text
      const label = link.querySelector('span') || link;
      label.setAttribute('data-aue-prop', 'textContent_ctaText');

      // Optional styling hooks
      link.classList.add('button');
      if (link.parentElement) {
        link.parentElement.classList.add('button-container');
      }
    }

    // TERMS & CONDITIONS styling (from your original script)
    content.querySelectorAll('p').forEach((p) => {
      const innerHTML = p.innerHTML?.trim();
      if (innerHTML?.startsWith('Terms and conditions:')) {
        p.classList.add('terms-and-conditions');
      }
    });
  }

  // Add hover zoom behavior
  addEventListeners(block);
}
