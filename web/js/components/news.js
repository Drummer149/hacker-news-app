import { apiService } from "../service/api.js";
import { timeSince, getHostname } from "../common/utils.js";

// Number of stories to display on a page
const NUM_ITEMS_PAGE = 30;
const MAX_NUM_ITEMS = 500;

// Method to populate the news feed with news items
async function populateNewsItems(typeOfFeed, page) {
  // Get array of Ids
  let storyIds = await apiService.getStoryIds(typeOfFeed);
  let startingIndex = NUM_ITEMS_PAGE * (page - 1);
  let endingIndex = startingIndex + NUM_ITEMS_PAGE;

  // Map the ids to actual items
  let actions = storyIds.slice(startingIndex, endingIndex).map(apiService.getItem.bind(apiService));
  // Resolve all the promises
  let results = await Promise.all(actions);

  // Populate news feed with items
  document.getElementById("newsFeed").innerHTML = results.map(createNewsItem).join('');
  
  // Check if there are pages left
  if(endingIndex <= MAX_NUM_ITEMS)
    document.getElementById("newsFeed").innerHTML += appendNextButton(parseInt(page) + 1);
};

// Create an indivdual news Item
function createNewsItem(data){
  if(!data.hasOwnProperty('url')){
    data.url = "/item?id=${data.id}";
  }

  if(data !== null){
    return `<div class="newsItem">
              <div class="section">
                <span class="title"><a href="${data.url}">${data.title}</a></span>
                <span class="websiteName">(${getHostname(data.url)})</span>
              </div>
              <div class="section sublinks">
                <span>${data.score} points</span>
                <span>by ${data.by}</span>
                <a href="/item?id=${data.id}"><span>${timeSince(data.time)} ago</span></a>
                <a href="/item?id=${data.id}"><span>Comments</span></a>
              </div>
            </div>`;
  } else {
    return ``;
  }
}



// Create markup for a next button 
function appendNextButton(page){
  const link = window.location.href.split('?')[0] + '?page=' + page;
  return `<a class="next-btn" href="${link}">More</a>`;
}

// Once DOM has loaded, populate the news feed
window.addEventListener('DOMContentLoaded', (event) => {
  let typeOfFeed = document.querySelector('#content').dataset.type;
  let page = document.querySelector('#content').dataset.page;
  populateNewsItems(typeOfFeed, parseInt(page));
});