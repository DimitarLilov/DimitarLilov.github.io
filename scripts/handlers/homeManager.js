handlers.displayHome = function (ctx) {
    ctx.aboutMeFolder = "fa fa-folder fa-5x";
    ctx.projectsFolder = "fa fa-folder fa-5x";
    ctx.educationFolder = "fa fa-folder fa-5x";
    ctx.certificatesFolder = "fa fa-folder fa-5x";
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",

    }).then(function () {
        this.partial('./templates/home/index.hbs');
    });
};