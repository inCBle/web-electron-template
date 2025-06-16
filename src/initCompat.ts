import type { ElectronAPI } from "typings/global";
import { isNull } from "@/utils/is";
import { router } from "./router";

const warnEnvironmentalError = <T>(): T => {
  console.warn("执行错误：请检查是否为electron环境");
  return null as T;
};

export function initCompat() {
  const electronAPI: ElectronAPI = {
    setTitle: (title: string) => {
      document.title = title;
    },
    getTitle: () => {
      return Promise.resolve(document.title);
    },
    onMessage: warnEnvironmentalError,
    sendMessage: warnEnvironmentalError,
    openLoginView: () => {
      router.push("/login");
    },
    login: warnEnvironmentalError,
    postMessage: warnEnvironmentalError,
  };

  globalThis.electron = new Proxy<ElectronAPI>(globalThis?.electron || {}, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);

      if (isNull(res))
        return (
          electronAPI as ElectronAPI & { [key: string | symbol]: unknown }
        )[key];

      return res;
    },
  });
}
