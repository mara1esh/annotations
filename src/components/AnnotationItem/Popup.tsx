import React, { FormEvent, ChangeEvent, useEffect, useRef } from 'react';
import TrashIcon from '@icons/ic_trash.svg';
import SendIcon from '@icons/ic_send.svg';
import type { Annotation } from '@typings/annotation';
import { getLetterAvatar } from '@utils/index';
import './styles.scss';

type PopupProps = {
  data: Annotation;
  input: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  deleteAnnotation: (id: number) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};
function Popup({
  data,
  input,
  handleSubmit,
  handleInput,
  deleteAnnotation,
}: PopupProps) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!data.comment) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="annotation-item-popup">
      {!data.comment ? (
        <form onSubmit={handleSubmit} className="annotation-item-popup-form">
          <div className="annotation-item-popup-form__wrapper">
            <input
              className="annotation-item-popup-form__input"
              placeholder="Leave a comment"
              ref={inputRef}
              multiple
              value={input}
              onChange={handleInput}
            />
            <button type="submit" className="btn-transparent">
              <SendIcon />
            </button>
          </div>
        </form>
      ) : (
        <div className="annotation-item-popup-content">
          <div className="annotation-item-popup-content__wrapper">
            <div className="annotation-item-popup-content__wrapper__avatar">
              <span>{getLetterAvatar(data.author)}</span>
            </div>
            <div className="annotation-item-popup-content__wrapper__box">
              <p>{data.author}</p>
              <span>{data.comment}</span>
            </div>
          </div>
          <button
            className="annotation-item-popup-content__btn-remove btn-transparent"
            onClick={() => deleteAnnotation(data.id)}
          >
            <TrashIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default Popup;
