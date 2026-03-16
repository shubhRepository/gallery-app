import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SectionState = {
  isSelectionMode: boolean;
  selectedBySection: {
    [sectionKey: string]: string[];
  };
};

const initialState: SectionState = {
  isSelectionMode: false,
  selectedBySection: {},
};

const sectionActionsSlice = createSlice({
  name: 'sectionActions',
  initialState,
  reducers: {
    enterSelectionMode: (
      state,
      action: PayloadAction<{ sectionKey: string; uri: string }>,
    ) => {
      state.isSelectionMode = true;
      const sectionKey = action.payload.sectionKey;
      state.selectedBySection[sectionKey] = [action.payload.uri];
    },

    toggleImageSelection: (
      state,
      action: PayloadAction<{ sectionKey: string; uri: string }>,
    ) => {
      const { sectionKey, uri } = action.payload;

      const sectionSelections = state.selectedBySection[sectionKey] ?? [];

      if (sectionSelections.includes(uri)) {
        state.selectedBySection[sectionKey] = sectionSelections.filter(
          u => u !== uri,
        );
      } else {
        state.selectedBySection[sectionKey] = [...sectionSelections, uri];
      }

      if (state.selectedBySection[sectionKey]?.length === 0) {
        delete state.selectedBySection[sectionKey];
      }
    },
    toggleSectionSelection: (
      state,
      action: PayloadAction<{
        sectionKey: string;
        sectionUris: string[];
      }>,
    ) => {
      const { sectionKey, sectionUris } = action.payload;

      const selected = state.selectedBySection[sectionKey] ?? [];

      const isFullySelected = selected.length === sectionUris.length;

      if (isFullySelected) {
        delete state.selectedBySection[sectionKey];
      } else {
        state.selectedBySection[sectionKey] = [...sectionUris];
      }
    },
  },
});

export const {
  enterSelectionMode,
  toggleImageSelection,
  toggleSectionSelection,
} = sectionActionsSlice.actions;

export const sectionActionsReducer = sectionActionsSlice.reducer;
