let service = (() => {

    function getScreenshots(repo) {

        return requester.get(repo, `contents/screenshots`);
    }

    return {
        getScreenshots,
    }
})();