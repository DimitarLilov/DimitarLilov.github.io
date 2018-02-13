handlers.displayProjectsFolder = function (ctx) {
    ctx.aboutMeFolder = "fa fa-folder fa-5x";
    ctx.projectsFolder = "fa fa-folder-open fa-5x";
    ctx.educationFolder = "fa fa-folder fa-5x";
    ctx.certificatesFolder = "fa fa-folder fa-5x";
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",

    }).then(function () {
        this.partial('./templates/projects/index.hbs');
    });
};

handlers.displayGamesFolder = function (ctx) {
    ctx.aboutMeFolder = "fa fa-folder fa-5x";
    ctx.projectsFolder = "fa fa-folder-open fa-5x";
    ctx.educationFolder = "fa fa-folder fa-5x";
    ctx.certificatesFolder = "fa fa-folder fa-5x";
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",

    }).then(function () {
        this.partial('./templates/projects/games/index.hbs');
    });
};

handlers.displaySPGameFolder = function (ctx) {


    gameService.getScreenshots("Team-Demeter")
        .then(function (data) {

            let photos = [];
            for (let d of data) {
                let photo = {
                    name: d.name,
                    url: d.download_url
                }
                photos.push(photo);
            }
            ctx.photos = photos;

            ctx.name = "Super Pesho";
            ctx.link = "https://github.com/DimitarLilov/Team-Demeter";
            ctx.aboutMeFolder = "fa fa-folder fa-5x";
            ctx.projectsFolder = "fa fa-folder-open fa-5x";
            ctx.educationFolder = "fa fa-folder fa-5x";
            ctx.certificatesFolder = "fa fa-folder fa-5x";
            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                photo: "./templates/projects/photo.hbs"

            }).then(function () {
                this.partial('./templates/projects/games/game.hbs');
            });
        }).catch(console.log(e));

};

handlers.displaySIGameFolder = function (ctx) {
    gameService.getScreenshots("Team-Entablefine")
        .then(function (data) {

            let photos = [];
            for (let d of data) {
                let photo = {
                    name: d.name,
                    url: d.download_url
                }
                photos.push(photo);
            }
            ctx.photos = photos;

            ctx.name = "Space Invaders";
            ctx.link = "https://github.com/DimitarLilov/Team-Entablefine";
            ctx.aboutMeFolder = "fa fa-folder fa-5x";
            ctx.projectsFolder = "fa fa-folder-open fa-5x";
            ctx.educationFolder = "fa fa-folder fa-5x";
            ctx.certificatesFolder = "fa fa-folder fa-5x";
            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                photo: "./templates/projects/photo.hbs"

            }).then(function () {
                this.partial('./templates/projects/games/game.hbs');
            });
        }).catch(console.log(e));
};

handlers.displaySWGameFolder = function (ctx) {
    gameService.getScreenshots("Team-Dantooine")
        .then(function (data) {

            let photos = [];
            for (let d of data) {
                let photo = {
                    name: d.name,
                    url: d.download_url
                }
                photos.push(photo);
            }
            ctx.photos = photos;

            ctx.name = "Star Wars";
            ctx.link = "https://github.com/DimitarLilov/Team-Dantooine";
            ctx.aboutMeFolder = "fa fa-folder fa-5x";
            ctx.projectsFolder = "fa fa-folder-open fa-5x";
            ctx.educationFolder = "fa fa-folder fa-5x";
            ctx.certificatesFolder = "fa fa-folder fa-5x";
            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                photo: "./templates/projects/photo.hbs"

            }).then(function () {
                this.partial('./templates/projects/games/game.hbs');
            });
        }).catch(console.log(e));
};

handlers.displayRPGGameFolder = function (ctx) {
    ctx.name = "RPG Game";
    ctx.link = "https://github.com/EntityFrameworkWorkGroup/RpgGame";
    ctx.aboutMeFolder = "fa fa-folder fa-5x";
    ctx.projectsFolder = "fa fa-folder-open fa-5x";
    ctx.educationFolder = "fa fa-folder fa-5x";
    ctx.certificatesFolder = "fa fa-folder fa-5x";
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        photo: "./templates/projects/photo.hbs"

    }).then(function () {
        this.partial('./templates/projects/games/game.hbs');
    });
};