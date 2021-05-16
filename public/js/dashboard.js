const updateButtonHandler = async (event) => {
  console.log("i am being updated!!");
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    document.location.replace('/post/' + id);
  }
};

const delButtonHandler = async (event) => {

  console.log("i am being deleted!!")
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .getElementById('delete-btn')
  .addEventListener('click', delButtonHandler);

document
  .getElementById('update-btn')
  .addEventListener('click', updateButtonHandler);
