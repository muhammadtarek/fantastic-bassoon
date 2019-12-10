import React, { useState, useEffect } from 'react';
import { Icon, Stack, IIconStyles, FontWeights, Image, Button, PrimaryButton } from 'office-ui-fabric-react';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import { Colors } from 'utils';
import Locale from 'localization';
import { PermissionFlag } from 'components';
import { CONTROL_CAR, RENT_CAR } from 'utils/Constants';
import ImagePreview from 'components/imagePreview';
import Text, { Heading, Title, MegaTitle, Caption } from '../text';
import { ICarCardProps } from './CarCard.types';
import ColorPreview from '../colorPreview';

function isURL(str: string) {
  const exp = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
  const pattern = new RegExp(exp); // fragment locator
  return pattern.test(str);
}

function renderImage(image: string) {
  return isURL(image) ? image : `data:image/gif;base64,${image}`;
}

function CarCard({ color, description, images, name, price }: ICarCardProps) {
  const [selectedImagePreview, setSelectedImagePreview] = useState();

  useEffect(() => {
    setSelectedImagePreview(0);
  }, []);

  const iconStyles: IIconStyles = {
    root: {
      color: Colors.themePrimary,
      fontSize: 20,
      fontWeight: FontWeights.regular,
    },
  };
  const footerCardSectionStyles: ICardSectionStyles = {
    root: {
      borderTop: '1px solid #F3F2F1',
    },
  };
  const backgroundImageCardSectionStyles: ICardSectionStyles = {
    root: {
      height: 170,
    },
  };

  const cardTokens: ICardTokens = { childrenMargin: 12, width: '33%' };
  const footerCardSectionTokens: ICardSectionTokens = { padding: '12px 0px 0px', childrenGap: 20 };

  return (
    <Card onClick={() => {}} tokens={cardTokens}>
      <Card.Section fill verticalAlign="end" styles={backgroundImageCardSectionStyles}>
        <Image src={renderImage(images[selectedImagePreview])} width="100%" />
      </Card.Section>
      <Card.Section>
        <Stack horizontal tokens={{ childrenGap: 5 }}>
          {images.map((image: string, index: number) => (
            <ImagePreview
              key={image}
              isSelected={index === selectedImagePreview}
              onClick={() => setSelectedImagePreview(index)}
              src={renderImage(image)}
            />
          ))}
        </Stack>
        <Heading>{name}</Heading>
        <Text color={Colors.neutralTertiary}>{description}</Text>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <Text>{Locale.listings.car.color}</Text>
            <ColorPreview color={color} />
          </Stack>
          <Stack horizontal horizontalAlign="end" verticalAlign="end" tokens={{ childrenGap: 5 }}>
            <MegaTitle mb={0} color={Colors.themePrimary}>
              {price}
            </MegaTitle>
            <Caption mb={1} color={Colors.themePrimary}>
              L.E
            </Caption>
          </Stack>
        </Stack>
      </Card.Section>

      <Card.Section horizontal horizontalAlign="end" styles={footerCardSectionStyles} tokens={footerCardSectionTokens}>
        <PermissionFlag permissionKey={CONTROL_CAR}>
          <Icon iconName="Edit" styles={iconStyles} onClick={() => console.log('edit')} />
          <Icon iconName="Delete" styles={iconStyles} color={Colors.red} onClick={() => console.log('delete')} />
        </PermissionFlag>

        <PermissionFlag permissionKey={RENT_CAR}>
          <PrimaryButton>{Locale.listings.car.rent}</PrimaryButton>
        </PermissionFlag>
      </Card.Section>
    </Card>
  );
}

export default CarCard;
