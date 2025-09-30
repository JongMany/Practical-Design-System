import { createContext } from "../context/createContext";
import type { DialogContextValue } from "./types";

export const DIALOG_CONTEXT_NAME = "DialogContext";

/**
 * Dialog Context 생성
 * Dialog의 상태와 핸들러를 하위 컴포넌트들과 공유합니다.
 */
export const [DialogProvider, useDialogContext] =
  createContext<DialogContextValue>(DIALOG_CONTEXT_NAME);
