handlers.displayProjectsFolder = function (ctx) {
    setFolderOpen(ctx);
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",

    }).then(function () {
        this.partial('./templates/projects/index.hbs');
    });
};

handlers.displayGamesFolder = function (ctx) {
    setFolderOpen(ctx);
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",

    }).then(function () {
        this.partial('./templates/projects/games/index.hbs');
    });
};

handlers.displaySPGameFolder = function (ctx) {


    service.getScreenshots("Team-Demeter")
        .then(function (data) {

            ctx.name = "Super Pesho";
            ctx.link = "https://github.com/DimitarLilov/Team-Demeter";
            ctx.folder = "games"

            setPhotos(data, ctx);

            setFolderOpen(ctx);

            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                photo: "./templates/projects/photo.hbs"

            }).then(function () {
                this.partial('./templates/projects/project.hbs');
            });
        }).catch(console.log(e));

};

handlers.displaySIGameFolder = function (ctx) {
    service.getScreenshots("Team-Entablefine")
        .then(function (data) {

            ctx.name = "Space Invaders";
            ctx.link = "https://github.com/DimitarLilov/Team-Entablefine";
            ctx.folder = "games"

            setPhotos(data, ctx);

            setFolderOpen(ctx);

            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                photo: "./templates/projects/photo.hbs"

            }).then(function () {
                this.partial('./templates/projects/project.hbs');
            });
        }).catch(console.log(e));
};

handlers.displaySWGameFolder = function (ctx) {
    service.getScreenshots("Team-Dantooine")
        .then(function (data) {

            ctx.name = "Star Wars";
            ctx.link = "https://github.com/DimitarLilov/Team-Dantooine";
            ctx.folder = "games"

            setPhotos(data, ctx);

            setFolderOpen(ctx);

            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                photo: "./templates/projects/photo.hbs"

            }).then(function () {
                this.partial('./templates/projects/project.hbs');
            });
        }).catch(console.log(e));
};

handlers.displayRPGGameFolder = function (ctx) {
    ctx.name = "RPG Game";
    ctx.link = "https://github.com/EntityFrameworkWorkGroup/RpgGame";
    ctx.folder = "games"

    setFolderOpen(ctx);
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        photo: "./templates/projects/photo.hbs"

    }).then(function () {
        this.partial('./templates/projects/project.hbs');
    });
};

handlers.displayWebFolder = function (ctx) {
    setFolderOpen(ctx);
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",

    }).then(function () {
        this.partial('./templates/projects/web/index.hbs');
    });
};

handlers.displayTeamworkWebFolder = function (ctx) {
    service.getScreenshots("Teamwork-System")
        .then(function (data) {

            ctx.name = "Teamwork System";
            ctx.link = "https://github.com/DimitarLilov/Teamwork-System";
            ctx.folder = "web"


            setPhotos(data, ctx);

            setFolderOpen(ctx);

            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                photo: "./templates/projects/photo.hbs"

            }).then(function () {
                this.partial('./templates/projects/project.hbs');
            });
        }).catch(console.log(e));
};

handlers.displayTicketStoreWebFolder = function (ctx) {
    service.getScreenshots("Team-Dragonfruit")
        .then(function (data) {

            ctx.name = "Ticket Store";
            ctx.link = "https://github.com/DimitarLilov/Team-Dragonfruit";
            ctx.folder = "web"


            setPhotos(data, ctx);

            setFolderOpen(ctx);

            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                photo: "./templates/projects/photo.hbs"

            }).then(function () {
                this.partial('./templates/projects/project.hbs');
            });
        }).catch(console.log(e));
};

handlers.displayServersFolder = function (ctx) {
    setFolderOpen(ctx);
    ctx.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",

    }).then(function () {
        this.partial('./templates/projects/servers/index.hbs');
    });
};

handlers.displayCSharpServersFolder = function (ctx) {
    service.getScreenshots("HttpServer")
        .then(function (data) {

            ctx.name = "C# Server";
            ctx.link = "https://github.com/DimitarLilov/HttpServer";
            ctx.folder = "servers"


            setPhotos(data, ctx);

            setFolderOpen(ctx);

            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                photo: "./templates/projects/photo.hbs"

            }).then(function () {
                this.partial('./templates/projects/project.hbs');
            });
        }).catch(console.log(e));
};

handlers.displayExpressServersFolder = function (ctx) {
    gservice.getScreenshots("Express-Server")
        .then(function (data) {

            ctx.name = "Express Server";
            ctx.link = "https://github.com/DimitarLilov/Express-Server";
            ctx.folder = "servers"


            setPhotos(data, ctx);

            setFolderOpen(ctx);

            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                photo: "./templates/projects/photo.hbs"

            }).then(function () {
                this.partial('./templates/projects/project.hbs');
            });
        }).catch(console.log(e));
};

function setFolderOpen(ctx) {
    ctx.aboutMeFolder = "fa fa-folder fa-5x";
    ctx.projectsFolder = "fa fa-folder-open fa-5x";
    ctx.educationFolder = "fa fa-folder fa-5x";
    ctx.certificatesFolder = "fa fa-folder fa-5x";
}

function setPhotos(data, ctx) {
    let photos = [];

    for (let d of data) {
        let name = d.name.split('.')[0];
        let photo = {
            id: name,
            name: "screenshot_" + name,
            url: d.download_url
        }
        photos.push(photo);
    }
    ctx.photos = photos;
}