import { getDatabase } from 'lib/services/notion/common/database';
import { NOTION_LINK_SHORTENER_DATABASE_ID } from 'lib/services/notion/constants';
import type {
  PropertyValueNumber,
  PropertyValueUrl,
} from 'lib/services/notion/types';

import type { ShortenedUrlEntry } from './types';

export const getUrl = async (
  slug: string
): Promise<Partial<ShortenedUrlEntry>> => {
  const result = await getDatabase({
    database_id: NOTION_LINK_SHORTENER_DATABASE_ID,
    filter: {
      property: 'slug',
      rich_text: { equals: slug },
    },
  });
  const entry = result[0];
  return {
    id: entry?.id,
    url: (entry?.properties.url as PropertyValueUrl)?.url ?? '',
    clicks: (entry?.properties.clicks as PropertyValueNumber)?.number ?? 0,
  };
};
