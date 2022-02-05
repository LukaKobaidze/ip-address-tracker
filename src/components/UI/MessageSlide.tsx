import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as IconX } from 'assets/images/icon-x.svg';
import 'styles/UI/MessageSlide.scss';

type Props = {
  message: string;

  // If `undefined`, it's not going to appear at all
  appearFor: number | 'always' | undefined;
};

const MessageSlide = ({ message, appearFor }: Props) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (!appearFor) {
      setIsShown(false);
      return;
    }

    setIsShown(true);
    if (appearFor === 'always') return;

    const timeout = setTimeout(() => {
      setIsShown(false);
    }, appearFor * 1000);

    return () => clearTimeout(timeout);
  }, [appearFor]);

  return createPortal(
    <div id="message">
      <div
        className={`message-slide ${
          isShown ? 'message-slide--show' : 'message-slide--hide'
        }`}
      >
        <div className="message-slide__icon-div">
          <IconX />
        </div>
        <div className="message-slide__text">
          <p>{message}</p>
        </div>
      </div>
    </div>,
    document.getElementById('root') as HTMLDivElement
  );
};

export default MessageSlide;
