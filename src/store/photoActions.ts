import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PhotoActionState = {
  scopeUris: string[];
  isSelectionMode: boolean;
  selectedUris: string[];
  lockSelectionMode: boolean;
};

type SelectedUri = {
  scopeUris: string[];
  uri?: string;
  lockSelectionMode?: boolean;
};

const initialState: PhotoActionState = {
  scopeUris: [],
  isSelectionMode: false,
  selectedUris: [],
  lockSelectionMode: false,
};

const photoActionsSlice = createSlice({
  name: 'photoActions',
  initialState,
  reducers: {
    enterSelectionMode: (state, action: PayloadAction<SelectedUri>) => {
      state.isSelectionMode = true;
      state.scopeUris = action.payload.scopeUris;
      state.lockSelectionMode = action.payload?.lockSelectionMode || false;
      state.selectedUris = [];

      if (action.payload.uri) {
        state.selectedUris.push(action.payload.uri);
      }
    },

    addPhotoUris: (
      state,
      action: PayloadAction<{ selectedUris: string[] }>,
    ) => {
      if (!state.isSelectionMode) return;
      const filteredUris = action.payload.selectedUris.filter(uri =>
        state.scopeUris.includes(uri),
      );
      state.selectedUris.push(...filteredUris);
    },

    removeAllUris: state => {
      state.selectedUris = [];
    },

    toggleSelectUri: (state, action: PayloadAction<string>) => {
      const uri = action.payload;

      if (state.selectedUris.includes(uri)) {
        state.selectedUris = state.selectedUris.filter(u => u !== uri);
      } else {
        state.selectedUris.push(uri);
      }
    },

    toggleSelectAll: state => {
      if (state.selectedUris.length === state.scopeUris.length) {
        state.selectedUris = [];
      } else {
        state.selectedUris = [...state.scopeUris];
      }
    },

    exitSelectionMode: state => {
      state.isSelectionMode = false;
      state.lockSelectionMode = false;
      state.selectedUris = [];
      state.scopeUris = [];
    },
  },
});

export const {
  enterSelectionMode,
  toggleSelectAll,
  toggleSelectUri,
  exitSelectionMode,
  addPhotoUris,
  removeAllUris,
} = photoActionsSlice.actions;

export const photoActionsReducer = photoActionsSlice.reducer;
