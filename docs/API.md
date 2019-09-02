# API

The API only exposes one function right now `createSliceHook(options)`

It returns an object, and takes an options object like this:

| Name         | Type                    | Default value | Description                                           |
| ------------ | ----------------------- | ------------- | ----------------------------------------------------- |
| reducer      | function(state, action) | **required**  | A standard reducer taking 2 arguments: state & action |
| initialState | any                     | undefined     | The initial value of the state                        |
| debugName    | string                  | Random name   | A name to show in the debug log, redux-logger style   |

The Object it returns looks like this:

```js
{
  use: (updateDepFn?: (state) => [...deps]) => state // 👈 this is a hook 💪
  getState: () => state,
  dispatch: (action) => void,
  subscribe: (callback: () => void)
}
```
