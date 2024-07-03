public without sharing class Hello {
    
    @AuraEnabled(cacheable=true)
    public static string getAccounts(){
        try {
            List<Account> accounts = [SELECT Id, Name, CreatedDate FROM Account];
            List<Account> acc = new List<Account>();
            for (Account a : accounts) {
                acc.add(a);
            }
            Map<String, List<Account>> jsonToRet= new Map<String, List<Account>>{
                'accounts' => accounts
            };
            return JSON.serialize(jsonToRet);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static string submitAccount(String accountObj){
        try {
            JSONRequest jsonReq = (JSONRequest) JSON.deserialize(accountObj, JSONRequest.class);
            String firstName = jsonReq.accountObj.firstName;
            String lastName = jsonReq.accountObj.lastName;
            String phone = jsonReq.accountObj.phone;

            Account a = new Account(
                Name = firstName + ' ' + lastName,
                Phone = phone
            );
            insert a;

            Map<String, Object> jsonRet = new Map<String, Object>{
                'success' => true,
                'accountIns' => a
            };

            return JSON.serialize(jsonRet);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public class JSONRequest {
        @AuraEnabled
        public AccountObj accountObj {get; set;}
    }

    public class AccountObj {
        @AuraEnabled
        public String firstName {get; set;}
        @AuraEnabled
        public String lastName {get; set;}
        @AuraEnabled
        public String email {get; set;}
        @AuraEnabled
        public String phone {get; set;}
    }
}