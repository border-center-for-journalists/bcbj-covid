import Prismic from "prismic-javascript";
import PrismicDOM from 'prismic-dom';

let apiEndpoint = customkeys['PRISMIC_API_URL'];
let accessToken = customkeys['PRISMIC_API_KEY'];
const prismicClient = Prismic.client(apiEndpoint, { accessToken });

export default prismicClient

async function getData(type, pageSize = 1000, orderParam = 'publish_date') {
  return await prismicClient.query(
    Prismic.Predicates.at("document.type", type),
    {
      pageSize,
      orderings: `[my.${type}.${orderParam} desc]`
    }
  );
}

export const getMunicipalities = async () => {
  return await getData('municipios');
}

export const getResourceTypes = async () => {
  return await getData('covidresourcetype');
}

export const getResources = async (municipalityId, pageSize = 100, page = 1) => {
  //return await getData('covidresource', 100, 'date');
  return await prismicClient.query(
    [
      Prismic.Predicates.at("document.type", 'covidresource'),
      Prismic.Predicates.at('my.covidresource.municipality', municipalityId)
    ],
    {
      pageSize,
      page,
      orderings: `[my.covidresource.date desc]`
    }
  );
}