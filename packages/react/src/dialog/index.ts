import { DialogRoot } from "./DialogRoot";
import { DialogOverlay } from "./DialogOverlay";
import { DialogContent } from "./DialogContent";
import { DialogTitle } from "./DialogTitle";
import { DialogDescription } from "./DialogDescription";
import { DialogClose } from "./DialogClose";
import { DialogTrigger } from "./DialogTrigger";
import { DialogPortal } from "./DialogPortal";

// 타입 export
export type { DialogRootRef } from "./types";

const Dialog = Object.assign(
  {},
  {
    Root: DialogRoot,
    Overlay: DialogOverlay,
    Content: DialogContent,
    Title: DialogTitle,
    Description: DialogDescription,
    Close: DialogClose,
    Trigger: DialogTrigger,
    Portal: DialogPortal,
  }
);

export default Dialog;
