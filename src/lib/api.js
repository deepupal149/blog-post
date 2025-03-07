import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
    baseURL: 'https://dummyjson.com', // json-server will run on this port
});

// Post APIs
export const getPosts = async () => {
    const response = await api.get('/posts?limit=1000');
    return response.data;
};

export const getPostById = async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
};

export const createPost = async (postData) => {
    const response = await api.post('/posts/add', {
        ...postData,
        createdAt: new Date().toISOString(),
    });
    return response.data;
};

export const updatePost = async (id, postData) => {
    const response = await api.put(`/posts/${id}`, {
        ...postData,
        updatedAt: new Date().toISOString(),
    });
    return response.data;
};

export const deletePost = async (id) => {
    await api.delete(`/posts/${id}`);
    return { success: true };
};

// User APIs
export const getUsers = async () => {
    const response = await api.get('/users?limit=1000');
    console.log("responseresponse", response)
    return response.data;
};

export const getUserById = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};

export const registerUser = async (userData) => {
    const users = await getUsers();
    const userExists = users.users.find(user => user.email === userData.email);
    if (userExists) {
        throw new Error('User already exists');
    }
    const response = await api.post('/users/add', {
        ...userData,
        createdAt: new Date().toISOString(),
    });

    return response.data;
};

export const loginUser = async (credentials) => {
    console.log("credentials" , credentials)
    const users = await getUsers();
    const response = await api.post('/users/login', {
        username: credentials.email,
        password: credentials.password
    });
    // const user = users.users.find(
    //     user => user.email === credentials.email && user.password === credentials.password
    // );

    // if (!user) {
    //     throw new Error('Invalid credentials');
    // }

    // Remove password before returning user data
    // const { password, ...userWithoutPassword } = user;
    return response.data;
};