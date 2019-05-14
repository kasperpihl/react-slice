# React Slice
A simple approach to global state
- Key is only
- You register reducers on a unique key
- 

## Installation
```
npm i react-slice
```

## Setting up
Add the provider in your code similar to Redux and others
Probably index or App.js
```
import { SliceProvider } from 'react-slice';

render(
  <SliceProvider>
    <App>
  </SliceProvider>
)
```

**SliceProvider props**
| Prop name | type | Default value | Description |
| --- | --- | --- | --- |
| debug | bool | false | Enable the debug logger to see what's going on 🚀 |

## Registering Reducers
To manage your global state, register your reducers with initial state
```
import { registerSlice } from 'react-slice'


```