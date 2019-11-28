import React, { Component } from 'react';
class Button extends Component {
    constructor(props) {
        super(props);
        this.state = { url: '' };

        // Necessario per accedere al corretto valore di `this` all'interno della callback
        this.submitForm = this.submitForm.bind(this);

    }

    submitForm(value, e) {
        this.setState((state, props) => ({
            url: value
        }));
    }

    render() {
        return (
            <button onClick={(e) => this.submitForm('ciao', e)}>
                send form
            </button>
        );
    }
}

export default Button;