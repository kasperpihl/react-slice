export interface TOptions<TState, TAction> {
  reducer: (state: TState, action: TAction) => TState;
  initialState?: TState;
  debugName?: string;
}
