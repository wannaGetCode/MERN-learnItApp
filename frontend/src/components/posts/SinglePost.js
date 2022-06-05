import React from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'

import ActionButtons from './ActionButtons'

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  const border = status === 'LEARNED'
    ? 'success'
    : status === 'ON GOING'
    ? 'warning'
    : 'danger'
  
  return (
    <Card className='shadow' border={border}>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className='post-title'>{title}</p>
              <Badge pill bg={border}>{status}</Badge>
            </Col>
            <Col className='text-right'>
              <ActionButtons url={url} id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default SinglePost