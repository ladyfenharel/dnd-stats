import { useEffect } from "react";

function DNDData({ dataType, onDataFetched, documentSlugFilter }) {
  useEffect(() => {
    let apiUrl = `https://api.open5e.com/v1/${dataType}/`;
    const queryParams = new URLSearchParams();

    if (documentSlugFilter) {
      queryParams.append('document__slug', documentSlugFilter);
    }

    if (queryParams.toString()) {
      apiUrl += `?${queryParams}`;
    }

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        onDataFetched(data.results);
      })
      .catch(error => console.error(`Error fetching ${dataType}:`, error));
  }, [dataType, onDataFetched, documentSlugFilter]); // Re-fetch when documentSlugFilter changes

  return null;
}

export default DNDData;