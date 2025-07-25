// Footer.js
import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background: #232323;
  color: #fff;
  padding: 40px 0 20px 0;
  font-family: 'Segoe UI', sans-serif;
`;
const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: auto;
  justify-content: space-between;

  @media (max-width: 760px) {
    flex-direction: column;
    padding: 0 20px;
  }
`;
const FooterSection = styled.div`
  flex: 1 1 220px;
  margin: 20px;
  min-width: 200px;

  @media (max-width: 760px) {
    margin: 10px 0;
  }
`;
const SectionTitle = styled.h2`
  margin-bottom: 12px;
  color: #ffc107;
`;
const SectionHeading = styled.h3`
  margin-bottom: 12px;
  color: #ffc107;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
`;
const ListItem = styled.li`
  margin-bottom: 8px;
`;
const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #ffc107;
  }
`;
const Socials = styled.div`
  margin-top: 12px;
  a {
    margin-right: 10px;
    font-size: 24px;
    color: #fff;
    text-decoration: none;
  }
`;
const NewsletterForm = styled.form`
  display: flex;
  margin-top: 8px;
`;
const NewsletterInput = styled.input`
  padding: 8px;
  border: none;
  border-radius: 2px 0 0 2px;
  outline: none;
`;
const NewsletterButton = styled.button`
  padding: 8px 12px;
  border: none;
  background: #ffc107;
  color: #232323;
  border-radius: 0 2px 2px 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #e0a800;
  }
`;
const FooterBottom = styled.div`
  text-align: center;
  margin-top: 30px;
  font-size: 14px;
  color: #bdbdbd;
`;

const Footer = () => (
  <FooterWrapper>
    <FooterContent>
      <FooterSection>
        <SectionTitle>ShopVerse</SectionTitle>
        <p>
          Discover the latest trends, best prices, and quality products at YourStore. Shop with confidence and enjoy fast shipping!
        </p>
        <Socials>
          <a href="/" aria-label="Facebook">🌐</a>
          <a href="/" aria-label="Instagram">📸</a>
          <a href="/" aria-label="Twitter">🐦</a>
        </Socials>
      </FooterSection>
      <FooterSection>
        <SectionHeading>Quick Links</SectionHeading>
        <List>
          <ListItem><FooterLink href="/">Shop</FooterLink></ListItem>
          <ListItem><FooterLink href="/">About Us</FooterLink></ListItem>
          <ListItem><FooterLink href="/">FAQ</FooterLink></ListItem>
          <ListItem><FooterLink href="/">Contact</FooterLink></ListItem>
          <ListItem><FooterLink href="/">Cart</FooterLink></ListItem>
        </List>
      </FooterSection>
      <FooterSection>
        <SectionHeading>Customer Service</SectionHeading>
        <List>
          <ListItem><FooterLink href="/">Shipping Policy</FooterLink></ListItem>
          <ListItem><FooterLink href="/">Returns &amp; Refunds</FooterLink></ListItem>
          <ListItem><FooterLink href="/">Terms &amp; Conditions</FooterLink></ListItem>
          <ListItem><FooterLink href="/">Privacy Policy</FooterLink></ListItem>
        </List>
      </FooterSection>
      <FooterSection>
        <SectionHeading>Stay Updated</SectionHeading>
        {/* <NewsletterForm onSubmit={e => e.preventDefault()}>
          <NewsletterInput type="email" placeholder="Your email address" required />
          <NewsletterButton type="submit">Subscribe</NewsletterButton>
        </NewsletterForm> */}
      </FooterSection>
    </FooterContent>
    <FooterBottom>
      &copy; {new Date().getFullYear()} YourStore. All rights reserved.
    </FooterBottom>
  </FooterWrapper>
);

export default Footer;
