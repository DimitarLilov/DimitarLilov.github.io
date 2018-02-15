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
        showError,
        handleError
    }
})();