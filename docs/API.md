# API

The API only exposes one function right now `createSliceHook(options)`

It returns a hook, and takes an options object like this:

| Name         | Type                    | Default value | Description                                           |
| ------------ | ----------------------- | ------------- | ----------------------------------------------------- |
| name         | string                  | **required**  | A name to show in the debug log, redux-logger style   |
| reducer      | function(state, action) | **required**  | A standard reducer taking 2 arguments: state & action |
| initialState | any                     | undefined     | The initial value of the state                        |

The hook it returns looks like this:

`useCounterSlice(updateDepFn?: (state) => [...deps]): [state, dispatch]`

| Name        | Type           | Default value | Description                                                  |
| ----------- | -------------- | ------------- | ------------------------------------------------------------ |
| updateDepFn | (state) => []) | null          | A function that return array of values to check for equality |
