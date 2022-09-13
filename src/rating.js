/// <reference types="@zyllio/zy-sdk" />

(function () {

  console.log('Plugin Rating started')

  const HtmlContent = `

  <style>
    :host {
      overflow: hidden;
      font-size: 30px;
      width: 100%;
      height: 70px;
      padding: 10px;
      box-sizing: border-box;
    }
  </style>

  <div></div>                       
`;

  class RatingComponent extends HTMLElement {

    constructor() {
      super()

      this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {

      this.shadow.innerHTML = HtmlContent;

      setTimeout(() => { this.init() })

      this.refresh()
    }

    init() {

      const propertyValue = zySdk.services.component.getPropertyValue(this, 'value')

      zySdk.services.dictionary.onChange(propertyValue, () => {
        this.refresh()
      })
    }

    static get observedAttributes() {
      return ['data-value'];
    }

    attributeChangedCallback() {
      this.refresh()
    }

    refresh() {

      setTimeout( async () => {

        const element = this.shadowRoot.querySelector('div')

        const propertyValue = zySdk.services.component.getPropertyValue(this, 'value')

        const value = await zySdk.services.dictionary.getValue(propertyValue)

        element.innerText = '⭐'.repeat(parseInt(value))
      })
    }
  }

  const Icon = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24" fill="#cccccc">    
    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
  </svg>
`;

  const RatingMetadata = {
    id: 'custom-rating',
    icon: Icon,
    label: 'Rating',
    category: 'Plugins',
    subCategory: 'Ratings',
    hidden: false,
    keepRatio: false,
    properties: [{
      id: 'value',
      name: 'Value',
      type: 'number',
      tootip: 'The rating between 1 and 5',
      default: '3',
      main: true
    }],
    styles: []
  }

  zySdk.services.registry.registerComponent(RatingMetadata, RatingComponent)

})();