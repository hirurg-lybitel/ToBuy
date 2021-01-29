
import React from 'react';
import './app-header.scss';

const AppHeader = () => {
    return (
        <div className="header d-flex">
            <h3>
                {/*<Link to='/'>*/}
                    To buy app
                {/*</Link>*/}
            </h3>
            <ul className="d-flex">
                {/*<Link to='/people/'>*/}
                    <li>
                        Categories
                    </li>
                {/*</Link>*/}

                {/*<Link to='/planets/'>*/}
                {/*    <li>*/}
                {/*        Planets*/}
                {/*    </li>*/}
                {/*</Link>*/}
                {/**/}
                {/*<Link to='/starships/'>*/}
                {/*    <li>*/}
                {/*        Starships*/}
                {/*    </li>*/}
                {/*</Link>*/}
                {/*<Link to='/login'>*/}
                {/*    <li>*/}
                {/*        Login*/}
                {/*    </li>*/}
                {/*</Link>*/}
                {/*<Link to='/secret'>*/}
                {/*    <li>*/}
                {/*        Secret*/}
                {/*    </li>*/}
                {/*</Link>*/}
            </ul>
        </div>
    );
};

export default AppHeader;
