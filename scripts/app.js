const handlers = {};

$(() => {
    const app = Sammy('#content', function () {
        this.use("Handlebars", 'hbs');

        this.get('index.html', displayHome);
        this.get('/', displayHome);
        this.get('#/aboutme', handlers.displayAboutMe);
        this.get('#/aboutme/resume', handlers.displayAboutMeFile);

        this.get('#/projects', handlers.displayProjectsFolder);

        this.get('#/projects/games', handlers.displayGamesFolder);
        this.get('#/projects/games/sp', handlers.displaySPGameFolder);
        this.get('#/projects/games/si', handlers.displaySIGameFolder);
        this.get('#/projects/games/sw', handlers.displaySWGameFolder);
        this.get('#/projects/games/rpg', handlers.displayRPGGameFolder);

        this.get('#/projects/web', handlers.displayWebFolder);
        this.get('#/projects/web/teamwork', handlers.displayTeamworkWebFolder);
        this.get('#/projects/web/ticketstore', handlers.displayTicketStoreWebFolder);

        this.get('#/projects/servers', handlers.displayServersFolder);
        this.get('#/projects/servers/csharp', handlers.displayCSharpServersFolder);
        this.get('#/projects/servers/express', handlers.displayExpressServersFolder);

        this.get('#/education', handlers.displayEducation);

        this.get('#/certificates', handlers.displayCerticicatesFile);

        function displayHome(ctx) {
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
        }
    });

    app.run();

});