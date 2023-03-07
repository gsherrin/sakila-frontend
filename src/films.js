import React, { Component } from 'react';
import './index.css';

//fetch films from backend
export class FilmList extends Component {
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
            "http://localhost:8080/films")
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
                <h1> All Films in Sakila Database: </h1>  {
                    items.map((item) => (
                        <ol key={item.id} id="listitem">
                            ID: {item.FilmId},
                            <br></br>
                            {item.Title}
                        </ol>
                    ))
                }
            </div>
        );
    }
}

// function to post filmdata used in reactjs class FilmForm
export async function postFilmData(url = "", data = {}) {
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

// function to update filmdata used in reactjs class UpdateFilmForm
export async function updateFilmData(url = "", data = {}) {
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

// function to delete filmdata used in reactjs class DeleteFilmForm
export async function deleteFilmData(url = "", data = {}) {
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
export class FilmForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            year: 0,
            filmlength: 0,
            // rating: ''
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
        let trueReleaseYear = parseInt(this.state.year, 10);
        let trueLength = parseInt(this.state.length, 10);
        postFilmData("http://localhost:8080/films", {
            Title: this.state.title,
            Description: this.state.description,
            ReleaseYear: trueReleaseYear,
            LanguageId: 1,
            Length: trueLength,
            // Rating: this.state.rating
        }).then((data) => {
            console.log(data);
            event.preventDefault();
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1> Create a New Film: </h1>
                <label>Title (1 to 128 characters):
                    <input
                        name="title"
                        type="text"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        name="description"
                        type="text"
                        value={this.state.description}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Release Year:
                    <input
                        name="year"
                        type="number"
                        value={this.state.year}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Length:
                    <input
                        name="filmlength"
                        type="number"
                        value={this.state.length}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                {/* <label>
                    Rating:
                    <select value={this.state.rating} onChange={this.handleChange}>
                        <option value="G">G</option>
                        <option value="PG">PG</option>
                        <option value="PG-13">PG-13</option>
                        <option value="R">R</option>
                        <option value="NC-17">NC-17</option>
                    </select>
                </label> */}
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

// react js form for updating film entries
export class UpdateFilmForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: '',
            description: '',
            year: 0,
            filmlength: 0,
            // rating: ''
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
        let trueFilmId = parseInt(this.state.id, 10);
        let trueReleaseYear = parseInt(this.state.year, 10);
        let trueLength = parseInt(this.state.length, 10);
        updateFilmData("http://localhost:8080/films/", {
            FilmId: trueFilmId,
            Title: this.state.title,
            Description: this.state.description,
            ReleaseYear: trueReleaseYear,
            LanguageId: 1,
            Length: trueLength,
            LastUpdate: "2023-03-03T16:13:10.164Z"
            // Rating: this.state.rating
        }).then((data) => {
            console.log(data);
            event.preventDefault();
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1> Update a Film: </h1>
                <label>Film ID (you can find this by looking at all films):
                    <input
                        name="id"
                        type="number"
                        value={this.state.id}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>Title (1 to 128 characters):
                    <input
                        name="title"
                        type="text"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        name="description"
                        type="text"
                        value={this.state.description}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Release Year:
                    <input
                        name="year"
                        type="number"
                        value={this.state.year}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Length:
                    <input
                        name="filmlength"
                        type="number"
                        value={this.state.length}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                {/* <label>
                    Rating:
                    <select value={this.state.rating} onChange={this.handleChange}>
                        <option value="G">G</option>
                        <option value="PG">PG</option>
                        <option value="PG-13">PG-13</option>
                        <option value="R">R</option>
                        <option value="NC-17">NC-17</option>
                    </select>
                </label> */}
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

//reactjs form for handling delete requests
export class DeleteFilmForm extends React.Component {
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
        let trueFilmId = parseInt(this.state.id, 10);
        deleteFilmData("http://localhost:8080/films/" + trueFilmId).then((data) => {
            console.log(data);
            event.preventDefault();
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1> Delete a Film by its ID: </h1>
                <label>Film ID (you can find this by looking at all films):
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

//under construction

export class FilmById extends Component {
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
            "http://localhost:8080/films")
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
                <h1> Info about selected movie in Sakila Database: </h1>  {
                    items.map((item) => (
                        <ol key={item.id} id="listitem">
                            ID: {item.FilmId},
                            <br></br>
                            {item.Title},
                            <br></br>
                            {item.Description}
                            <br></br>
                            {item.ReleaseYear}
                            <br></br>
                            {item.Length}
                        </ol>
                    ))
                }
            </div>
        );
    }
}