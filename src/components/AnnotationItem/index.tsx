import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useClickOutside } from 'react-click-outside-hook';
import clsx from 'clsx';
import type { Annotation, AnnotationPos } from '@typings/annotation';
import { getPosition } from '@utils/index';
import Popup from './Popup';
import './styles.scss';

type AnnotationProps = {
  opened: boolean;
  data: Annotation;
  coords: AnnotationPos;
  postAnnotation: (id: number, comment: string) => void;
  deleteAnnotation: (id: number) => void;
  handleClick: (id: number) => void;
};

function AnnotationItem({
  data,
  coords,
  opened,
  postAnnotation,
  deleteAnnotation,
  handleClick,
}: AnnotationProps) {
  const [input, setInput] = useState<string>('');
  const [ref, hasClickedOutside] = useClickOutside();

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    postAnnotation(data.id, input);
  }

  function handleClickOutside() {
    if (!data.comment) {
      deleteAnnotation(data.id);
    }
    handleClick(null);
  }

  useEffect(() => {
    if (hasClickedOutside && opened) {
      handleClickOutside();
    }
  }, [hasClickedOutside]);

  return (
    <div
      ref={ref}
      className="annotation-item"
      style={{
        top: getPosition(coords.y),
        left: getPosition(coords.x),
      }}
    >
      <div
        className={clsx('annotation-item__badge', {
          'badge-big-index': data.id > 9,
        })}
        onClick={() => handleClick(data.id)}
      >
        <span className="annotation-item__badge__text">{data.id}</span>
      </div>
      {opened && (
        <Popup
          data={data}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          deleteAnnotation={deleteAnnotation}
          input={input}
        />
      )}
    </div>
  );
}

export default AnnotationItem;
