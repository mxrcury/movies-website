import React from 'react';

import { MovieCard } from '../components';

export default {
  title: 'Recommendations/MovieCard',
  component: MovieCard,
};

const Template = (args) => <MovieCard {...args} />;

export const Primary = Template.bind({});