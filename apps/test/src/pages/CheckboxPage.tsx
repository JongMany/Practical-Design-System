import { Checkbox } from "@acme/react";
import { useState } from "react";

export default function CheckboxPage() {
  // Checkbox 상태 관리
  const [checkboxStates, setCheckboxStates] = useState({
    basic: false,
    controlled: false,
  });

  const handleCheckboxChange =
    (key: keyof typeof checkboxStates) => (checked: boolean) => {
      setCheckboxStates((prev) => ({ ...prev, [key]: checked }));
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
        ☑️ 체크박스 컴포넌트
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          opacity: 0.8,
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        다양한 상태의 체크박스 컴포넌트를 확인해보세요.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        {/* 기본 Checkbox */}
        <Checkbox.Root
          className="CheckboxRoot"
          checked={checkboxStates.basic}
          id="c1"
          onCheckedChange={handleCheckboxChange("basic")}
        >
          <Checkbox.Indicator className="CheckboxIndicator">
            ✓
          </Checkbox.Indicator>
          <Checkbox.Label className="Label">
            Accept terms and conditions.
          </Checkbox.Label>
        </Checkbox.Root>

        {/* Controlled Checkbox */}
        <Checkbox.Root
          className="CheckboxRoot"
          checked={checkboxStates.controlled}
          id="c2"
          onCheckedChange={handleCheckboxChange("controlled")}
        >
          <Checkbox.Indicator className="CheckboxIndicator">
            ✓
          </Checkbox.Indicator>
          <Checkbox.Label className="Label">
            Controlled checkbox (현재 상태:{" "}
            {checkboxStates.controlled ? "체크됨" : "체크 안됨"})
          </Checkbox.Label>
        </Checkbox.Root>

        {/* Disabled Checkbox */}
        <Checkbox.Root className="CheckboxRoot" disabled={true} id="c4">
          <Checkbox.Indicator className="CheckboxIndicator">
            ✓
          </Checkbox.Indicator>
          <Checkbox.Label className="Label">Disabled checkbox</Checkbox.Label>
        </Checkbox.Root>

        {/* ReadOnly Checkbox */}
        <Checkbox.Root
          className="CheckboxRoot"
          readOnly={true}
          defaultChecked={true}
          id="c5"
        >
          <Checkbox.Indicator className="CheckboxIndicator">
            ✓
          </Checkbox.Indicator>
          <Checkbox.Label className="Label">ReadOnly checkbox</Checkbox.Label>
        </Checkbox.Root>
      </div>
    </div>
  );
}
