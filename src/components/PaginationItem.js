import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom'

function PaginationItem({page,currentPage,url}) {
    const liClasses= classNames({
        'page-item':true,
        'active':currentPage===page
    })
    return (
        <li className={liClasses}>
            <Link to={`${url}?page=${page}`} className='page-link'>
                {page}
            </Link>
        </li>
    )
}

export default PaginationItem
