import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

// default state of the store
const initialState: INotes = {
    notes: [],
    // keeping track of the active note in order to display it in the panel
    activeNote: null,
};

// calling api request to get the notes from the database
export const getNotes = createAsyncThunk(
    'user/getNotesStatus', 
    async (accessToken: string, { rejectWithValue }) => {
        try {
            const response = await notesApi.getNotes(accessToken);
            if(response.status === 401) return rejectWithValue({message: response.data.message, status: response.status});
            return response;
        } catch (error) {
            return rejectWithValue({message: error.response.data.message, status: error.response.status});
        };
    },
);

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        // add note to the redux store
        addNote: (state, action) => {
            state.notes.push(action.payload);
        },
        // update note in the redux store
        updateNote: (state, action) => {
            // find the index of the updated note
            const updatedNoteIndex = state.notes.findIndex((note) => note._id === action.payload._id);
            // replace the old note with the new updated one
            state.notes[updatedNoteIndex] = action.payload;
        },
        // delete note in the redux store
        deleteNote: (state, action) => {
            // find the index of the deleted note
            const deletedNoteIndex = state.notes.findIndex((note) => note._id === action.payload._id);
            // removing the note from the store
            state.notes.splice(deletedNoteIndex, 1);
            // setting the active note to default state - null
            state.activeNote = null;
        },
        // set active note
        setActive: (state, action) => {
            const newActiveNote: Note = action.payload;
            state.activeNote = newActiveNote;
        },
        // clean notes - setting the store to default state
        cleanNotes: (state) => {
            state.activeNote = null;
            state.notes = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getNotes.fulfilled, (state, action) => {
            state.notes = action.payload.data.notes;
        });
    },
});

export const { addNote, updateNote, deleteNote, setActive, cleanNotes } = notesSlice.actions;
export default notesSlice.reducer;