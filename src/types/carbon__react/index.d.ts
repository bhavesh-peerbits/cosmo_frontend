import '@carbon/react';
import * as React from 'react';

declare module '@carbon/react' {
  class Theme extends React.PureComponent<{ theme: 'white' | 'g10' | 'g90' | 'g100' }> {}
}
