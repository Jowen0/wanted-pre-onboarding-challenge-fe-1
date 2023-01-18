# 과제 ) Redux 레포지토리에서 코드 분석하고 직접 scratch 작성해보기
- [https://github.com/reduxjs/redux/blob/master/src/createStore.ts](https://github.com/reduxjs/redux/blob/master/src/createStore.ts)

- Redux의 컨셉을 학습한다.

- createStore의 최소 구현체를 직접 작성해본다.

  1. createStore는 reducer를 인자로 받아 store를 리턴하는 함수다

  2. store는 subscribe(), dispatch(), getState()를 메서드로 가진 객체다

  3. reducer는 createStore의 내부 상태인 state와, action 객체를 인자로 받아 action type에 따라 로직을 처리한 후 새로운 state를 리턴하는 함수다

**최종 구현체**
```
const createStore = (reducer) => {

  let currentReducer = reducer;
  let currentState;
  let currentListners = [];

  const getState = () => {
    return currentState;
  };

  const dispatch = (action) => {
    currentState = currentReducer(currentState, action);
    currentListners.forEach(listner => lister());
    return action;
  };

  const subscribe = (listner) => {
    currentListners.push(listner);
    return () => {
      const index = currentListners.indexOf(listner);
      currentListners.slice(index, 1);
    }
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};
```
**Dispatch 구현부**
```
// redux/src/createStore.ts - line 257-270
try {
  isDispatching = true
  currentState = currentReducer(currentState, action)
} finally {
  isDispatching = false
}

const listeners = (currentListeners = nextListeners)
for (let i = 0; i < listeners.length; i++) {
  const listener = listeners[i]
  listener()
}

return action
```
**Subscribe 구현부**
```
// redux/src/createStore.ts - line 189-190
ensureCanMutateNextListeners()
nextListeners.push(listener)
```

# 참고자료
- [Redux 프로세스 이해](https://ko.redux.js.org/introduction/getting-started)
- [Subscribe 이해](https://velog.io/@gyrbs22/Redux-redux-%EA%B8%B0%EB%B3%B8-action-dispatch-subscribe)
