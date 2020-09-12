import React,{useEffect, useState, useContext} from 'react';
import useFetch from '../../../hooks/useFetch'
import ArticleForm from '../../ArticleForm';
import { Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../../context/currentUser';

function EditArticle({match}) {
    const slug = match.params.slug
    const apiUrl= `/articles/${slug}`
    const [currentUserState] = useContext(CurrentUserContext)
    const [{response:fetchArticleResponse}, doFetchArticle]=useFetch(apiUrl)
    const [{response:updateArticleResponse, error: updateArticleError}, doUpdateArticle]=useFetch(apiUrl)
    const [ initialValues, setInitialValues] = useState(null)
    const [isSuccessfulSubmit, setIsSuccessfulSubmit]= useState(false)
    const handleSubmit = article=>{
        doUpdateArticle({
            method:'put',
            data:{
                article
            }
        })
    }

    useEffect(()=>{
      doFetchArticle()
    },[doFetchArticle]);

    useEffect(()=>{
       if(!fetchArticleResponse){
           return
       }
       setInitialValues({
           title:fetchArticleResponse.article.title,
           description:fetchArticleResponse.article.description,
           body:fetchArticleResponse.article.body,
           tagList:fetchArticleResponse.article.tagList,

       })
    },[fetchArticleResponse])

    useEffect(()=>{
if(!updateArticleResponse){
    return
}
setIsSuccessfulSubmit(true)
    },[updateArticleResponse])

    if(isSuccessfulSubmit){
        return <Redirect to={`/articles/${slug}`}/>
        
    }
    if (currentUserState === false){
        return <Redirect to='/' />
    }
    return (
       <ArticleForm onSubmit={handleSubmit}
       errors={(updateArticleError && updateArticleError.errors) || {}}
       initialValues={initialValues}
       />
    )
}

export default EditArticle
