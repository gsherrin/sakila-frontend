import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ActorList, ActorForm, DeleteActorForm, UpdateActorForm } from './actors.js'
import { FilmList, FilmForm, DeleteFilmForm, UpdateFilmForm, FilmById } from './films.js';
import { render } from 'react-dom';

// render film list on click
const filmObject = document.getElementById("listFilms")

filmObject.onclick = function () {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<FilmList />);
};

// render actor list on click
const actorObject = document.getElementById("listActors")

actorObject.onclick = function () {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<ActorList />);
};

//render create actor form
const createActorObject = document.getElementById("createActors")
createActorObject.onclick = function () {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<ActorForm />);
};

// render update actor form
const updateActorObject = document.getElementById("updateActors")

updateActorObject.onclick = function () {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<UpdateActorForm />)
};

// render delete actor form
const deleteActorObject = document.getElementById("deleteActors")

deleteActorObject.onclick = function () {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<DeleteActorForm />)
};

//render create film form
const filmCreateObject = document.getElementById("createFilms")

filmCreateObject.onclick = function () {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<FilmForm />);
};

// render update film form
const updateFilmObject = document.getElementById("updateFilms")

updateFilmObject.onclick = function () {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<UpdateFilmForm />)
};

// render delete film form
const deleteFilmObject = document.getElementById("deleteFilms")

deleteFilmObject.onclick = function () {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<DeleteFilmForm />)
};