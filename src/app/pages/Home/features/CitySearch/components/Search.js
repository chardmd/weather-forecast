import styled from 'styled-components/macro';
import { useRef, useEffect } from 'react';

const Search = ({ onSubmit, onChange, value, isLoading, Loader }) => {
  const inputSearch = useRef(null);

  useEffect(() => {
    inputSearch.current.focus();
    inputSearch.current.select();
  }, []);

  const handleFocus = event => event.target.select();

  return (
    <FormGroup onSubmit={onSubmit}>
      <FormLabel>TYPE A CITY</FormLabel>
      <InputWrapper>
        <Input
          ref={inputSearch}
          type="text"
          placeholder="Sydney / New York / Tokyo etc"
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
        />
        {isLoading && <Loader small />}
      </InputWrapper>
    </FormGroup>
  );
};

export default Search;

//styles
const Input = styled.input`
  line-height: 1.5;
  color: ${p => p.theme.textSecondary};
  background-color: ${p => p.theme.background};
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  outline: none;
  height: 2.75rem;
  padding: 0 0.75rem;
  border: 2px solid ${p => p.theme.border};
  border-radius: 4px;
  color: ${p => p.theme.text};
  display: block;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  min-width: 300px;

  &::placeholder {
    color: ${p => p.theme.textSecondary};
    font-weight: 300;
  }

  &:focus {
    border-color: ${p => p.theme.primary};
    box-shadow: 0 0 0 1px
      ${p =>
        p.theme.primary.replace(
          /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
          'rgba$1,0.2)',
        )};
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  ${Input} {
    width: ${100 / 3}%;
    margin-right: 0.5rem;
  }
`;

const FormLabel = styled.label`
  text-transform: uppercase;
  font-weight: normal;
  margin: 0;
  padding: 0;
  color: ${p => p.theme.textSecondary};
  font-size: 0.75rem;
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
`;
