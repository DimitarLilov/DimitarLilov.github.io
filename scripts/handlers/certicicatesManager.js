handlers.displayCerticicatesFile = function (ctx) {
    service.getCertificates("dimitarlilov.github.io")
        .then(function (data) {

            let certificates = [];
            for (let d of data) {
                let name = d.name.split('.')[0];
                let photo = {
                    id: name,
                    name: "",
                    url: d.download_url
                }
                certificates.push(photo);
            }
            ctx.certificates = certificates;

            ctx.aboutMeFolder = "fa fa-folder fa-5x";
            ctx.projectsFolder = "fa fa-folder fa-5x";
            ctx.educationFolder = "fa fa-folder fa-5x";
            ctx.certificatesFolder = "fa fa-folder-open fa-5x";

            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                photo: "./templates/projects/photo.hbs"

            }).then(function () {
                this.partial('./templates/certificates/index.hbs');
            });
        }).catch(notifications.handleError);
};