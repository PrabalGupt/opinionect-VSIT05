import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
      hashes: [],
      articles: {
          
      }
  },
  reducers: {
      fetching: hashes => {
          hashes.forEach(async hash => {
              const cleanHash = hash.replace(/'/g, '');
            store.articles[hash] = await fetch(`https://gateway.pinata.cloud/ipfs/${cleanHash}`).then(res => res.ok && res.json()).then
          });
    }
  }
})

export const { incremented, decremented } = counterSlice.actions

const store = configureStore({
  reducer: counterSlice.reducer
})

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()))

// Still pass action objects to `dispatch`, but they're created for us
store.dispatch(incremented())
// {value: 1}
store.dispatch(incremented())
// {value: 2}
store.dispatch(decremented())
// {value: 1}