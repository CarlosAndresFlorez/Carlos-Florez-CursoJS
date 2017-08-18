class ApiClient {
    constructor() {

    }

    get(url, params) {

        let headers = new Headers();
        headers.append("Content-type", "application/json");

        let config = {
            method: "GET",
            headers: headers
        };
        console.log(url);
        let promise = fetch(url, config).then((response) => {
            return response.json();

        });
        return promise;

    }

    post(url, data) {

        let headers = new Headers();
        headers.append("Content-type", "application/json");

        let config = {
            method: "POST",
            headers: headers

        };

        if (data) {

            let jsonData = JSON.stringify(data);
            config.body = jsonData;

        }

        let promise = fetch(url, config).then((response) => {
            return response.json();

        });
        return promise;

    }

    put(url, data) {

        let headers = new Headers();
        headers.append("Content-type", "application/json");

        let config = {
            method: "PUT",
            headers: headers

        };

        if (data) {

            let jsonData = JSON.stringify(data);
            config.body = jsonData;

        }

        let promise = fetch(url, config).then((response) => {
            return response.json();

        });
        return promise;

    }

    delete(url, data) {

        let headers = new Headers();
        headers.append("Content-type", "application/json");

        let config = {
            method: "DELETE",
            headers: headers

        };
        if (data) {
            let jsonData = JSON.stringify(data);
            config.body = jsonData;
        }

        let promise = fetch(url, config).then((response) => {
            return response.json();
        });
        return promise;

    }
}