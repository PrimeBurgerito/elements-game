import { CurrentPage } from '@component/PageContainer/PageContainer';
import ElementsCard from '@component/ui/ElementsCard';
import { MEDIA_URL } from '@constant/paths';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CharacterTemplateApi from '@shared/api/CharacterTemplateApi';
import GameStateApi from '@shared/api/GameStateApi';
import GameDataContext from '@shared/context/GameDataContext';
import { ICharacterTemplate } from '@type/character';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';

interface INewCharacterPage {
  setCurrentPage: (page: CurrentPage) => void;
}

const NewCharacterPage = (props: INewCharacterPage): JSX.Element => {
  const [characterTemplates, setCharacterTemplates] = useState<ICharacterTemplate[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState();
  const [name, setName] = useState<string>('');
  const [gameData] = useContext(GameDataContext);

  useEffect(() => {
    CharacterTemplateApi.find().then((res) => {
      setCharacterTemplates(res);
      setCurrentTemplate(0);
      setCurrentImage(Object.keys(res[currentTemplate].images)[0]);
    });
  }, []);

  const handleCreateCharacterClick = async () => {
    const characterCreated = await GameStateApi.create({
      characterTemplateId: characterTemplates[currentTemplate].id,
      characterName: name
    });
    if (characterCreated) {
      props.setCurrentPage(CurrentPage.START_MENU);
    }
  };

  const renderCharacterImage = () => {
    return characterTemplates.length && characterTemplates[currentTemplate].images ?
      <img src={`${MEDIA_URL}/${characterTemplates[currentTemplate].images[currentImage].fileName}`} alt="No image" />
      : null;
  };

  const renderCharacterTemplate = (): JSX.Element => {
    const nextTemplate = () => {
      const next = currentTemplate + 1 >= characterTemplates.length ? 0 : currentTemplate + 1;
      setCurrentTemplate(next);
    };
    const lastTemplate = () => {
      const last = currentTemplate - 1 < 0 ? characterTemplates.length - 1 : currentTemplate - 1;
      setCurrentTemplate(last);
    };

    return (
      <>
        <Typography>Choose character template</Typography>
        <Button onClick={lastTemplate}>Back</Button><Button onClick={nextTemplate}>Next</Button>
        {Object.entries(characterTemplates[currentTemplate].attributes).map(([key, value]) =>
          <Typography key={`attribute-${key}`} variant="overline" display="block" gutterBottom>
            {gameData.attributes.find((attr) => attr.id === key).name}: {value}
          </Typography>
        )}
        {Object.entries(characterTemplates[currentTemplate].properties).map(([key, value]) =>
          <Typography key={`property-${key}`} variant="overline" display="block" gutterBottom>
            {gameData.properties.find((prop) => prop.id === key).name}: {value}
          </Typography>
        )}
        {renderCharacterImage()}
      </>
    );
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <ElementsCard>
          {characterTemplates.length && gameData ? renderCharacterTemplate() : null}
        </ElementsCard>
      </Grid>
      <Grid item xs={6}>
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
        </ElementsCard>
      </Grid>
    </Grid>
  );
};

export default NewCharacterPage;
