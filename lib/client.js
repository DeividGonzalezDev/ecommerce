import { createClient } from "next-sanity";

import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: "xklx3611",
  dataset: "production",
  apiVersion: "2023-04-16",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source)=> {
  return builder.image(source).auto('format').url()
}