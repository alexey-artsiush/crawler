/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-unneeded-ternary */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './FileUpload.scss';

export const FileUpload = ({ files, setFiles, removeFile, multiple = '' }) => {
  const uploadHandler = (event) => {
    if (event.target.files.length) {
      const filesArray = [...files, ...Array.from(event.target.files)];

      filesArray.map((file) =>
        Object.assign(file, {
          id: Math.random() * Date.now(),
          preview: URL.createObjectURL(file),
        })
      );

      setFiles(filesArray);
    }
  };
  return (
    <div className="file-upload">
      <div className="file-inputs">
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={uploadHandler}
        />
        <button type="button">
          <i>
            <FontAwesomeIcon icon={faPlus} />
          </i>
          Upload
        </button>
      </div>

      <div className="file-upload-list">
        <ul className="file-list">
          {files
            ? files.map((file) => (
                <div key={file.name}>
                  <li className="file-item">
                    <img src={file.preview} alt={file.name} />
                    <div className="actions">
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => removeFile(file.name)}
                      />
                    </div>
                  </li>
                </div>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};
