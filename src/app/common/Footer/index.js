import styled from 'styled-components/macro';

const Footer = () => {
  return (
    <Wrapper>
      <Span1>Designed and Handcrafted by</Span1>
      <Link href="https://chardmd.com" target="_blank">
        Richard
      </Link>
      <Span2>🥳</Span2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 1rem;
  background-color: ${p => p.theme.backgroundVariant};
  color: ${p => p.theme.text};
  bottom: 0;
  left: 0;
  width: 100%;
  min-width: 250px;
  text-align: center;
  position: fixed;
`;

const Link = styled.a`
  color: ${p => p.theme.highLight};
`;

const Span1 = styled.span`
  margin-right: 0.5rem;
`;

const Span2 = styled.span`
  margin-left: 0.5rem;
`;

export default Footer;
