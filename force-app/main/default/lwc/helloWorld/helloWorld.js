import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {

    connectedCallback() {
        console.log('init component');
    }

    greeting = 'World';
    changeHandler(event) {
        this.greeting = event.target.value;
    }
}