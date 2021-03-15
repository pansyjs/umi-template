import React from 'react';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';

export const layout = ({
  initialState
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    menuHeaderRender: undefined
  };
};
