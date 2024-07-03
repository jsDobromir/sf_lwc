import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/Hello.getAccounts';

export default class MainComponent extends LightningElement {

    accounts = null;
    @track isLoading = true;
    @track isError =false;
    @track showAccountCreation = false;

    async connectedCallback() {
        try {
            let response = await getAccounts();
            response = JSON.parse(response);
            this.accounts = response.accounts;
            for (let acc of this.accounts) {
                acc.CreatedDate = acc.CreatedDate.slice(0, 10);
            }
        }catch(error) {
            console.log(error);
            this.isError = true;
        }finally {
            this.isLoading = false;
        }
    }

    newAccount() {
        this.showAccountCreation = true;
    }
}