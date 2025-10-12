class LoginPage {
    url = {
        homepage:'https://mercapabbaco.com',
        bondsPage: 'https://bonds.mercapabbaco.com',
        auth: 'https://auth.mercapabbaco.com',
    }

    locator = {
        homeLink: '.elementor-widget-container',
        bondsPageCharts: '.highcharts-background',
        getIntoButton: '.elementor-button-text',
        bondsPageLoginButton: '.btn.btn-primary',
        logoAuthLogin: '#prompt-logo-center',
        inputUsername: '#username',
        inputPassword: '#password',
        buttonSubmit: '[type="submit"]',
        labelErrorPassword: '#error-element-password',
        emailInputForgotten: '#email-label',
        forgottenDescription: '#aria-description-text',
        inputEmailRegister: '#email',
    }

    text = {
        bondsLoginBtn: 'Iniciar Sesión',
        getIntoBtn: 'Ingresar',
        wrongPassword: 'Correo electrónico o contraseña incorrecta',
        forgottenPassLabel: '¿Olvidó su contraseña?',
        forgottenPassDescription: 'Introduzca su dirección de correo electrónico y le enviaremos un correo electrónico con instrucciones para restablecer su contraseña.',
        forgottenPassEmailLabel: 'Correo electrónico',
        forgottenPassBack: 'Volver a Abbaco',
        registerLabel: 'Regístrese',
    }

    goTo() {
        cy.visit(this.url.homepage);
    }

    assertHomeLink() {
        cy.get(this.locator.homeLink).find('a').should('have.attr', 'href', this.url.homepage);
    }

    getIntoBondsPage() {
        cy.contains(this.locator.getIntoButton, this.text.getIntoBtn).should('be.visible').click();
    }

    assertBondsPageAndGoToLogin() {
        const origin = this.url.bondsPage;
        const { bondsPageCharts, bondsPageLoginButton } = this.locator;
        const { bondsLoginBtn } = this.text;
        cy.origin(this.url.bondsPage, { args: { origin, bondsLoginBtn, bondsPageCharts, bondsPageLoginButton } },
        ({ origin, bondsLoginBtn, bondsPageCharts, bondsPageLoginButton }) => {
            cy.location('origin').should('eq', origin);
            cy.get(bondsPageCharts).should('be.visible');
            cy.contains(bondsPageLoginButton, bondsLoginBtn).should('be.visible').click();
        }); 
    }

    authLogin(buttonName, email, password) {
        const origin = this.url.auth;
        const { logoAuthLogin, inputUsername, inputPassword, buttonSubmit } = this.locator;
        cy.origin(origin, { args: { origin, buttonName, email, password, logoAuthLogin, inputUsername, inputPassword, buttonSubmit } },
        ({ origin, buttonName, email, password, logoAuthLogin, inputUsername, inputPassword, buttonSubmit }) => {
            cy.location('origin').should('eq', origin);
            cy.location('pathname').should('eq', '/u/login');
            cy.location('search').should('match', /\bstate=/);

            cy.get(logoAuthLogin).should('be.visible');
            cy.get(inputUsername).clear({ force: true }).type(email,{ delay: 50 });
            cy.get(inputPassword).clear({ force: true }).type(password,{ delay: 50 });                
            cy.get(buttonSubmit).contains(buttonName).should('be.visible').click();
        });
    }

    authLoginInvalid(buttonName, email, password) {
        const origin = this.url.auth;
        const { logoAuthLogin, inputUsername, inputPassword, buttonSubmit, labelErrorPassword } = this.locator;
        const { wrongPassword } = this.text;
        cy.origin(origin, { args: { origin, buttonName, email, password, logoAuthLogin, inputUsername, inputPassword, buttonSubmit, labelErrorPassword, wrongPassword } },
        ({ origin, buttonName, email, password, logoAuthLogin, inputUsername, inputPassword, buttonSubmit, labelErrorPassword, wrongPassword }) => {
            cy.location('origin').should('eq', origin);
            cy.location('pathname').should('eq', '/u/login');
            cy.location('search').should('match', /\bstate=/);

            cy.get(logoAuthLogin).should('be.visible');
            cy.get(inputUsername).clear({ force: true }).type(email,{ delay: 50 });
            cy.get(inputPassword).clear({ force: true }).type(password,{ delay: 50 });
            cy.get(buttonSubmit).contains(buttonName).should('be.visible').click();
            cy.get(labelErrorPassword).should('be.visible').contains(wrongPassword);
        });
    }

    authLoginForgottenPass(buttonName) {
        const origin = this.url.auth;
        const { logoAuthLogin, buttonSubmit, emailInputForgotten, forgottenDescription } = this.locator;
        const { forgottenPassLabel, forgottenPassDescription, forgottenPassEmailLabel, forgottenPassBack } = this.text;
        cy.origin(origin, { args: { origin, buttonName, logoAuthLogin, buttonSubmit, emailInputForgotten, forgottenPassEmailLabel, forgottenDescription, forgottenPassLabel, forgottenPassDescription, forgottenPassBack } },
        ({ origin, buttonName, logoAuthLogin, buttonSubmit, emailInputForgotten, forgottenPassEmailLabel, forgottenDescription, forgottenPassLabel, forgottenPassDescription, forgottenPassBack }) => {
            cy.location('origin').should('eq', origin);
            cy.location('pathname').should('eq', '/u/login');
            cy.location('search').should('match', /\bstate=/);

            cy.get(logoAuthLogin).should('be.visible');
            cy.contains('a', forgottenPassLabel).should('be.visible').click();
            cy.contains('h1', forgottenPassLabel).should('be.visible');
            cy.get(forgottenDescription).should('be.visible').contains(forgottenPassDescription);
            cy.contains(emailInputForgotten,forgottenPassEmailLabel).should('be.visible');
            cy.get(buttonSubmit).contains(buttonName).should('be.visible');
            cy.get(buttonSubmit).contains(forgottenPassBack).should('be.visible').click();
            cy.get(logoAuthLogin).should('be.visible');
        });
    }
    
    authRegister(buttonName, email, password) {
        const origin = this.url.auth;
        const { logoAuthLogin, inputEmailRegister, inputPassword, buttonSubmit } = this.locator;
        const { registerLabel } = this.text;
        cy.origin(origin, { args: { origin, buttonName, email, password, logoAuthLogin, inputEmailRegister, inputPassword, registerLabel, buttonSubmit } },
        ({ origin, buttonName, email, password, logoAuthLogin, inputEmailRegister, inputPassword, registerLabel, buttonSubmit }) => {
            cy.location('origin').should('eq', origin);
            cy.location('pathname').should('eq', '/u/login');
            cy.location('search').should('match', /\bstate=/);
            
            cy.get(logoAuthLogin).should('be.visible');
            cy.contains('a', registerLabel).should('be.visible').click();
            cy.get(inputEmailRegister).clear({ force: true }).type(email,{ delay: 50 });
            cy.get(inputPassword).clear({ force: true }).type(password,{ delay: 50 });
            cy.get(buttonSubmit).contains(buttonName).should('be.visible').click();
        });
    }
}

export default new LoginPage();