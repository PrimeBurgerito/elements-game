import ElementsCard from '@component/ui/ElementsCard';
import { MEDIA_URL } from '@constant/paths';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CharacterTemplateApi from '@shared/api/CharacterTemplateApi';
import GameStateApi from '@shared/api/GameStateApi';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ICharacterTemplate } from '@type/Character';
import { IProperty } from '@type/Property';
import { CurrentPage } from '@component/container/PageContainer';

type TemplateState = [
  ICharacterTemplate | null,
  () => void,
  () => void
];

type Props = {
  setCurrentPage: (page: CurrentPage) => void;
}

const useTemplateState = (): TemplateState => {
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

const NewCharacterPage: React.FC<Props> = (props) => {
  const [template, next, previous] = useTemplateState();
  const [name, setName] = useState<string>('');

  const handleCreateCharacterClick = async (): Promise<void> => {
    const success: boolean = await GameStateApi.create({
      characterTemplateId: template.id,
      characterName: name
    });
    if (success) {
      props.setCurrentPage(CurrentPage.START_MENU);
    }
  };

  const renderCharacterImage = (): React.ReactElement => {
    const image = template && Object.values(template.images)[0];
    return image && <img src={`${MEDIA_URL}/${image.fileName}`} alt="No image" />;
  };

  const renderProperty = (property: IProperty<unknown>): React.ReactElement =>
    <Typography key={`property-${property.key}`} variant="overline" display="block" gutterBottom>
      {property.name}: {property.value}
    </Typography>;

  const renderCharacterTemplate = (): React.ReactElement =>
    <ElementsCard>
      <Typography>Choose character template</Typography>
      <Button onClick={previous}>Back</Button><Button onClick={next}>Next</Button>
      {template?.properties.numericProperties.map(renderProperty)}
      {template?.properties.stringProperties.map(renderProperty)}
      {renderCharacterImage()}
    </ElementsCard>;

  const renderCharacterForm = (): React.ReactElement =>
    <ElementsCard>
      <Button onClick={handleCreateCharacterClick}>Create character</Button>
      <TextField
        id="name-field"
        label="Name"
        margin="normal"
        variant="outlined"
        value={name}
        onChange={({target}) => setName(target.value)}
      />
    </ElementsCard>;

  return (
    <Grid container>
      <Grid item xs={6}>
        {renderCharacterTemplate()}
      </Grid>
      <Grid item xs={6}>
        {renderCharacterForm()}
      </Grid>
    </Grid>
  );
};

export default NewCharacterPage;
