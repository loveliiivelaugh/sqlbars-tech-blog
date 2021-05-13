const url = document.location.href;

const formHandler = async event => {
  event.preventDefault();

  const comment = document.querySelector('#comment').value.trim();

  if (comment) {
    console.log(comment);

    const response = await fetch(`/api/posts/comment`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);

    if (response.ok) {
      document.location.replace(url);
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace(url);
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', formHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);
