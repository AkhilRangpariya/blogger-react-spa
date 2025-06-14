import conf from '../conf/conf.js'
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    // NO MEANING OF THE WRITE THIS TINGS OVER HERE
    // client = new Client();
    // account;

    // when auth class instance created at that time directly. create required things client and account
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if(userAccount){
                // call another methods for after signup -> directly login and move at home page 
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        }
        catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        // eslint-disable-next-line no-useless-catch
        try{
            return await this.account.createEmailSession(email, password);
        }
        catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // throw error;
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        // incase account are not get at that time you return null
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
     

}

const authService = new AuthService();

export default authService;
// now we exporting the direct authService object for every import and directly take a access of the service 