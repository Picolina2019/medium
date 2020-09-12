
import React, { useEffect } from 'react';
import useFetch from '../../../hooks/useFetch';
import Feed from '../../Feed';
import Pagination from '../../Pagination';
import { getPaginator, limit } from '../../../utils';
import { stringify } from 'query-string';
import PopularTags from '../../PopularTags';
import Loading from '../../Loading';
import Error from '../../Error'
import FeedToggler from '../../FeedToggler';


export default function TagFeed({location,match}) {
  const {offset,currentPage} = getPaginator(location.search);
  const tagName = match.params.slug
  const stringifiedParams = stringify({
    limit,
    offset,
    tag:tagName
  });
  const urlPage= match.url
  const url = `/articles?${stringifiedParams}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(url);
  useEffect(() => {
    doFetch();
  }, [doFetch,currentPage, tagName]);
  return (
    <div className='home-page'>
      <div className='banner'>
        <div className='container'>
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className='container page'>
          <div className='row'>
              <div className='col-md-9'>
                <FeedToggler tagName={tagName}   />
                  {isLoading && <Loading/> }
                  {error && <Error/>   }
                  {!isLoading && response && (
                   <>   
                  <Feed articles ={response.articles}/>
                  <Pagination total={response.articlesCount} limit={limit} url={urlPage}
                  currentPage={currentPage}/>
                  </>)}
              </div>
              <div className='col-md-3'><PopularTags/></div>
          </div>
      </div>
    </div>
  );
}
