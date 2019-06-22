import { CurrentPage } from '@component/PageContainer/PageContainer'
import ElementsCard from '@component/ui/ElementsCard';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CharacterTemplateApi from '@shared/api/CharacterTemplateApi';
import GameDataContext from '@shared/context/GameDataContext';
import { ICharacterTemplate } from '@type/characterTemplate';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';

interface INewCharacterPage {
  setCurrentPage: (page: CurrentPage) => void;
}

const NewCharacterPage = (props: INewCharacterPage): JSX.Element => {
  const [characterTemplates, setCharacterTemplates] = useState<ICharacterTemplate[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState();
  const [gameData] = useContext(GameDataContext);

  useEffect(() => {
    CharacterTemplateApi.find().then((res) => {
      setCharacterTemplates(res);
      setCurrentTemplate(0);
      setCurrentImage(Object.keys(res[currentTemplate].images)[0]);
    });
  }, []);

  const renderCharacterImage = () => {
    return characterTemplates[currentTemplate].images ?
      <img src={`http://www.localhost:80/${characterTemplates[currentTemplate].images[currentImage].fileName}`}
           alt="No image" /> : null;
  };

  const renderCharacterTemplate = (): JSX.Element => {
    console.log(currentImage);
    return (
      <>
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
          <Button onClick={() => props.setCurrentPage(CurrentPage.GAME)}>Create character</Button>
        </ElementsCard>
      </Grid>
    </Grid>
  );
};

export default NewCharacterPage;
