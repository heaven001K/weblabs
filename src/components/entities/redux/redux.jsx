import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i.name === item.name);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.items.push({ ...item, count: 1 });
            }
        },
        decreaseItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i.name === item.name);
            if (existingItem && existingItem.count > 1) {
                existingItem.count -= 1;
            } else {
                state.items = state.items.filter(i => i.name !== item.name);
            }
        },
        removeItem: (state, action) => {
            const name = action.payload;
            state.items = state.items.filter(item => item.name !== name);
        }
    }
});

export const { addItem, decreaseItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
