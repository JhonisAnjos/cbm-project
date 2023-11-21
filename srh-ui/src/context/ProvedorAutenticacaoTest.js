import React from 'react';
import Keycloak from 'keycloak-js'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import {config} from '../Constants'
import { httpClient } from '../service/ApiService';

export function ProvedorAutenticacaoTest( props) {


    const keycloak = new Keycloak({
        url: `${config.url.KEYCLOAK_BASE_URL}`,
        realm: 'cbm',
        clientId: 'cbm-ui'
    });
    
    const initOptions = { onLoad: 'login-required'};

    const handleOnEvent = async (event, error) => {
        if (event === 'onAuthSuccess' || event === 'onAuthRefreshSuccess') {
          if (keycloak.authenticated) {
            httpClient.defaults.headers['Authorization'] = `Bearer ${keycloak.token}`
          }
        }
      }

    const loadingComponent = (
        <div>
            Teste
        </div>
    )

    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={initOptions}
            LoadingComponent={loadingComponent}
            autoRefreshToken={true}
            onEvent={handleOnEvent}>
            {props.children}
        </ReactKeycloakProvider>
    )
}