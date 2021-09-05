import axios from 'axios';

// API request to get the notes from database - private route => require accessToken to authorize
export const getNotes = async (accessToken: string) => {
    // server has the access to the cookies in case access token is invalid
    return axios.get(`http://localhost:5000/api/v1/note/getNotes`, {headers: { ContentType: 'application/json', Authorization: `Bearer ${accessToken}` }, withCredentials: true})
}
// API request to add new note - private route => require accessToken to authorize
export const addNote = async (title: string, content: string, preview: string, accessToken: string) => {
    // server has the access to the cookies in case access token is invalid
    return axios.post('http://localhost:5000/api/v1/note/addNote', {title, content, preview} ,{headers: { ContentType: 'application/json', Authorization: `Bearer ${accessToken}` }, withCredentials: true});
};

// API request to update a note - private route => require accessToken to authorize
export const updateNote = async (title: string, content: string, preview: string, accessToken: string, noteId: string) => {
    // server has the access to the cookies in case access token is invalid
    return axios.put(`http://localhost:5000/api/v1/note/editNote/${noteId}`, {title, content, preview}, {headers: { ContentType: 'application/json', Authorization: `Bearer ${accessToken}` }, withCredentials: true});
};

// API request to delete a note - private route => require accessToken to authorize
export const deleteNote = async (accessToken: string, noteId: string) => {
    // server has the access to the cookies in case access token is invalid
    return axios.delete(`http://localhost:5000/api/v1/note/deleteNote/${noteId}`, {headers: { ContentType: 'application/json', Authorization: `Bearer ${accessToken}` }, withCredentials: true});
};