import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface DataPostProps {
  message: string;
  likes?: number;
  author: string;
  action?: () => void;
  image?: string;
}

export const CardPostAdmin: React.FC<DataPostProps> = ({ action, author, likes, message, image }) => {
  return (
    <Card style={{ maxWidth: '350px', margin: '20px auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px', border: '1px solid #efefef' }}>
      <Card.Body>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Card.Title style={{ margin: '0', fontSize: '1rem' }}>{author}</Card.Title>
          <Button variant="link" style={{ marginLeft: 'auto', padding: '0', fontSize: '1.2rem', color: '#000' }}>❤️ {likes}</Button>
        </div>
        <Card.Text style={{ fontSize: '0.9rem', color: '#333' }}>{message}</Card.Text>
        <Button onClick={action} variant="primary" style={{ fontSize: '0.9rem' }}>Ver más</Button>
      </Card.Body>
    </Card>
  );
}