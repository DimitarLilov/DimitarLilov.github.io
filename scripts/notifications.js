let notifications = (() => {
    
    $(document).on("ajaxStart", function () {
        showLoading();
    });
    $(document).on("ajaxComplete", function () {
        hideLoading();
    });

    function handleError() {
        
        showError("Not Found");
    }

    function showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.empty();
        let span = $('<span>').text(message);
        infoBox.append(span);
        infoBox.show();
        infoBox.click((event) => $(event.target).hide());
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.empty();
        let spanmsg = $('<span>').text(message);
        errorBox.append(spanmsg);
        errorBox.show();
        errorBox.click((event) => $(event.target).hide());
    }

    function showLoading() {
        $('#loadingBox').show();
    }

    function hideLoading() {
        $('#loadingBox').hide();
    }

    return {
        showInfo,
        showError,
        handleError
    }
})();