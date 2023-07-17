import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const create = (newContact) => {
    return axios
    .post(baseUrl, newContact)
    .then(response => response.data)
}

const deleteContact = (id) => {
    return axios
    .delete(`${baseUrl}/${id}`)
}

const upDate = (id, newPerson) => {
    return axios
    .put(`${baseUrl}/${id}`, newPerson)
    .then(response => response.data)
}

export {
    create,
    deleteContact,
    upDate
}