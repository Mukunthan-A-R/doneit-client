import { useEffect, useRef } from "react";

/**
 * useClickOutside
 * @param {function} onClickOutside - Callback when click is outside the ref element
 * @returns {object} ref to attach to the element
 */
export default function useClickOutside(onClickOutside) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside?.(event);
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [onClickOutside]);

  return ref;
}
