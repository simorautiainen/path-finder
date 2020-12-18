
import React from 'react';
import {Button,Row,Col,ButtonGroup} from 'react-bootstrap';
import { statuses } from '../assets/helpervariables';
import swal from 'sweetalert';

const ButtonBar = ({ nextGeneration, clearGrid, status }) => {
  const isStatusBarrier = (status === statuses.BARRIERS)

  const showElementError = () => {
    swal({
      button: false,
      text: `
        Error you must set ${status} first!
      `,
      icon: "error",
  });
  }

  return (
    <Row>
    <Col style={{paddingBottom: "2vh"}} xs={3} sm={3} md={3}>
      <ButtonGroup className="mb-2">
      <Button variant="outline-dark" onClick={isStatusBarrier ? nextGeneration : showElementError}>Next Step</Button>
      <Button variant="outline-dark" onClick={clearGrid}>Clear</Button>
      </ButtonGroup>
    </Col>
    <Col xs='auto' sm='auto' md='auto'>
      <h1>Set {status}</h1>
    </Col>
    </Row>
  )
}
export default ButtonBar