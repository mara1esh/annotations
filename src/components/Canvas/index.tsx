import React, { useRef, useState } from 'react';
import useMouse from '@react-hook/mouse-position';
import { useMediaQuery } from 'react-responsive';
import AnnotationItem from '@components/AnnotationItem';
import PreloadImage from '@images/preload_image.png';
import { Annotation, AnnotationPos } from '@typings/annotation';
import type { FileImage } from '@typings/file';
import './styles.scss';

type CanvasProps = {
  fileImage: FileImage;
  annotations: Annotation[];
  createDraft: (pos: AnnotationPos) => number;
  postAnnotation: (id: number, comment: string) => void;
  deleteAnnotation: (id: number) => void;
};

function Canvas({
  fileImage,
  annotations,
  createDraft,
  postAnnotation,
  deleteAnnotation,
}: CanvasProps) {
  const imageRef = useRef(null);
  const [opened, setOpenState] = useState<number>(null);
  const mouse = useMouse(imageRef);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1024px)',
  });

  async function handleAdd() {
    const x = +(mouse.x / mouse.elementWidth).toFixed(4);
    const y = +(mouse.y / mouse.elementHeight).toFixed(4);
    const draftId = createDraft({ x, y });
    handleOpen(draftId);
  }

  function handleOpen(id: number) {
    setOpenState(id);
  }

  return (
    <div className="c-canvas">
      <div className="c-canvas__content">
        <img
          ref={imageRef}
          onClick={isDesktopOrLaptop ? () => handleAdd() : null}
          onTouchEnd={!isDesktopOrLaptop ? () => handleAdd() : null}
          className="c-canvas__image"
          src={fileImage.blob ?? PreloadImage}
        />
        {annotations.map((i) => (
          <AnnotationItem
            handleClick={handleOpen}
            opened={opened === i.id}
            postAnnotation={postAnnotation}
            deleteAnnotation={deleteAnnotation}
            key={i.pos.x}
            data={i}
            coords={i.pos}
          />
        ))}
      </div>
    </div>
  );
}

export default Canvas;
