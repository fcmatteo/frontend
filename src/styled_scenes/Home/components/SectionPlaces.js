// NPM
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// COMPONENTS
import Carousel from '../../../shared_components/Carousel';
import LocationCart from '../../../shared_components/Carts/Location';

// ACTIONS/CONFIG

// STYLES
import {
  PageWrapper,
  SectionWrap,
  SectionHeader,
  SectionContent,
  More,
} from '../../../shared_components/layout/Page';
import i18n from './../../../libs/i18n';
import { BadgeDecentralized } from './../../../shared_components/Badge';

export default function HomeSectionPlaces({ trips }) {
  return (
    <PageWrapper>
      <SectionWrap>
        <SectionHeader>
          <h3>Popular {i18n.t('places.singular')}</h3>
          <More>
            <Link to="/results?service_types=place">All {i18n.t('places.singular')}</Link>
          </More>
        </SectionHeader>
        <SectionContent>
          <Carousel sm_slides_nb={1} md_slides_nb={2} lg_slides_nb={4} xl_slides_nb={4}>
            {trips.map(item => (
              <Link to={'/services/' + item.objectId} key={item.objectId}>
                {item.contractAddress && <BadgeDecentralized>Decentralized</BadgeDecentralized>}
                <LocationCart item={item} withShadow key={item.objectId} />
              </Link>
            ))}
          </Carousel>
        </SectionContent>
      </SectionWrap>
    </PageWrapper>
  );
}

// Props Validation
HomeSectionPlaces.propTypes = {
  trips: PropTypes.arrayOf(PropTypes.object),
};
