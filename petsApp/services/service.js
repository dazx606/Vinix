export function findOne(id) {
    const path = `http://localhost:3001/${id}`;
    const config = {
        method: "GET",
        mode: "cors",
    };
    return fetch(path, config)
        .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
        .catch((err) => { console.log(err) })
};

export function findAll() {
    const path = `http://localhost:3001/`;
    const config = {
        method: "GET",
        mode: "cors",
    };
    return fetch(path, config)
        .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
        .catch((err) => { console.log(err) })
};

export function create(pet) {
    const path = `http://localhost:3001/`;
    const config = {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(pet),
        headers: {
            "content-type": "application/json"
        }
    };
    return fetch(path, config)
        .then((response) => response.ok ? response.json() : Promise.reject(response.statusText))
        .catch((err) => { console.log(err) })
};