import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const links = [];

        this.props.pages.filter(page => page.show_nav).forEach((page, key) => {
            if (key !== 0) {
                links.push(" | ");
            }
            let link = '/';
            if (page.id !== 'home') {
                link += page.id;
            }
            links.push(<IndexLink key={page.id} to={link} activeClassName="active">{page.title}</IndexLink>);
        });
        return (
          <div>
              <nav>
                  {links}
              </nav>
          </div>
        );
    }

}
;

Header.propTypes = {
    loading: PropTypes.bool.isRequired,
    pages: PropTypes.array.isRequired
};

export default Header;