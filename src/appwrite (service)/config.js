import conf from '../config/conf.js'
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DbService{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument( //The place where slug isused is simply document ID, could've used ID.unique.
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite error :: createPost :: error", error);
        }
    }

    async updatePost( slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite error :: updatePost :: error", error);           
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite error :: DeletePost :: error", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite error :: getPost :: error", error);
            return false;             
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){ //Here queries is just a var name and you need to have an index in which a key called status and that's when you'll be able to use them. If we would've used enum then it would've been even better 
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite error :: getPosts :: error", error);
            return false;            
        }
    }

    //File services
    async uploadFile(file){ //This is the actual file itself and not it's title or something
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite error :: uploadFile :: error", error)
            return false
        }

    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite error :: deleteFile :: error", error);
            return false
        }
    }

    filePreview(fileId){ //this ain't a async fn as this returns the preview as soon as it's called
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite error :: getFilePreview :: error", error);
            return false
        }
    }

}

const dbservice = new DbService();

export default dbservice;