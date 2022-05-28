# KannactNotes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.0.

## Deployed app

The app can be accessed using this url: [https://kannact-notes.web.app/notes](https://kannact-notes.web.app/notes)

## Database

The app uses the Cloud Firestore database to store the created notes., which is a NoSQL cloud database. For more information visit: [Cloud Firestore Database](https://firebase.google.com/docs/firestore)

## Usage

#### Language

As a user, you can change the app language at any time using the side-menu option `ENG | ES`. The available languages are: `English` and `Spanish`.

#### Notes

The Notes page is structured in 2 main sections: `New note` and `Notes list`.

#### Section: New note

In this section, the user can create a new note using a rich text interface. The text interface is the Primeng component: [Editor](https://www.primefaces.org/primeng/editor), which is based on [Quill](https://quilljs.com/). Before posting the new note, the user can flag it so that it will appear as flagged in the notes list.

#### Section: Notes list

In this section, the user can see a list of the posted notes. On top of the list there will be the `flagged` notes.

The list has the following features:
* **Sort**: by creation date in an ascending or descending order. The sorting has been done in a JS function because it was too specific to do it in a generic sortBy pipe.
* **Filter**: by coach name or the description using the search input and it starts to filter when the user types 3 characters. It has been done using a custom pipe `filterBy`.
* **Highlight**: when the search filter matches a value, it highlights it with a yellow background. It has been done using a custom pipe `highlight`.

Every note has the following actions:
* **Edit**: using the pencil button, the user can edit in place a note.
* **Delete**: uing the trash button, the user can delete a note.
* **Flag**: using the flag button, the user can flag a note. The flagged notes will appear on top of the list and will be marked with a purple left-border.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
