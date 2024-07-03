import { LightningElement, api, track} from 'lwc';

export default class AccountComponent extends LightningElement {

    @api
    account = null;
    
    connectedCallback() {
        console.log('account comp');
        console.log(JSON.stringify(this.account));
    }
}