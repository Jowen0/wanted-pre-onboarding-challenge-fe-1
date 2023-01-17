# 프로젝트 일지
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