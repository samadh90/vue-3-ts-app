import type { NewUser } from "@/models/users";
import { defineStore } from "pinia";

interface UsersState {
  currentUserId?: string;
}

const CONTENT_TYPE = {
  "Content-Type": "application/json",
};

export const useUsers = defineStore("users", {
  state: (): UsersState => ({
    currentUserId: undefined,
  }),
  actions: {
    async authenticate() {
      try {
        const res = await window.fetch("/api/current-user", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();
        this.currentUserId = result.id;
      } catch (e) {
        this.currentUserId = undefined;
      }
    },
    async logout() {
      await window.fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return this.authenticate();
    },
    async createUser(newUser: NewUser) {
      const body = JSON.stringify(newUser);
      await window.fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      return this.authenticate();
    },
    async loginUser(username: string, password: string) {
      const body = JSON.stringify({ username: username, password: password });
      await window.fetch("/api/login", {
        method: "POST",
        headers: CONTENT_TYPE,
        body,
      });
      return this.authenticate();
    },
  },
});
