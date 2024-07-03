import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/Hello.submitAccount';

export default class NewAccount extends LightningElement {

    account = new Object();

    onChangeHandler(event) {
        const item = event.target.fieldName;

        if (event.target.value) {
            this.account[item] = event.target.value;
        }
        else {
            delete this.account[item];
        }
    }

    async newAccountHandler() {
        const jsonToSend = JSON.stringify({'accountObj': this.account});
        console.log(jsonToSend);
        try {
            const response = await getAccounts({accountObj: jsonToSend});
            console.log(response);
        }catch(error) {
            console.log(error);
        }
    }
}