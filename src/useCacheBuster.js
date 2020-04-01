import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";

export const useCacheBuster = () => {
  const history = useHistory();

  const refreshCacheAndReload = () => {
    console.log('Clearing cache and hard reloading...')
    if (caches) {
      // Service worker cache should be cleared with caches.delete()
      caches.keys().then(function (names) {
        for (let name of names) caches.delete(name);
      });
    }
    // delete browser cache and hard reload
    window.location.reload(true);
  }

  useEffect(() => {
    const unlisten = history.listen(() => {
      fetch('/meta.json')
        .then((response) => response.json())
        .then((meta) => {
          const latestVersion = meta.version;
          const currentVersion = global.appVersion;
          const latestHash = meta.deploymentHash
          const currentHash = global.deploymentHash;

          const shouldForceRefresh = (currentHash !== latestHash)
          if (shouldForceRefresh) {
            console.log(`New version: ${latestHash}. Old version: ${currentHash} Should force refresh`);
            refreshCacheAndReload()
          } else {
            console.log(`You already have the latest version - ${latestHash}. No cache refresh needed.`);
          }
        });
    });
    return () => {
      unlisten();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}