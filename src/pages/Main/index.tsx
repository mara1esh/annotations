import React, { useState, ChangeEvent, useEffect } from 'react';
import Canvas from '@components/Canvas';
import FileInput from '@components/FileInput';
import MouseIcon from '@icons/ic_mouse.svg';
import PlusIcon from '@icons/ic_plus.svg';
import useAnnotations from '@hooks/useAnnotations';
import type { FileImage } from '@typings/file';
import './styles.scss';

function Main() {
  const [fileImage, setFileImage] = useState<FileImage>({
    name: null,
    blob: null,
  });
  const {
    annotations,
    fetchAnnotations,
    createDraft,
    deleteAnnotation,
    postAnnotation,
  } = useAnnotations();

  useEffect(() => {
    fetchAnnotations();
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
    if (files.length) {
      try {
        const img = files[0];
        setFileImage({
          name: img.name,
          blob: URL.createObjectURL(img),
        });
      } catch (error) {
        console.error('[Uploading error]', error);
      }
    }
  }

  return (
    <div className="p-main">
      <FileInput onChange={handleChange} fileName={fileImage.name} />
      <Canvas
        fileImage={fileImage}
        annotations={annotations}
        createDraft={createDraft}
        postAnnotation={postAnnotation}
        deleteAnnotation={deleteAnnotation}
      />
      <p className="p-main__helper-text">
        To leave a comment, mouseover
        <MouseIcon />
        on an image and click the left mouse button
        <PlusIcon />
      </p>
    </div>
  );
}

export default Main;
