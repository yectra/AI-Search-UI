import type React from 'react';

import { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { EventType } from '@azure/msal-browser';

import { endpoints, postFetcher } from 'src/utils/axios';

const MsalEventHandler: React.FC = () => {
  const { instance } = useMsal();

  useEffect(() => {
    const callbackId = instance.addEventCallback(async (event: any) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        const account = event.payload?.account;
        if (account) {
          try {
            const userPayload = {
              idTokenClaims: {
                jobTitle: account.username,
              },
              localAccountId: account.localAccountId,
            };
            await postFetcher([endpoints.auth.createUser, { data: userPayload }]);
          } catch (error) {
            console.error('Error during API call after login:', error);
          }
        }
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId); // Clean up the event listener
      }
    };
  }, [instance]);

  return null;
};

export default MsalEventHandler;
