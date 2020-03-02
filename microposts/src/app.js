import { http } from './http';
import { ui } from './ui';

const apiURL = 'http://localhost:3000';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancel edit
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Get posts
function getPosts() {
  http
    .get(`${apiURL}/posts`)
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Submit post
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  };

  // Validate input
  if (!title || !body) {
    ui.showAlert('Posts must have a title and a body', 'alert alert-danger');
  } else {
    // Check for ID
    if (id === '') {
      // Create post
      http
        .post(`${apiURL}/posts`, data)
        .then(() => {
          ui.showAlert('Post added', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      // Update post
      http
        .put(`${apiURL}/posts/${id}`, data)
        .then(() => {
          ui.showAlert('Post updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

// Delete post
function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    http
      .delete(`${apiURL}/posts/${id}`)
      .then(() => {
        ui.showAlert('Post Removed', 'alert alert-success');
        getPosts();
      })
      .catch(err => console.log(err));
  }
  e.preventDefault();
}

// Enable edit state
function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    };

    ui.fillForm(data);
  }
  e.preventDefault();
}

// Cancel edit state
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
}
