const handlers = {};

$(() => {
    const app = Sammy('#content', function () {
        this.use("Handlebars", 'hbs');

        this.get('index.html', handlers.displayHome);
        this.get('/', handlers.displayHome);
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
        this.get('#/projects/web/handlebars/ticketstore', handlers.displayTicketStoreHWebFolder);

        this.get('#/projects/servers', handlers.displayServersFolder);
        this.get('#/projects/servers/csharp', handlers.displayCSharpServersFolder);
        this.get('#/projects/servers/express', handlers.displayExpressServersFolder);

        this.get('#/education', handlers.displayEducation);

        this.get('#/certificates', handlers.displayCerticicatesFile);
    });

    app.run();
});