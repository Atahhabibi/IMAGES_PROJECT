import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchImages } from "./util";
import { useGlobalContext } from "./context";



const Gallery = () => {
  const { searchTerm } = useGlobalContext();

  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await fetchImages.get("/search/photos", {
        params: { query: searchTerm }
      });
      return result.data;
    }
  });

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading.......</h4>
      </section>
    );
  }

  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error....</h4>
      </section>
    );
  }

  const results = response.data.results;

  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>NO RESULTS FOUND</h4>
      </section>
    );
  }

  return (
    <section className="image-container">
      {results.map((item) => {
        const url = item?.urls?.regular;

        return (
          <img
            src={url}
            key={item.id}
            alt={item.alt_description}
            className="img"
          />
        );
      })}
    </section>
  );
};

export default Gallery;
