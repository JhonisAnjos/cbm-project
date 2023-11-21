import React, { useEffect }  from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {useKeycloak} from '@react-keycloak/web'

export const AppTopbar = (props) => {

    const { keycloak } = useKeycloak();

    useEffect(() => {
    }, [keycloak.token]);

    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <h5 style={{margin:'auto'}}>CORPO DE BOMBEIROS- CBM</h5>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>
        

                <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                    <li>
                        <button  className="p-link layout-topbar-button" onClick={keycloak.logout}>
                            <i className="pi pi-sign-out"/>
                            <span>Sair</span>
                        </button>
                    </li>
                </ul>
        </div>
    );
}
