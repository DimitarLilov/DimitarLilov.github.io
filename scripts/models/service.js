let service = (() => {

    function getScreenshots(repo) {

        return requester.get(repo, `contents/screenshots`);
    }

    function getCertificates(repo) {

        return requester.get(repo, `contents/img/certificates`);
    }

    return {
        getScreenshots,
        getCertificates
    }
})();