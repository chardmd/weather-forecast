import * as React from 'react';
import { render } from '@testing-library/react';

import PageContainer from '../index';
import { themes } from '../../../../styles/theme/themes';
import { ThemeProvider } from 'styled-components';

const renderWithTheme = (props, theme) =>
  render(
    <ThemeProvider theme={theme || themes.mongoInspiredTheme}>
      <PageContainer {...props} />
    </ThemeProvider>,
  );

describe('<PageContainer />', () => {
  it('should match snapshot', () => {
    const component = renderWithTheme();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
