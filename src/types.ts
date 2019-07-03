export interface TOptions<TState, TAction> {
  name: string;
  reducer: (state: TState, action: TAction) => TState;
  initialState?: TState;
}
