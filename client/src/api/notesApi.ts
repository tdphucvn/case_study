import axios from 'axios';

export const getNotes = async (accessToken: string) => {
    return axios.get(`http://localhost:5000/api/v1/note/getNotes`, {headers: { ContentType: 'application/json', Authorization: `Bearer ${accessToken}` }, withCredentials: true})
}

export const addNote = async (title: string, content: string, preview: string, accessToken: string) => {
    return axios.post('http://localhost:5000/api/v1/note/addNote', {title, content, preview} ,{headers: { ContentType: 'application/json', Authorization: `Bearer ${accessToken}` }, withCredentials: true});
};

export const updateNote = async (title: string, content: string, preview: string, accessToken: string, noteId: string) => {
    return axios.put(`http://localhost:5000/api/v1/note/editNote/${noteId}`, {title, content, preview}, {headers: { ContentType: 'application/json', Authorization: `Bearer ${accessToken}` }, withCredentials: true});
};

export const deleteNote = async (accessToken: string, noteId: string) => {
    return axios.delete(`http://localhost:5000/api/v1/note/deleteNote/${noteId}`, {headers: { ContentType: 'application/json', Authorization: `Bearer ${accessToken}` }, withCredentials: true});
};