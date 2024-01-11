const BASE_URL = "/api/post";
let posts = [];
let modal;

class PostApi {
  static async fetch() {
    const res = await fetch(BASE_URL, { method: "get" });

    return res.json();
  }

  static async create(post) {
    const res = await fetch(BASE_URL, {
      method: "post",
      body: JSON.stringify(post),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return res.json();
  }

  static async delete(id) {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "delete" });

    return res.json();
  }
}

const card = (post) => `
  <div class="card z-depth-4">
    <div class="card-content">
      <span class="card-title">${post.title}</span>
      <p style="white-space: pre-line">
        ${post.text}
      </p>
      <small>${new Date(post.date).toLocaleDateString("ru-RU")}</small>
    </div>
    <div class="card-action">
      <button class="btn btn-small red js-remove" data-id="${post._id}">
        <i class="material-icons">delete</i>
      </button>
    </div>
  </div>`;

const renderPosts = (posts = []) => {
  const containerPosts = document.querySelector("#posts");

  if (posts.length > 0) {
    containerPosts.innerHTML = posts.map((post) => card(post)).join(" ");
  } else {
    containerPosts.innerHTML = `<div class="center">No posts yet</div>`;
  }
};

const onCreatePost = () => {
  const title = document.querySelector("#title");
  const text = document.querySelector("#text");

  if (title.value && text.value) {
    const newPost = {
      title: title.value,
      text: text.value,
    };

    PostApi.create(newPost).then((post) => {
      posts.push(post);
      renderPosts(posts);
    });

    modal.close();
    title.value = "";
    text.value = "";
    M.updateTextFields();
  }
};

const onDeletePost = ({ target }) => {
  if (
    target.classList.contains("js-remove") ||
    target.parentNode.classList.contains("js-remove")
  ) {
    const decision = confirm("Are you sure you want to delete the post ?");

    if (decision) {
      const id =
        target.getAttribute("data-id") ||
        target.parentNode.getAttribute("data-id");

      PostApi.delete(id).then(() => {
        const postIndex = posts.findIndex(({ _id }) => _id === id);

        posts.splice(postIndex, 1);
        renderPosts(posts);
      });
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  PostApi.fetch().then((backendPosts) => {
    posts = backendPosts.concat();
    renderPosts(posts);
  });

  modal = M.Modal.init(document.querySelector(".modal"));

  document.querySelector("#createPost").addEventListener("click", onCreatePost);
  document.querySelector("#posts").addEventListener("click", onDeletePost);
});
