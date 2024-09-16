import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeDemoPageFields {
    header?: EntryFieldTypes.Symbol;
    cta?: EntryFieldTypes.EntryLink<TypeVariationContainerSkeleton>;
}

export type TypeDemoPageSkeleton = EntrySkeletonType<TypeDemoPageFields, "demoPage">;
export type TypeDemoPage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeDemoPageSkeleton, Modifiers, Locales>;

export interface TypeVariationContainerFields {
    experimentId: EntryFieldTypes.Text;
    experiment: EntryFieldTypes.Object;
    meta: { [key: string]: string };
    variations: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
    resolvedVariation?: EntryFieldTypes.EntryLink<EntrySkeletonType>;
}

export type TypeVariationContainerSkeleton = EntrySkeletonType<TypeVariationContainerFields, "variationContainer">;
export type TypeVariationContainer<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeVariationContainerSkeleton, Modifiers, Locales>;
