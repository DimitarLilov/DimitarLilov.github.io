const handlers = {};

$(() => {
    const app = Sammy('#content', function () {
        this.use("Handlebars", 'hbs');

        this.get('index.html', displayHome);
        this.get('/', displayHome);
        this.get('/aboutme', handlers.displayAboutMe);
        this.get('/aboutme/resume', handlers.displayAboutMeFile);
        this.get('/projects', handlers.displayProjectsFolder);

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