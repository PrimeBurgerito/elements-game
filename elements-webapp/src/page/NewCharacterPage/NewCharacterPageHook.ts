import { useEffect, useState } from 'react';
import { ICharacterTemplate } from '@type/Character';
import CharacterTemplateApi from '@shared/api/CharacterTemplateApi';

type CharacterTemplatePickerHook = [ICharacterTemplate | null, () => void, () => void];
export const useCharacterTemplatePicker = (): CharacterTemplatePickerHook => {
  const [characterTemplates, setCharacterTemplates] = useState<ICharacterTemplate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTemplate, setCurrentTemplate] = useState<ICharacterTemplate>(null);

  useEffect(() => {
    CharacterTemplateApi.find().then((res: ICharacterTemplate[]) => {
      setCharacterTemplates(res);
      setCurrentTemplate(res[currentIndex]);
    });
  }, []);

  const next = (): void => {
    const index = currentIndex + 1 >= characterTemplates.length ? 0 : currentIndex + 1;
    setCurrentIndex(index);
    setCurrentTemplate(characterTemplates[index]);
  };

  const previous = (): void => {
    const index = currentIndex - 1 < 0 ? characterTemplates.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
    setCurrentTemplate(characterTemplates[index]);
  };

  return [currentTemplate, next, previous];
};
