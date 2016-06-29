import defined from 'defined';
import cloneDeep from 'lodash/cloneDeep';

import createFieldByLanguageFinder, {findFallbackTranslation} from './createFieldByLanguageFinder';

export const titleI18N = createFieldByLanguageFinder('title');
export const descriptionI18N = createFieldByLanguageFinder('description');
export const oembedUrlI18N = createFieldByLanguageFinder('embedContent', 'url');
export const tagI18N = createFieldByLanguageFinder('tags');


export function oembedContentI18N(learningPathStep, lang, withFallback = false) {
  const translations = defined(learningPathStep.embedContent, []);
  return defined(translations.find(d => d.language === lang), withFallback ? findFallbackTranslation(translations) : undefined);
}

export function filterFieldsByLanguage(array, language) {
  const cloned = cloneDeep(array);
  const filterByLanguage = (obj) => obj.language && obj.language === language;
  return cloned.filter(filterByLanguage);
}
