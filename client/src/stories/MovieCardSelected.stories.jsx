import React from 'react';

import { MovieCardSelected } from '../components';

export default {
  title: 'Recommendations/SelectedMoviesCard',
  component: MovieCardSelected,
};

const Template = (args) => <MovieCardSelected {...args} />;

export const Primary = Template.bind({});