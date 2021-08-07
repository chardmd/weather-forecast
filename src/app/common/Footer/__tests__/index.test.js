import * as React from 'react';
import { render } from '@testing-library/react';

import Footer from '../index';
import { themes } from '../../../../styles/theme/themes';
import { ThemeProvider } from 'styled-components';

const renderWithTheme = (props, theme) =>
  render(
    <ThemeProvider theme={theme || themes.mongoInspiredTheme}>
      <Footer {...props} />
    </ThemeProvider>,
  );

describe('<Footer />', () => {
  it('should match snapshot', () => {
    const component = renderWithTheme();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
