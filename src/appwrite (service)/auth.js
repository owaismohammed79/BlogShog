import conf from '../config/conf.js'
import { Client, Account, ID, OAuthProvider} from "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');               // Your project ID

// const account = new Account(client);

// const promise = account.create('[USER_ID]', 'email@example.com', '');

// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// });


//We could've simply copy pasted the rest of the code from appwrite doc and it would've worked but realize that we would have to create accounts manually(see above) and expose this in our Register component, so this is like a mixture of UI and business logic. Instead a better approach is below

export class AuthService{
    client = new Client(); //Observe karo ki let const nahi use kia he, class member he islie
    account;

    constructor(){
        this.client         //this.client = client nahi kar rhe he C++ ki tarah...
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password}) {//similarly isme function keywrd nahi use ho rha
        //try catch as there might be times when appwrite servers are down/anything
        try {
            const userAccount = await this.account.create(ID.unique(),email, password);
            if(userAccount){
                return this.login({email, password}); //Ek class function me baitha same class ka function call kar rha he
            }else {
                return  userAccount;
            }
        } catch (error) {
            console.log(`Appwrite Error in account creation: ${error}`)
            throw error;
        }
    }

    async login({email, password}){
        try {
            const userAccount = await this.account.createEmailPasswordSession(email, password);
            localStorage.setItem('auth_token', userAccount.$id);
            return userAccount;
        } catch (error) {
            console.log(`Appwrite Error in login: ${error}`)
            throw error;
        }
    }

    async loginWithGoogle(){
        try {
            const userData =  this.account.createOAuth2Session('google', `${conf.BaseUrl}/home`, `${conf.BaseUrl}/login`)
            //This fucking thing actually returns user Data but the documentation doesn't say so
            localStorage.setItem('auth_token', userData.$id);
            return userData;
        } catch (error) {
            console.log(`Appwrite Error in login with Google: ${error}`)
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log('Appwrite service :: getCurrentUser :: error', error);
            localStorage.removeItem('auth_token');
            return null;    //This is if it goes to the catch block but this memfunction should return smthing right/ if else also works
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
            localStorage.removeItem('auth_token');
        } catch (error) {
            console.log("Appwrite error:: Logout", error)
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;//Class pass karne ki bajae ek object hi pass kar dia h taaki directly .func call karlo warna object create karne padte


//Now you would be using this class's object wherever you need. You would be simply be calling the mem fns that you would want. And now let's say you want to shift your services to Firebase or some other service provider the only change you would have to do is here in this class. All the other places would still be calling these member functions only.