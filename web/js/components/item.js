import { apiService } from "../service/api.js";
import { timeSince, getHostname } from "../common/utils.js";

// Populate the single story item
async function populateItem(id) {
  let item = await apiService.getItem(id);
  document.getElementById("newsItem").innerHTML = createNewsItem(item);

  let commentId = 'comments';
  let actions = item.kids.map(item => populateComments(item, commentId, 0))
};

// Function to rescursively go through comments and create the comment heirachy 
// Don't believe this way to do things is optimal just yet
async function populateComments(id, commentId, index){
  let item = await apiService.getItem(id);

  document.getElementById(commentId).innerHTML += buildComment(item, index);

  let commentSectionId = "commentSection-id-" + item.id;
  if(item.hasOwnProperty('kids')){
    item.comments = await item.kids.map(item => populateComments(item, commentSectionId, index + 1));
  } 
  
  return item;
}


// Create the markup for a comment
function buildComment(comment, index){
  return `<div class="comment" style="margin-left: 25px">
            <span>${comment.by}</span>
            <a href="/item?id=${comment.id}"><span>${timeSince(comment.time)} ago</span></a>
            <div>${comment.text}</div>
            <div id="commentSection-id-${comment.id}"></div>
          </div>`;
}

// Create an indivdual news Item
function createNewsItem(data){
  if(data !== null){
    return `<div class="newsItem">
              <a href="${data.url}"><h>
                  ${data.title}</p></a>
                  <span>${data.score} points</span>
                  <span>by ${data.by}</span>
                  <a href="/item?id=${data.id}"><span>${timeSince(data.time)} ago</span></a>
            </div>`;
  } else {
    return ``;
  }
}


window.addEventListener('DOMContentLoaded', (event) => {
  let id = document.querySelector('#content').dataset.item;
  populateItem(id);
});