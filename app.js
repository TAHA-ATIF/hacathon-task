const users = [
    { username: 'user1', email: 'user1@example.com', password: 'password123' }
];
let currentUser = null;

const posts = [
    { title: 'My First Post', content: 'This is the content of my first post.', userId: 1 },
    { title: 'Another Post', content: 'Here is some more content for another post.', userId: 1 }
];

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form-element');
    const signinForm = document.getElementById('signin-form-element');
    const postForm = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts-container');
    const authContainer = document.getElementById('auth-container');
    const dashboardContent = document.getElementById('dashboard-content');
    const myPostsContainer = document.getElementById('my-posts-container');

    function renderPosts() {
        postsContainer.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('article');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <a href="#" onclick="editPost(${index})">Edit</a> | <a href="#" onclick="deletePost(${index})">Delete</a>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    function renderMyPosts() {
        myPostsContainer.innerHTML = '';
        posts.forEach((post) => {
            if (currentUser && post.userId === users.indexOf(currentUser) + 1) {
                const postElement = document.createElement('article');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                `;
                myPostsContainer.appendChild(postElement);
            }
        });
    }

    function editPost(index) {
        const post = posts[index];
        document.getElementById('post-title').value = post.title;
        document.getElementById('post-content').value = post.content;
        posts.splice(index, 1);
        renderPosts();
    }

    function deletePost(index) {
        posts.splice(index, 1);
        renderPosts();
    }

    signupForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        users.push({ username, email, password });
        alert('Sign Up Successful! You can now sign in.');
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('signin-form').style.display = 'block';
    });

    signinForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            currentUser = user;
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('dashboard-content').style.display = 'block';
            renderPosts();
            renderMyPosts();
        } else {
            alert('Invalid email or password.');
        }
    });

    postForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;

        posts.push({ title, content, userId: users.indexOf(currentUser) + 1 });
        renderPosts();
        renderMyPosts();
        document.getElementById('post-form').reset();
    });

    document.getElementById('show-signin')?.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('signin-form').style.display = 'block';
    });
});