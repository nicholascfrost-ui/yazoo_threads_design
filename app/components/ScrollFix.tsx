"use client";

import { useEffect } from "react";

export default function ScrollFix() {
  useEffect(() => {
    if (window.location.hash) {
      window.location.hash = "";
    }
  }, []);

  return null;
}
