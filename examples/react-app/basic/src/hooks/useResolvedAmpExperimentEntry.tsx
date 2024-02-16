// @ts-nocheck
import { useEffect, useState } from 'react';
import { contentfulClient, experiment } from '../index';
import { Entry, EntrySkeletonType, FieldsType } from 'contentful';

function parseData<T extends EntrySkeletonType<FieldsType, string>>(
  entry?: Entry<T, 'WITHOUT_UNRESOLVABLE_LINKS', string> | null,
) {
  if (!entry || entry.sys?.contentType?.sys?.type !== 'Link') return; // base case

  if (entry.sys?.contentType?.sys?.id === 'variationContainer') {
    const experimentKey = entry.fields.experimentId;
    if (experimentKey) {
      const { value: variantValue } = experiment.variant(experimentKey);
      if (variantValue) {
        const entryIdValue = entry.fields.meta[variantValue];
        const resolved = (entry.fields.variations ?? []).find((variation) => {
          return variation?.sys.id === entryIdValue;
        });
        entry.fields.resolvedVariation = resolved;
      }
    }
  }

  // another reference
  Object.keys(entry?.fields ?? {}).forEach((key) => {
    if (entry.fields[key]) {
      parseData(entry.fields[key]);
    }
  });
}

function useTranslateAmpExperimentContentfulEntry<
  T extends EntrySkeletonType<FieldsType, string>,
>(contentfulEntryId: string) {
  const [data, setData] = useState<Entry<
    T,
    'WITHOUT_UNRESOLVABLE_LINKS',
    string
  > | null>(null);

  useEffect(() => {
    const getContentfulEntry = async () => {
      const entry = await contentfulClient.withoutUnresolvableLinks.getEntry<T>(
        contentfulEntryId,
        {
          include: 10,
        },
      );
      return entry;
    };

    getContentfulEntry().then((entry) => {
      parseData(entry);
      console.log('parsed entry', entry);
      setData(entry);
    });
  }, [contentfulEntryId]);

  return data;
}

export { useTranslateAmpExperimentContentfulEntry };
