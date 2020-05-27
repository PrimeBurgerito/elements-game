import * as React from 'react';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ElementsCard from '@component/ui/ElementsCard';
import { MEDIA_URL } from '@constant/paths';
import { useGamePageStyles } from '@page/GamePage/GamePageResource';
import { ICharacter } from '@type/Character';

type Props = {
  character: ICharacter;
}

const CharacterImage: React.FC<Props> = (props) => {
  const classes = useGamePageStyles({});
  const {fileName} = props.character.images.default;
  const {name} = props.character;

  return (
    <>
      <Typography variant="h5" className={classes.characterName}>{name}</Typography>
      <Divider className={classes.characterNameDivider} />
      <ElementsCard type="golden2">
        <img className={classes.characterImage} src={`${MEDIA_URL}/${fileName}`} alt="No image" />
      </ElementsCard>
    </>
  );
};

export default CharacterImage;
