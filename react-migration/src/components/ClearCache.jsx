import React, { Component, Fragment } from 'react'
import Checkbox from '../elements/checkbox'
import checkboxData from '../mocks/data'
import axios from 'axios'

class ClearCache extends Component {
    constructor() {
        super();
        this.state = {
            readData: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    componentDidMount() {
        fetch('https://cssdev-server.virtual.infra/hermit-web/r/users/admin')
        .then(response => response.json())
        .then(data => this.setState(() => ({ readData: data })));
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
       
        axios({
            method: 'DELETE',
            url: 'https://cssdev-server.virtual.infra/hermit-web/r/admin/cache',
            data: data
        });
    }

    render() {
        return (

            <div id="clear-cache" className="Panel">
                <h2 className="Panel__title">Clear cache</h2>
                <div className="Panel__container">
                    <form onSubmit={this.handleSubmit}>
                        {checkboxData.map((data) =>
                            <Checkbox 
                            id={data.id}
                            value={data.value}
                            label={data.label}
                            name={data.name}
                            />
                        )}
                        <button>Send data</button>
                    </form>
                </div>
            </div>

        )
    }
}

export default ClearCache;