import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as notesApi from '../../api/notesApi';

type Note = {
    _id: string;
    active?: boolean;
    title: string;
    content: string;
    preview: string;
    date: string;
};

interface INotes {
    notes: Array<Note>,
    activeNote: Note;
};

const initialState: INotes = {
    notes: [],
    activeNote: null,
};

export const getNotes = createAsyncThunk(
    'user/getNotesStatus', 
    async (accessToken: string, { rejectWithValue }) => {
        try {
            const response = await notesApi.getNotes(accessToken);
            if(response.status === 401) return rejectWithValue({message: response.data.message, status: response.status});
            return response;
        } catch (error) {
            return error;
        };
    },
);

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.notes.push(action.payload);
        },
        updateNote: (state, action) => {
            const updatedNoteIndex = state.notes.findIndex((note) => note._id === action.payload._id);
            state.notes[updatedNoteIndex] = action.payload;
        },
        deleteNote: (state, action) => {
            const deletedNoteIndex = state.notes.findIndex((note) => note._id === action.payload._id);
            state.notes.splice(deletedNoteIndex, 1);
        },
        setActive: (state, action) => {
            const previousActiveNote = state.activeNote;
            if(previousActiveNote !== null && previousActiveNote !== undefined) previousActiveNote.active = false;
            const newActiveNote: Note = action.payload;
            state.activeNote = newActiveNote;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getNotes.fulfilled, (state, action) => {
            state.notes = action.payload.data.notes;
        });
    },
});

export const { addNote, updateNote, deleteNote, setActive } = notesSlice.actions;
export default notesSlice.reducer;