import styled from 'styled-components/macro';

const Row = ({ name }) => {
  return (
    <Wrapper>
      <Name>{name}</Name>
    </Wrapper>
  );
};

export default Row;

//styles
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  min-height: 2.75rem;
  font-weight: 500;
  color: ${p => p.theme.text};

  &:nth-child(odd) {
    background-color: ${p => p.theme.backgroundVariant};
  }
`;

const Name = styled.div`
  flex: 1;
  padding: 0.625rem 0;
`;
