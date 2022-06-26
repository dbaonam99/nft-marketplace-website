const SITE_URL = "https://server.hayxem.tv";
// const SITE_URL = "http://localhost:5000";
const DASHBOARD = "dashboard";
const DOMAIN = "https://deeptv.to";
const CDN = "https://film-static.b-cdn.net";

const dev = {
  API_ENDPOINT_URL: `${SITE_URL}`,
  API_ENDPOINT_DASHBOARD_URL: `${SITE_URL}/${DASHBOARD}`,
  DOMAIN_URL: DOMAIN,
  CDN_URL: CDN
};

const prod = {
  API_ENDPOINT_URL: `${SITE_URL}`,
  API_ENDPOINT_DASHBOARD_URL: `${SITE_URL}/${DASHBOARD}`,
  DOMAIN_URL: DOMAIN,
  CDN_URL: CDN
};

const test = {
  API_ENDPOINT_URL: `${SITE_URL}`,
  API_ENDPOINT_DASHBOARD_URL: `${SITE_URL}/${DASHBOARD}`,
  DOMAIN_URL: DOMAIN,
  CDN_URL: CDN
};

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		case 'test':
			return test
		default:
			break;
	}
}

export const env = getEnv()
