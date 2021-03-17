import React from 'react';
import { DefaultFooter, FooterProps } from '@ant-design/pro-layout';

export const GlobalFooter: React.FC<FooterProps> = (props) => {
  return <DefaultFooter links={[]} copyright="九毛科技前端团队出品" {...props} />;
};
