import * as React from 'react';
import { Html, Body, Container, Heading, Text, Section, Button } from '@react-email/components';

interface ReminderEmailProps {
  userName: string;
  taskTitle: string;
  deadline?: string;
}

export default function ReminderEmail({ userName, taskTitle, deadline }: ReminderEmailProps) {
  return (
    <Html>
      <Body style={{ backgroundColor: '#fff0f0', fontFamily: 'sans-serif' }}>
        <Container style={{ backgroundColor: '#ffffff', margin: '0 auto', padding: '20px', borderRadius: '8px', borderTop: "4px solid #ef4444" }}>
          <Heading style={{ color: '#ef4444' }}>Task Overdue ⚠️</Heading>
          
          <Text>Hello <strong>{userName}</strong>,</Text>
          <Text>The following task has missed its deadline:</Text>
          
          <Section style={{ backgroundColor: '#fff5f5', padding: '16px', borderRadius: '8px', margin: '16px 0' }}>
            <Text style={{ margin: 0, fontWeight: 'bold' }}>{taskTitle}</Text>
            {deadline && (
               <Text style={{ margin: '8px 0 0', color: '#dc2626' }}>Was due: {deadline}</Text>
            )}
          </Section>

          <Button 
            href="https://task-insync.vercel.app"
            style={{ backgroundColor: "#ef4444", color: "#fff", padding: "12px 20px", borderRadius: "5px", textDecoration: "none" }}
          >
            Go to App
          </Button>
        </Container>
      </Body>
    </Html>
  );
}