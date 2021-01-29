export default class ApiService {
    _apiBase = 'http://127.0.0.1:7000';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        const body = await res.json();
        return body;
    }

    getAllProducts = async () => {
        // ToDo check it
        return (await this.getResource('/goods?name=milk'))
    }


    _transformPlanet = planet => ({
        id: this._extractId(planet),
        name: planet.name,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
        diameter: planet.population
    });
    _transformStarship = starship => ({
        id: this._extractId(starship),
        name: starship.name,
        model: starship.model,
        manufacturer: starship.manufacturer,
        costInCredits: starship.cost_in_credits,
        length: starship.length,
        crew: starship.crew,
        passengers: starship.passengers,
        cargoCapacity: starship.cargoCapacity
    });

    _transformPerson = person => ({
        id: this._extractId(person),
        name: person.name,
        gender: person.gender,
        birthYear: person.birth_year,
        eyeColor: person.eye_color
    });
}
