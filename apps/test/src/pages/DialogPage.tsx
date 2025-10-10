import { useState, useRef } from "react";
import { Dialog, type DialogRootRef } from "@acme/react";

export default function DialogPage() {
  const [controlledDialogOpen, setControlledDialogOpen] = useState(false);
  const dialogRef = useRef<DialogRootRef>(null);

  // 외부에서 Dialog 제어하는 함수들
  const openDialogExternally = () => {
    dialogRef.current?.open();
  };

  const closeDialogExternally = () => {
    dialogRef.current?.close();
  };

  const toggleDialogExternally = () => {
    dialogRef.current?.toggle();
  };

  const setDialogStateExternally = (open: boolean) => {
    dialogRef.current?.setOpen(open);
  };

  return (
    <div style={{ padding: "48px 32px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "16px",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        💬 다이얼로그 컴포넌트
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          opacity: 0.8,
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        다양한 다이얼로그 컴포넌트를 확인해보세요.
      </p>

      <div
        style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Dialog.Root>
          <Dialog.Trigger>기본 다이얼로그</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay>
              <Dialog.Content>
                <Dialog.Title>기본 다이얼로그</Dialog.Title>
                <Dialog.Description>
                  오버레이를 클릭하면 닫힙니다.
                </Dialog.Description>
                <Dialog.Close>닫기</Dialog.Close>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>

        {/* 오버레이 클릭으로 닫기 불가능한 Dialog */}
        <Dialog.Root closeOnOutsideClick={false}>
          <Dialog.Trigger>오버레이 클릭 불가</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay>
              <Dialog.Content>
                <Dialog.Title>오버레이 클릭 불가</Dialog.Title>
                <Dialog.Description>
                  오버레이를 클릭해도 닫히지 않습니다. 닫기 버튼이나 Escape 키를
                  사용하세요.
                </Dialog.Description>
                <Dialog.Close>닫기</Dialog.Close>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>

        {/* Escape 키로도 닫기 불가능한 Dialog */}
        <Dialog.Root closeOnOutsideClick={false} closeOnEscape={false}>
          <Dialog.Trigger>강제 다이얼로그</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay>
              <Dialog.Content>
                <Dialog.Title>강제 다이얼로그</Dialog.Title>
                <Dialog.Description>
                  오버레이 클릭과 Escape 키로 닫을 수 없습니다. 반드시 닫기
                  버튼을 사용하세요.
                </Dialog.Description>
                <Dialog.Close>닫기</Dialog.Close>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* 외부 제어 Dialog */}
      <div style={{ marginTop: "32px" }}>
        <h3>외부 제어 Dialog</h3>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={openDialogExternally}
            className="ds-btn ds-btn-primary"
          >
            열기
          </button>
          <button
            onClick={closeDialogExternally}
            className="ds-btn ds-btn-secondary"
          >
            닫기
          </button>
          <button
            onClick={toggleDialogExternally}
            className="ds-btn ds-btn-ghost"
          >
            토글
          </button>
          <button
            onClick={() => setDialogStateExternally(true)}
            className="ds-btn ds-btn-outline"
          >
            강제 열기
          </button>
          <button
            onClick={() => setDialogStateExternally(false)}
            className="ds-btn ds-btn-outline"
          >
            강제 닫기
          </button>
        </div>

        <Dialog.Root ref={dialogRef}>
          <Dialog.Trigger>외부 제어 다이얼로그</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay>
              <Dialog.Content>
                <Dialog.Title>외부 제어 다이얼로그</Dialog.Title>
                <Dialog.Description>
                  이 다이얼로그는 내부 버튼들로 제어할 수 있습니다. ref를 통해
                  직접 상태를 조작할 수 있습니다.
                </Dialog.Description>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <Dialog.Close>닫기</Dialog.Close>
                  <button
                    onClick={() => dialogRef.current?.toggle()}
                    className="ds-btn ds-btn-secondary"
                  >
                    토글
                  </button>
                  <button
                    onClick={openDialogExternally}
                    className="ds-btn ds-btn-primary"
                  >
                    열기
                  </button>
                  <button
                    onClick={closeDialogExternally}
                    className="ds-btn ds-btn-secondary"
                  >
                    닫기
                  </button>
                  <button
                    onClick={toggleDialogExternally}
                    className="ds-btn ds-btn-ghost"
                  >
                    토글
                  </button>
                  <button
                    onClick={() => setDialogStateExternally(true)}
                    className="ds-btn ds-btn-outline"
                  >
                    강제 열기
                  </button>
                  <button
                    onClick={() => setDialogStateExternally(false)}
                    className="ds-btn ds-btn-outline"
                  >
                    강제 닫기
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Controlled Dialog 예제 */}
      <div style={{ marginTop: "32px" }}>
        <h3>Controlled Dialog (onOpenChange 사용)</h3>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={() => setControlledDialogOpen(true)}
            className="ds-btn ds-btn-primary"
          >
            열기
          </button>
          <button
            onClick={() => setControlledDialogOpen(false)}
            className="ds-btn ds-btn-secondary"
          >
            닫기
          </button>
          <button
            onClick={() => setControlledDialogOpen(!controlledDialogOpen)}
            className="ds-btn ds-btn-ghost"
          >
            토글
          </button>
        </div>

        <Dialog.Root
          open={controlledDialogOpen}
          onOpenChange={setControlledDialogOpen}
        >
          <Dialog.Trigger>Controlled 다이얼로그</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay>
              <Dialog.Content>
                <Dialog.Title>Controlled 다이얼로그</Dialog.Title>
                <Dialog.Description>
                  이 다이얼로그는 open prop과 onOpenChange로 제어됩니다. 내부
                  버튼들로 상태를 조작할 수 있습니다.
                </Dialog.Description>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <Dialog.Close>닫기</Dialog.Close>
                  <button
                    onClick={() =>
                      setControlledDialogOpen(!controlledDialogOpen)
                    }
                    className="ds-btn ds-btn-secondary"
                  >
                    토글
                  </button>
                  <button
                    onClick={() => setControlledDialogOpen(true)}
                    className="ds-btn ds-btn-primary"
                  >
                    열기
                  </button>
                  <button
                    onClick={() => setControlledDialogOpen(false)}
                    className="ds-btn ds-btn-secondary"
                  >
                    닫기
                  </button>
                  <button
                    onClick={() =>
                      setControlledDialogOpen(!controlledDialogOpen)
                    }
                    className="ds-btn ds-btn-ghost"
                  >
                    토글
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
