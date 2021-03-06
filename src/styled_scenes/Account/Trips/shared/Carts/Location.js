// NPM
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Label as SemanticLabel, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Truncate from 'react-truncate';
import * as actions from './../../../../../scenes/service-upsert/actions';
import { Popup } from 'semantic-ui-react';

// COMPONENTS
import Rating from './../../../../../shared_components/Rating';
import PriceTag from './../../../../../shared_components/Currency/PriceTag';
import Thumb from './components/Thumb';
import Col from './../../../../../shared_components/layout/Col';
import { PinIcon } from './../../../../../shared_components/icons';

// ACTIONS/CONFIG

// STYLES
import { Cart } from './styles';
import { cardConfig } from 'libs/config';

const ContentWrap = styled.div`
  padding: 20px;
`;

// How did we come up with height: 104px?
// the max number of lines Title can render is 4
// rendered a title that long and saw how many pixels it takes 😜
const Title = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 4px;
  height: ${cardConfig.titleHeight};

  a {
    color: inherit;
  }
`;

const Label = styled.span`
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  color: #6e7885;
`;

const Location = styled.span`
  color: #6e7885;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  height: 44px;

  svg {
    display: inline-block;
    width: 17px;
    height: 17px;
    margin-right: 2px;
    fill: #d3d7dc;
    position: relative;
    left: -3px;
  }

  p {
    width: 100%;
  }
`;

const SemanticLabelFixed = styled(SemanticLabel)`
  position: absolute;
  top: 10px;
  z-index: 10;
  right: 4px;

  a {
    opacity: 1 !important;
  }
`;

const RelativeCard = styled(Cart)`
  position: relative;
`;

const ImageGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
`;

const ImageItem = styled.div`
  grid-row-start: 1;
  grid-column-start: 1;
  grid-column-end: span 2;
`;

const ContractStatusItem = styled.div`
  grid-column-start: 2;
  grid-row-start: 1;
  z-index: 1;
`;

const wrapInRopstenLink = (text, reservation) => (
  <a href={`https://ropsten.etherscan.io/tx/${reservation.transactionHash}`} target="_blank">
    {text}
  </a>
);

const getSmartContractBookingStatus = props => {
  if (!props.item.reservation) return null;
  const { transactionHash, transactionStatus } = props.item.reservation;
  const values = { pricePerSession: props.item.pricePerSession, slots: props.item.slots };
  if (transactionHash != null) {
    if (transactionStatus === 1) {
      return wrapInRopstenLink(
        <SemanticLabelFixed onClick={props.redeployContract} color="green">
          Confirmed <Icon name="external" />
        </SemanticLabelFixed>,
        props.item.reservation,
      );
    }
    if (transactionStatus === 0) {
      return (
        <div>
          {wrapInRopstenLink(
            <SemanticLabelFixed color="red">
              Failed <Icon name="external" />
            </SemanticLabelFixed>,
            props.item.reservation,
          )}
          <SemanticLabelFixed
            style={{ top: '40px' }}
            onClick={() => props.redeployContract(values, props.item, props.history)}
            color="green"
          >
            Re-deploy
          </SemanticLabelFixed>
        </div>
      );
    }
    if (!transactionStatus) {
      return wrapInRopstenLink(
        <SemanticLabelFixed color="blue">
          Pending <Icon name="external" />
        </SemanticLabelFixed>,
        props.item.reservation,
      );
    }
  }
  return <SemanticLabelFixed color="green">Confirmed</SemanticLabelFixed>;
};

// MODULE
class ServiceLocationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truncated: false,
    };
  }

  handleTruncate = truncated => {
    if (this.state.truncated !== truncated) {
      this.setState({
        truncated,
      });
    }
  };

  wrapWithLink = element => {
    const { item } = this.props;
    return <Link to={`/services/${item.objectId}`}>{element}</Link>;
  };

  render() {
    const { item, withShadow, mdBasis, smBasis, xsBasis } = this.props;
    return (
      <div>
        {this.state.truncated ? (
          <Popup
            trigger={
              <Col xsBasis={xsBasis} mdBasis={smBasis} smBasis={mdBasis}>
                <RelativeCard withShadow={withShadow} column>
                  <ImageGridContainer>
                    <ImageItem>{this.wrapWithLink(<Thumb url={item.image} />)}</ImageItem>
                    <ContractStatusItem>
                      {getSmartContractBookingStatus(this.props)}
                    </ContractStatusItem>
                  </ImageGridContainer>
                  <ContentWrap>
                    {this.wrapWithLink(
                      <div>
                        <Title>
                          <Truncate onTruncate={this.handleTruncate} lines={cardConfig.titleLines}>
                            {item.title}
                          </Truncate>
                        </Title>

                        {item.type && (
                          <Location>
                            <PinIcon />
                            <p>
                              <Truncate lines={cardConfig.locationLines}>{item.location}</Truncate>
                            </p>
                          </Location>
                        )}
                        <Rating marginBottom="10px" rating={item.rating} count={item.reviewCount} />
                        <Label>Starting from</Label>
                        <PriceTag price={item.price} />
                      </div>,
                    )}
                  </ContentWrap>
                </RelativeCard>
              </Col>
            }
            content={this.props.item.title}
          />
        ) : (
          <Col xsBasis={xsBasis} mdBasis={smBasis} smBasis={mdBasis}>
            <RelativeCard withShadow={withShadow} column>
              <ImageGridContainer>
                <ImageItem>{this.wrapWithLink(<Thumb url={item.image} />)}</ImageItem>
                <ContractStatusItem>{getSmartContractBookingStatus(this.props)}</ContractStatusItem>
              </ImageGridContainer>
              <ContentWrap>
                {this.wrapWithLink(
                  <div>
                    <Title>
                      <Truncate onTruncate={this.handleTruncate} lines={cardConfig.titleLines}>
                        {item.title}
                      </Truncate>
                    </Title>

                    {item.type && (
                      <Location>
                        <PinIcon />
                        <p>
                          <Truncate lines={cardConfig.locationLines}>{item.location}</Truncate>
                        </p>
                      </Location>
                    )}
                    <Rating marginBottom="10px" rating={item.rating} count={item.reviewCount} />
                    <Label>Starting from</Label>
                    <PriceTag price={item.price} />
                  </div>,
                )}
              </ContentWrap>
            </RelativeCard>
          </Col>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ServiceLocationCard));
