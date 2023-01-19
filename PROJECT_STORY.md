# 개발 및 과제 일지
### 1/9 - CSS를 제외한 로직 구현에 집중(미적 감각이 부족한거 절대 아님!!!ㅎㅎㅠ) / 챌린지가 진행하는 동안 CSS 적용 예정  

### 1/11 - 강의 내용을 기반으로 코드 리팩토링 ver 1.0
- 타입스크립트의 타입 단언 없애기

**Before**
```
// api/auth.ts

const getTodo = async (todoId: string) => {

  const authorization = localStorage.getItem("token") || '';
  const res = await useAxios.get(`${TODO_URL.TODOS}/${todoId}`, authorization);
  return res.data as TodoType;
};
```

**After**
```
// api/auth.ts

const getTodo = async (todoId: string): Promise<TodoType> => {

  const authorization = localStorage.getItem("token") || '';
  const res = await useAxios.get(`${TODO_URL.TODOS}/${todoId}`, authorization);
  return res.data;
};
```
** **
- 토큰 관련 애매한 소스 리팩토링: 토큰 값을 넘겨주는 것이 아닌데 state명이 token을 담아야 할것 같이 느껴짐  
**Before**
```
// pages/auth/index.tsx

// 토큰 존재할 시 리다이렉트
const [token, setToken] = useState('');
const handleToken = (token: string) => {
    setToken(token);
};

const navigation = useNavigate();
useEffect(() => {
    if (token || localStorage.getItem('token')) navigation(PAGE_URL.TODO);
}, [navigation, token]);
```

**After**
```
// pages/auth/index.tsx

// 토큰
const { hasToken, handleHasToken, getTokenFromLocalStorage } = useToken();

// 토큰 존재할 시 리다이렉트
const navigation = useNavigate();
useEffect(() => {
    if (hasToken || getTokenFromLocalStorage()) navigation(PAGE_URL.TODO);
}, [navigation, hasToken]);


// hook/auth/useAuth.ts

export const useToken = (defaultHasToken?: boolean) => {

    const [hasToken, setHasToken] = useState(defaultHasToken || false);

    const handleHasToken = useCallback((hasToken: boolean) => {
        setHasToken(hasToken);
    }, [setHasToken]);

    const getTokenFromLocalStorage = useCallback(() => {
        return localStorage.getItem(TOKEN_KEY);
    }, []);

    const setTokenInLocalStorage = useCallback((token: string) => {
        localStorage.setItem(TOKEN_KEY, token);
    }, []);

    const removeTokenInLocalSotrage = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
    }, []);

    return {
        hasToken,
        handleHasToken,
        getTokenFromLocalStorage,
        setTokenInLocalStorage,
        removeTokenInLocalSotrage,
    };
};
```

### 1/16 - 강의 내용을 기반으로 코드 리팩토링 ver 2.0
- React Query 적용해서 API 호출  
[#a801c0e](https://github.com/Jowen0/wanted-pre-onboarding-challenge-fe-1/commit/d184879baed6068a147a1ffce636968a8e3c83f9)

### 1/17 - Redux 레포지토리에서 코드 분석하고 직접 scratch 작성해보기  
- [SCRATCH.md](https://github.com/Jowen0/wanted-pre-onboarding-challenge-fe-1/blob/master/SCRATCH.md)

### 1/19 - ‘개발자로서의 나’ 특징 정의해보기
- 나는 왜 개발자를 하고 싶은가?
```
1. 개발하는 일이 즐겁다. 개발에 몰두한 채 몇시간이 지난 후면 항상 드는 생각은 '나는 개발을 좋아한다'이다.
```

- 나는 개발자로서 사회 / 회사에 어떤 가치를 더해보고 싶은가?
```
1. 사회적으로는 무질서한 현상을 해결할 수 있는 서비스를, 회사에는 좋은 기업문화를 형성할 수 있는 가치를 더해보고 싶다.
```

- 나는 어떠한 장점 / 단점을 가지고 있는 ‘개발자’인가?
```
// 장점
1. 책임감 있다. 내가 맡은 일은 책임지고 마무리 짓는다.
2. 겸손하다. 내 개발 방향이 옳다는 생각만 하지 않고, 다른 사람의 개발 방향도 옳다고 생각한다. 
   의견이 다르다면 각각의 장점으로 시너지를 이룰 수 있을 것이라고 생각한다.

// 단점
1. 해결되지 않는 일에 집중하다 보면 전체를 보는 것을 깜빡할 때가 있다.
2. 글 작성을 잘 못한다.
```

- 나는 어떤 상황에서 동기부여 되고, 스스로 동기부여를 찾는 편인가?
```
1. 개발 문제를 해결하기 위해 여러 사이트를 검색하다가 도움을 받았을 때, 나도 저들 처럼 누군가에게 도움이 되고 싶다는 생각이 든다.
2. 내가 모르는 개발 개념이 나왔을 때, 스스로를 자책하기도 하고 채찍질해서 더 열심히 하자고 생각한다.
3. 나보다 경력이 낮은 사람이 더 개발을 잘 하는 경우를 상상할 때, 물론 더 잘 할 수 있지만 그래도 뒤쳐지고 싶지 않다.
```

- 나는 그동안 어떤 방면 / 방식으로 노력해온 사람인가?
```
1. 실제로 기술을 Docs를 보고 쓴 후, 개념을 같이 봐야 소스가 이해되는 스타일이다.
2. 안되는 문제를 물어보기 전에 그것에 대한 개념을 숙지하고, 구체적인 부분을 물어보려고 노력하는 스타일이다.
```