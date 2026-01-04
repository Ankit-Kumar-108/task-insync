import * as React from 'react';
import { Html, Body, Container, Heading, Text, Section } from '@react-email/components';

export default function TaskEmail({ userName, taskTitle, deadline }: any) {
  return (
    <Html>
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'sans-serif' }}>
        <Container style={{ backgroundColor: '#ffffff', margin: '0 auto', padding: '20px', borderRadius: '8px' }}>
          {/* Blue Header for Creation */}
          <Heading style={{ color: '#2563eb' }}>New Task Created 🚀</Heading>
          
          <Text>Hello <strong>{userName}</strong>,</Text>
          <Text>You've successfully added a new task to your list:</Text>
          
          <Section style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '8px', margin: '16px 0' }}>
            <Text style={{ margin: 0, fontWeight: 'bold' }}>{taskTitle}</Text>
            {deadline && (
               <Text style={{ margin: '8px 0 0', color: '#666' }}>Due: {deadline}</Text>
            )}
          </Section>

          <Text style={{ fontSize: '12px', color: '#8898aa' }}>Task-InSync Notification</Text>
        </Container>
      </Body>
    </Html>
  );
}