import React, {PropTypes} from 'react';
import {IndexLink} from 'react-router';

/**
 * Header Component
 * @param pages Array with pages
 * @returns {*} React Component
 * @constructor
 */
const Header = ({pages}) => {
    const links = pages.filter(page => page.show_nav).map((page, key) => { // Filter out pages with the show_nav property set to false and map remaining pages to header links
        let link = '/';
        if (page.id !== 'home') { // Home link should be just a /, not /home
            link += page.id;
        }
        return (key !== 0 ? ' | ' : '') + <IndexLink key={page.id} to={link} activeClassName="active">{page.title}</IndexLink>;
    });
    return (
      <div>
          <nav>
              {links}
          </nav>
      </div>
    );
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired,
    pages: PropTypes.array.isRequired
};

export default Header;