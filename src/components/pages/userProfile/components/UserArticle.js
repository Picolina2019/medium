import React, { useEffect } from 'react';
import { getPaginator, limit } from '../../../../utils';
import useFetch from '../../../../hooks/useFetch';
import { stringify } from 'query-string';
import Feed from '../../../Feed';
import Pagination from '../../../Pagination';
import Loading from '../../../Loading';
import Error from '../../../Error';

const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username };

  return `/articles?${stringify(params)}`;
};
function UserArticle({ username, location, isFavorites, url }) {
  const { offset, currentPage } = getPaginator(location.search);
  const apiUrl = getApiUrl({ username, offset, isFavorites });
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites]);
  return (
    <div>
      {isLoading && <Loading />}
      {error && <Error />}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={url}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
}

export default UserArticle;
