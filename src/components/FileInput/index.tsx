import React, { ChangeEvent } from 'react';
import './styles.scss';

type FileInputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fileName: string;
};

function FileInput({ onChange, fileName }: FileInputProps) {
  return (
    <div className="c-file-input">
      <h1 className="c-file-input__filename">
        {fileName ? fileName : 'Here goes the file name'}
      </h1>
      <input
        id="upload"
        type="file"
        accept="image/*"
        onChange={onChange}
        hidden
      />
      <label className="c-file-input__label" htmlFor="upload">
        Upload file
      </label>
    </div>
  );
}

export default FileInput;
