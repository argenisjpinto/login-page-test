import LoginPage from "../../pages/login-page.po";

describe("Challenge de Mercap - Argenis Pinto", () => {

    const UI = {
        validUser: 'argenisTest@gmail.com',
        validPass: '123456',
        invalidUser: 'fakeTest#gmail.com',
        randomEmail: Math.random() * 5 + 'Test@gmail.com',
        randomPassword: Math.random() * 15,
        loginBtn: 'Iniciar sesión',
        continueBtn: 'Continuar',
        registerBtn: 'Registrarse',
    };

    beforeEach(() => {
        LoginPage.goTo();
        LoginPage.assertHomeLink();
        LoginPage.getIntoBondsPage();
        LoginPage.assertBondsPageAndGoToLogin();
    });

    it("Ingresar a módulo Login e iniciar sesión", () => {
        LoginPage.authLogin(UI.loginBtn, UI.validUser, UI.validPass);
    });

    it("Ingresar a módulo Login e iniciar sesión con un usuario inválido", () => {
        LoginPage.authLoginInvalid(UI.loginBtn, UI.invalidUser, UI.validPass);
    });
    
    it("Ingresar a módulo Login y verificar módulo contraseña olvidada", () => {
        LoginPage.authLoginForgottenPass(UI.continueBtn);
    });
    
    it("Registrar nuevo Usuario y Contraseña", () => {
        LoginPage.authRegister(UI.registerBtn, UI.randomEmail, UI.randomPassword);
    });
});