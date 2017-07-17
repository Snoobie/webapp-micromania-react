// @flow
import Text, { type TextProps } from './Text';
import withTheme, { type ThemeContext } from './withTheme';

const P = (props: TextProps, { theme }: ThemeContext) => {
  const { marginBottom = theme.p.marginBottom, ...restProps } = props;
  return <Text marginBottom={marginBottom} {...restProps} />;
};

withTheme(P);

export default P;
