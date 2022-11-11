/* eslint-disable no-unneeded-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { FileUpload } from '../../../components/FileUpload';
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';
import { selectState, selectUser } from '../../../store/user/userSlice';
import { createNews } from '../../../store/news/newsSlice';
import { Modal } from '../../../components/Modal';
import paths from '../../../utils/paths';
import '../Personal.scss';

export const CreateNews = () => {
  const [errModal, setErrModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const isAuth = useSelector(selectState);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [count, setCount] = useState(0);
  const [description, setDescription] = useState();
  const [files, setFiles] = useState([]);
  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  const createFormApartment = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    files.forEach((file) => formData.append('image', file));

    dispatch(createNews(formData)).then((res) => {
      if (res.payload.message === 'Success') {
        setSuccessModal(true);
      } else setErrModal(true);
    });
  };

  useEffect(() => {
    if (!user) {
      navigate(paths.home);
    }
  }, [user]);

  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    if (!title || !description || !files) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [title, description, files]);

  const editDescription = (comment) => {
    setDescription(comment);
    setCount(comment.length);
  };

  return (
    <div>
      <Header isAuth={isAuth} user={user} />
      <div className="create-apartment-container">
        <Button
          onClick={() => {
            navigate(-1);
          }}
          type="orange"
        >
          {'< Back'}
        </Button>
        <h4>Create news</h4>
        <form className="">
          <Input
            type="text"
            placeholder="Enter title"
            text="Title"
            maxLength="70"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div className="create-apartment-photo">
            <FileUpload
              files={files}
              setFiles={setFiles}
              removeFile={removeFile}
            />
          </div>
          <div className="create-apartment-description">
            <h4>Description</h4>
            <textarea
              className="textarea"
              type="text"
              placeholder="Enter description"
              maxLength="2500"
              onChange={(e) => {
                editDescription(e.target.value);
              }}
            />
            <div className="symbol-counter">
              {count}
              /2500
            </div>
          </div>
          <Button
            type="orange"
            onClick={createFormApartment}
            disabled={inputValid ? false : true}
            className={inputValid ? '' : 'disabled'}
          >
            Create
          </Button>
        </form>
      </div>
      <Footer />
      <Modal active={errModal} setActive={setErrModal}>
        <div className="input-container">
          <h4>Something went wrong. Try later</h4>
          <div className="modal-error-accept">
            <Button type="orange" onClick={() => setErrModal(false)}>
              Ok
            </Button>
          </div>
        </div>
      </Modal>
      <Modal active={successModal} setActive={setSuccessModal}>
        <div className="input-container">
          <h4>Success!</h4>
          <div className="modal-error-accept">
            <Button type="orange" onClick={() => setSuccessModal(false)}>
              Ok
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
