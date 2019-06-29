import BackgroundImageGolden from '@images/background-image-golden.png';
import BackgroundImageGolden2 from '@images/background-image-golden2.png';
import BackgroundImageGrey from '@images/background-image-grey.png';
import BackgroundImage from '@images/background-image.png';
import BorderImageGolden from '@images/border-image-golden.png';
import BorderImageGolden2 from '@images/border-image-golden2.png';
import BorderImageGrey from '@images/border-image-grey.png';
import BorderImage from '@images/border-image.png';
import * as React from 'react';
import { CSSProperties } from 'react';

const borderStyles: CSSProperties = {
  borderStyle: 'solid',
  borderImageRepeat: 'repeat',
  borderImageSlice: '6 6 6 6',
  borderImageWidth: '17px',
  borderRadius: '20px',
  padding: 20,
  imageRendering: 'pixelated'
};

const stylesRegular: CSSProperties = {
  backgroundImage: `url(${BackgroundImage})`,
  borderImageSource: `url(${BorderImage})`,
  ...borderStyles
};

const stylesGrey: CSSProperties = {
  backgroundImage: `url(${BorderImageGrey})`,
  borderImageSource: `url(${BackgroundImageGrey})`,
  ...borderStyles,
  borderImageSlice: '3 3 3 3',
  borderImageWidth: '7px',
  borderRadius: '7px',
  padding: 12
};

const stylesGolden: CSSProperties = {
  borderImageSource: `url(${BorderImageGolden})`,
  backgroundImage: `url(${BackgroundImageGolden})`,
  ...borderStyles
};

const stylesGolden2: CSSProperties = {
  borderImageSource: `url(${BorderImageGolden2})`,
  backgroundImage: `url(${BackgroundImageGolden2})`,
  ...borderStyles
};

interface IBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'default' | 'grey' | 'golden' | 'golden2';
}

const ElementsCard = (props: IBorderCardProps): JSX.Element => {
  const selectedType = () => {
    switch (props.type) {
      case 'golden':
        return stylesGolden;
      case 'golden2':
        return stylesGolden2;
      case 'grey':
        return stylesGrey;
      default:
        return stylesRegular;
    }
  };

  return <div
    className={props.className || 'elements-card'}
    style={selectedType()} {...props}>{props.children}
  </div>;
};

export default ElementsCard;
