import { useEffect, useState } from "react";

export function useGridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKey = (event) => {
      const typing = event.target.closest("input, textarea, [contenteditable]");
      if (typing) return;
      if (event.key === "g" || event.key === "G") {
        setVisible((value) => !value);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return { visible, toggle: () => setVisible((value) => !value) };
}
