import React, { useState, useEffect, useContext } from 'react';
import ArticleForm from '../../ArticleForm';
import useFetch from '../../../hooks/useFetch';
import { Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../../context/currentUser';

function CreateArticle() {
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const apiUrl = '/articles';
  const [currentUserState] = useContext(CurrentUserContext);
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  const handleSubmit = (article) => {
    doFetch({
      method: 'post',
      data: {
        article,
      },
    });
  };
  useEffect(() => {
    if (!response) {
      return;
    }
    setSuccessfulSubmit(true);
  }, [response]);

  if (successfulSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />;
  }

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <ArticleForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        errors={(error && error.errors) || {}}
      />
    </div>
  );
}

export default CreateArticle;
