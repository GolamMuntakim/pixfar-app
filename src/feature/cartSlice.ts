import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostProducts } from "../service/get";

interface CartState {
    items: PostProducts[];
    products: PostProducts[];  
    searchQuery: string;        
}

const initialState: CartState = {
    items: [],
    products: [],          
    searchQuery: '',       
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<PostProducts>) => {
            state.items.push(action.payload);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        setCart: (state, action: PayloadAction<PostProducts[]>) => {
            state.items = action.payload;
        },
        removeCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        setProducts: (state, action: PayloadAction<PostProducts[]>) => {
            state.products = action.payload; 
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;  
        }
    }
})

export const { addToCart, setCart, removeCart, setProducts, setSearchQuery } = cartSlice.actions;
export default cartSlice.reducer;
