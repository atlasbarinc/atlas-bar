window.addEventListener('DOMContentLoaded', (event) => {

  const header = document.querySelector('.header');
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="11" viewBox="0 0 28 11" fill="none">
  <path d="M28 5.5C28 5.5 28 5.45664 28 5.5C28 5.23987 27.908 5.02309 27.7239 4.84966C27.7239 4.84966 27.7239 4.84967 27.6779 4.80631C26.0674 3.28886 24.5029 1.81477 22.8924 0.297316C21.926 -0.613154 20.4536 0.774229 21.4199 1.6847C22.4322 2.63852 23.3985 3.54899 24.4108 4.50282C16.6343 4.50282 8.81183 4.50282 1.03533 4.50282C-0.345111 4.50282 -0.345111 6.49718 1.03533 6.49718C8.81183 6.49718 16.6343 6.49718 24.4108 6.49718C23.3985 7.45101 22.4322 8.36148 21.4199 9.3153C20.4536 10.2258 21.926 11.6132 22.8924 10.7027C24.5029 9.18524 26.0674 7.71114 27.6779 6.19369C27.6779 6.19369 27.6779 6.19369 27.7239 6.15034C27.908 5.97691 28 5.76013 28 5.5C28 5.54336 28 5.5 28 5.5Z" fill="#FFA200"/>
  </svg>`;
  
  const girl = `https://cdn.shopify.com/s/files/1/1813/5651/t/44/assets/girl.png?v=1594848422`;
  
  const heart = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
  <path d="M18.4028 0.613281H3.60765C1.92096 0.618705 0.554252 1.98541 0.548828 3.6721V15.9887C0.554252 17.6754 1.92096 19.0421 3.60765 19.0476H8.18504L10.5063 23.69C10.5985 23.8799 10.7883 23.9992 10.9998 23.9992C11.2113 23.9992 11.4011 23.8799 11.4933 23.69L13.8146 19.0476H18.392C20.0787 19.0421 21.4454 17.6754 21.4508 15.9887V3.6721C21.4562 1.98541 20.0895 0.618705 18.4028 0.613281ZM20.3607 16.0213C20.3607 16.5419 20.1546 17.0409 19.7858 17.4043C19.417 17.7731 18.918 17.9791 18.4028 17.9791H13.4837C13.2722 17.9791 13.0824 18.0985 12.9902 18.2883L11.0107 22.2203L9.0311 18.2557C8.9389 18.0713 8.74365 17.952 8.53756 17.9466H3.60765C3.087 17.9466 2.58804 17.7405 2.22467 17.3717C1.85588 17.0029 1.64979 16.504 1.64979 15.9887V3.6721C1.64979 3.15145 1.85588 2.6525 2.22467 2.28913C2.59347 1.92033 3.09242 1.71424 3.60765 1.71424H18.4028C18.9235 1.71424 19.4224 1.92033 19.7858 2.28913C20.1546 2.65792 20.3607 3.15688 20.3607 3.6721V16.0213Z" fill="#FFA200"/>
  <path d="M13.5047 4.71843C12.6098 4.67504 11.7204 4.94621 11.0045 5.48855C9.37205 4.25743 7.06166 4.51776 5.74376 6.08513C4.49637 7.67963 4.64822 9.95747 6.09628 11.3676L10.5977 15.8582C10.6954 15.9612 10.8364 16.0263 10.9828 16.0209C11.1889 16.0046 11.3841 15.9124 11.5197 15.7551L15.9236 11.3513C17.3716 9.9412 17.5235 7.66336 16.2761 6.07429C15.5819 5.24992 14.5786 4.76181 13.5047 4.71843ZM15.1317 10.5866L11.0045 14.7138L6.87726 10.5866C5.83054 9.57783 5.71122 7.93995 6.60066 6.79018C7.08877 6.20445 7.79925 5.85193 8.55853 5.81938H8.68869C9.40459 5.81938 10.0934 6.1014 10.6032 6.60036L11.0316 6.98542L11.4167 6.60036C11.959 6.06886 12.702 5.78684 13.4613 5.83023C14.2206 5.86277 14.9365 6.2153 15.4192 6.80103C16.3086 7.9508 16.1785 9.58325 15.1317 10.5866Z" fill="#FFA200"/>
  </svg>`;
  
  const calendar = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.125 0C3.87108 0 3.66667 0.2007 3.66667 0.45V0.9H1.83333C0.82624 0.9 0 1.71122 0 2.7V16.2C0 17.1888 0.82624 18 1.83333 18H20.1667C21.1738 18 22 17.1888 22 16.2V2.7C22 1.71122 21.1738 0.9 20.1667 0.9H18.3333V0.45C18.3333 0.2007 18.1289 0 17.875 0C17.6211 0 17.4167 0.2007 17.4167 0.45V0.9H13.75V0.45C13.75 0.2007 13.5456 0 13.2917 0C13.0378 0 12.8333 0.2007 12.8333 0.45V0.9H9.16667V0.45C9.16667 0.2007 8.96225 0 8.70833 0C8.45442 0 8.25 0.2007 8.25 0.45V0.9H4.58333V0.45C4.58333 0.2007 4.37892 0 4.125 0ZM1.83333 1.8H3.66667V2.25C3.66667 2.4993 3.87108 2.7 4.125 2.7C4.37892 2.7 4.58333 2.4993 4.58333 2.25V1.8H8.25V2.25C8.25 2.4993 8.45442 2.7 8.70833 2.7C8.96225 2.7 9.16667 2.4993 9.16667 2.25V1.8H12.8333V2.25C12.8333 2.4993 13.0378 2.7 13.2917 2.7C13.5456 2.7 13.75 2.4993 13.75 2.25V1.8H17.4167V2.25C17.4167 2.4993 17.6211 2.7 17.875 2.7C18.1289 2.7 18.3333 2.4993 18.3333 2.25V1.8H20.1667C20.6784 1.8 21.0833 2.19761 21.0833 2.7V16.2C21.0833 16.7024 20.6784 17.1 20.1667 17.1H1.83333C1.32164 17.1 0.916667 16.7024 0.916667 16.2V2.7C0.916667 2.19761 1.32164 1.8 1.83333 1.8ZM3.22445 4.5C2.9614 4.5 2.75 4.7007 2.75 4.95C2.75 5.1993 2.9614 5.4 3.22445 5.4H5.02555C5.2886 5.4 5.5 5.1993 5.5 4.95C5.5 4.7007 5.2886 4.5 5.02555 4.5H3.22445ZM7.79167 4.5C7.53775 4.5 7.33333 4.7007 7.33333 4.95C7.33333 5.1993 7.53775 5.4 7.79167 5.4H9.625C9.87892 5.4 10.0833 5.1993 10.0833 4.95C10.0833 4.7007 9.87892 4.5 9.625 4.5H7.79167ZM12.375 4.5C12.1211 4.5 11.9167 4.7007 11.9167 4.95C11.9167 5.1993 12.1211 5.4 12.375 5.4H14.2083C14.4623 5.4 14.6667 5.1993 14.6667 4.95C14.6667 4.7007 14.4623 4.5 14.2083 4.5H12.375ZM16.9583 4.5C16.7044 4.5 16.5 4.7007 16.5 4.95C16.5 5.1993 16.7044 5.4 16.9583 5.4H18.7917C19.0456 5.4 19.25 5.1993 19.25 4.95C19.25 4.7007 19.0456 4.5 18.7917 4.5H16.9583ZM3.20833 7.65C2.95442 7.65 2.75 7.8507 2.75 8.1C2.75 8.3493 2.95442 8.55 3.20833 8.55H5.04167C5.29558 8.55 5.5 8.3493 5.5 8.1C5.5 7.8507 5.29558 7.65 5.04167 7.65H3.20833ZM7.79167 7.65C7.53775 7.65 7.33333 7.8507 7.33333 8.1C7.33333 8.3493 7.53775 8.55 7.79167 8.55H9.625C9.87892 8.55 10.0833 8.3493 10.0833 8.1C10.0833 7.8507 9.87892 7.65 9.625 7.65H7.79167ZM12.375 7.65C12.1211 7.65 11.9167 7.8507 11.9167 8.1C11.9167 8.3493 12.1211 8.55 12.375 8.55H14.2083C14.4623 8.55 14.6667 8.3493 14.6667 8.1C14.6667 7.8507 14.4623 7.65 14.2083 7.65H12.375ZM16.9583 7.65C16.7044 7.65 16.5 7.8507 16.5 8.1C16.5 8.3493 16.7044 8.55 16.9583 8.55H18.7917C19.0456 8.55 19.25 8.3493 19.25 8.1C19.25 7.8507 19.0456 7.65 18.7917 7.65H16.9583ZM3.20833 10.8C2.95442 10.8 2.75 11.0007 2.75 11.25C2.75 11.4993 2.95442 11.7 3.20833 11.7H5.04167C5.29558 11.7 5.5 11.4993 5.5 11.25C5.5 11.0007 5.29558 10.8 5.04167 10.8H3.20833ZM7.79167 10.8C7.53775 10.8 7.33333 11.0007 7.33333 11.25C7.33333 11.4993 7.53775 11.7 7.79167 11.7H9.625C9.87892 11.7 10.0833 11.4993 10.0833 11.25C10.0833 11.0007 9.87892 10.8 9.625 10.8H7.79167ZM12.375 10.8C12.1211 10.8 11.9167 11.0007 11.9167 11.25C11.9167 11.4993 12.1211 11.7 12.375 11.7H14.2083C14.4623 11.7 14.6667 11.4993 14.6667 11.25C14.6667 11.0007 14.4623 10.8 14.2083 10.8H12.375ZM16.9583 10.8C16.7044 10.8 16.5 11.0007 16.5 11.25C16.5 11.4993 16.7044 11.7 16.9583 11.7H18.7917C19.0456 11.7 19.25 11.4993 19.25 11.25C19.25 11.0007 19.0456 10.8 18.7917 10.8H16.9583ZM3.20833 13.95C2.95442 13.95 2.75 14.1507 2.75 14.4C2.75 14.6493 2.95442 14.85 3.20833 14.85H5.04167C5.29558 14.85 5.5 14.6493 5.5 14.4C5.5 14.1507 5.29558 13.95 5.04167 13.95H3.20833ZM7.79167 13.95C7.53775 13.95 7.33333 14.1507 7.33333 14.4C7.33333 14.6493 7.53775 14.85 7.79167 14.85H9.625C9.87892 14.85 10.0833 14.6493 10.0833 14.4C10.0833 14.1507 9.87892 13.95 9.625 13.95H7.79167ZM12.375 13.95C12.1211 13.95 11.9167 14.1507 11.9167 14.4C11.9167 14.6493 12.1211 14.85 12.375 14.85H14.2083C14.4623 14.85 14.6667 14.6493 14.6667 14.4C14.6667 14.1507 14.4623 13.95 14.2083 13.95H12.375ZM16.9744 13.95C16.7114 13.95 16.5 14.1507 16.5 14.4C16.5 14.6493 16.7114 14.85 16.9744 14.85H18.7756C19.0386 14.85 19.25 14.6493 19.25 14.4C19.25 14.1507 19.0386 13.95 18.7756 13.95H16.9744Z" fill="#FFA200"/>
  </svg>`;
  
  const truck = `<svg xmlns="http://www.w3.org/2000/svg" width="27" height="16" viewBox="0 0 27 16" fill="none">
  <path d="M1.63084 7.76072e-06C1.36796 0.00101149 1.15511 0.204306 1.15406 0.45539V4.11363H0.489381C-0.163127 4.09981 -0.163127 5.04179 0.489381 5.02796H1.15406V8.68709H0.662329C0.645831 8.68628 0.629285 8.68628 0.612781 8.68709C-0.0108449 8.73105 0.0372844 9.6192 0.662329 9.60143H1.15406V12.8007C1.15305 13.0532 1.3665 13.2587 1.63084 13.2597H3.79877C3.92254 14.7885 5.26356 16 6.89501 16C8.52646 16 9.87184 14.7885 9.99592 13.2597H17.9048H18.8752C18.9993 14.7885 20.3446 16 21.9761 16C23.6075 16 24.9485 14.7885 25.0723 13.2597H26.5232C26.7876 13.2587 27.001 13.0532 27 12.8007V7.54239C27.0001 7.47974 26.9868 7.41774 26.9607 7.36023L24.5656 2.1028C24.4892 1.9367 24.3172 1.82949 24.1272 1.82957H18.3862V0.45539C18.3852 0.202563 18.1695 -0.00144971 17.9048 7.76072e-06H1.63084ZM2.11135 0.914344H17.428V12.3453H9.92113C9.59491 11.0376 8.36066 10.0568 6.89501 10.0568C5.42935 10.0568 4.1981 11.0376 3.87262 12.3453H2.11135V9.60143H4.02687C4.67938 9.61525 4.67938 8.67327 4.02687 8.68709H2.11135V5.02796H6.41823C7.07074 5.04179 7.07074 4.0998 6.41823 4.11363H2.11135V0.914344ZM4.843 1.82957C4.21963 1.87147 4.2641 2.75906 4.88881 2.74391H12.6406C13.2931 2.75773 13.2931 1.81575 12.6406 1.82957H4.88881C4.87354 1.82888 4.85826 1.82888 4.843 1.82957H4.843ZM18.3862 2.74391H23.8131L24.8536 5.02796H22.2126C21.5738 5.02796 21.5738 5.94319 22.2126 5.94319H25.2705L26.0427 7.63704V12.3453H24.9985C24.673 11.0376 23.4417 10.0568 21.9761 10.0568C20.5104 10.0568 19.2762 11.0376 18.95 12.3453H18.3862V2.74391ZM8.86381 6.40036C8.84634 6.40004 8.82886 6.40064 8.81146 6.40214H4.56068C4.54418 6.40132 4.52763 6.40132 4.51113 6.40214C3.92245 6.47273 3.96751 7.30097 4.56068 7.31291H8.81146C9.46892 7.36848 9.52369 6.41373 8.86381 6.40036ZM6.89501 10.9711C8.09025 10.9711 9.05078 11.8886 9.05078 13.0302C9.05078 14.1718 8.09025 15.0848 6.89501 15.0848C5.69977 15.0848 4.74391 14.1718 4.74391 13.0302C4.74391 11.8886 5.69977 10.9711 6.89501 10.9711ZM21.9761 10.9711C23.1713 10.9712 24.1272 11.8886 24.1272 13.0302C24.1272 14.1718 23.1713 15.0848 21.9761 15.0848C20.7809 15.0848 19.8203 14.1718 19.8203 13.0302C19.8203 11.8886 20.7809 10.9712 21.9761 10.9711ZM6.89501 11.8855C6.2398 11.8855 5.7012 12.4044 5.7012 13.0302C5.7012 13.656 6.2398 14.1704 6.89501 14.1704C7.55021 14.1704 8.09349 13.656 8.09349 13.0302C8.09349 12.4044 7.55021 11.8855 6.89501 11.8855ZM21.9761 11.8855C21.3209 11.8855 20.7776 12.4044 20.7776 13.0302C20.7776 13.656 21.3209 14.1704 21.9761 14.1704C22.6313 14.1704 23.1699 13.656 23.1699 13.0302C23.1699 12.4044 22.6313 11.8855 21.9761 11.8855ZM6.89501 12.8007C7.03285 12.8007 7.13526 12.8985 7.13526 13.0302C7.13526 13.1619 7.03285 13.2597 6.89501 13.2597C6.75716 13.2597 6.65849 13.1618 6.65849 13.0302C6.65849 12.8985 6.75716 12.8007 6.89501 12.8007ZM21.9761 12.8007C22.1139 12.8007 22.2126 12.8985 22.2126 13.0302C22.2126 13.1619 22.1139 13.2597 21.9761 13.2597C21.8382 13.2597 21.7358 13.1618 21.7358 13.0302C21.7358 12.8985 21.8383 12.8007 21.9761 12.8007Z" fill="#FFA200"/>
  </svg>`;
  
    const continueButton = document.querySelector('#continue-button');
    const title = document.querySelector('div.section__header:nth-child(5) > h3:nth-child(1)');
    const discountDiv = document.querySelector('#discount_error_div label');
    const discountButton = document.querySelector('#apply_discount');
    const mobileButton = document.querySelector('#additional-mobile-cta');
    document.getElementById("checkout_discount_code").placeholder = "";
  
    console.log(title);
    discountDiv.innerHTML = 'Discount Code:';
    continueButton.value = 'CONTINUE TO BILLING →';
    title.textContent = 'Customer Information';
    mobileButton.value = 'CONTINUE TO BILLING →';
    discountButton.innerHTML = svg;
  
  
  const newHeader = `
  <div class="c-header">
    <div class="c-header__content">
      <div class="c-header__content--one" style="background-color: #141E2B";>
        <a href="https://atlasbars.com"><img src="https://cdn.shopify.com/s/files/1/1813/5651/files/AtlasLogo-white.png?v=1596134551" /></a>
      </div>
      <div class="c-header__content--two";>
        <div class="c-truck">
          ${truck}
          <span>FREE 2-DAY SHIPPING</span>
        </div>
        <div class="c-calendar">
          ${calendar}
          <span>SKIP OR CANCEL ANYTIME</span>
        </div>
        <div class="c-heart">
          ${heart}
          <span>100% HAPPINESS GUARANTEED</span>
        </div>
      </div>
      <div class="c-header__content--three" style="background-image: url('https://cdn.shopify.com/s/files/1/1813/5651/files/Bars2.jpg?v=1596138892');">
      </div>
    </div>
  </div>
  `;
  
  header.innerHTML = newHeader;
});
  
window['atlas'] = window['atlas'] || {};
window.atlas.checkout = {

    init: function() {
        var self = this;

        document.addEventListener('DOMContentLoaded', function() {
            var cart = self.getCartJSON();
            var trial = self.getTrial(cart);
            if (trial !== undefined) {
                self.displayOngoingProduct(trial);
            } 
            self.markBundles(cart)
        });
    },

    markBundles: function(cart) {
      cart.line_items.forEach(function(item, index) {
        if(item.properties && item.properties['bundle_type'] === 'child') {
          var indexClass = '.p-' + (index + 1);
          Checkout.$('.order-summary__section ' + indexClass).addClass('product--isChild');
        }
      })
    },

    handle_freq_unit: function(count, freq_unit) {
        var lastS = freq_unit.lastIndexOf("s");
        var formattedUnit = freq_unit;
        if (count !== 1) {
          !(lastS >= 0) ? formattedUnit = freq_unit + "s" : null;
        } else {
          lastS >= 0 ? formattedUnit = freq_unit.slice(0, lastS) : null;
        }
        return count + " " + formattedUnit
    },

    createOngoingElement: function(productList) {
        var ongoingWrapper = document.createElement('DIV');
        ongoingWrapper.classList.add('ongoing-sub');
        
        ongoingWrapper.innerHTML = (function() {
            return(
                '<label class="ongoing__title">First Restock</label>' +
                '<div class="ongoing-sub-product">' +
                    productList +
                '</div>'
            )
        })();

        return ongoingWrapper;
    },

    displayOngoingProduct: function(trial) {
        var ongoingProducts = [];
        for (key in trial.properties) {
            if (trial.properties.hasOwnProperty(key)) {   
                if(key.includes("recurring_bundle")) {
                    const index = key[key.length -1];
                    var products = atob(trial.properties[key]).split('||');
                    var parent = products[1].split('|');
                    ongoingProducts.push({
                        price: parent[1],
                        size: trial.properties._recurring_size,
                        title: decodeURI(trial.properties._recurring_title),
                        type: decodeURI(trial.properties._recurring_type),
                        image: trial.properties._recurring_image
                    })
                }
            }
        }

        var productList = [];

        var freq = trial.properties._recurring_frequency;
        var unit = trial.properties._recurring_unit;
        var freqAndUnit = this.handle_freq_unit(Number(freq), unit);

        ongoingProducts.forEach(function(product){
            productList.push(
                '<div class="product product--ongoing">' +
                    '<div class="product__imageBox">' +
                        '<img class="product__image product__image--ongoing" src="' + product.image + '"/>' +
                    '</div>' +
                    '<div class="product__info product__info--ongoing">' +
                        '<span class="product__info__name product__info__name--ongoing"><strong>Build a Box</strong></span>' +
                        '<span class="product__info__text product__info__text--ongoing">x1 ' + product.size + '-ct ' + product.type + '</span>' +
                        '<span class="product__info__text product__info__text--ongoing">Every ' + freqAndUnit + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="ongoing__disclaimer">A week after your sample pack is delivered, we\'ll send your first ' + product.title + ' of our "' + product.type + '" for $' + product.price + '. Sign into your account to customize flavor selections, change the ship date, or cancel altogether-- You\'re in control! </div>'
            );
        });

        var ongoingSubscription = this.createOngoingElement(productList.join(''));
        Checkout.$('.order-summary .summary-body').append(ongoingSubscription);
        Checkout.$('.order-summary').addClass('order-summary--hasTrial');
    },

    getCartJSON: function() {
        if (window.cart_json) {
            return window.cart_json
        } else {
            return JSON.parse(Checkout.$('#cart_json').text().split("CART JSON: ")[1].split(" DEFAULT")[0].trim());
        }
    },

    getTrial: function(cartJSON) {
        var trial = cartJSON.line_items.filter(function(el) {
          return el.properties && el.properties['recurring_bundle'] !== undefined;
        })[0];
        return trial;
    }
}
window.atlas.checkout.init();