import React, { Component } from 'react';
import './index.css';
import { formatString } from './tools';
import { apiUrl } from './constants';

// fetch list of actors from database
export class ActorList extends Component {
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
            `${apiUrl}/actors`)
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
                <h1> All Actors in Sakila Database: </h1>  {
                    items.map((item) => (
                        <ol key={item.id} id="listitem">
                            ID: {item.ActorId}
                            <br></br>
                            {item.FirstName}&nbsp; 
                            {item.LastName}
                        </ol>
                    ))
                }
            </div>
        );
    }
}

// function used to post actor data in class ActorForm
export async function postActorData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(data), 
    });
    return response.json();
}

// function used to update actor data in class UpdateActorForm
export async function updateActorData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response.json();
}

// function used to delete actor data in class DeleteActorForm
export async function deleteActorData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response.json();
};

//reactjs form for creating a new film
export class ActorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        postActorData(`${apiUrl}/actors`, {
            FirstName: this.state.firstname,
            LastName: this.state.lastname,
        }).then((data) => {
            console.log(data);
            event.preventDefault();
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1> Create a New Actor: </h1>
                <label>First Name:
                    <input
                        name="firstname"
                        type="text"
                        value={this.state.firstname}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Last Name:
                    <input
                        name="lastname"
                        type="text"
                        value={this.state.lastname}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

//reactjs form for updating a film
export class UpdateActorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            firstname: '',
            lastname: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        let trueActorId = parseInt(this.state.id, 10);
        updateActorData(`${apiUrl}/actors`, {
            ActorId: trueActorId,
            FirstName: this.state.firstname,
            LastName: this.state.lastname,
            LastUpdate: "2023-03-03T16:13:10.164Z"
        }).then((data) => {
            console.log(data);
            event.preventDefault();
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1> Update an Actor: </h1>
                <label>Actor ID (you can find this by looking at all films):
                    <input
                        name="id"
                        type="number"
                        value={this.state.id}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>First Name:
                    <input
                        name="firstname"
                        type="text"
                        value={this.state.firstname}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Last Name:
                    <input
                        name="lastname"
                        type="text"
                        value={this.state.lastname}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

//reactjs form for deleting a film
export class DeleteActorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        let trueActorId = parseInt(this.state.id, 10);
        deleteActorData(`${apiUrl}/actors` + trueActorId).then((data) => {
            console.log(data);
            event.preventDefault();
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1> Delete an Actor by their ID: </h1>
                <label>Actor ID (you can find this by looking at all actors):
                    <input
                        name="id"
                        type="number"
                        value={this.state.id}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}