import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    //1 mengambil lokasi DOM dari element dengan ID moda
    const modalRoot = document.getElementById("modal");
    //2 appendChild, menambahkan childrennya yang diisi denga elRef.current (div)
    modalRoot.appendChild(elRef.current);

    //4 apa bila modalnya sudah selesai dipake/diclose
    //maka fungsi return ini akan dijalankan untuk menghapus/remove childrennya (elRef.current)
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  //3 menambahkan argumen 1 dari createPortal kedalam elREf.current (div)
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
