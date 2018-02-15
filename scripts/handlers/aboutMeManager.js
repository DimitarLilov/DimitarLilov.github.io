handlers.displayAboutMeFile = function (ctx) {
    setAboutFolderOpen(ctx);

    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",

    }).then(function () {
        this.partial('./templates/about/aboutMeFile.hbs');
    });
};

handlers.displayAboutMe = function (ctx) {
    setAboutFolderOpen(ctx);

    ctx.id = "Photo";
    ctx.name = "Photo.jpg";
    ctx.url = "https://raw.githubusercontent.com/DimitarLilov/DimitarLilov.github.io/master/images/I.jpg";

    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        photo: "./templates/common/photo.hbs"

    }).then(function () {
        this.partial('./templates/about/aboutme.hbs');
    });
};

function setAboutFolderOpen(ctx) {
    ctx.aboutMeFolder = "fa fa-folder-open fa-5x";
    ctx.projectsFolder = "fa fa-folder fa-5x";
    ctx.educationFolder = "fa fa-folder fa-5x";
    ctx.certificatesFolder = "fa fa-folder fa-5x";
}