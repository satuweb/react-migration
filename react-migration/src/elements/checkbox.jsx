import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = { checked: false };
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(e) {
        this.setState((state, props) => ({
            checked: !state.checked
        }));
    }

    render() {
        return (
            <label htmlFor={this.props.id} className="Checkbox">
                <input 
                    id={this.props.id} 
                    className="Checkbox__input" 
                    type="checkbox" 
                    checked={this.state.checked} 
                    onChange={(e) =>this.handleCheckboxChange(e)}
                    value={this.props.value}
                    name={this.props.name}
                />
                <span className="Checkbox__label">{this.props.label}</span>
            </label>
        );
    }
}

export default Checkbox;