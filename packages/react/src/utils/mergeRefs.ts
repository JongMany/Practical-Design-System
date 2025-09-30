import { RefObject } from "react";

// 타입 가드 함수
function isMutableRefObject<T>(ref: React.Ref<T>): ref is RefObject<T> {
  return ref !== null && typeof ref === "object" && "current" in ref;
}

// { current: T | null }

export function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(node);
      } else if (isMutableRefObject(ref)) {
        ref.current = node;
      }
    });
  };
}
