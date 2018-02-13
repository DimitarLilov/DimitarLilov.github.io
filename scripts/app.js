$(() => {
    const app = Sammy('#content', function () {
        this.use("Handlebars", 'hbs');

        this.get('index.html', displayHome);
        this.get('/', displayHome);
        this.get('/aboutme', displayAboutMe)

        function displayHome(ctx) {
            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",

            }).then(function () {
                this.partial('./templates/home/index.hbs');
            });
        }

        function displayAboutMe(ctx){
            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",

            }).then(function () {
                this.partial('./templates/home/aboutme.hbs');
            });
        }

    });

    app.run();

});