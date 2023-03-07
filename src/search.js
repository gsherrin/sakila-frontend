import React, { Component } from 'react';
import './index.css';
import { formatString } from '../tools';

export class SearchFunc extends Component {
    // Constructor 
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        fetch(
            "http://localhost:8080/actors/search?aq=${query}")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>Loading...</div>;
        return (
            <div>
                <h1> Actors that match your search query: </h1>  {
                    items.map((item) => (
                        <ol key={item.id} id="listitem">
                            ID: {item.ActorId} 
                            {item.FirstName} 
                            {item.LastName}
                        </ol>
                    ))
                }
            </div>
        );
    }
}