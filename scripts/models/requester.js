let requester = (() => {
    const gitHubBaseUrl = "https://api.github.com/repos/DimitarLilov";

    function makeRequest(method, repo, endpoint) {
        return {
            method,
            url: gitHubBaseUrl + '/' + repo + '/' + endpoint,
        };
    }

    // Function to return GET promise
    function get (repo, endpoint) {
        return $.ajax(makeRequest('GET', repo, endpoint));
    }

    return {
        get,
    }
})()