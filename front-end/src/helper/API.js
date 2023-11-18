//const { ResultType } = require("@remix-run/router/dist/utils");
const { _SERVER_HOST } = require("../AppConfig");

class API {

    Request = async (Path, AuthToken, Type = "GET",Body) => {
        let result = {};
        return(new Promise((resolve,reject) =>{
            fetch(`${_SERVER_HOST + Path}`, {
                method: Type,
                headers: {
                    authorization: "bearer " + AuthToken,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Body),
            })
                .then((response) => {
                    result.status = response.status;
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! status: ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((content) => {
                    result.content = content.message;
                    resolve(result);
                })
                .catch((error) => {
                    console.log(error);
                    resolve(result);
                });
        }))
    };
}

module.exports = new API();
