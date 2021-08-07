import * as React from 'react';
import { render } from '@testing-library/react';

import Loader from '../index';
import { themes } from '../../../../styles/theme/themes';
import { ThemeProvider } from 'styled-components';

const renderWithTheme = (props, theme) =>
  render(
    <ThemeProvider theme={theme || themes.mongoInspiredTheme}>
      <Loader {...props} />
    </ThemeProvider>,
  );

describe('<Loader />', () => {
  it('should match snapshot', () => {
    const component = renderWithTheme();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
