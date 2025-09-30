import { RefObject } from "react";

// 타입 가드 함수
function isMutableRefObject<T>(
  ref: React.Ref<T | null>
): ref is RefObject<T | null> {
  return ref !== null && typeof ref === "object" && "current" in ref;
}

export function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined | null)[]
): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        // 함수형 ref인 경우 콜백 호출
        ref(node);
      } else if (isMutableRefObject(ref)) {
        // 객체형 ref인 경우 .current에 값 할당
        ref.current = node;
      }
    }
  };
}
