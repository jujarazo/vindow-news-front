import { createContext, useState } from 'react';

export type PopupContextType = {
  showPopup: boolean;
  imgUrl: string;
  handleShowPopup: (imgSrc: string) => void;
  handleClosePopup: () => void;
};

const PopupContext = createContext<PopupContextType>({} as PopupContextType);

export function PopupProvider({ children }: { children: JSX.Element }) {
  const [showPopup, setShowPopUp] = useState(false);
  const [imgUrl, setImageUrl] = useState('');

  const handleShowPopup = (imgSrc: string) => {
    setImageUrl(imgSrc);
    setShowPopUp(true);
  };

  const handleClosePopup = () => setShowPopUp(false);

  return (
    <PopupContext.Provider
      value={{ showPopup, imgUrl, handleClosePopup, handleShowPopup }}
    >
      {children}
    </PopupContext.Provider>
  );
}

export default PopupContext;
