import api from './api';

const userService = {
    getProfile: async () => {
        const response = await api.get('/users/profile');
        return response.data;
    },

    updateProfile: async (profileData) => {
        const response = await api.put('/users/profile', profileData);
        return response.data;
    },

    updateAvatar: async (formData) => {
        const response = await api.post('/users/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getRegisteredEvents: async () => {
        const response = await api.get('/users/events');
        return response.data;
    }
};

export default userService;
