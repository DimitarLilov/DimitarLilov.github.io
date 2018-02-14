handlers.displayAboutMeFile = function (ctx) {
    ctx.aboutMeFolder = "fa fa-folder-open fa-5x";
    ctx.projectsFolder = "fa fa-folder fa-5x";
    ctx.educationFolder = "fa fa-folder fa-5x";
    ctx.certificatesFolder = "fa fa-folder fa-5x";
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",

    }).then(function () {
        this.partial('./templates/home/aboutMeFile.hbs');
    });
};

handlers.displayAboutMe = function (ctx) {
    ctx.aboutMeFolder = "fa fa-folder-open fa-5x";
    ctx.projectsFolder = "fa fa-folder fa-5x";
    ctx.educationFolder = "fa fa-folder fa-5x";
    ctx.certificatesFolder = "fa fa-folder fa-5x";


    ctx.id = "Photo";
    ctx.name = "Photo.jpg";
    ctx.url = "https://raw.githubusercontent.com/DimitarLilov/DimitarLilov.github.io/master/images/I.jpg";


    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        photo: "./templates/projects/photo.hbs"

    }).then(function () {
        this.partial('./templates/home/aboutme.hbs');
    });
};