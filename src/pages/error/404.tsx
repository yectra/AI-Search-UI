import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PageNotFound } from 'src/sections/error/not-found-view';

// ----------------------------------------------------------------------

const metadata = { title: `404 page not found! | Error - ${CONFIG.site.name}` };

type IProps = {
  url?: string;
};

export default function Page({ url }: IProps) {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PageNotFound url={url} />
    </>
  );
}
