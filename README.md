# E2E – Login (Abbaco by Mercap) con Cypress

Se realizaron 4 casos de prueba automatizados para el módulo de autenticación. Los mismos verifican:

1. Login válido con correo y contraseña correctos.
2. Login inválido con usuario incorrecto.
3. Flujo “¿Olvidó su contraseña?” (presencia de pantalla y controles).
4. Registro de nuevo usuario.

Nota: el correo argenisTest@gmail.com es ficticio (no existe).

## Enfoque y stack

Cypress: 15.4.0

## Patrón POM (Page Object Model)

PO: login-page.po.js

Spec: login.spec.js

## Multiorigen: uso de cy.origin() debido al cambio de dominio (p. ej., de bonds.* a auth.*).

En esta versión de Cypress, al cambiar de dominio es necesario usar cy.origin(). Dentro del callback de cy.origin(...) no existe "this", por lo que todas las constantes/locators/textos se pasan vía args y se desestructuran.

## Estructura

cypress/

├─ e2e/

│  └─ login.spec.js            # Specs (referencia a métodos del PO)

└─ pages/

   └─ login-page.po.js         # Page Object: Urls, Locators, Textos y métodos
   
cypress.config.js

package.json

README.md



En el Spec se referencian los métodos del PO con constantes de UI y se utiliza un hook beforeEach para evitar la repetición de pasos y mejorar mantenibilidad ante cambios.

En el PO se parametrizan los elementos en Urls, Locators y Textos, además de los métodos reutilizados tanto en el beforeEach como en cada it.

# Instalación y ejecución
## Instalar dependencias

npm i

npm install -g npm@latest

## Abrir Cypress (modo interactivo)
npx cypress open

## Ejecutar en headless
npx cypress run

## Repositorio

Implementación completa:
https://github.com/argenisjpinto/mercap-challenge
