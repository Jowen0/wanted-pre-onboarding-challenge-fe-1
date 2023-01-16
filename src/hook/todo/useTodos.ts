import { useCallback, } from "react";
import { useQueryClient } from "@tanstack/react-query";

// Type
import { TodoType } from "type/todo";
import { TODO_KEY } from "api/todo";

export const useTodos = () => {

    const queryClient = useQueryClient();

    const getQueryTodos = useCallback(() => {
        return queryClient.getQueryData<TodoType[]>(TODO_KEY.TODOS);
    }, [queryClient]);

    const refetchQueryTodos = useCallback(() => {
        return queryClient.refetchQueries(TODO_KEY.TODOS);
    },[queryClient]);

    const invalidateQueryTodos = useCallback(() => {
        return queryClient.invalidateQueries(TODO_KEY.TODOS);
    },[queryClient]);

    return {
        getQueryTodos,
        refetchQueryTodos,
        invalidateQueryTodos,
    };
};