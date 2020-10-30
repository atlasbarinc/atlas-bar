import lozad from 'lozad'
import { tns } from 'tiny-slider/src/tiny-slider'
import pikaday from 'pikaday'

const vendorsInit = async() => {
  window.Scoutside.vendors = window.Scoutside.vendors || {}
  window.Scoutside.vendors.lozad = lozad
  window.Scoutside.vendors.tns = tns
  window.Scoutside.vendors.pikaday = pikaday

  var gorgiasChatInterval = window.setInterval(function () {
    var iframe = document.querySelector('#gorgias-web-messenger-container');
      if (iframe) { 
        var head = iframe.contentWindow.document.querySelector('head')
        if (head.children.length) {
          window.clearInterval(gorgiasChatInterval); // this line breaks out of the loop - make sure it's not deleted.        
          var styles = document.createElement('style');
          styles.textContent = '.whatyouwanttochange {property: value}'  // the custom CSS you want to inject
          head.appendChild(styles)
        }
      }    
  }, 100);

}

vendorsInit()