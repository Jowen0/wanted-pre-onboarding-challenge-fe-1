<!-- # 자기소개서
안녕하세요 저는 2년차 개발자 장민우 입니다.  

React를 개발한 기간은 1년으로 챌린지를 통해서 프론트엔드 개발지식을 쌓는 것이 목표입니다.  

요즘 가장 관심을 가지고 있는 부분은 관심사 분리와 디자인 패턴을 활용한 디렉토리 구조 입니다.  

개발에 관한 다양한 의견은 언제든지 환영합니다. -->

# 프로젝트 일지
### 1/9 - CSS를 제외한 로직 구현에 집중(미적 감각이 부족한거 절대 아님!!!ㅎㅎㅠ) / 챌린지가 진행하는 동안 CSS 적용 예정  

### 1/11 - 강의 내용을 기반으로 코드 리팩토링
- 1. 관심사 분리가 모호한 부분을 리팩토링

```

```
** **
- 2. 타입스크립트의 타입 단언 없애기

**Before**
```
const getTodo = async (todoId: string) => {

  const authorization = localStorage.getItem("token") || '';
  const res = await useAxios.get(`${TODO_URL.TODOS}/${todoId}`, authorization);
  return res.data as TodoType;
};
```

**After**
```
const getTodo = async (todoId: string): Promise<TodoType> => {

  const authorization = localStorage.getItem("token") || '';
  const res = await useAxios.get(`${TODO_URL.TODOS}/${todoId}`, authorization);
  return res.data;
};
```
** **
- 3. 토큰 관련 애매한 소스 리팩토링: 토큰 값을 넘겨주는 것이 아닌데 state명이 token을 담아야 할것 같이 느껴짐

**Before**
```
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
// 토큰
const { hasToken, handleHasToken, getTokenFromLocalStorage } = useToken();

// 토큰 존재할 시 리다이렉트
const navigation = useNavigate();
useEffect(() => {
    if (hasToken || getTokenFromLocalStorage()) navigation(PAGE_URL.TODO);
}, [navigation, hasToken]);


// useToken Hook
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