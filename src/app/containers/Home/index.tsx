import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Grid, Row, Col } from 'react-flexbox-grid';

import Paper from 'material-ui/Paper';

@observer
export default class Home extends React.Component<{}, {}> {

  render() {
    return (
      <Paper id='content'>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={6} lg={8} ><p style={{backgroundColor:'blue'}}>Hello!</p></Col>
            <Col xs={12} sm={6} md={3} lg={2} ><p style={{backgroundColor:'blue'}}>Hello!</p></Col>
            <Col xs={12} sm={6} md={3} lg={2} ><p style={{backgroundColor:'blue'}}>Hello!</p></Col>
          </Row>
          <br />
          <Row>
            <Col xs={12} sm={3} md={2} lg={1} ><p style={{backgroundColor:'blue'}}>Hello!</p></Col>
            <Col xs={12} sm={9} md={10} lg={11} ><p style={{backgroundColor:'blue'}}>Hello!</p></Col>
          </Row>
          <br />
          <Row>
            <Col xs={10} sm={6} md={8} lg={10} ><p style={{backgroundColor:'blue'}}>Hello!</p></Col>
            <Col xs={2} sm={6} md={4} lg={2} ><p style={{backgroundColor:'blue'}}>Hello!</p></Col>
          </Row>
        </Grid>
      </Paper>
    );
  }
};
