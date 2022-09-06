import { ComponentMeta, ComponentStory } from '@storybook/react';
// import component and props declaration
import Logo, { ILogo } from './index';
// import mock data
import { mockLogoProps } from './logo.mocks';

export default {
  title: 'common/Logo',
  component: Logo,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Logo>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

/**
 * Primary button
 */
export const Sample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Sample.args = {
  ...mockLogoProps.sampleLogo,
} as ILogo;
