import ElementsCard from '@component/ui/ElementsCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CharacterTemplateApi from '@shared/api/CharacterTemplateApi';
import { ICharacterTemplate } from '@type/characterTemplate';
import * as React from 'react';
import { useEffect, useState } from 'react';


const NewCharacterPage = (): JSX.Element => {
  const [characterTemplates, setCharacterTemplates] = useState<ICharacterTemplate[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState();

  useEffect(() => {
    CharacterTemplateApi.find().then((res) => {
      setCharacterTemplates(res);
      setCurrentTemplate(0);
      setCurrentImage(Object.keys(res[currentTemplate].images)[0]);
    });
  }, []);

  const renderCharacterImage = () => {
    return characterTemplates[currentTemplate].images ?
      <img src={`localhost:80/${characterTemplates[currentTemplate].images[currentImage]}`}
           alt="No image" /> : null;
  };

  const renderCharacterTemplate = (): JSX.Element => {
    console.log(currentImage);
    return (
      <>
        {Object.entries(characterTemplates[currentTemplate].attributes).map(([key, value]) =>
          <Typography key={`attribute-${key}`} variant="overline" display="block" gutterBottom>
            {key}: {value}
          </Typography>
        )}
        {Object.entries(characterTemplates[currentTemplate].properties).map(([key, value]) =>
          <Typography key={`property-${key}`} variant="overline" display="block" gutterBottom>
            {key}: {value}
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
          {characterTemplates.length ? renderCharacterTemplate() : null}
        </ElementsCard>
      </Grid>
      <Grid item xs={6}>
        <ElementsCard>
        </ElementsCard>
      </Grid>
    </Grid>
  );
};

export default NewCharacterPage;
