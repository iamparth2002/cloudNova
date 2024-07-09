import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

export const EmailTemplate = ({ response }) => (
  <Html>
    <Head />
    <Preview>Yelp recent login</Preview>
    <Body style={main}>
      <Container>
        <Section style={logo}>
          <Img
            src={`https://imgs.search.brave.com/zbSgCIJp9Fq6res8YG5ZFKhsEllVK3ZDdplBQu-rDuo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzk4LzIw/L2QzLzk4MjBkMzhh/MTJiZGYxMjRjNjZk/OWI0OGU4MTU4OGRl/LmpwZw`}
          />
        </Section>

        <Section style={content}>
          <Row>

          </Row>

          <Row style={{ ...boxInfos, paddingBottom: '0' }}>
            <Column>
              <Heading
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Hi {response.emailToSend.split('@')[0]},
              </Heading>
              <Heading
                as="h2"
                style={{
                  fontSize: 26,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Someone sent you a file.
              </Heading>

              <Text style={paragraph}>
                <b>File Name: {response.fileName} </b>
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>File Size: {response.fileSize} </b>
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>File Type: {response.fileType} </b>
              </Text>
              <Text
                style={{
                  color: 'rgb(0,0,0, 0.5)',
                  fontSize: 14,
                  marginTop: -5,
                }}
              >
                *Access and download file on your risk
              </Text>

              <Text style={paragraph}>
                Now you can share file with cloudNova.
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                If this wasn't you or if you have additional questions, please
                see our support page.
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                Click below button to acccess the file
              </Text>
            </Column>
          </Row>
          <Row style={{ ...boxInfos, paddingTop: '0' }}>
            <Column style={containerButton} colSpan={2}>
              <Button style={button} href={`${response?.shortUrl}`}>Click here to download</Button>
            </Column>
          </Row>
        </Section>

        <Section style={containerImageFooter}>
          <Img
            style={image}
            width={620}
            src={`https://imgs.search.brave.com/zbSgCIJp9Fq6res8YG5ZFKhsEllVK3ZDdplBQu-rDuo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzk4LzIw/L2QzLzk4MjBkMzhh/MTJiZGYxMjRjNjZk/OWI0OGU4MTU4OGRl/LmpwZw`}
          />
        </Section>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 12,
            color: 'rgb(0,0,0, 0.7)',
          }}
        >
          © 2024 | Created By :-Parth Gandhi | CloudNova
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: '30px 20px',
};

const containerButton = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
};

const button = {
  backgroundColor: '#e00707',
  borderRadius: 3,
  color: '#FFF',
  fontWeight: 'bold',
  border: '1px solid rgb(0,0,0, 0.1)',
  cursor: 'pointer',
  padding: '12px 30px',
};

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
};

const image = {
  maxWidth: '100%',
};

const boxInfos = {
  padding: '20px',
};

const containerImageFooter = {
  padding: '45px 0 0 0',
};
