import create from "zustand";
import { useQuery, gql } from "@apollo/client";
import { Todo } from "../model/Todo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { apolloClient } from "../pages/_app";
import { getToken } from "./authStore";
import { logger } from "../config/logging";

interface TodoState {
  todos: Todo[];
  getTodos: any;
  addTodo: (body: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, body: String, completed: boolean) => void;
}

export const useStore = create<TodoState>((set) => ({
  // initial state
  todos: [],
  // methods for manipulating state
  getTodos: async () => {
    try {
      const QUERY = gql`
        {
          todos {
            id
            body
            completed
          }
        }
      `;
      const response = await apolloClient.query({
        query: QUERY,
        context: {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      });
      logger.info("latestTodos", response);

      set({ todos: response.data.todos });
      return response.data;
    } catch (error: any) {
      toast.error(error.message);
    }
  },
  addTodo: async (body: String) => {
    try {
      const QUERY = gql`
mutation {
  createTodo(
    createTodoInput: {
      body: "${body}"
    }
  ) {
    id
    body
    completed
  }
}
    `;
      const response = await apolloClient.mutate({
        mutation: QUERY,
        context: {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      });

      toast.success("todo registered successfully");
      set((state) => ({
        todos: [...state.todos, response.data],
      }));
    } catch (error: any) {
      toast.error(error.message);
    }
  },
  removeTodo: async (id) => {
    try {
      const QUERY = gql`
mutation {
  removeTodo(id: "${id}") {
    id
    body
    completed
  }
}
    `;
      const response = await apolloClient.mutate({
        mutation: QUERY,
        context: {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      });
      logger.info("updatetodo", response.data);

      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
      toast.success("Todo deleted successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  },
  updateTodo: async (id, body, completed) => {
    try {
      const QUERY = gql`
    mutation {
      updateTodo(
        updateTodoInput: {
          id: "${id}"
          body: "${body}"
          completed: ${completed}
        }
      ) {
        id
        body
        completed
      }
    }
        `;
      const response = await apolloClient.mutate({
        mutation: QUERY,
        context: {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      });
      logger.info("updatetodo", response.data.updateTodo);
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id
            ? ({ ...todo, completed: completed, body: body } as Todo)
            : todo
        ),
      }));
      toast.success("Note updated successfully.");
    } catch (error: any) {
      toast.error(error.message);
    }
  },
}));
