import retargetEvents from 'react-shadow-dom-retarget-events'
import React from "react";
import ReactDOM from "react-dom";
import ClearCache from "../src/components/ClearCache";
import styles from '../src/assets/scss/partials/components/panel.scss';


class ClearCacheWrapper extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });

    ReactDOM.render(
        <ClearCache className={styles.Panel} />,
        this.shadowRoot
    );
    
    retargetEvents(this.shadowRoot);

  }
}

customElements.define("alien-clearcache-wrapper", ClearCacheWrapper);
