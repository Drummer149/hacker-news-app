/**
 * Base API Service to connect to data 
 */
class ApiService  {

  // URL of target firebase store
  API_URL = "https://hacker-news.firebaseio.com";
  // API Version
  API_VERSION = "v0";
  // Firebase database store instance
  DB = null;

  constructor(store){
    store.initializeApp({ databaseURL: this.API_URL });
    this.DB = firebase.database();
  }

  // Method to return a promise of an array of story ids from a given endpoint
  getStoryIds(endPoint){
    return new Promise(resolve => {
      this.DB.ref(`${this.API_VERSION}/${endPoint}`).once('value', (storyIds) => {
        resolve(storyIds.val());
      });
    })
  }

  // Method to return a promise of an indivdual item object
  getItem(id){
    return new Promise(resolve => {
      this.DB.ref(`${this.API_VERSION}/item/${id}`).once('value', (item) => {
        resolve(item.val());
      });
    })
  }

}

// Initialise a singleton Api Service 
const apiService = new ApiService(firebase);
export { apiService };
