import ElementsCard from '@component/ui/ElementsCard';
import { MEDIA_URL } from '@constant/paths';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GameStateApi from '@shared/api/GameStateApi';
import React, { useState } from 'react';
import { IProperty } from '@type/Property';
import { useCharacterTemplatePicker } from '@page/NewCharacterPage/NewCharacterPageHook';

type Props = {
  onSuccess: () => void;
}

const NewCharacterPage: React.FC<Props> = (props) => {
  const [template, next, previous] = useCharacterTemplatePicker();
  const [name, setName] = useState<string>('');

  const handleCreateCharacterClick = async (): Promise<void> => {
    const success: boolean = await GameStateApi.create({
      characterTemplateId: template.id,
      characterName: name
    });
    if (success) {
      props.onSuccess();
    }
  };

  const renderCharacterImage = (): React.ReactElement => {
    const image = template && Object.values(template.images)[0];
    return image && <img src={`${MEDIA_URL}/${image.fileName}`} alt="No image" />;
  };

  const renderProperty = (property: IProperty<unknown>): React.ReactElement => {
    return <Typography key={`property-${property.key}`} variant="overline" display="block" gutterBottom>
      {property.name}: {property.value}
    </Typography>;
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <ElementsCard>
          <Typography>Choose character template</Typography>
          <Button onClick={previous}>Back</Button><Button onClick={next}>Next</Button>
          {template?.properties.numericProperties.map(renderProperty)}
          {template?.properties.stringProperties.map(renderProperty)}
          {renderCharacterImage()}
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
            onChange={event => setName(event.target.value)}
          />
        </ElementsCard>;
      </Grid>
    </Grid>
  );
};

export default NewCharacterPage;
